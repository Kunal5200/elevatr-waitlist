"use client";

import * as React from "react";
import Box from "@mui/material/Box";

const CONFETTI_COLORS = [
  "#7B5CFA",
  "#A78BFA",
  "#C4B5FD",
  "#0C87FF",
  "#111111",
  "#F472B6",
  "#FBBF24",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  tiltAngle: number;
  tiltSpeed: number;
  shape: "rect" | "circle";
  alpha: number;
}

export default function ConfettiBurst() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];

    const spawnBurst = (
      originX: number,
      originY: number,
      minAngleDeg: number,
      maxAngleDeg: number,
      count: number,
      speedMin: number,
      speedMax: number
    ) => {
      for (let i = 0; i < count; i++) {
        const angle =
          ((minAngleDeg + Math.random() * (maxAngleDeg - minAngleDeg)) *
            Math.PI) /
          180;
        const speed = speedMin + Math.random() * (speedMax - speedMin);
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          width: 6 + Math.random() * 6,
          height: 4 + Math.random() * 5,
          color:
            CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          tiltAngle: Math.random() * Math.PI * 2,
          tiltSpeed: 0.08 + Math.random() * 0.1,
          shape: Math.random() > 0.22 ? "rect" : "circle",
          alpha: 1,
        });
      }
    };

    // Dual bottom-side celebratory cannons + top shower
    spawnBurst(width * 0.12, height * 0.85, -80, -35, 50, 10, 19);
    spawnBurst(width * 0.88, height * 0.85, -145, -100, 50, 10, 19);
    spawnBurst(width * 0.5, -20, 45, 135, 45, 2, 7);

    const startTime = performance.now();
    let frameId = 0;

    const render = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.34;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.tiltAngle += p.tiltSpeed;

        if (elapsed > 2600) {
          p.alpha = Math.max(0, p.alpha - 0.018);
        }

        if (p.alpha <= 0 || p.y > height + 40) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.width * 0.36, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const tiltScale = Math.cos(p.tiltAngle);
          ctx.fillRect(
            -p.width / 2,
            (-p.height * tiltScale) / 2,
            p.width,
            p.height * tiltScale
          );
        }

        ctx.restore();
      }

      if (particles.length > 0 && elapsed < 5200) {
        frameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      aria-hidden="true"
      sx={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
}
