"use client";

import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function AGBPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

          <div className="prose prose-invert prose-gray max-w-none space-y-8 text-gray-300">
            <p className="text-sm text-gray-500">Stand: Januar 2026</p>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Geltungsbereich</h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen Vibe Consulting
                (Sebastian Kauffmann, Namedorfstraße 5, 30539 Hannover) – nachfolgend „Anbieter" – und dem
                Kunden über Beratungs-, Entwicklungs- und Implementierungsdienstleistungen im Bereich
                Künstliche Intelligenz und Prozessautomatisierung.
              </p>
              <p className="mt-3">
                Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Kunden
                werden nur dann Vertragsbestandteil, wenn und soweit der Anbieter ihrer Geltung
                ausdrücklich schriftlich zugestimmt hat.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Leistungsbeschreibung</h2>
              <p>Der Anbieter erbringt folgende Dienstleistungen:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li><strong>KI-Beratung:</strong> Analyse von Geschäftsprozessen, Identifikation von Automatisierungspotenzialen, Strategieentwicklung</li>
                <li><strong>Prozessautomatisierung:</strong> Entwicklung und Implementierung automatisierter Workflows</li>
                <li><strong>Individuelle KI-Lösungen:</strong> Entwicklung maßgeschneiderter KI-Anwendungen nach Kundenanforderungen</li>
                <li><strong>Implementierung:</strong> Integration von KI-Lösungen in bestehende Systeme</li>
                <li><strong>Support & Wartung:</strong> Laufende Betreuung und Weiterentwicklung</li>
              </ul>
              <p className="mt-3">
                Der konkrete Leistungsumfang ergibt sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Vertragsschluss</h2>
              <p>
                Die Darstellung der Dienstleistungen auf der Website stellt kein rechtlich bindendes Angebot
                dar, sondern eine unverbindliche Aufforderung an den Kunden, Leistungen anzufragen.
              </p>
              <p className="mt-3">
                Der Vertrag kommt zustande durch:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Unterzeichnung eines Angebots durch beide Parteien, oder</li>
                <li>Schriftliche Auftragsbestätigung durch den Anbieter, oder</li>
                <li>Beginn der Leistungserbringung nach ausdrücklicher Zustimmung des Kunden</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Mitwirkungspflichten des Kunden</h2>
              <p>Der Kunde verpflichtet sich zur Mitwirkung, insbesondere:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Rechtzeitige Bereitstellung aller für die Leistungserbringung erforderlichen Informationen und Dokumente</li>
                <li>Benennung eines verantwortlichen Ansprechpartners</li>
                <li>Zeitnahe Prüfung und Freigabe von Zwischenergebnissen</li>
                <li>Bereitstellung notwendiger Zugänge zu Systemen und Daten</li>
                <li>Einholung erforderlicher Genehmigungen (z.B. Betriebsrat, Datenschutz)</li>
              </ul>
              <p className="mt-3">
                Verzögerungen aufgrund fehlender Mitwirkung des Kunden führen zur entsprechenden
                Verlängerung vereinbarter Fristen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. KI-spezifische Bestimmungen</h2>

              <h3 className="text-lg font-medium text-white mt-4 mb-3">5.1 KI-generierte Ergebnisse</h3>
              <p>
                Bei der Nutzung von KI-Systemen ist zu beachten:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>KI-generierte Ergebnisse können Fehler enthalten und sollten vom Kunden überprüft werden</li>
                <li>Die Ergebnisse basieren auf den bereitgestellten Daten und sind nur so gut wie diese</li>
                <li>KI-Empfehlungen ersetzen keine professionelle Beratung (rechtlich, medizinisch, steuerlich)</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">5.2 Datenschutz & EU-Hosting</h3>
              <p>
                <strong className="text-white">Wir setzen ausschließlich EU-gehostete KI-Modelle ein.</strong>{" "}
                Kundendaten verlassen nicht die Europäische Union. Die Verarbeitung erfolgt vollständig
                DSGVO-konform. Details finden Sie in unserer{" "}
                <a href="/datenschutz" className="text-[#A0F0FF] hover:underline">Datenschutzerklärung</a>.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">5.3 KI-Verordnung (AI Act)</h3>
              <p>
                Der Anbieter hält die Anforderungen der EU KI-Verordnung (Verordnung (EU) 2024/1689) ein,
                insbesondere hinsichtlich:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Kennzeichnung KI-generierter Inhalte</li>
                <li>Transparenz über den Einsatz von KI-Systemen</li>
                <li>Risikobewertung bei Hochrisiko-Anwendungen</li>
                <li>Dokumentation und Nachvollziehbarkeit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Vergütung und Zahlungsbedingungen</h2>
              <p>
                Die Vergütung richtet sich nach dem vereinbarten Angebot. Sofern nicht anders vereinbart, gelten:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Projektbasierte Vergütung: Zahlung gemäß vereinbartem Meilensteinplan</li>
                <li>Stundenbasierte Vergütung: Monatliche Abrechnung der geleisteten Stunden</li>
                <li>Zahlungsziel: 14 Tage nach Rechnungsstellung</li>
              </ul>
              <p className="mt-3">
                Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Nutzungsrechte und Urheberrecht</h2>
              <p>
                Der Kunde erhält nach vollständiger Zahlung das nicht-ausschließliche, zeitlich unbefristete
                Nutzungsrecht an den entwickelten Lösungen für den vereinbarten Zweck.
              </p>
              <p className="mt-3">
                Der Anbieter behält das Recht, allgemeine Methoden, Konzepte und Techniken, die während
                des Projekts entwickelt wurden, auch für andere Kunden zu nutzen, soweit diese keine
                vertraulichen Informationen des Kunden enthalten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Vertraulichkeit</h2>
              <p>
                Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erhaltenen
                vertraulichen Informationen geheim zu halten und nicht an Dritte weiterzugeben.
                Diese Verpflichtung gilt auch über das Vertragsende hinaus fort.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Haftung</h2>
              <p>
                Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Bei leichter
                Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten
                (Kardinalpflichten), begrenzt auf den vorhersehbaren, vertragstypischen Schaden.
              </p>
              <p className="mt-3">
                Der Anbieter haftet nicht für:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Schäden, die durch fehlerhafte KI-Ergebnisse entstehen, soweit der Kunde diese nicht überprüft hat</li>
                <li>Entgangenen Gewinn oder indirekte Schäden bei leichter Fahrlässigkeit</li>
                <li>Schäden durch vom Kunden bereitgestellte fehlerhafte Daten</li>
              </ul>
              <p className="mt-3">
                Die Haftungsbeschränkungen gelten nicht für Schäden aus der Verletzung von Leben,
                Körper oder Gesundheit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Kündigung</h2>
              <p>
                Sofern nicht anders vereinbart, können beide Parteien den Vertrag mit einer Frist von
                4 Wochen zum Monatsende kündigen. Das Recht zur außerordentlichen Kündigung aus
                wichtigem Grund bleibt unberührt.
              </p>
              <p className="mt-3">
                Bei Kündigung sind bereits erbrachte Leistungen zu vergüten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Änderungen der AGB</h2>
              <p>
                Der Anbieter behält sich vor, diese AGB zu ändern. Änderungen werden dem Kunden
                per E-Mail mitgeteilt. Widerspricht der Kunde nicht innerhalb von 4 Wochen nach
                Zugang der Änderungsmitteilung, gelten die geänderten AGB als genehmigt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">12. Schlussbestimmungen</h2>
              <p>
                Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
              </p>
              <p className="mt-3">
                Gerichtsstand für alle Streitigkeiten aus diesem Vertragsverhältnis ist – soweit
                gesetzlich zulässig – Hannover.
              </p>
              <p className="mt-3">
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die
                Wirksamkeit der übrigen Bestimmungen davon unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">13. Kontakt</h2>
              <p>
                Bei Fragen zu diesen AGB erreichen Sie uns unter:<br />
                <a href="mailto:support@skaile.de" className="text-[#A0F0FF] hover:underline">support@skaile.de</a>
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
