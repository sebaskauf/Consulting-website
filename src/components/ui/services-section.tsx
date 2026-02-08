"use client";

import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { GlassButton } from "@/components/ui/glass-button";
import {
  Lightbulb,
  Search,
  Target,
  Code,
  HeadphonesIcon,
} from "lucide-react";

interface ServiceItem extends CardStackItem {
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    id: 1,
    tag: "Phase 1",
    title: "KI-Workshop",
    description: "Wir analysieren Ihr Unternehmen vor Ort, identifizieren Pain Points und Zeitfresser in allen Abteilungen. Durch Gespräche mit Mitarbeitern auf jeder Ebene decken wir Optimierungspotenziale auf.",
    icon: <Lightbulb className="w-6 h-6 text-[#70FFAF]" />,
  },
  {
    id: 2,
    tag: "Phase 2",
    title: "Prozessanalyse",
    description: "Basierend auf dem Workshop identifizieren wir Quick Wins für schnellen Mehrwert sowie größere Projekte mit maximalem Impact. Wir erstellen eine detaillierte Übersicht aller Arbeitsabläufe.",
    icon: <Search className="w-6 h-6 text-[#70FFAF]" />,
  },
  {
    id: 3,
    tag: "Phase 3",
    title: "Strategieentwicklung",
    description: "Wir entwickeln einen maßgeschneiderten Plan für Ihre KI-Integration. Sie erfahren genau, an welchen Stellen KI den größten Mehrwert schafft und wie die Implementierung optimal erfolgt.",
    icon: <Target className="w-6 h-6 text-[#70FFAF]" />,
  },
  {
    id: 4,
    tag: "Phase 4",
    title: "Entwicklung & Implementierung",
    description: "Professionelle Entwicklung Ihrer KI-Lösungen mit modernsten Technologien. Nahtlose Integration in Ihre bestehende IT-Infrastruktur mit regelmäßigen Updates zum Projektfortschritt.",
    icon: <Code className="w-6 h-6 text-[#70FFAF]" />,
  },
  {
    id: 5,
    tag: "Langfristig",
    title: "Support & Weiterentwicklung",
    description: "Kontinuierlicher Support und regelmäßige Optimierungen halten Ihre KI-Lösungen auf dem neuesten Stand. Wir begleiten Sie langfristig bei der Weiterentwicklung Ihrer Automatisierungen.",
    icon: <HeadphonesIcon className="w-6 h-6 text-[#70FFAF]" />,
  },
];

export function ServicesSection() {
  return (
    <section id="leistungen" className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
            Unsere{" "}
            <span className="bg-gradient-to-r from-[#50E8A8] via-[#70FFAF] to-[#60D8B8] bg-clip-text text-transparent">
              Leistungen
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
            Von der ersten Analyse bis zur erfolgreichen Implementierung -
            wir begleiten Sie auf jedem Schritt Ihrer KI-Transformation
          </p>
        </div>

        {/* Card Stack */}
        <div className="w-full">
          <CardStack
            items={services}
            initialIndex={0}
            autoAdvance
            intervalMs={4000}
            pauseOnHover
            showDots
            cardWidth={480}
            cardHeight={300}
            overlap={0.52}
            spreadDeg={42}
            activeScale={1.02}
            inactiveScale={0.92}
            renderCard={(item, { active }) => (
              <div
                className="relative h-full w-full p-6 sm:p-8 flex flex-col transition-all duration-300 rounded-2xl overflow-hidden"
                style={{
                  background: active
                    ? 'linear-gradient(145deg, rgba(112, 255, 175, 0.08) 0%, rgba(10, 20, 15, 0.95) 40%, rgba(8, 18, 12, 0.98) 100%)'
                    : 'linear-gradient(145deg, rgba(112, 255, 175, 0.04) 0%, rgba(12, 22, 18, 0.92) 40%, rgba(10, 20, 14, 0.95) 100%)',
                  border: active
                    ? '1px solid rgba(112, 255, 175, 0.3)'
                    : '1px solid rgba(112, 255, 175, 0.1)',
                  boxShadow: active
                    ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(112, 255, 175, 0.08), inset 0 1px 0 rgba(112, 255, 175, 0.1)'
                    : '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Icon */}
                <div className="mb-4">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(112, 255, 175, 0.12), rgba(112, 255, 175, 0.04))',
                      border: '1px solid rgba(112, 255, 175, 0.18)',
                    }}
                  >
                    {(item as ServiceItem).icon}
                  </div>
                </div>

                {/* Tag */}
                {item.tag && (
                  <div className="mb-3">
                    <span
                      className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(112, 255, 175, 0.08)',
                        color: '#70FFAF',
                        border: '1px solid rgba(112, 255, 175, 0.15)',
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/65 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            )}
          />
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 sm:mt-20 px-4">
          <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wide mb-4">
            Bereit für die Zukunft?
          </p>
          <a href="/kontakt" className="inline-block">
            <GlassButton
              size="lg"
              contentClassName="font-semibold tracking-wide"
              style={{
                background: 'linear-gradient(135deg, rgba(112, 255, 175, 0.1), rgba(112, 255, 175, 0.05))',
                borderColor: 'rgba(112, 255, 175, 0.3)',
              }}
            >
              In 30 Min. Potenziale entdecken
            </GlassButton>
          </a>
        </div>
      </div>
    </section>
  );
}
