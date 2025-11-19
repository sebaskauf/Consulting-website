"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import InfiniteHero from "@/components/ui/infinite-hero";
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";
import LiquidEther from "@/components/ui/liquid-ether";
import Navbar from "@/components/ui/navbar";
import { GlassButton } from "@/components/ui/glass-button";
import { PhaseNumber } from "@/components/ui/phase-number";
import { FAQSection } from "@/components/ui/faq-section";
import { Footer } from "@/components/ui/footer";
import { ServicesSection } from "@/components/ui/services-section";
import FeaturedSectionStats from "@/components/ui/featured-section-stats";
import { ContactSection } from "@/components/ui/contact-section";

const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });

// Phase colors for the big numbers
const phaseNumberColors = {
  0: '#A0F0FF',  // Helleres Cyan (NEU)
  1: '#D4C5FF',  // Helleres Lila
  2: '#FF7A98',  // Warmes Rot/Pink (NEU)
  3: '#70FFAF'   // Grün
};

const consultingProcessSections = [
  {
    id: "erstgespraech",
    leftLabel: <PhaseNumber number={1} color={phaseNumberColors[0]} />,
    title: (
      <>
        <span className="hidden sm:inline">Erstgespräch & Analyse</span>
        <span className="sm:hidden">Erstgespräch<br/>& Analyse</span>
      </>
    ),
    rightLabel: "Kennenlernen",
    footer: "Wir lernen Ihr Unternehmen kennen und analysieren Ihre Prozesse und Herausforderungen",
  },
  {
    id: "workshop",
    leftLabel: <PhaseNumber number={2} color={phaseNumberColors[1]} />,
    title: (
      <>
        <span className="hidden sm:inline">Workshop & Identifikation</span>
        <span className="sm:hidden">Workshop<br/>& Identifikation</span>
      </>
    ),
    rightLabel: "Strategie",
    footer: "Gemeinsam identifizieren wir die besten Automationsmöglichkeiten für Ihr Business",
  },
  {
    id: "entwicklung",
    leftLabel: <PhaseNumber number={3} color={phaseNumberColors[2]} />,
    title: (
      <>
        <span className="hidden sm:inline">Entwicklung & Updates</span>
        <span className="sm:hidden">Entwicklung<br/>& Updates</span>
      </>
    ),
    rightLabel: "Umsetzung",
    footer: "Transparente Entwicklung mit regelmäßigen Updates zum aktuellen Stand",
  },
  {
    id: "implementierung",
    leftLabel: <PhaseNumber number={4} color={phaseNumberColors[3]} />,
    title: (
      <>
        <span className="hidden sm:inline">Implementierung & Go-Live</span>
        <span className="sm:hidden">Implementierung<br/>& Go-Live</span>
      </>
    ),
    rightLabel: "Launch",
    footer: "Erfolgreiche Integration in Ihre bestehenden Systeme und Go-Live",
  },
];

