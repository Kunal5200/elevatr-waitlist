"use client";

import * as React from "react";
import Image from "next/image";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import elevatrLogo from "@/images/logo/elevatr-logo.svg";

interface WaitlistScreenProps {
  onLogoClick?: () => void;
  onSuccess?: (email: string) => void;
}

export default function WaitlistScreen({
  onLogoClick,
  onSuccess,
}: WaitlistScreenProps) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmed }),
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setError(
          payload?.error ||
            "Could not complete waitlist signup. Please try again."
        );
        return;
      }

      if (onSuccess) {
        onSuccess(trimmed);
      } else {
        setSubmittedEmail(trimmed);
      }
    } catch {
      setError("Network error while joining the waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "100dvh",
        bgcolor: "#FFFFFF",
        color: "#111111",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, sm: 5 },
        py: { xs: 6, sm: 8 },
      }}
    >
      {/* Subtle Bottom Watermark */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          bottom: { xs: "-4vw", sm: "-5vw", md: "-6.5vw" },
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: "120vw", sm: "92vw", md: "80vw" },
          maxWidth: 1180,
          opacity: 0.045,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        <Image
          src={elevatrLogo}
          alt=""
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </Box>

      {/* Centered Letter & Waitlist Form */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 640,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top-Right Logo */}
        <Box
          component={onLogoClick ? "button" : "div"}
          type={onLogoClick ? "button" : undefined}
          onClick={onLogoClick}
          aria-label={onLogoClick ? "Back to Elevatr home" : undefined}
          sx={{
            alignSelf: "flex-end",
            display: "inline-flex",
            mb: { xs: 3.5, sm: 4 },
            p: 0,
            border: 0,
            bgcolor: "transparent",
            cursor: onLogoClick ? "pointer" : "default",
          }}
        >
          <Image
            src={elevatrLogo}
            alt="elevatr"
            priority
            style={{
              width: "clamp(120px, 11vw, 149px)",
              height: "auto",
              display: "block",
            }}
          />
        </Box>

        {/* Script Heading */}
        <Typography
          variant="h1"
          sx={{
            fontFamily: "var(--font-script), cursive",
            fontSize: { xs: "2.65rem", sm: "3.35rem", md: "3.75rem" },
            fontWeight: 400,
            lineHeight: 1.08,
            color: "#171717",
            mb: { xs: 2.5, sm: 3 },
          }}
        >
          Something worth waiting for.
        </Typography>

        {/* Founder Letter Copy */}
        <Box
          sx={{
            color: "#4B5563",
            fontSize: { xs: "0.94rem", sm: "0.98rem" },
            lineHeight: 1.75,
            "& p": {
              m: 0,
            },
          }}
        >
          <Typography component="p" sx={{ textAlign: "justify" }}>
            Before building Elevatr, we spent months researching, listening, and
            understanding the real challenges people face while searching for the
            right opportunities.
          </Typography>

          <Typography component="p" sx={{ textAlign: "justify", mt: 0.75 }}>
            Every conversation, every insight, and countless hours of work went
            into making sure we&apos;re building something that truly understands your
            journey.
          </Typography>

          <Typography component="p" sx={{ mt: 0.75 }}>
            This isn&apos;t just a product we&apos;ve built; it&apos;s something we&apos;ve
            put our hearts into, hoping it makes your next step a little easier.
          </Typography>

          <Typography
            component="p"
            sx={{
              mt: 3,
              fontWeight: 700,
              color: "#3F3F46",
              fontSize: { xs: "0.94rem", sm: "0.98rem" },
            }}
          >
            Thank you for being part of this journey, even before it begins.
          </Typography>

          <Typography
            component="p"
            sx={{
              mt: 2.5,
              textAlign: "right",
              fontStyle: "italic",
              color: "#27272A",
              fontSize: { xs: "0.94rem", sm: "0.98rem" },
            }}
          >
            ~ Founders , Elevatr
          </Typography>
        </Box>

        {/* Waitlist Email Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: { xs: 4.5, sm: 5.5 } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: 1.25,
            }}
          >
            <OutlinedInput
              fullWidth
              type="email"
              placeholder="you@example.com"
              disabled={isSubmitting}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
                if (submittedEmail) setSubmittedEmail(null);
              }}
              error={Boolean(error)}
              inputProps={{
                "aria-label": "Email address",
              }}
              sx={{
                flex: 1,
                height: 44,
                borderRadius: "8px",
                bgcolor: "#FFFFFF",
                fontSize: "0.875rem",
                color: "#111111",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: error ? "#DC2626" : "#9D85FB",
                  borderWidth: "1px",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: error ? "#DC2626" : "#7B5CFA",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: error ? "#DC2626" : "#7B5CFA",
                  borderWidth: "1.5px",
                },
                "& input::placeholder": {
                  color: "#7B5CFA",
                  opacity: 0.9,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={isSubmitting}
              sx={{
                height: 44,
                minWidth: 122,
                bgcolor: "#7B5CFA",
                color: "#FFFFFF",
                borderRadius: "9999px",
                px: 3,
                fontSize: "0.84rem",
                fontWeight: 500,
                textTransform: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition:
                  "background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease",
                "&:hover": {
                  bgcolor: "#6844F5",
                  transform: "translateY(-1px)",
                  boxShadow: "0 8px 20px rgba(123, 92, 250, 0.25)",
                },
                "&.Mui-disabled": {
                  bgcolor: "#A48EFC",
                  color: "#FFFFFF",
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
              ) : (
                "Join waitlist"
              )}
            </Button>
          </Box>

          {error && (
            <Typography
              role="alert"
              sx={{
                mt: 1,
                ml: 0.5,
                fontSize: "0.8rem",
                color: "#DC2626",
              }}
            >
              {error}
            </Typography>
          )}

          {submittedEmail && (
            <Alert
              severity="success"
              sx={{
                mt: 1.75,
                borderRadius: "10px",
                bgcolor: "#F5F3FF",
                color: "#3B288C",
                border: "1px solid #DDD6FE",
                "& .MuiAlert-icon": {
                  color: "#7B5CFA",
                },
              }}
            >
              You&apos;re on the waitlist! We&apos;ll reach out to{" "}
              <strong>{submittedEmail}</strong> when Elevatr launches.
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
}
