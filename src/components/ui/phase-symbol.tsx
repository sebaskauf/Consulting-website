"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PhaseSymbolProps {
  phase: number; // 0-3 (for phases 1-4)
  color?: string;
  size?: "large" | "small"; // large for main display, small for preview
}

export function PhaseSymbol({ phase, color = "#FFFFFF", size = "large" }: PhaseSymbolProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const shapes = shapesRef.current.filter(Boolean);
    const count = phase + 1;

    // Animate in shapes on mount or phase change
    gsap.fromTo(
      shapes.slice(0, count),
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(1.7)",
        stagger: 0.08,
        delay: 0.1,
      }
    );
  }, [phase]);

  // Get positions for each phase - scaled based on size
  const getPositions = (phase: number): { x: number; y: number }[] => {
    const spacing = size === "large" ? 35 : 12; // larger spacing for big symbols

    switch (phase) {
      case 0: // 1 circle - centered
        return [{ x: 0, y: 0 }];

      case 1: // 2 diamonds - horizontal line
        return [
          { x: -spacing / 2, y: 0 },
          { x: spacing / 2, y: 0 },
        ];

      case 2: // 3 squares - triangle (1 top, 2 bottom)
        return [
          { x: 0, y: -spacing / 2 },
          { x: -spacing / 2, y: spacing / 2 },
          { x: spacing / 2, y: spacing / 2 },
        ];

      case 3: // 4 stars - diamond shape
        return [
          { x: 0, y: -spacing },
          { x: -spacing, y: 0 },
          { x: spacing, y: 0 },
          { x: 0, y: spacing },
        ];

      default:
        return [{ x: 0, y: 0 }];
    }
  };

  const positions = getPositions(phase);
  const count = phase + 1;

  // Get shape type for each phase
  const getShape = (phase: number) => {
    switch (phase) {
      case 0: return "circle";
      case 1: return "diamond";
      case 2: return "square";
      case 3: return "star";
      default: return "circle";
    }
  };

  const shapeType = getShape(phase);

  const renderShape = (type: string) => {
    const shapeSize = size === "large" ? 30 : 10;

    switch (type) {
      case "circle":
        return (
          <svg width={shapeSize * 2} height={shapeSize * 2} viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill={color} />
          </svg>
        );

      case "diamond":
        return (
          <svg width={shapeSize * 2} height={shapeSize * 2} viewBox="0 0 20 20">
            <path d="M10 2 L18 10 L10 18 L2 10 Z" fill={color} />
          </svg>
        );

      case "square":
        return (
          <svg width={shapeSize * 2} height={shapeSize * 2} viewBox="0 0 20 20">
            <rect x="3" y="3" width="14" height="14" fill={color} />
          </svg>
        );

      case "star":
        return (
          <svg width={shapeSize * 2.2} height={shapeSize * 2.2} viewBox="0 0 24 24">
            <path
              d="M12 2 L14.5 9.5 L22 9.5 L16 14.5 L18.5 22 L12 17 L5.5 22 L8 14.5 L2 9.5 L9.5 9.5 Z"
              fill={color}
            />
          </svg>
        );

      default:
        return null;
    }
  };

  const containerSize = size === "large"
    ? { width: "200px", height: "200px" }
    : { width: "60px", height: "60px" };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        ...containerSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) shapesRef.current[i] = el;
          }}
          style={{
            position: "absolute",
            transform: `translate(${positions[i]?.x || 0}px, ${positions[i]?.y || 0}px)`,
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: i < count ? 1 : 0,
            pointerEvents: "none",
          }}
        >
          {i < count && renderShape(shapeType)}
        </div>
      ))}
    </div>
  );
}
