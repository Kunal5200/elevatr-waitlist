import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildWaitlistAdminEmail,
  buildWaitlistUserEmail,
} from "@/app/lib/email-templates";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseEmailList(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => EMAIL_REGEX.test(entry));
}

export async function POST(request: Request) {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const rawEmail = typeof body.email === "string" ? body.email.trim() : "";
  if (!rawEmail || rawEmail.length > 254 || !EMAIL_REGEX.test(rawEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey =
    process.env.RESEND_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_RESEND_API_KEY?.trim();

  if (!apiKey) {
    console.error("Missing RESEND_API_KEY / NEXT_PUBLIC_RESEND_API_KEY");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const adminEmails = parseEmailList(
    process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL
  );
  const bccEmails = parseEmailList(
    process.env.BCC_EMAIL || process.env.NEXT_PUBLIC_BCC_EMAIL
  );
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL?.trim() ||
    "Elevatr <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const timestampIso = new Date().toISOString();

  const tasks: Array<{
    target: "admin" | "user";
    promise: ReturnType<typeof resend.emails.send>;
  }> = [];

  if (adminEmails.length > 0 || bccEmails.length > 0) {
    const adminTo = adminEmails.length > 0 ? adminEmails : bccEmails;
    const adminBcc =
      adminEmails.length > 0 && bccEmails.length > 0 ? bccEmails : undefined;
    const adminTemplate = buildWaitlistAdminEmail({
      userEmail: rawEmail,
      timestampIso,
    });

    tasks.push({
      target: "admin",
      promise: resend.emails.send({
        from: fromEmail,
        to: adminTo,
        ...(adminBcc ? { bcc: adminBcc } : {}),
        replyTo: rawEmail,
        subject: adminTemplate.subject,
        html: adminTemplate.html,
        text: adminTemplate.text,
      }),
    });
  }

  const userTemplate = buildWaitlistUserEmail({
    userEmail: rawEmail,
    adminEmail: adminEmails[0] ?? bccEmails[0],
  });

  tasks.push({
    target: "user",
    promise: resend.emails.send({
      from: fromEmail,
      to: rawEmail,
      subject: userTemplate.subject,
      html: userTemplate.html,
      text: userTemplate.text,
    }),
  });

  const results = await Promise.all(
    tasks.map(async (task) => ({
      target: task.target,
      result: await task.promise,
    }))
  );

  const failures = results.filter((item) => item.result.error !== null);

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(
        `Resend ${failure.target} email failed:`,
        failure.result.error
      );
    }

    const firstError = failures[0].result.error;
    return NextResponse.json(
      {
        error:
          firstError?.message ||
          "Unable to complete waitlist signup right now. Please try again.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    email: rawEmail,
    sent: results.map((item) => ({
      target: item.target,
      id: item.result.data?.id ?? null,
    })),
  });
}
