"use client";

import { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";

interface PhaseNumberProps {
  number: number; // 1-4
  isActive?: boolean;
  color?: string;
}

export const PhaseNumber = memo(function PhaseNumber({ number, isActive = false, color = "#FFFFFF" }: PhaseNumberProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    );
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      style={{
        fontSize: "clamp(12rem, 25vw, 20rem)",
        fontWeight: 900,
        lineHeight: 1,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
        letterSpacing: "-0.05em",
        display: "inline-block",
        position: "relative",
        // GPU acceleration
        transform: "translateZ(0)",
        willChange: isActive ? "opacity" : "auto",
        // Liquid glass effect - simple and performant
        background: `
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.8) 0%,
            ${color}CC 40%,
            ${color}AA 70%,
            rgba(255, 255, 255, 0.6) 100%
          )
        `,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        opacity: isActive ? 1 : 0.5,
        filter: isActive
          ? `drop-shadow(0 0 20px ${color}50) drop-shadow(0 4px 15px rgba(0,0,0,0.2))`
          : `drop-shadow(0 0 10px ${color}30) drop-shadow(0 2px 8px rgba(0,0,0,0.15))`,
        transition: "opacity 0.3s ease, filter 0.3s ease",
      }}
    >
      {number}
    </div>
  );
});
