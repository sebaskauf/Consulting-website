"use client";

// Amtlicher Wortlaut (gesetze-im-internet.de, abgerufen 21.09.2026):
// Anlage 1 zu Art. 246a § 1 Abs. 2 S. 2 EGBGB (Muster-Widerrufsbelehrung):
//   https://www.gesetze-im-internet.de/bgbeg/art_253anlage_1.html
// Anlage 2 zu Art. 246a § 1 Abs. 2 S. 1 Nr. 1 EGBGB (Muster-Widerrufsformular):
//   https://www.gesetze-im-internet.de/bgbeg/art_253anlage_2.html
// § 356 BGB (Erlöschen des Widerrufsrechts): https://www.gesetze-im-internet.de/bgb/__356.html
// Gestaltungshinweise: Nr. 1a "des Vertragsabschlusses", Nr. 2 Anbieterdaten aus dem Impressum,
// Nr. 6 anteiliger Betrag bei Dienstleistungsbeginn während der Frist.

import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const anbieter = {
  name: "Sebastian Kauffmann, Skaile AI Consulting",
  strasse: "Namedorfstraße 5",
  ort: "30539 Hannover, Deutschland",
  email: "support@skaile.de",
};

const link = "text-[#A0F0FF] hover:underline";

export default function WiderrufPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Widerrufsbelehrung</h1>

          <div className="prose prose-invert prose-gray max-w-none space-y-8 text-gray-300">
            <p className="text-sm text-gray-500">
              Widerrufsrecht für Verbraucher bei Fernabsatzverträgen (§§ 312g, 355 BGB)
            </p>

            <section>
              <p>
                Verbraucher haben bei Verträgen, die online geschlossen werden, ein gesetzliches
                Widerrufsrecht von 14 Tagen. Diese Belehrung gilt für den Vertrag über die
                Mitgliedschaft in der SKAILE Academy (Online-Community auf Skool, monatliches
                Abonnement mit Zugang zu digitalen Inhalten und Community-Leistungen), den
                Verbraucher mit {anbieter.name} abschließen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Widerrufsrecht</h2>
              <p>
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag
                zu widerrufen.
              </p>
              <p className="mt-3">
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
              </p>
              <p className="mt-3">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({anbieter.name},{" "}
                {anbieter.strasse}, {anbieter.ort}, E-Mail:{" "}
                <a href={`mailto:${anbieter.email}`} className={link}>
                  {anbieter.email}
                </a>
                ) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder
                eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie
                können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht
                vorgeschrieben ist.
              </p>
              <p className="mt-3">
                Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die
                Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Folgen des Widerrufs</h2>
              <p>
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von
                Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen
                Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von
                uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und
                spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung
                über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung
                verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
                eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes
                vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
              </p>
              <p className="mt-3">
                Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen
                soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis
                zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich
                dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum
                Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                Vorzeitiges Erlöschen des Widerrufsrechts
              </h2>
              <p>
                Bei einem Vertrag über die Erbringung von Dienstleistungen erlischt das
                Widerrufsrecht nach § 356 Absatz 5 Nummer 2 BGB mit der vollständigen Erbringung
                der Dienstleistung, wenn der Verbraucher vor Beginn der Erbringung ausdrücklich
                zugestimmt hat, dass mit der Erbringung der Dienstleistung vor Ablauf der
                Widerrufsfrist begonnen wird, und seine Kenntnis davon bestätigt hat, dass sein
                Widerrufsrecht mit vollständiger Vertragserfüllung erlischt.
              </p>
              <p className="mt-3">
                Bei einem Vertrag über die Bereitstellung von digitalen Inhalten, die nicht auf
                einem körperlichen Datenträger geliefert werden, erlischt das Widerrufsrecht nach
                § 356 Absatz 6 Nummer 2 BGB, wenn mit der Vertragserfüllung begonnen wurde, der
                Verbraucher ausdrücklich zugestimmt hat, dass mit der Vertragserfüllung vor Ablauf
                der Widerrufsfrist begonnen wird, der Verbraucher seine Kenntnis davon bestätigt
                hat, dass durch diese Zustimmung mit Beginn der Vertragserfüllung sein
                Widerrufsrecht erlischt, und ihm eine Bestätigung des Vertrags gemäß § 312f BGB
                zur Verfügung gestellt wurde.
              </p>
              <p className="mt-3">
                Ohne diese ausdrückliche Zustimmung und Bestätigung bleibt das Widerrufsrecht
                während der vierzehntägigen Frist bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Muster-Widerrufsformular</h2>
              <p>
                Das Formular kann kopiert, ausgefüllt und per Post an die oben genannte Anschrift
                oder per E-Mail an{" "}
                <a href={`mailto:${anbieter.email}`} className={link}>
                  {anbieter.email}
                </a>{" "}
                gesendet werden. Es ist nicht vorgeschrieben, jede eindeutige Erklärung reicht aus.
              </p>
              <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-white/10 bg-[#121220] p-4 sm:p-6 text-sm leading-relaxed text-gray-200 font-sans">
{`Muster-Widerrufsformular

(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)

– An ${anbieter.name}, ${anbieter.strasse}, ${anbieter.ort}, E-Mail: ${anbieter.email}:

– Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)

– Bestellt am (*)/erhalten am (*)

– Name des/der Verbraucher(s)

– Anschrift des/der Verbraucher(s)

– Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)

– Datum

(*) Unzutreffendes streichen.`}
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Stand</h2>
              <p>Diese Widerrufsbelehrung hat den Stand 21.09.2026.</p>
              <p className="mt-3">
                Weitere Angaben zum Anbieter findest du im{" "}
                <a href="/impressum" className={link}>
                  Impressum
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
