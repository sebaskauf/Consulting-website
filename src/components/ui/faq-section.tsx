"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Wie lange dauert ein AI-Projekt?",
    answer: "Die Projektdauer variiert je nach Komplexität. Ein typisches AI-Projekt dauert 8-16 Wochen von der Analyse bis zum Go-Live. Wir arbeiten agil mit regelmäßigen Updates, sodass Sie den Fortschritt kontinuierlich sehen können.",
  },
  {
    question: "Was kostet eine AI-Implementierung?",
    answer: "Die Kosten hängen vom Projektumfang ab. Nach einem kostenlosen Erstgespräch erstellen wir ein maßgeschneidertes Angebot. Typische Projekte starten ab 15.000€. Wir bieten auch flexible Zahlungsmodelle und ROI-basierte Pricing-Optionen.",
  },
  {
    question: "Brauchen wir technisches Know-how?",
    answer: "Nein, das ist nicht notwendig. Wir übernehmen die gesamte technische Implementierung und schulen Ihr Team im Umgang mit den neuen AI-Tools. Unser Ziel ist es, die Technologie so benutzerfreundlich wie möglich zu gestalten.",
  },
  {
    question: "Wie sicher sind unsere Daten?",
    answer: "Datensicherheit hat höchste Priorität. Wir arbeiten DSGVO-konform, nutzen verschlüsselte Verbindungen und können AI-Lösungen auch on-premise oder in Ihrer Cloud-Umgebung implementieren. Alle Mitarbeiter sind zur Verschwiegenheit verpflichtet.",
  },
  {
    question: "Welche AI-Technologien nutzt ihr?",
    answer: "Wir arbeiten mit führenden AI-Plattformen wie OpenAI, Anthropic Claude, Google AI und Custom ML Models. Die Technologie-Auswahl hängt von Ihren spezifischen Anforderungen ab - wir sind technologieunabhängig und wählen immer die beste Lösung für Ihren Use Case.",
  },
  {
    question: "Bietet ihr auch Support nach dem Go-Live?",
    answer: "Ja, auf jeden Fall! Wir bieten verschiedene Support-Pakete an - von monatlichen Check-ins bis zu 24/7 Premium-Support. Die Betreuung nach dem Go-Live ist essentiell für den langfristigen Erfolg Ihrer AI-Lösung.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-10 bg-[#121220]/50 backdrop-blur-sm text-white py-20 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            Häufig gestellte Fragen
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Antworten auf die wichtigsten Fragen zu KI-Projekten
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left"
              >
                <span className="text-base sm:text-lg font-semibold pr-4 sm:pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
