"use client";

import { PhaseSymbol } from "./phase-symbol";

interface PhaseSymbolDisplayProps {
  currentPhase: number; // 0-3
  totalPhases: number;
  colors: Record<number, string>;
}

export function PhaseSymbolDisplay({ currentPhase, totalPhases, colors }: PhaseSymbolDisplayProps) {
  const nextPhase = currentPhase < totalPhases - 1 ? currentPhase + 1 : null;

  return (
    <>
      {/* Main large symbol - positioned in left area */}
      <div
        style={{
          position: "fixed",
          left: "4rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 100,
          pointerEvents: "none",
        }}
      >
        <PhaseSymbol phase={currentPhase} color={colors[currentPhase]} size="large" />
      </div>

      {/* Small preview symbol - positioned bottom left */}
      {nextPhase !== null && (
        <div
          style={{
            position: "fixed",
            left: "2rem",
            bottom: "6rem",
            zIndex: 100,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        >
          <PhaseSymbol phase={nextPhase} color={colors[nextPhase]} size="small" />
        </div>
      )}
    </>
  );
}