export default function Home() {
  // Phase color palettes - Cyan-Blau als Grundfarbe
  const phaseColors = {
    // Phase 0: Helleres Cyan/Blau als Grundfarbe (NEU)
    0: ['#80E8FF', '#A0F0FF', '#90D8FF', '#B0E8FF', '#88DCFF', '#A8F5FF', '#95E0FF'],
    // Phase 1: Helleres Lila/Purple
    1: ['#C8B3FF', '#D4C5FF', '#BFA8FF', '#E0D5FF', '#B89FFF', '#DCC8FF', '#C0AAFF'],
    // Phase 2: Warmes Rot/Pink (NEU für Umsetzung)
    2: ['#FF6B88', '#FF7A98', '#FF5578', '#FF8AA8', '#FF4068', '#FFA0B8', '#FF6080'],
    // Phase 3: Edles Grün mit Blau-Grün Akzenten
    3: ['#40FF9F', '#70FFAF', '#50FFAF', '#60D8C8', '#5FFFC8', '#48E8D0', '#70FFD8']
  };

  // Beams Light colors for each phase
  const beamsLightColors = {
    0: '#A0E8FF',    // Helleres Cyan für Hero/Phase 0 (NEU)
    1: '#D4C5FF',    // Helleres Lila für Phase 1
    2: '#FF7A98',    // Warmes Rot/Pink für Phase 2 (NEU)
    3: '#70FFD0'     // Grün-Türkis für Phase 3
  };

  const [liquidColors, setLiquidColors] = useState(phaseColors[0]);
  const [beamsColor, setBeamsColor] = useState(beamsLightColors[0]);

  const handleScrollIndexChange = (index: number) => {
    // Directly set colors based on current phase
    const phaseIndex = Math.min(3, Math.max(0, index)) as 0 | 1 | 2 | 3;
    setLiquidColors(phaseColors[phaseIndex]);
    setBeamsColor(beamsLightColors[phaseIndex]);
  };

  return (
    <main className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* Background Layer 1: Beams - visible on all pages */}
      <div className="fixed inset-0 z-0 opacity-65 mix-blend-lighten pointer-events-none">
        <Beams
          lightColor={beamsColor}
          beamWidth={2.5}
          beamHeight={18}
          beamNumber={15}
          speed={2.5}
          noiseIntensity={2}
          scale={0.15}
          rotation={43}
        />
      </div>

      {/* Background Layer 2: LiquidEther (overlay) */}
      <div className="fixed inset-0 z-0">
        <LiquidEther
          colors={liquidColors}
          mouseForce={0}
          cursorSize={0}
          resolution={0.3}
          autoDemo={true}
          autoSpeed={0.6}
          autoIntensity={6.5}
          autoResumeDelay={0}
          autoRampDuration={0.8}
          dt={0.018}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Vignette overlay - leichtere Abdunklung für bessere Farbverbreitung */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      {/* Hero Section with Infinite Hero */}
      <InfiniteHero />

      {/* Services Section */}
      <ServicesSection />

      {/* Full Screen Scroll FX - Beratungsprozess */}
      <div id="prozess" className="relative z-10">
        <FullScreenScrollFX
          sections={consultingProcessSections}
          header={
            <div className="relative inline-block">
              {/* Desktop Header */}
              <h2 className="hidden sm:block text-3xl md:text-4xl font-semibold tracking-tight">
                Dein Weg zur{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">KI-Transformation</span>
                  {/* Animated underline - matches current phase color */}
                  <span
                    className="absolute bottom-0 left-0 w-full h-[3px]"
                    style={{
                      background: beamsColor,
                      animation: "slideIn 1s ease-out forwards",
                      transformOrigin: "left",
                    }}
                  />
                  {/* Glow effect */}
                  <span
                    className="absolute bottom-0 left-0 w-full h-[3px] blur-sm opacity-50"
                    style={{
                      background: beamsColor,
                      animation: "slideIn 1s ease-out forwards",
                      transformOrigin: "left",
                    }}
                  />
                </span>
              </h2>

              {/* Mobile Header - 2 lines */}
              <h2 className="sm:hidden text-2xl font-semibold tracking-tight text-center">
                <div>DEIN WEG ZUR KI-</div>
                <div className="relative inline-block mt-1">
                  <span className="relative z-10">TRANSFORMATION</span>
                  {/* Animated underline - matches current phase color */}
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px]"
                    style={{
                      background: beamsColor,
                      animation: "slideIn 1s ease-out forwards",
                      transformOrigin: "left",
                    }}
                  />
                </div>
              </h2>

              <style jsx>{`
                @keyframes slideIn {
                  from {
                    transform: scaleX(0);
                  }
                  to {
                    transform: scaleX(1);
                  }
                }
              `}</style>
            </div>
          }
          showProgress
          durations={{ change: 0.7, snap: 800 }}
          onIndexChange={handleScrollIndexChange}
          colors={{
            text: "rgba(255,255,255,0.95)",
            overlay: "rgba(0,0,0,0.3)",
            pageBg: "transparent",
            stageBg: "transparent",
          }}
        />
      </div>

      {/* Stats Section */}
      <FeaturedSectionStats />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
