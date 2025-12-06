"use client";

import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function AGBPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Nutzungsbedingungen (AGB)</h1>

          <div className="prose prose-invert prose-gray max-w-none space-y-8 text-gray-300">
            <p className="text-sm text-gray-500">Stand: Dezember 2024</p>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Geltungsbereich</h2>
              <p>
                Diese Nutzungsbedingungen gelten für die Nutzung der Website von Vibe Consulting sowie
                der Anwendung "HR Buddy". Mit der Nutzung unserer Dienste akzeptieren Sie diese Bedingungen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Leistungsbeschreibung HR Buddy</h2>
              <p>
                HR Buddy ist eine KI-gestützte Anwendung, die folgende Funktionen bietet:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Verbindung von Cloud-Speichern (Google Drive, Notion)</li>
                <li>KI-gestützte Beantwortung von Fragen zu Ihren Dokumenten</li>
                <li>Durchsuchung und Analyse von Dokumentinhalten</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Registrierung & Account</h2>
              <p>
                Für die Nutzung von HR Buddy ist eine Registrierung erforderlich. Sie sind verantwortlich für:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Die Richtigkeit Ihrer Angaben</li>
                <li>Die Geheimhaltung Ihrer Zugangsdaten</li>
                <li>Alle Aktivitäten, die unter Ihrem Account erfolgen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Nutzungsrechte & Pflichten</h2>
              <h3 className="text-lg font-medium text-white mt-4 mb-3">4.1 Erlaubte Nutzung</h3>
              <p>
                Sie dürfen HR Buddy für persönliche und geschäftliche Zwecke nutzen, sofern Sie die
                erforderlichen Rechte an den verbundenen Dokumenten besitzen.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">4.2 Verbotene Nutzung</h3>
              <p>Folgende Nutzungen sind untersagt:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Verletzung von Rechten Dritter (Urheberrecht, Datenschutz)</li>
                <li>Hochladen illegaler oder schädlicher Inhalte</li>
                <li>Versuch, die Sicherheit unserer Systeme zu umgehen</li>
                <li>Automatisierte Massenabfragen ohne Genehmigung</li>
                <li>Weiterverkauf oder kommerzielle Weitergabe des Zugangs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Drittanbieter-Integrationen</h2>
              <p>
                Bei der Verbindung mit Google Drive oder Notion gelten zusätzlich die Nutzungsbedingungen
                dieser Anbieter. Sie sind verantwortlich für die Einhaltung dieser Bedingungen.
              </p>
              <p className="mt-3">
                Die OAuth-Autorisierung ermöglicht HR Buddy den Zugriff auf die von Ihnen freigegebenen
                Inhalte. Sie können diese Berechtigung jederzeit in den Einstellungen der jeweiligen
                Plattform widerrufen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. KI-generierte Inhalte</h2>
              <p>
                HR Buddy verwendet künstliche Intelligenz zur Beantwortung von Fragen. Bitte beachten Sie:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>KI-Antworten können Fehler enthalten und sollten überprüft werden</li>
                <li>Die Antworten basieren auf den verbundenen Dokumenten und sind nur so aktuell wie diese</li>
                <li>HR Buddy ersetzt keine professionelle Beratung (rechtlich, medizinisch, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Datenschutz & Sicherheit</h2>
              <p>
                Details zur Verarbeitung Ihrer Daten finden Sie in unserer{" "}
                <a href="/datenschutz" className="text-[#A0F0FF] hover:underline">Datenschutzerklärung</a>.
              </p>
              <p className="mt-3">
                Ihre Dokument-Inhalte werden als Embeddings (Vektorrepräsentationen) gespeichert.
                Die Original-Dokumente verbleiben in Ihren Cloud-Speichern.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Verfügbarkeit</h2>
              <p>
                Wir bemühen uns um eine hohe Verfügbarkeit unserer Dienste, können jedoch keine
                ununterbrochene Verfügbarkeit garantieren. Wartungsarbeiten werden nach Möglichkeit
                angekündigt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Haftungsbeschränkung</h2>
              <p>
                Wir haften unbeschränkt nur für Vorsatz und grobe Fahrlässigkeit. Bei leichter
                Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten,
                begrenzt auf den vorhersehbaren, vertragstypischen Schaden.
              </p>
              <p className="mt-3">
                Wir haften nicht für Schäden, die durch fehlerhafte KI-Antworten entstehen,
                oder für Datenverlust bei verbundenen Drittanbieter-Diensten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Kündigung</h2>
              <p>
                Sie können Ihren Account jederzeit löschen. Wir behalten uns vor, Accounts bei
                Verstoß gegen diese Bedingungen zu sperren oder zu kündigen.
              </p>
              <p className="mt-3">
                Bei Kündigung werden Ihre Daten gemäß unserer Datenschutzerklärung gelöscht.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Änderungen</h2>
              <p>
                Wir behalten uns vor, diese Nutzungsbedingungen zu ändern. Wesentliche Änderungen
                werden Ihnen per E-Mail mitgeteilt. Die weitere Nutzung nach Änderung gilt als Zustimmung.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">12. Schlussbestimmungen</h2>
              <p>
                Es gilt deutsches Recht. Sollten einzelne Bestimmungen unwirksam sein, bleiben
                die übrigen Bestimmungen davon unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">13. Kontakt</h2>
              <p>
                Bei Fragen zu diesen Nutzungsbedingungen erreichen Sie uns unter:<br />
                <a href="mailto:sebaskauf.business@gmail.com" className="text-[#A0F0FF] hover:underline">sebaskauf.business@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
