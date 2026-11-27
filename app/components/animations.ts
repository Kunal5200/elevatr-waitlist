import { keyframes } from "@mui/system";
import type { SxProps, Theme } from "@mui/material/styles";

export const fadeUpKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateY(18px);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`;

export const revealLineKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateY(105%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const screenForwardKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.99);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const screenBackwardKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-16px) scale(0.99);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const gentleFloatKeyframes = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

export const shimmerPulseKeyframes = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.62;
  }
`;

export function staggerFadeUp(
  delayMs: number,
  durationMs = 560
): SxProps<Theme> {
  return {
    opacity: 0,
    animation: `${fadeUpKeyframes} ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms forwards`,
    "@media (prefers-reduced-motion: reduce)": {
      opacity: 1,
      animation: "none",
    },
  };
}

export function revealTextLine(
  delayMs: number,
  durationMs = 640
): SxProps<Theme> {
  return {
    display: "inline-block",
    opacity: 0,
    animation: `${revealLineKeyframes} ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms forwards`,
    "@media (prefers-reduced-motion: reduce)": {
      opacity: 1,
      animation: "none",
    },
  };
}
