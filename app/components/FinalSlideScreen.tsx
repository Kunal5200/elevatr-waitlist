"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import elevatrLogo from "@/images/logo/elevatr-logo.svg";
import MobileWireframe from "./MobileWireframe";
import {
  gentleFloatKeyframes,
  revealTextLine,
  staggerFadeUp,
} from "./animations";

interface FinalSlideScreenProps {
  onLogoClick?: () => void;
  onJoinWaitlistClick?: () => void;
}

export default function FinalSlideScreen({
  onLogoClick,
  onJoinWaitlistClick,
}: FinalSlideScreenProps) {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100dvh",
        bgcolor: "#FFFFFF",
        color: "#111111",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          px: { xs: 3, sm: 5, md: 6.5 },
          pt: { xs: 3.5, sm: 4.5, md: 5 },
          pb: { xs: 4, sm: 5, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            ...staggerFadeUp(60),
          }}
        >
          <Box
            component={onLogoClick ? "button" : "div"}
            type={onLogoClick ? "button" : undefined}
            onClick={onLogoClick}
            aria-label={onLogoClick ? "Back to Elevatr home" : undefined}
            sx={{
              display: "inline-flex",
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
                width: "clamp(112px, 10vw, 136px)",
                height: "auto",
                display: "block",
              }}
            />
          </Box>

          <Button
            variant="contained"
            disableElevation
            onClick={onJoinWaitlistClick}
            sx={{
              bgcolor: "#7B5CFA",
              color: "#FFFFFF",
              borderRadius: "9999px",
              px: 2.75,
              py: 0.9,
              fontSize: "0.78rem",
              fontWeight: 500,
              textTransform: "none",
              whiteSpace: "nowrap",
              transition:
                "background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                bgcolor: "#6844F5",
                transform: "translateY(-1px)",
                boxShadow: "0 8px 20px rgba(123, 92, 250, 0.25)",
              },
            }}
          >
            Join waitlist
          </Button>
        </Box>

        {/* Main Hero Row */}
        <Box
          sx={{
            my: "auto",
            py: { xs: 5, md: 4 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: { xs: 5, md: 6 },
          }}
        >
          {/* Left Copy */}
          <Box sx={{ maxWidth: 820 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "3.25rem",
                  sm: "4.75rem",
                  md: "5.75rem",
                  lg: "6.75rem",
                },
                fontWeight: 600,
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                color: "#111111",
                mb: { xs: 1.5, sm: 2 },
                overflow: "hidden",
              }}
            >
              <Box component="span" sx={revealTextLine(130)}>
                Coming soon.
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1.05rem", sm: "1.35rem", md: "1.6rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "#111111",
                textTransform: "uppercase",
                ...staggerFadeUp(250),
              }}
            >
              YOUR CAREER IS MORE THAN A PDF
            </Typography>

            <Typography
              sx={{
                fontFamily: "var(--font-script), cursive",
                fontSize: { xs: "2.35rem", sm: "3.2rem", md: "3.85rem" },
                lineHeight: 1.05,
                color: "#171717",
                mt: 0.5,
                userSelect: "none",
                ...staggerFadeUp(350),
              }}
            >
              less guesswork. more proof.
            </Typography>
          </Box>

          {/* Right Mobile Wireframe */}
          <Box
            sx={{
              alignSelf: { xs: "center", md: "center" },
              pr: { md: 1 },
              flexShrink: 0,
              ...staggerFadeUp(220, 650),
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
              <MobileWireframe />
            </Box>
          </Box>
        </Box>

        {/* Bottom Supporting Copy */}
        <Box sx={{ pt: { xs: 2, md: 0 }, ...staggerFadeUp(450) }}>
          <Typography
            sx={{
              fontSize: { xs: "0.92rem", sm: "1rem" },
              lineHeight: 1.6,
              color: "#27272A",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            You have the skills. You did the work. You have the receipts.
            <br />
            Now let&apos;s make sure your next opportunity sees the whole picture.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
