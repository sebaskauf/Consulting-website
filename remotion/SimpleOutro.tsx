import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";
import React from "react";

export const SimpleOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Einblend-Animation
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ausblend-Animation am Ende
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Logo-Animation
  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.8 },
  });

  // Text-Animation
  const textOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textY = interpolate(frame, [40, 70], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // CTA Animation
  const ctaOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsierender Glow
  const pulseGlow = interpolate(Math.sin(frame / 10), [-1, 1], [0.4, 0.8]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)",
        fontFamily: "Inter, system-ui, sans-serif",
        opacity,
      }}
    >
      {/* Hintergrund-Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(139, 92, 246, ${pulseGlow * 0.2}) 0%, transparent 60%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 40,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${Math.max(0, logoScale)})`,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 ${50 * pulseGlow}px rgba(139, 92, 246, 0.6)`,
            }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Firmenname */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "white",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Vibe Consulting
          </h1>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: ctaOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <p
            style={{
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.7)",
              margin: 0,
            }}
          >
            Bereit für die Zukunft?
          </p>

          <div
            style={{
              padding: "16px 40px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
              fontSize: 20,
              fontWeight: 600,
              color: "white",
              boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
            }}
          >
            vibe-consulting.de
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: ctaOpacity * 0.6,
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.5)",
            margin: 0,
          }}
        >
          © 2025 Vibe Consulting. Alle Rechte vorbehalten.
        </p>
      </div>
    </AbsoluteFill>
  );
};
