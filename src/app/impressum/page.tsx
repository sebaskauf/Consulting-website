"use client";

import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Impressum</h1>

          <div className="prose prose-invert prose-gray max-w-none space-y-8 text-gray-300">
            <p className="text-sm text-gray-500">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</p>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Anbieter und Verantwortlicher</h2>
              <p>
                <strong className="text-white">Vibe Consulting</strong><br />
                Sebastian Kauffmann<br />
                Namedorfstraße 5<br />
                30539 Hannover<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Kontakt</h2>
              <p>
                E-Mail: <a href="mailto:support@skaile.de" className="text-[#A0F0FF] hover:underline">support@skaile.de</a><br />
                Alternativ: <a href="mailto:sebastian@skaile.de" className="text-[#A0F0FF] hover:underline">sebastian@skaile.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
              <p>
                Berufsbezeichnung: IT-Dienstleister / KI-Berater<br />
                Zuständige Kammer: Keine Kammerzugehörigkeit (kein kammerpflichtiger Beruf)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission hat ihre Plattform zur Online-Streitbeilegung (OS-Plattform)
                zum 20. Juli 2025 eingestellt. Eine Teilnahme an einem Streitbeilegungsverfahren vor
                einer Verbraucherschlichtungsstelle ist daher nicht mehr über diese Plattform möglich.
              </p>
              <p className="mt-3">
                Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                Tätigkeit hinweisen.
              </p>
              <p className="mt-3">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
                erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Haftung für Links</h2>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
                mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                Verlinkung nicht erkennbar.
              </p>
              <p className="mt-3">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
                nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p className="mt-3">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
                Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
                gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
                bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
                werden wir derartige Inhalte umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Hinweis zu KI-generierten Inhalten</h2>
              <p>
                Auf dieser Website und in unseren Anwendungen können KI-generierte Inhalte zum Einsatz
                kommen. Diese werden gemäß Art. 50 der KI-Verordnung (AI Act) entsprechend gekennzeichnet.
                Wir setzen ausschließlich EU-gehostete KI-Modelle ein und verarbeiten Daten
                DSGVO-konform.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
