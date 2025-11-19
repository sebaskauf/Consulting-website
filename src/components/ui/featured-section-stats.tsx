"use client";

import { useEffect, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

export default function FeaturedSectionStats() {
  const [animationKey, setAnimationKey] = useState(0);
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
        if (entry.isIntersecting) {
          setAnimationKey(prev => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 w-full max-w-6xl mx-auto text-left py-32 px-6">
      <div className="px-4">
        <h3 className="text-lg sm:text-xl lg:text-4xl font-medium text-white mb-4">
          Messbare Erfolge durch strategische KI-Beratung.
        </h3>
        <p className="text-base sm:text-lg text-white/70 max-w-3xl mb-16">
          Wir identifizieren die optimalen KI-Anwendungen für Ihre Prozesse - unsere Kunden erleben Zeitersparnisse von bis zu 80% innerhalb der ersten drei Monate.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
          <div>
            <p className="text-3xl font-medium text-white">20+</p>
            <p className="text-white/60 text-md">Erfolgreich abgeschlossene Projekte</p>
          </div>
          <div>
            <p className="text-3xl font-medium text-white">150+</p>
            <p className="text-white/60 text-md">Automatisierte Prozesse</p>
          </div>
          <div>
            <p className="text-3xl font-medium text-white">bis zu 80%</p>
            <p className="text-white/60 text-md">Zeitersparnis</p>
          </div>
        </div>
      </div>

      {/* Area Chart */}
      <div className="w-full h-48 mt-8 pointer-events-none">
        {animationKey > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} key={animationKey}>
              <defs>
                <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#70FFAF" stopOpacity={0.6} />
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
    </section>
  );
}
