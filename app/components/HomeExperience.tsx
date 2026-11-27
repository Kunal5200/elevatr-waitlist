"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CountdownScreen from "./CountdownScreen";
import FinalSlideScreen from "./FinalSlideScreen";
import SearchPreviewScreen from "./SearchPreviewScreen";
import WaitlistLanding from "./WaitlistLanding";
import WaitlistScreen from "./WaitlistScreen";
import {
  screenBackwardKeyframes,
  screenForwardKeyframes,
} from "./animations";

type Screen = "landing" | "waitlist" | "countdown" | "preview" | "final";

const SCREEN_ORDER: Record<Screen, number> = {
  landing: 0,
  waitlist: 1,
  countdown: 2,
  preview: 3,
  final: 4,
};

export default function HomeExperience() {
  const [activeScreen, setActiveScreen] = React.useState<Screen>("landing");
  const [direction, setDirection] = React.useState<"forward" | "backward">(
    "forward"
  );
  const [hasNavigated, setHasNavigated] = React.useState(false);

  const activeScreenRef = React.useRef<Screen>("landing");
  activeScreenRef.current = activeScreen;

  React.useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const raw = event.state?.screen;
      const nextScreen: Screen =
        raw === "waitlist" ||
        raw === "countdown" ||
        raw === "preview" ||
        raw === "final"
          ? raw
          : "landing";

      const prevOrder = SCREEN_ORDER[activeScreenRef.current];
      const nextOrder = SCREEN_ORDER[nextScreen];
      setDirection(nextOrder >= prevOrder ? "forward" : "backward");
      setHasNavigated(true);
      setActiveScreen(nextScreen);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (nextScreen: Screen) => {
    const prevOrder = SCREEN_ORDER[activeScreen];
    const nextOrder = SCREEN_ORDER[nextScreen];
    setDirection(nextOrder >= prevOrder ? "forward" : "backward");
    setHasNavigated(true);
    setActiveScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: "instant" });
    window.history.pushState({ screen: nextScreen }, "");
  };

  const handleBackToLanding = () => {
    if (activeScreen === "landing") return;
    setDirection("backward");
    setHasNavigated(true);
    setActiveScreen("landing");
    window.scrollTo({ top: 0, behavior: "instant" });
    if (window.history.state?.screen) {
      window.history.pushState({ screen: "landing" }, "");
    }
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "final":
        return (
          <FinalSlideScreen
            onLogoClick={handleBackToLanding}
            onJoinWaitlistClick={() => navigateTo("waitlist")}
          />
        );
      case "preview":
        return (
          <SearchPreviewScreen
            onLogoClick={handleBackToLanding}
            onNextClick={() => navigateTo("final")}
          />
        );
      case "countdown":
        return (
          <CountdownScreen
            onLogoClick={handleBackToLanding}
            onNextClick={() => navigateTo("preview")}
          />
        );
      case "waitlist":
        return (
          <WaitlistScreen
            onLogoClick={handleBackToLanding}
            onSuccess={() => navigateTo("countdown")}
          />
        );
      case "landing":
      default:
        return <WaitlistLanding onWaitlistClick={() => navigateTo("waitlist")} />;
    }
  };

  const transitionKeyframes =
    direction === "forward"
      ? screenForwardKeyframes
      : screenBackwardKeyframes;

  return (
    <Box
      key={activeScreen}
      sx={
        hasNavigated
          ? {
              animation: `${transitionKeyframes} 420ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
              },
            }
          : undefined
      }
    >
      {renderScreen()}
    </Box>
  );
}
