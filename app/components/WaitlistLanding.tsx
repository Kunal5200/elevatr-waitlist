"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import elevatrLogo from "@/images/logo/elevatr-logo.svg";
import BrowserWireframe from "./BrowserWireframe";
import {
  gentleFloatKeyframes,
  revealTextLine,
  staggerFadeUp,
} from "./animations";

const drawArrowShaft = keyframes`
  from {
    stroke-dashoffset: 90;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const drawArrowHead = keyframes`
  from {
    opacity: 0;
    stroke-dashoffset: 40;
  }
  to {
    opacity: 1;
    stroke-dashoffset: 0;
  }
`;

interface WaitlistLandingProps {
  onWaitlistClick: () => void;
}

export default function WaitlistLanding({
  onWaitlistClick,
}: WaitlistLandingProps) {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100dvh",
        bgcolor: "#FFFFFF",
        color: "#111111",
        display: "flex",
        flexDirection: "column",
        borderTop: "5px solid #0C87FF",
      }}
    >
      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          px: { xs: 3, sm: 5, md: 6.5 },
          pt: { xs: 3.5, sm: 4.5, md: 5 },
          pb: { xs: 2.5, sm: 3 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top Section: Brand + Wireframe */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: { xs: 4, md: 5 },
          }}
        >
          {/* Brand Logo & Script Tagline */}
          <Box sx={{ flexShrink: 0, pt: { md: 0.25 } }}>
            <Box sx={staggerFadeUp(40)}>
              <Image
                src={elevatrLogo}
                alt="elevatr"
                priority
                style={{
                  width: "clamp(124px, 11vw, 149px)",
                  height: "auto",
                  display: "block",
                }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "var(--font-script), cursive",
                fontSize: { xs: "2rem", sm: "2.35rem", md: "2.6rem" },
                lineHeight: 1.05,
                color: "#171717",
                mt: 1,
                pl: 0.25,
                userSelect: "none",
                ...staggerFadeUp(130),
              }}
            >
              your digital career identity.
            </Typography>
          </Box>

          {/* Right Browser Wireframe */}
          <Box
            sx={{
              width: { xs: "100%", md: "54%", lg: "52%" },
              maxWidth: 740,
              ...staggerFadeUp(180, 650),
            }}
          >
            <Box
              sx={{
                animation: `${gentleFloatKeyframes} 6s ease-in-out 900ms infinite`,
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none",
                },
              }}
            >
              <BrowserWireframe />
            </Box>
          </Box>
        </Box>

        {/* Bottom Section: Headline + CTA + Footer */}
        <Box sx={{ mt: { xs: 5, md: "auto" }, pt: { xs: 3, md: 5 } }}>
          {/* Hero Headline & Waitlist CTA Row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "flex-end" },
              gap: { xs: 3.5, md: 4 },
              pb: { xs: 3.5, md: 4 },
            }}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.75rem",
                    sm: "4rem",
                    md: "4.75rem",
                    lg: "5.25rem",
                  },
                  fontWeight: 600,
                  lineHeight: 1.04,
                  letterSpacing: "-0.04em",
                  color: "#111111",
                }}
              >
                <Box component="span" sx={{ display: "block", overflow: "hidden" }}>
                  <Box component="span" sx={revealTextLine(100)}>
                    Quietly built,
                  </Box>
                </Box>
                <Box component="span" sx={{ display: "block", overflow: "hidden" }}>
                  <Box component="span" sx={revealTextLine(200)}>
                    Almost ready.
                  </Box>
                </Box>
              </Typography>

              <Typography
                sx={{
                  mt: { xs: 2, md: 2.5 },
                  fontSize: { xs: "0.95rem", sm: "1.0625rem", md: "1.125rem" },
                  lineHeight: 1.5,
                  color: "#262626",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  ...staggerFadeUp(320),
                }}
              >
                A better way to work, create and grow. Elevatr is coming together.
              </Typography>
            </Box>

            {/* Curved Arrow + Waitlist Pill Button */}
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "flex-start", md: "flex-end" },
                alignSelf: { xs: "flex-start", md: "flex-end" },
                pb: { md: 0.75 },
                pr: { md: 0.5 },
              }}
            >
              <Box
                component="svg"
                viewBox="0 0 76 80"
                fill="none"
                aria-hidden="true"
                sx={{
                  width: { xs: 54, md: 68 },
                  height: { xs: 58, md: 72 },
                  mb: 0.75,
                  mr: { md: 16 },
                  ml: { xs: 1, md: 0 },
                  display: { xs: "none", sm: "block" },
                }}
              >
                <Box
                  component="path"
                  d="M22 4C16 26 24 50 56 68"
                  stroke="#7B5CFA"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  sx={{
                    strokeDasharray: 90,
                    strokeDashoffset: 90,
                    animation: `${drawArrowShaft} 650ms cubic-bezier(0.22, 1, 0.36, 1) 420ms forwards`,
                    "@media (prefers-reduced-motion: reduce)": {
                      strokeDashoffset: 0,
                      animation: "none",
                    },
                  }}
                />
                <Box
                  component="path"
                  d="M42 66.5L57.5 69L53 54"
                  stroke="#7B5CFA"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  sx={{
                    opacity: 0,
                    strokeDasharray: 40,
                    strokeDashoffset: 40,
                    animation: `${drawArrowHead} 320ms cubic-bezier(0.22, 1, 0.36, 1) 820ms forwards`,
                    "@media (prefers-reduced-motion: reduce)": {
                      opacity: 1,
                      strokeDashoffset: 0,
                      animation: "none",
                    },
                  }}
                />
              </Box>

              <Box sx={staggerFadeUp(380)}>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={onWaitlistClick}
                  sx={{
                    bgcolor: "#7B5CFA",
                    color: "#FFFFFF",
                    borderRadius: "9999px",
                    px: 3,
                    py: 1.15,
                    fontSize: "0.84rem",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    transition:
                      "background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease",
                    "&:hover": {
                      bgcolor: "#6844F5",
                      transform: "translateY(-1px)",
                      boxShadow: "0 8px 22px rgba(123, 92, 250, 0.28)",
                    },
                  }}
                >
                  Oh! here&apos;s the Waitlist
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Footer Divider & Credits */}
          <Box sx={staggerFadeUp(480)}>
            <Divider sx={{ borderColor: "#EAEAEA" }} />

            <Box
              component="footer"
              sx={{
                pt: 1.75,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#737373", fontSize: "0.75rem" }}
              >
                © 2026 Elevatr
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#737373", fontSize: "0.75rem" }}
              >
                Built with intent. Launching soon.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
