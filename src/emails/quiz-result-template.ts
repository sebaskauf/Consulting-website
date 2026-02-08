// Quiz Result Email Template
// Responsive HTML email for AI Readiness Quiz results

interface CategoryScoreData {
  label: string;
  percentage: number;
}

interface GeminiAnalysisData {
  summary: string;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
}

interface ScoreLevelData {
  title: string;
  emoji: string;
  description: string;
  ctaText: string;
}

interface QuizResultEmailParams {
  firstName: string;
  totalPercentage: number;
  scoreLevel: ScoreLevelData;
  categoryScores: CategoryScoreData[];
  geminiAnalysis?: GeminiAnalysisData | null;
  calendlyUrl: string;
}

export function generateQuizResultEmail({
  firstName,
  totalPercentage,
  scoreLevel,
  categoryScores,
  geminiAnalysis,
  calendlyUrl,
}: QuizResultEmailParams): string {
  // Generate category scores HTML
  const categoryScoresHtml = categoryScores
    .map(
      (cs) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #2a2a2a; color: #e0e0e0; font-size: 14px;">
          ${cs.label}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #2a2a2a; width: 120px;">
          <div style="background: #2a2a2a; border-radius: 4px; height: 8px; overflow: hidden;">
            <div style="background: linear-gradient(90deg, #A0F0FF, #60A5FA); height: 100%; width: ${cs.percentage}%; border-radius: 4px;"></div>
          </div>
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #2a2a2a; text-align: right; color: #A0F0FF; font-weight: 600; font-size: 14px; width: 50px;">
          ${cs.percentage}%
        </td>
      </tr>
    `
    )
    .join('');

  // Generate Gemini analysis HTML if available
  let analysisHtml = '';
  if (geminiAnalysis && geminiAnalysis.summary) {
    const strengthsHtml = geminiAnalysis.strengths
      .slice(0, 3)
      .map(
        (s) => `
        <li style="margin-bottom: 8px; padding-left: 8px; color: #e0e0e0; font-size: 14px; line-height: 1.5;">
          ${s}
        </li>
      `
      )
      .join('');

    const improvementsHtml = geminiAnalysis.improvements
      .slice(0, 3)
      .map(
        (s) => `
        <li style="margin-bottom: 8px; padding-left: 8px; color: #e0e0e0; font-size: 14px; line-height: 1.5;">
          ${s}
        </li>
      `
      )
      .join('');

    const nextStepsHtml = geminiAnalysis.nextSteps
      .slice(0, 3)
      .map(
        (s, i) => `
        <li style="margin-bottom: 8px; padding-left: 8px; color: #e0e0e0; font-size: 14px; line-height: 1.5;">
          <span style="color: #A0F0FF; font-weight: 600;">${i + 1}.</span> ${s}
        </li>
      `
      )
      .join('');

    analysisHtml = `
      <!-- AI Analysis Section -->
      <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; margin-top: 24px; border: 1px solid #2a2a2a;">
        <h2 style="margin: 0 0 16px 0; color: #ffffff; font-size: 18px; font-weight: 600;">
          Deine persönliche AI-Analyse
        </h2>
        <p style="margin: 0 0 24px 0; color: #b0b0b0; font-size: 14px; line-height: 1.6;">
          ${geminiAnalysis.summary}
        </p>

        ${
          geminiAnalysis.strengths.length > 0
            ? `
          <div style="margin-bottom: 20px;">
            <h3 style="margin: 0 0 12px 0; color: #A0F0FF; font-size: 15px; font-weight: 600;">
              ✓ Eure Stärken
            </h3>
            <ul style="margin: 0; padding-left: 20px; list-style-type: disc;">
              ${strengthsHtml}
            </ul>
          </div>
        `
            : ''
        }

        ${
          geminiAnalysis.improvements.length > 0
            ? `
          <div style="margin-bottom: 20px;">
            <h3 style="margin: 0 0 12px 0; color: #60A5FA; font-size: 15px; font-weight: 600;">
              → Wie wir helfen können
            </h3>
            <ul style="margin: 0; padding-left: 20px; list-style-type: disc;">
              ${improvementsHtml}
            </ul>
          </div>
        `
            : ''
        }

        ${
          geminiAnalysis.nextSteps.length > 0
            ? `
          <div>
            <h3 style="margin: 0 0 12px 0; color: #ffffff; font-size: 15px; font-weight: 600;">
              Empfohlene nächste Schritte
            </h3>
            <ul style="margin: 0; padding-left: 20px; list-style-type: none;">
              ${nextStepsHtml}
            </ul>
          </div>
        `
            : ''
        }
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Dein AI-Readiness Ergebnis</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">

  <!-- Outer Container -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Main Content Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111111; border-radius: 16px; overflow: hidden; border: 1px solid #2a2a2a;">

          <!-- Header with Logo -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid #2a2a2a;">
              <img
                src="https://skaile.de/skaile-logo.png"
                alt="Skaile AI"
                width="120"
                style="display: inline-block; max-width: 120px; height: auto;"
              />
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">

              <!-- Greeting -->
              <p style="margin: 0 0 8px 0; color: #b0b0b0; font-size: 14px;">
                Hallo ${firstName},
              </p>
              <h1 style="margin: 0 0 24px 0; color: #ffffff; font-size: 24px; font-weight: 600; line-height: 1.3;">
                Hier ist dein AI-Readiness Ergebnis
              </h1>

              <!-- Score Display -->
              <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 24px; border: 1px solid #2a2a2a;">
                <div style="margin-bottom: 8px;">
                  <span style="font-size: 64px; font-weight: 700; background: linear-gradient(90deg, #A0F0FF, #60A5FA); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    ${totalPercentage}%
                  </span>
                </div>
                <div style="margin-bottom: 12px;">
                  <span style="font-size: 24px; margin-right: 8px;">${scoreLevel.emoji}</span>
                  <span style="font-size: 20px; color: #ffffff; font-weight: 600;">${scoreLevel.title}</span>
                </div>
                <p style="margin: 0; color: #b0b0b0; font-size: 14px; line-height: 1.5; max-width: 400px; margin-left: auto; margin-right: auto;">
                  ${scoreLevel.description}
                </p>
              </div>

              <!-- Category Scores -->
              <div style="background: #1a1a1a; border-radius: 12px; overflow: hidden; margin-bottom: 24px; border: 1px solid #2a2a2a;">
                <div style="padding: 16px 16px 8px 16px; border-bottom: 1px solid #2a2a2a;">
                  <h2 style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                    Ergebnisse nach Bereich
                  </h2>
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${categoryScoresHtml}
                </table>
              </div>

              ${analysisHtml}

              <!-- CTA Section -->
              <div style="background: linear-gradient(135deg, #A0F0FF15 0%, #60A5FA15 100%); border-radius: 12px; padding: 24px; text-align: center; margin-top: 32px; border: 1px solid #A0F0FF30;">
                <h2 style="margin: 0 0 12px 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                  Bereit für den nächsten Schritt?
                </h2>
                <p style="margin: 0 0 20px 0; color: #b0b0b0; font-size: 14px; line-height: 1.5;">
                  In einem kostenlosen Gespräch zeige ich dir, wie wir euch konkret bei der AI-Einführung unterstützen können.
                </p>
                <a
                  href="${calendlyUrl}"
                  target="_blank"
                  style="display: inline-block; background: linear-gradient(90deg, #A0F0FF, #60A5FA); color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;"
                >
                  ${scoreLevel.ctaText} →
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background: #0a0a0a; border-top: 1px solid #2a2a2a;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #666666; font-size: 12px;">
                      Skaile AI | AI-Beratung für den Mittelstand
                    </p>
                    <p style="margin: 0; color: #666666; font-size: 12px;">
                      <a href="https://skaile.de/impressum" style="color: #666666; text-decoration: underline;">Impressum</a>
                      &nbsp;|&nbsp;
                      <a href="https://skaile.de/datenschutz" style="color: #666666; text-decoration: underline;">Datenschutz</a>
                    </p>
                    <p style="margin: 16px 0 0 0; color: #444444; font-size: 11px;">
                      Du erhältst diese E-Mail, weil du den AI-Readiness Quiz auf skaile.de ausgefüllt hast.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
}

// Generate plain text version
export function generateQuizResultPlainText({
  firstName,
  totalPercentage,
  scoreLevel,
  categoryScores,
  geminiAnalysis,
  calendlyUrl,
}: QuizResultEmailParams): string {
  let text = `Hallo ${firstName},

Hier ist dein AI-Readiness Ergebnis:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DEIN SCORE: ${totalPercentage}%
${scoreLevel.emoji} ${scoreLevel.title}

${scoreLevel.description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ERGEBNISSE NACH BEREICH:

`;

  categoryScores.forEach((cs) => {
    const bar = '█'.repeat(Math.round(cs.percentage / 10)) + '░'.repeat(10 - Math.round(cs.percentage / 10));
    text += `${cs.label}: ${bar} ${cs.percentage}%\n`;
  });

  if (geminiAnalysis && geminiAnalysis.summary) {
    text += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DEINE PERSÖNLICHE ANALYSE:

${geminiAnalysis.summary}

`;

    if (geminiAnalysis.strengths.length > 0) {
      text += `EURE STÄRKEN:\n`;
      geminiAnalysis.strengths.slice(0, 3).forEach((s) => {
        text += `• ${s}\n`;
      });
      text += '\n';
    }

    if (geminiAnalysis.improvements.length > 0) {
      text += `WIE WIR HELFEN KÖNNEN:\n`;
      geminiAnalysis.improvements.slice(0, 3).forEach((s) => {
        text += `• ${s}\n`;
      });
      text += '\n';
    }

    if (geminiAnalysis.nextSteps.length > 0) {
      text += `EMPFOHLENE NÄCHSTE SCHRITTE:\n`;
      geminiAnalysis.nextSteps.slice(0, 3).forEach((s, i) => {
        text += `${i + 1}. ${s}\n`;
      });
    }
  }

  text += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEREIT FÜR DEN NÄCHSTEN SCHRITT?

In einem kostenlosen Gespräch zeige ich dir, wie wir euch konkret bei der AI-Einführung unterstützen können.

→ Termin buchen: ${calendlyUrl}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Skaile AI | AI-Beratung für den Mittelstand
https://skaile.de

Impressum: https://skaile.de/impressum
Datenschutz: https://skaile.de/datenschutz

Du erhältst diese E-Mail, weil du den AI-Readiness Quiz auf skaile.de ausgefüllt hast.
`;

  return text;
}
