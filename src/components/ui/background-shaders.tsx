"use client";

import { Warp } from "@paper-design/shaders-react";

interface BackgroundShadersProps {
  colors?: string[];
  className?: string;
}

export default function BackgroundShaders({
  colors = ["#E0E0E0", "#FFFFFF", "#C0C0C0", "#F5F5F5"],
  className = ""
}: BackgroundShadersProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Warp
        style={{ width: "100%", height: "100%" }}
        proportion={0.35}
        softness={1.2}
        distortion={0.15}
        swirl={0.6}
        swirlIterations={8}
        shape="checks"
        shapeScale={0.15}
        scale={1}
        rotation={0}
        speed={0.5}
        colors={colors}
      />
    </div>
  );
}
