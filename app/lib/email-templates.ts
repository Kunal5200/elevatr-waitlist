export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ELEVATR_LOGO_URL =
  "https://876j7brtvuiizxlu.public.blob.vercel-storage.com/elevatr-logo.svg";

const ELEVATR_LOGO_IMG = `
<img
  src="${ELEVATR_LOGO_URL}"
  alt="elevatr"
  width="149"
  height="38"
  style="display:block;margin:0 auto;border:0;outline:none;text-decoration:none;width:149px;height:auto;"
/>
`.trim();

export function buildWaitlistAdminEmail({
  userEmail,
  timestampIso,
}: {
  userEmail: string;
  timestampIso: string;
}): { subject: string; html: string; text: string } {
  const safeEmail = escapeHtml(userEmail);
  const safeTime = escapeHtml(timestampIso);

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Elevatr Waitlist Signup</title>
  </head>
  <body style="margin:0;padding:0;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111111;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background-color:#ffffff;border:1px solid #ECE7FE;border-radius:14px;">
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7B5CFA;">
                  Elevatr Waitlist
                </p>
                <h1 style="margin:0 0 18px;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#111111;">
                  New Waitlist Signup
                </h1>
                <div style="padding:16px 20px;border-radius:10px;border:1px solid #ECE7FE;background-color:#FAF9FF;margin-bottom:18px;">
                  <p style="margin:0 0 6px;font-size:12px;color:#6B7280;">Subscriber email</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#111111;">${safeEmail}</p>
                </div>
                <p style="margin:0;font-size:12px;color:#737373;">
                  Signed up at ${safeTime}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  const text = `New Elevatr waitlist signup\n\nEmail: ${userEmail}\nSigned up at: ${timestampIso}`;

  return {
    subject: `New Elevatr Waitlist Signup: ${userEmail}`,
    html,
    text,
  };
}

