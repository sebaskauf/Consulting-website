"use client";

import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function UeberUnsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Über Uns</h1>
          <p className="text-gray-400 text-lg mb-12">
            Ihr Partner für KI-Transformation und Prozessautomatisierung
          </p>

          <div className="space-y-12">
            {/* Vision */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Unsere Vision</h2>
              <p className="text-gray-300 leading-relaxed">
                Wir bei Vibe Consulting glauben daran, dass künstliche Intelligenz nicht nur großen
                Konzernen vorbehalten sein sollte. Unsere Mission ist es, KI-Lösungen zugänglich,
                verständlich und nutzbar für Unternehmen jeder Größe zu machen – von innovativen
                Startups bis hin zu etablierten Mittelständlern.
              </p>
            </section>

            {/* Was wir tun */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Was wir tun</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-[#A0F0FF] mb-2">KI-Beratung</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Wir analysieren Ihre Geschäftsprozesse und identifizieren Potenziale für
                    KI-gestützte Optimierungen. Von der Strategie bis zur Roadmap.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#D4C5FF] mb-2">Prozessautomatisierung</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Wir automatisieren repetitive Aufgaben und schaffen effiziente Workflows,
                    die Ihrem Team mehr Zeit für wertschöpfende Tätigkeiten geben.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#FF7A98] mb-2">Individuelle KI-Lösungen</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Wir entwickeln maßgeschneiderte KI-Anwendungen, die exakt auf Ihre
                    Anforderungen zugeschnitten sind – keine Standardlösungen von der Stange.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#70FFAF] mb-2">Implementierung & Support</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Wir begleiten Sie von der Konzeption über die Entwicklung bis zum Go-Live
                    und darüber hinaus mit kontinuierlichem Support.
                  </p>
                </div>
              </div>
            </section>

            {/* Unsere Werte */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Unsere Werte</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#A0F0FF] mt-2 shrink-0" />
                  <div>
                    <h3 className="font-medium text-white">Transparenz</h3>
                    <p className="text-gray-400 text-sm">
                      Klare Kommunikation, ehrliche Einschätzungen und keine versteckten Kosten.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#D4C5FF] mt-2 shrink-0" />
                  <div>
                    <h3 className="font-medium text-white">Datenschutz</h3>
                    <p className="text-gray-400 text-sm">
                      DSGVO-konform und mit EU-gehosteten KI-Modellen – Ihre Daten bleiben in Europa.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#FF7A98] mt-2 shrink-0" />
                  <div>
                    <h3 className="font-medium text-white">Partnerschaft</h3>
                    <p className="text-gray-400 text-sm">
                      Wir sehen uns als Ihr Partner, nicht als externer Dienstleister. Ihr Erfolg ist unser Erfolg.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#70FFAF] mt-2 shrink-0" />
                  <div>
                    <h3 className="font-medium text-white">Innovation</h3>
                    <p className="text-gray-400 text-sm">
                      Wir bleiben am Puls der Zeit und integrieren neueste Technologien in unsere Lösungen.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Kontakt CTA */}
            <section className="text-center py-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                Bereit für Ihre KI-Transformation?
              </h2>
              <p className="text-gray-400 mb-6">
                Lassen Sie uns gemeinsam herausfinden, wie KI Ihr Unternehmen voranbringen kann.
              </p>
              <a
                href="/kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 text-white font-medium"
              >
                Kontakt aufnehmen
              </a>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
