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
            <p className="text-sm text-gray-500">Stand: Januar 2026</p>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Verantwortlicher</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="mt-2">
                <strong className="text-white">Vibe Consulting</strong><br />
                Sebastian Kauffmann<br />
                Namedorfstraße 5<br />
                30539 Hannover<br />
                Deutschland<br /><br />
                E-Mail: <a href="mailto:support@skaile.de" className="text-[#A0F0FF] hover:underline">support@skaile.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Übersicht der Datenverarbeitung</h2>
              <p>
                Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies für die Bereitstellung unserer
                Dienste erforderlich ist. Die Verarbeitung erfolgt ausschließlich auf Grundlage der gesetzlichen
                Bestimmungen (DSGVO, BDSG, TTDSG) sowie unter Berücksichtigung der KI-Verordnung (AI Act).
              </p>
              <h3 className="text-lg font-medium text-white mt-6 mb-3">2.1 Grundsätze unserer Datenverarbeitung</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Rechtmäßigkeit:</strong> Jede Verarbeitung basiert auf einer gültigen Rechtsgrundlage</li>
                <li><strong>Zweckbindung:</strong> Daten werden nur für festgelegte, legitime Zwecke verarbeitet</li>
                <li><strong>Datenminimierung:</strong> Wir erheben nur die notwendigen Daten</li>
                <li><strong>Transparenz:</strong> Sie werden über alle Verarbeitungen informiert</li>
                <li><strong>Privacy by Design:</strong> Datenschutz ist in all unseren Systemen von Anfang an integriert</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Hosting und Server</h2>
              <p>
                <strong className="text-white">Unsere Dienste werden ausschließlich auf Servern innerhalb der Europäischen Union gehostet.</strong>
              </p>
              <p className="mt-3">
                Wir setzen bewusst auf EU-basierte Infrastruktur, um die Einhaltung der DSGVO zu gewährleisten.
                Eine Übermittlung personenbezogener Daten in Drittländer (außerhalb der EU/EWR) findet nicht statt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. KI-Dienste und Datenverarbeitung</h2>
              <p>
                Wir bieten KI-gestützte Beratungs- und Automatisierungsdienstleistungen an. Dabei beachten wir
                folgende Grundsätze:
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">4.1 EU-gehostete KI-Modelle</h3>
              <p>
                <strong className="text-white">Wir verwenden ausschließlich KI-Modelle, die auf EU-Servern gehostet werden.</strong>{" "}
                Dies stellt sicher, dass Ihre Daten die Europäische Union nicht verlassen und vollständig
                DSGVO-konform verarbeitet werden.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">4.2 Zweck der KI-Verarbeitung</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Analyse und Optimierung von Geschäftsprozessen</li>
                <li>Automatisierung von Workflows</li>
                <li>Beantwortung von Kundenanfragen (bei entsprechenden Projekten)</li>
                <li>Dokumentenanalyse und -verarbeitung</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">4.3 KI-Verordnung (AI Act) Compliance</h3>
              <p>
                Gemäß der EU KI-Verordnung (Verordnung (EU) 2024/1689) kennzeichnen wir KI-generierte Inhalte
                entsprechend und führen bei Hochrisiko-Anwendungen die erforderlichen Konformitätsbewertungen durch.
                Unsere KI-Systeme werden regelmäßig auf Fairness, Transparenz und Sicherheit geprüft.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">4.4 Rechtsgrundlage</h3>
              <p>
                Die Verarbeitung erfolgt auf Grundlage von:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)</li>
                <li>Erfüllung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO)</li>
                <li>Berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO) – sofern keine überwiegenden Interessen entgegenstehen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Kontaktaufnahme</h2>
              <p>
                Wenn Sie uns per E-Mail oder über ein Kontaktformular kontaktieren, werden Ihre Angaben
                zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li><strong>Erhobene Daten:</strong> Name, E-Mail-Adresse, Nachrichteninhalt, ggf. Telefonnummer</li>
                <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) oder lit. f DSGVO (berechtigtes Interesse)</li>
                <li><strong>Speicherdauer:</strong> Bis zur abschließenden Bearbeitung, bei Geschäftsbeziehung gemäß gesetzlicher Aufbewahrungsfristen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Speicherdauer</h2>
              <p>
                Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die jeweiligen Zwecke
                erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Kontaktanfragen: Bis zur abschließenden Bearbeitung, maximal 3 Jahre</li>
                <li>Vertragsdaten: 10 Jahre (handels- und steuerrechtliche Aufbewahrungspflichten)</li>
                <li>Projektdaten: Nach Projektabschluss gemäß vertraglicher Vereinbarung</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Ihre Rechte</h2>
              <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li><strong>Auskunft (Art. 15 DSGVO):</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen</li>
                <li><strong>Berichtigung (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger Daten verlangen</li>
                <li><strong>Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer Daten verlangen</li>
                <li><strong>Einschränkung (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung verlangen</li>
                <li><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können Ihre Daten in einem gängigen Format erhalten</li>
                <li><strong>Widerspruch (Art. 21 DSGVO):</strong> Sie können der Verarbeitung widersprechen</li>
                <li><strong>Widerruf (Art. 7 Abs. 3 DSGVO):</strong> Sie können Ihre Einwilligung jederzeit widerrufen</li>
                <li><strong>Beschwerde (Art. 77 DSGVO):</strong> Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren</li>
              </ul>
              <p className="mt-4">
                <strong className="text-white">Zuständige Aufsichtsbehörde:</strong><br />
                Die Landesbeauftragte für den Datenschutz Niedersachsen<br />
                Prinzenstraße 5, 30159 Hannover
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Datensicherheit</h2>
              <p>
                Wir setzen technische und organisatorische Sicherheitsmaßnahmen (TOMs) ein, um Ihre Daten gegen
                Manipulation, Verlust oder unberechtigten Zugriff zu schützen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Verschlüsselte Datenübertragung (TLS/SSL)</li>
                <li>Verschlüsselte Datenspeicherung</li>
                <li>Regelmäßige Sicherheitsupdates</li>
                <li>Zugriffskontrolle und Berechtigungsmanagement</li>
                <li>Regelmäßige Sicherheitsaudits</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Cookies</h2>
              <p>
                Wir verwenden nur technisch notwendige Cookies für die Funktionalität unserer Website.
                Es findet kein Tracking zu Werbezwecken statt. Analyse-Cookies werden nur mit Ihrer
                ausdrücklichen Einwilligung gesetzt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Kontakt für Datenschutzanfragen</h2>
              <p>
                Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte erreichen Sie uns unter:<br />
                <a href="mailto:support@skaile.de" className="text-[#A0F0FF] hover:underline">support@skaile.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Änderungen dieser Datenschutzerklärung</h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen
                (insbesondere bei Änderungen der DSGVO oder der KI-Verordnung) oder bei Änderungen unserer
                Dienste anzupassen. Die aktuelle Version finden Sie stets auf dieser Seite.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
