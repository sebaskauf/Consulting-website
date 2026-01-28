"use client";

import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-invert prose-gray max-w-none space-y-8 text-gray-300">
            <p className="text-sm text-gray-500">Stand: Dezember 2024</p>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Verantwortlicher</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website und der App "HR Buddy" ist:
              </p>
              <p className="mt-2">
                Vibe Consulting<br />
                E-Mail: <a href="mailto:sebastian@skaile.de" className="text-[#A0F0FF] hover:underline">sebastian@skaile.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Übersicht der Datenverarbeitung</h2>
              <p>
                Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies für die Bereitstellung unserer
                Dienste erforderlich ist. Die Verarbeitung erfolgt ausschließlich auf Grundlage der gesetzlichen
                Bestimmungen (DSGVO, BDSG, TTDSG).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Datenverarbeitung bei HR Buddy</h2>
              <p>
                HR Buddy ist eine KI-gestützte Anwendung, die es ermöglicht, Cloud-Speicher zu verbinden und
                Fragen zu Ihren Dokumenten zu stellen.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">3.1 Erhobene Daten</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Account-Daten:</strong> E-Mail-Adresse, Name (bei Registrierung)</li>
                <li><strong>OAuth-Tokens:</strong> Zugangstokens für verbundene Dienste (Google Drive, Notion)</li>
                <li><strong>Dokument-Inhalte:</strong> Textinhalte Ihrer Dokumente werden als Embeddings (Vektorrepräsentationen) gespeichert, um Suchanfragen zu ermöglichen</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">3.2 Zweck der Verarbeitung</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Bereitstellung der HR Buddy Funktionalität</li>
                <li>Beantwortung von Fragen zu Ihren Dokumenten mittels KI</li>
                <li>Synchronisierung mit verbundenen Cloud-Diensten</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">3.3 Rechtsgrundlage</h3>
              <p>
                Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie
                zur Erfüllung des Nutzungsvertrags (Art. 6 Abs. 1 lit. b DSGVO).
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">3.4 Drittanbieter-Integrationen</h3>
              <p>
                Bei Verbindung mit Google Drive oder Notion werden Daten gemäß den Datenschutzrichtlinien
                dieser Anbieter verarbeitet. Wir greifen nur auf die von Ihnen freigegebenen Inhalte zu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Speicherdauer</h2>
              <p>
                Ihre Daten werden gespeichert, solange Ihr Account besteht. Bei Löschung Ihres Accounts werden
                alle personenbezogenen Daten einschließlich der Embeddings innerhalb von 30 Tagen gelöscht.
                OAuth-Tokens werden sofort widerrufen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Ihre Rechte</h2>
              <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li><strong>Auskunft:</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen</li>
                <li><strong>Berichtigung:</strong> Sie können die Berichtigung unrichtiger Daten verlangen</li>
                <li><strong>Löschung:</strong> Sie können die Löschung Ihrer Daten verlangen</li>
                <li><strong>Einschränkung:</strong> Sie können die Einschränkung der Verarbeitung verlangen</li>
                <li><strong>Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem gängigen Format erhalten</li>
                <li><strong>Widerruf:</strong> Sie können Ihre Einwilligung jederzeit widerrufen</li>
                <li><strong>Beschwerde:</strong> Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Datensicherheit</h2>
              <p>
                Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen
                Manipulation, Verlust oder unberechtigten Zugriff zu schützen. Unsere Sicherheitsmaßnahmen
                werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Hosting & Server</h2>
              <p>
                Unsere Dienste werden auf Servern innerhalb der EU gehostet. Eine Übermittlung in Drittländer
                findet nur statt, wenn dies zur Vertragserfüllung erforderlich ist oder Sie eingewilligt haben.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Cookies & Tracking</h2>
              <p>
                Wir verwenden nur technisch notwendige Cookies für die Funktionalität unserer Dienste.
                Es findet kein Tracking zu Werbezwecken statt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Kontakt</h2>
              <p>
                Bei Fragen zum Datenschutz erreichen Sie uns unter:<br />
                <a href="mailto:sebastian@skaile.de" className="text-[#A0F0FF] hover:underline">sebastian@skaile.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Änderungen</h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen
                oder bei Änderungen unserer Dienste anzupassen. Die aktuelle Version finden Sie stets auf dieser Seite.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
