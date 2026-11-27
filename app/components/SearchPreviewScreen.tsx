"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import elevatrLogo from "@/images/logo/elevatr-logo.svg";
import { revealTextLine, staggerFadeUp } from "./animations";

interface SearchPreviewScreenProps {
  onLogoClick?: () => void;
  onNextClick?: () => void;
}

export default function SearchPreviewScreen({
  onLogoClick,
  onNextClick,
}: SearchPreviewScreenProps) {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100dvh",
        bgcolor: "#FFFFFF",
        color: "#111111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, sm: 5 },
        py: { xs: 6, sm: 8 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 780,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Centered Logo */}
        <Box
          component={onLogoClick ? "button" : "div"}
          type={onLogoClick ? "button" : undefined}
          onClick={onLogoClick}
          aria-label={onLogoClick ? "Back to Elevatr home" : undefined}
          sx={{
            display: "inline-flex",
            mb: { xs: 3, sm: 3.5 },
            p: 0,
            border: 0,
            bgcolor: "transparent",
            cursor: onLogoClick ? "pointer" : "default",
            ...staggerFadeUp(60),
          }}
        >
          <Image
            src={elevatrLogo}
            alt="elevatr"
            priority
            style={{
              width: "clamp(108px, 9.5vw, 132px)",
              height: "auto",
              display: "block",
            }}
          />
        </Box>

        {/* Headline */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.2rem", sm: "3.15rem", md: "3.75rem" },
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            color: "#111111",
            mb: { xs: 2, sm: 2.5 },
            overflow: "hidden",
          }}
        >
          <Box component="span" sx={revealTextLine(150)}>
            Search, with room to breathe.
          </Box>
        </Typography>

        {/* Subcopy */}
        <Typography
          sx={{
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
            fontWeight: 400,
            lineHeight: 1.55,
            color: "#27272A",
            letterSpacing: "-0.01em",
            mb: { xs: 4, sm: 4.5 },
          }}
        >
          <Box component="span" sx={{ display: "block", ...staggerFadeUp(270) }}>
            A new experience is on its way.
          </Box>
          <Box component="span" sx={{ display: "block", ...staggerFadeUp(360) }}>
            Thoughtfully built, ready to make a difference.
          </Box>
        </Typography>

        {/* CTA Pill Button */}
        <Box sx={staggerFadeUp(460)}>
          <Button
            variant="contained"
            disableElevation
            onClick={onNextClick}
            sx={{
              bgcolor: "#7B5CFA",
              color: "#FFFFFF",
              borderRadius: "9999px",
              minWidth: { xs: 230, sm: 268 },
              px: 4,
              py: 1.15,
              fontSize: "0.82rem",
              fontWeight: 500,
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
            One more thing is there
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
