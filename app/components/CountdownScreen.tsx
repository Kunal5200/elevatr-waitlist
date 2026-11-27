"use client";

import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import elevatrLogo from "@/images/logo/elevatr-logo.svg";

// Target launch date: February 2, 2027 (local midnight)
const LAUNCH_DATE = new Date(2027, 1, 2, 0, 0, 0, 0);

const digitDropIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-38%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
}

function getRemainingTime(target: Date): CountdownTime {
  const diffMs = Math.max(0, target.getTime() - Date.now());
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes };
}

function padTwo(value: number): string {
  return String(value).padStart(2, "0");
}

function AnimatedUnitValue({ value }: { value: string }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        justifyContent: "center",
        overflow: "hidden",
        lineHeight: 1,
      }}
    >
      {value.split("").map((char, index) => (
        <Box
          key={`${index}-${char}`}
          component="span"
          sx={{
            display: "inline-block",
            fontSize: { xs: "2.5rem", sm: "3.25rem", md: "3.75rem" },
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontVariantNumeric: "tabular-nums",
            color: "#111111",
            animation: `${digitDropIn} 260ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          {char}
        </Box>
      ))}
    </Box>
  );
}

interface CountdownScreenProps {
  onLogoClick?: () => void;
  onNextClick?: () => void;
}

export default function CountdownScreen({
  onLogoClick,
  onNextClick,
}: CountdownScreenProps) {
  const [displayTime, setDisplayTime] = React.useState<CountdownTime>(() =>
    getRemainingTime(LAUNCH_DATE)
  );

  React.useEffect(() => {
    const target = getRemainingTime(LAUNCH_DATE);
    const durationMs = 1100;
    const startTime = performance.now();
    let frameId = 0;

    // Initial countdown roll-in animation into the live target values
    const startOffset = {
      days: target.days + 6,
      hours: (target.hours + 9) % 24,
      minutes: (target.minutes + 18) % 60,
    };

    const animateRollIn = (now: number) => {
      const progress = Math.min(1, (now - startTime) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentDays = Math.round(
        startOffset.days + (target.days - startOffset.days) * eased
      );
      const currentHours = Math.round(
        startOffset.hours + (target.hours - startOffset.hours) * eased
      );
      const currentMinutes = Math.round(
        startOffset.minutes + (target.minutes - startOffset.minutes) * eased
      );

      if (progress < 1) {
        setDisplayTime({
          days: currentDays,
          hours: currentHours,
          minutes: currentMinutes,
        });
        frameId = requestAnimationFrame(animateRollIn);
      } else {
        setDisplayTime(getRemainingTime(LAUNCH_DATE));
      }
    };

    frameId = requestAnimationFrame(animateRollIn);

    const intervalId = window.setInterval(() => {
      setDisplayTime(getRemainingTime(LAUNCH_DATE));
    }, 1000);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearInterval(intervalId);
    };
  }, []);

  const units = [
    { label: "DAYS", value: padTwo(displayTime.days) },
    { label: "HOURS", value: padTwo(displayTime.hours) },
    { label: "MINUTES", value: padTwo(displayTime.minutes) },
  ];

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
      {/* Subtle Top Watermark */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: { xs: "-4vw", sm: "-5.5vw", md: "-6.5vw" },
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

      {/* Centered Countdown Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 620,
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
              width: "clamp(108px, 9.5vw, 132px)",
              height: "auto",
              display: "block",
            }}
          />
        </Box>

        {/* Heading */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "1.9rem", sm: "2.35rem", md: "2.65rem" },
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#111111",
            mb: { xs: 4, sm: 5 },
          }}
        >
          The countdown is on.
        </Typography>

        {/* Countdown Grid */}
        <Box
          role="timer"
          aria-live="polite"
          aria-label={`${displayTime.days} days, ${displayTime.hours} hours, ${displayTime.minutes} minutes until February 2, 2027`}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: { xs: 5, sm: 6 },
          }}
        >
          {units.map((unit, index) => (
            <React.Fragment key={unit.label}>
              <Box
                sx={{
                  px: { xs: 2.5, sm: 4.5, md: 5.5 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: { xs: 84, sm: 120, md: 136 },
                }}
              >
                <AnimatedUnitValue value={unit.value} />
                <Typography
                  sx={{
                    mt: 1,
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    color: "#737373",
                    textTransform: "uppercase",
                  }}
                >
                  {unit.label}
                </Typography>
              </Box>

              {index < units.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    borderColor: "#EAEAEA",
                    height: { xs: 48, sm: 58 },
                    alignSelf: "center",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>

        {/* Secondary CTA */}
        <Button
          variant="contained"
          disableElevation
          onClick={onNextClick}
          sx={{
            bgcolor: "#7B5CFA",
            color: "#FFFFFF",
            borderRadius: "9999px",
            px: 3.25,
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
          What else do we have
        </Button>
      </Box>
    </Box>
  );
}
