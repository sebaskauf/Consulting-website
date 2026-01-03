"use client";

import HighlightCard from "@/components/ui/highlight-card";
import { GlassButton } from "@/components/ui/glass-button";
import {
  Lightbulb,
  Search,
  Users,
  Code,
  Rocket,
  HeadphonesIcon,
} from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      title: "KI-Beratung",
      description: "Gemeinsam analysieren wir Ihr Unternehmen und identifizieren Potenziale für KI-Lösungen, die echten Mehrwert schaffen und Ihre Prozesse nachhaltig optimieren.",
      icon: <Lightbulb className="w-5 h-5 sm:w-7 sm:h-7 text-white" />,
    },
    {
      title: "Prozessanalyse",
      description: "Intensive Analyse Ihrer bestehenden Geschäftsprozesse zur Identifikation der wichtigsten Automatisierungsmöglichkeiten für maximale Effizienzsteigerung.",
      icon: <Search className="w-5 h-5 sm:w-7 sm:h-7 text-white" />,
    },
    {
      title: "Intensiv-Workshop",
      description: "Gemeinsamer Workshop mit Ihrem Team, um die optimale KI-Strategie zu entwickeln und individuelle Lösungen für Ihre spezifischen Anforderungen zu erarbeiten.",
      icon: <Users className="w-5 h-5 sm:w-7 sm:h-7 text-white" />,
    },
    {
      title: "KI-Entwicklung",
      description: "Professionelle Entwicklung maßgeschneiderter KI-Lösungen mit modernsten Technologien, perfekt abgestimmt auf die Bedürfnisse Ihres Unternehmens und Ihrer Branche.",
      icon: <Code className="w-5 h-5 sm:w-7 sm:h-7 text-white" />,
    },
    {
      title: "Implementierung",
      description: "Nahtlose Integration der KI-Lösungen in Ihre bestehende IT-Infrastruktur mit minimalem Aufwand und maximaler Kompatibilität zu Ihren Systemen.",
      icon: <Rocket className="w-5 h-5 sm:w-7 sm:h-7 text-white" />,
    },
    {
      title: "Support & Updates",
      description: "Kontinuierlicher Support und regelmäßige Updates halten Ihre KI-Lösungen auf dem neuesten Stand der Technik und sichern langfristigen Erfolg und Wettbewerbsvorteile.",
      icon: <HeadphonesIcon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />,
    },
  ];

  return (
    <section id="leistungen" className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6" style={{ zIndex: 10 }}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
            Unsere{" "}
            <span className="bg-gradient-to-r from-[#40FF9F] via-[#70FFAF] to-[#5FFFC8] bg-clip-text text-transparent">
              Leistungen
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
            Von der ersten Idee bis zur erfolgreichen Implementierung -
            wir begleiten Sie auf jedem Schritt Ihrer KI-Transformation
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 lg:gap-5 place-items-center auto-rows-fr max-w-full">
          {services.map((service, index) => (
            <HighlightCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
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
                background: 'linear-gradient(135deg, rgba(64, 255, 159, 0.1), rgba(112, 255, 175, 0.1))',
                borderColor: 'rgba(112, 255, 175, 0.3)',
              }}
            >
              Kostenloses Beratungsgespräch vereinbaren
            </GlassButton>
          </a>
        </div>
      </div>
    </section>
  );
}
