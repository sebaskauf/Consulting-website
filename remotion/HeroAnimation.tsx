import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";
import React from "react";

export const HeroAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animationsparameter
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.5 },
  });

  const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [30, 60], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subtitleOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [60, 90], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Animierte Partikel/Punkte im Hintergrund
  const particles = Array.from({ length: 20 }, (_, i) => {
    const delay = i * 5;
    const particleOpacity = interpolate(frame, [delay, delay + 30], [0, 0.6], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const particleY = interpolate(
      frame,
      [delay, delay + 200],
      [height + 50, -50],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
    const particleX = ((i * 137) % width) + Math.sin(frame / 20 + i) * 20;

    return { x: particleX, y: particleY, opacity: particleOpacity, size: (i % 3) + 2 };
  });

  // Gradient-Animation
  const gradientRotation = interpolate(frame, [0, 300], [0, 360], {
    extrapolateRight: "clamp",
  });

  // Glow-Pulsation
  const glowIntensity = interpolate(
    Math.sin(frame / 15),
    [-1, 1],
    [0.3, 0.8]
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Animierter Gradient-Hintergrund */}
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          background: `conic-gradient(from ${gradientRotation}deg at 50% 50%,
            transparent 0deg,
            rgba(139, 92, 246, 0.1) 90deg,
            transparent 180deg,
            rgba(59, 130, 246, 0.1) 270deg,
            transparent 360deg)`,
        }}
      />

      {/* Partikel */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size * 3,
            height: p.size * 3,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#8B5CF6" : "#3B82F6",
            opacity: p.opacity,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Zentraler Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(139, 92, 246, ${glowIntensity * 0.3}) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Logo / Icon */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${logoScale})`,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 24,
            background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 ${40 * glowIntensity}px rgba(139, 92, 246, 0.5)`,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
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

      {/* Titel */}
      <div
        style={{
          position: "absolute",
          top: "52%",
          left: "50%",
          transform: `translate(-50%, ${titleY}px)`,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            margin: 0,
            letterSpacing: "-0.02em",
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          Vibe Consulting
        </h1>
      </div>

      {/* Untertitel */}
      <div
        style={{
          position: "absolute",
          top: "64%",
          left: "50%",
          transform: `translate(-50%, ${subtitleY}px)`,
          opacity: subtitleOpacity,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.7)",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          KI-Beratung der Zukunft
        </p>
      </div>

      {/* Untere Linie */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(frame, [120, 180], [0, 200], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
          height: 2,
          background: "linear-gradient(90deg, transparent, #8B5CF6, transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
