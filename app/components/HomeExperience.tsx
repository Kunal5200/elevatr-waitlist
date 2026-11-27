"use client";

import * as React from "react";
import Fade from "@mui/material/Fade";
import CountdownScreen from "./CountdownScreen";
import FinalSlideScreen from "./FinalSlideScreen";
import SearchPreviewScreen from "./SearchPreviewScreen";
import WaitlistLanding from "./WaitlistLanding";
import WaitlistScreen from "./WaitlistScreen";

type Screen = "landing" | "waitlist" | "countdown" | "preview" | "final";

export default function HomeExperience() {
  const [activeScreen, setActiveScreen] = React.useState<Screen>("landing");

  React.useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const stateScreen = event.state?.screen;
      if (
        stateScreen === "waitlist" ||
        stateScreen === "countdown" ||
        stateScreen === "preview" ||
        stateScreen === "final"
      ) {
        setActiveScreen(stateScreen);
      } else {
        setActiveScreen("landing");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (nextScreen: Screen) => {
    setActiveScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: "instant" });
    window.history.pushState({ screen: nextScreen }, "");
  };

  const handleBackToLanding = () => {
    if (window.history.state?.screen) {
      setActiveScreen("landing");
      window.history.pushState({ screen: "landing" }, "");
    } else {
      setActiveScreen("landing");
    }
  };

  if (activeScreen === "final") {
    return (
      <Fade in key="final" timeout={350}>
        <div>
          <FinalSlideScreen
            onLogoClick={handleBackToLanding}
            onJoinWaitlistClick={() => navigateTo("waitlist")}
          />
        </div>
      </Fade>
    );
  }

  if (activeScreen === "preview") {
    return (
      <Fade in key="preview" timeout={350}>
        <div>
          <SearchPreviewScreen
            onLogoClick={handleBackToLanding}
            onNextClick={() => navigateTo("final")}
          />
        </div>
      </Fade>
    );
  }

  if (activeScreen === "countdown") {
    return (
      <Fade in key="countdown" timeout={350}>
        <div>
          <CountdownScreen
            onLogoClick={handleBackToLanding}
            onNextClick={() => navigateTo("preview")}
          />
        </div>
      </Fade>
    );
  }

  if (activeScreen === "waitlist") {
    return (
      <Fade in key="waitlist" timeout={350}>
        <div>
          <WaitlistScreen
            onLogoClick={handleBackToLanding}
            onSuccess={() => navigateTo("countdown")}
          />
        </div>
      </Fade>
    );
  }

  return (
    <Fade in key="landing" timeout={300}>
      <div>
        <WaitlistLanding onWaitlistClick={() => navigateTo("waitlist")} />
      </div>
    </Fade>
  );
}