export function buildWaitlistUserEmail({
  userEmail,
  adminEmail,
}: {
  userEmail: string;
  adminEmail?: string;
}): { subject: string; html: string; text: string } {
  const unsubscribeHref = adminEmail
    ? `mailto:${encodeURIComponent(adminEmail)}?subject=${encodeURIComponent(
        `Unsubscribe ${userEmail} from Elevatr Waitlist`
      )}`
    : "#";

  const instagramIconUrl =
    "https://876j7brtvuiizxlu.public.blob.vercel-storage.com/instagram.png";
  const facebookIconUrl =
    "https://876j7brtvuiizxlu.public.blob.vercel-storage.com/facebook.png";

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>You're officially on the Elevatr waitlist!</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Mrs+Saint+Delafield&display=swap" rel="stylesheet" />
  </head>
  <body style="margin:0;padding:0;background-color:#ffffff;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111111;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff;">
      <tr>
        <td align="center" style="padding:36px 16px 40px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background-color:#ffffff;">
            <!-- Header Logo -->
            <tr>
              <td align="center" style="padding-bottom:24px;">
                ${ELEVATR_LOGO_IMG}
              </td>
            </tr>

            <!-- Floating "we love you" Badge + Purple Banner -->
            <tr>
              <td style="padding-bottom:28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="right" style="padding-right:16px;">
                      <div style="display:inline-block;background-color:#ffffff;border-radius:9999px;padding:8px 18px;box-shadow:0 8px 20px rgba(17,17,17,0.12);border:1px solid #F1F0F6;margin-bottom:-18px;position:relative;z-index:2;">
                        <span style="color:#E12D39;font-size:16px;vertical-align:middle;line-height:1;">&#10084;</span>
                        <span style="color:#111111;font-size:15px;font-weight:700;letter-spacing:-0.01em;vertical-align:middle;margin-left:6px;">we love you</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#7857FF;background-image:linear-gradient(135deg,#6A4DFB 0%,#8366FF 100%);border-radius:14px;padding:28px 28px 26px;">
                      <p style="margin:0 0 8px;font-size:32px;font-weight:800;line-height:1.1;letter-spacing:-0.02em;text-transform:uppercase;">
                        <span style="color:#ffffff;">HEADS </span><span style="color:#C6B8FF;">UP!</span>
                      </p>
                      <p style="margin:0;font-size:12.5px;font-weight:700;letter-spacing:0.02em;line-height:1.4;color:#ffffff;text-transform:uppercase;">
                        YOU&apos;RE OFFICIALLY ON THE ELEVATR WAITLIST!
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body Copy -->
            <tr>
              <td style="padding:0 4px;">
                <h1 style="margin:0 0 18px;font-size:20px;font-weight:700;line-height:1.3;color:#111111;">
                  Hi There,
                </h1>

                <p style="margin:0 0 16px;font-size:14px;line-height:1.65;color:#4B5563;">
                  You&apos;ve made it, and honestly, we&apos;re glad you&apos;re here.
                </p>

                <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:#4B5563;">
                  We&apos;ve put a lot of thought, research and effort into building something meaningful, and having you be part of its early journey makes it even more special. We&apos;re working hard to bring ELEVATR to life, and we can&apos;t wait to show you what we&apos;ve been building.
                </p>

                <p style="margin:0 0 16px;font-size:14px;font-weight:700;line-height:1.6;color:#1F2937;">
                  Thank you for being part of our beginning. It means more than you know.
                </p>

                <p style="margin:0 0 22px;font-size:14px;font-weight:700;line-height:1.6;color:#1F2937;">
                  Until then, take care and keep elevating. <span style="color:#7B5CFA;">&#128156;</span>
                </p>

                <p style="margin:0 0 30px;font-size:14px;line-height:1.6;color:#4B5563;">
                  With warmth,<br />
                  <strong style="color:#111111;">Team ELEVATR</strong>
                </p>
              </td>
            </tr>

            <!-- Script Quote -->
            <tr>
              <td align="center" style="padding:4px 8px 28px;">
                <p style="margin:0;font-family:'Mrs Saint Delafield','Brush Script MT',Georgia,serif;font-size:30px;line-height:1.25;color:#3F3F46;font-weight:400;">
                  big things start with small beginnings. this is ours. together.
                </p>
              </td>
            </tr>

            <!-- Divider + Social Icons + Divider -->
            <tr>
              <td style="border-top:1px solid #EAEAEA;border-bottom:1px solid #EAEAEA;padding:18px 0;" align="center">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="center" style="padding:0 6px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td align="center" valign="middle" bgcolor="#000000" style="width:36px;height:36px;background-color:#000000;border-radius:50px;">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style="display:block;padding:9px;background-color:#000000;border-radius:50px;text-decoration:none;">
                              <img
                                src="${instagramIconUrl}"
                                alt="Instagram"
                                width="18"
                                height="18"
                                style="display:block;margin:0 auto;border:0;outline:none;text-decoration:none;width:18px;height:18px;"
                              />
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td align="center" style="padding:0 6px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td align="center" valign="middle" bgcolor="#000000" style="width:36px;height:36px;background-color:#000000;border-radius:50px;">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style="display:block;padding:9px;background-color:#000000;border-radius:50px;text-decoration:none;">
                              <img
                                src="${facebookIconUrl}"
                                alt="Facebook"
                                width="18"
                                height="18"
                                style="display:block;margin:0 auto;border:0;outline:none;text-decoration:none;width:18px;height:18px;"
                              />
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:22px 12px 0;">
                <p style="margin:0 0 14px;font-size:11px;line-height:1.5;color:#52525B;">
                  &copy; 2026 Elevatr. All rights reserved.
                </p>
                <p style="margin:0 0 10px;font-size:11px;line-height:1.6;color:#52525B;">
                  You&apos;re receiving this email because you signed up to join the ELEVATR waitlist. By registering, you agree to our Terms of Use and Privacy Policy.<br />
                  If you no longer wish to receive updates from us, you can unsubscribe using the link below.
                </p>
                <p style="margin:0;font-size:11px;line-height:1.5;">
                  <a href="${unsubscribeHref}" style="color:#52525B;text-decoration:underline;">Unsubscribe</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  const text = [
    "HEADS UP! YOU'RE OFFICIALLY ON THE ELEVATR WAITLIST!",
    "",
    "Hi There,",
    "",
    "You've made it, and honestly, we're glad you're here.",
    "",
    "We've put a lot of thought, research and effort into building something meaningful, and having you be part of its early journey makes it even more special. We're working hard to bring ELEVATR to life, and we can't wait to show you what we've been building.",
    "",
    "Thank you for being part of our beginning. It means more than you know.",
    "Until then, take care and keep elevating.",
    "",
    "With warmth,",
    "Team ELEVATR",
    "",
    "big things start with small beginnings. this is ours. together.",
    "",
    "© 2026 Elevatr. All rights reserved.",
  ].join("\n");

  return {
    subject: "Heads up! You're officially on the Elevatr waitlist",
    html,
    text,
  };
}
