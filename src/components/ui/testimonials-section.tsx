"use client";

import { TestimonialSlider } from "./testimonial-slider";

// Testimonial data - angepasst für KI-Beratung
const reviews = [
  {
    id: 1,
    name: "Michael Schneider",
    affiliation: "Geschäftsführer, TechVentures GmbH",
    quote:
      "Die Zusammenarbeit mit KALO AI hat unsere Erwartungen übertroffen. Innerhalb von 8 Wochen konnten wir repetitive Prozesse vollständig automatisieren und unser Team kann sich jetzt auf strategische Aufgaben konzentrieren.",
    result: "45% Zeitersparnis",
    imageSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Dr. Anna Weber",
    affiliation: "COO, MedTech Solutions AG",
    quote:
      "Endlich ein Beratungsunternehmen, das nicht nur redet, sondern liefert. Die KI-Lösung läuft stabil und unser Team wurde hervorragend geschult. Der Support ist erstklassig.",
    result: "60% weniger manuelle Arbeit",
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Thomas Müller",
    affiliation: "Leiter Digitalisierung, Industrie-Werke Süd",
    quote:
      "Von der ersten Analyse bis zum Go-Live wurden wir professionell begleitet. Die Investition hat sich bereits nach 4 Monaten amortisiert. Absolute Empfehlung!",
    result: "ROI in 4 Monaten",
    imageSrc:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Sandra Hoffmann",
    affiliation: "CEO, Digital Retail Group",
    quote:
      "KALO AI hat uns gezeigt, wo KI wirklich Sinn macht - und wo nicht. Diese ehrliche Beratung hat uns vor Fehlinvestitionen bewahrt und den Fokus auf die richtigen Projekte gelenkt.",
    result: "3 Kernprozesse automatisiert",
    imageSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Markus Bergmann",
    affiliation: "CTO, FinServe GmbH",
    quote:
      "Die technische Expertise ist beeindruckend. Komplexe Integrationen wurden sauber umgesetzt und die Dokumentation ist vorbildlich. Unser Dev-Team war begeistert.",
    result: "Nahtlose Integration",
    imageSrc:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=120&fit=crop&q=80",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative z-10 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[#A0F0FF] text-sm sm:text-base font-medium uppercase tracking-wider mb-3">
            Kundenstimmen
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            Erfahren Sie, wie Unternehmen mit unserer KI-Beratung messbare Erfolge erzielen
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
          <TestimonialSlider reviews={reviews} />
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 text-center">
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">20+</p>
            <p className="text-white/50 text-xs sm:text-sm mt-1">Zufriedene Kunden</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">98%</p>
            <p className="text-white/50 text-xs sm:text-sm mt-1">Weiterempfehlung</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Ø 40%</p>
            <p className="text-white/50 text-xs sm:text-sm mt-1">Effizienzsteigerung</p>
          </div>
        </div>
      </div>
    </section>
  );
}
