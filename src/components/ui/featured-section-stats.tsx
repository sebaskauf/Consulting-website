"use client";

import { useEffect, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

export default function FeaturedSectionStats() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const data = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 18 },
    { name: "Mar", value: 45 },
    { name: "Apr", value: 120 },
    { name: "Mai", value: 320 },
    { name: "Jun", value: 800 },
    { name: "Jul", value: 1800 },
    { name: "Aug", value: 3500 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Nur einmal triggern, dann nie wieder
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect(); // Observer komplett stoppen
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="relative z-10 w-full max-w-5xl mx-auto text-left py-16 sm:py-32 px-4 sm:px-6">
      {/* Glass Box Container */}
      <div
        className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">
          Messbare Erfolge durch strategische KI-Beratung.
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl mb-8 sm:mb-12">
          Wir identifizieren die optimalen KI-Anwendungen für Ihre Prozesse - unsere Kunden erleben Zeitersparnisse von bis zu 80% innerhalb der ersten drei Monate.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-8">
          <div className="text-center sm:text-left">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">20+</p>
            <p className="text-white/60 text-xs sm:text-sm md:text-base mt-1 leading-tight">Erfolgreich abgeschlossene Projekte</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">150+</p>
            <p className="text-white/60 text-xs sm:text-sm md:text-base mt-1 leading-tight">Automatisierte Prozesse</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">bis zu 80%</p>
            <p className="text-white/60 text-xs sm:text-sm md:text-base mt-1 leading-tight">Zeitersparnis</p>
          </div>
        </div>

        {/* Area Chart - inside the box */}
        <div className="w-full h-40 sm:h-48 mt-6 sm:mt-10 pointer-events-none -mb-2">
          {hasAnimated && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#70FFAF" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#70FFAF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#70FFAF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorGreen)"
                  isAnimationActive={true}
                  animationDuration={2000}
                  animationEasing="ease-out"
                  animationBegin={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
}
