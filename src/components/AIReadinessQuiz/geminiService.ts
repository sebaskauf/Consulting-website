import { QuizResults, GeminiAnalysis } from './types';
import { prepareDataForGemini } from './scoring';

const GEMINI_SYSTEM_PROMPT = `Du bist ein freundlicher AI-Berater und hilfst Unternehmen zu verstehen, wie bereit sie für AI und Automatisierung sind.

WICHTIG - DEINE SPRACHE:
- Schreibe so, dass es JEDER versteht - keine Fachbegriffe!
- Wenn du einen Fachbegriff benutzen musst, erkläre ihn kurz
- Freundlich und ermutigend, aber ehrlich
- Du-Form, locker aber professionell

DEIN WISSEN:
- Du kennst Automatisierungs-Tools wie n8n, Make, Zapier
- Du weißt, was für AI-Projekte wirklich nötig ist
- Du verstehst deutsche Unternehmen und Datenschutz
- Du kennst typische Anwendungsfälle:
  - E-Mails automatisch sortieren oder beantworten
  - Kundendaten automatisch übertragen
  - Dokumente automatisch verarbeiten
  - Chatbots für Kundenanfragen
  - Berichte automatisch erstellen
  - Social Media Beiträge planen
  - Termine automatisch koordinieren
  - Neue Anfragen automatisch bewerten

DEINE AUFGABE:
Basierend auf den Quiz-Antworten:
1. Gib eine ehrliche, aber ermutigende Einschätzung (2-3 Sätze)
2. Nenne 2-3 Stärken: "Das habt ihr schon gut im Griff..."
3. Nenne 2-3 Verbesserungsbereiche: "Hier könntet ihr noch nachbessern..."
4. Schlage 2-3 konkrete erste Schritte vor, die schnell umsetzbar sind
5. Wenn ein konkretes Problem genannt wurde: Erkläre kurz, ob und wie man das mit AI lösen könnte

DEIN TON:
- Wie ein hilfreicher Berater, der erklärt und nicht belehrt
- Konkrete Beispiele statt abstrakte Aussagen
- Ermutigend, nicht verurteilend
- Ehrlich, wenn etwas nicht geht

FORMAT:
Antworte IMMER im folgenden JSON-Format:
{
  "summary": "Deine 2-3 Sätze Zusammenfassung hier",
  "strengths": ["Stärke 1", "Stärke 2", "Stärke 3"],
  "improvements": ["Verbesserung 1", "Verbesserung 2", "Verbesserung 3"],
  "nextSteps": ["Schritt 1", "Schritt 2", "Schritt 3"],
  "problemAnalysis": "Wenn ein Problem beschrieben wurde, deine Analyse hier. Sonst null"
}

Halte dich an maximal 350 Wörter insgesamt.`;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message: string;
  };
}

interface ParsedAnalysis {
  summary: string;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  problemAnalysis?: string | null;
}

export async function getGeminiAnalysis(
  results: QuizResults,
  apiKey: string
): Promise<GeminiAnalysis> {
  const quizData = prepareDataForGemini(results);

  const userPrompt = `Hier sind die Quiz-Ergebnisse eines Unternehmens:

${JSON.stringify(quizData, null, 2)}

Bitte analysiere diese Ergebnisse und gib deine Einschätzung ab.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${GEMINI_SYSTEM_PROMPT}\n\n${userPrompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No response from Gemini');
    }

    // Try to parse JSON from the response
    const analysis = parseGeminiResponse(text);

    return {
      summary: analysis.summary,
      strengths: analysis.strengths,
      improvements: analysis.improvements,
      nextSteps: analysis.nextSteps,
      problemAnalysis: analysis.problemAnalysis || undefined,
      isLoading: false,
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      summary: '',
      strengths: [],
      improvements: [],
      nextSteps: [],
      isLoading: false,
      error:
        error instanceof Error
          ? error.message
          : 'Ein Fehler ist aufgetreten',
    };
  }
}

function parseGeminiResponse(text: string): ParsedAnalysis {
  // Try to extract JSON from the response
  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]) as ParsedAnalysis;
      return {
        summary: parsed.summary || '',
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
        improvements: Array.isArray(parsed.improvements)
          ? parsed.improvements
          : [],
        nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : [],
        problemAnalysis: parsed.problemAnalysis,
      };
    } catch {
      // JSON parsing failed, fall through to fallback
    }
  }

  // Fallback: Try to extract sections from plain text
  return parsePlainTextResponse(text);
}

function parsePlainTextResponse(text: string): ParsedAnalysis {
  const lines = text.split('\n').filter((line) => line.trim());

  const summary = lines.slice(0, 3).join(' ').trim();
  const strengths: string[] = [];
  const improvements: string[] = [];
  const nextSteps: string[] = [];

  let currentSection: 'none' | 'strengths' | 'improvements' | 'steps' = 'none';

  for (const line of lines) {
    const lowerLine = line.toLowerCase();

    if (lowerLine.includes('stärke') || lowerLine.includes('gut im griff')) {
      currentSection = 'strengths';
      continue;
    }
    if (
      lowerLine.includes('verbesser') ||
      lowerLine.includes('nachbessern')
    ) {
      currentSection = 'improvements';
      continue;
    }
    if (lowerLine.includes('schritt') || lowerLine.includes('empfehl')) {
      currentSection = 'steps';
      continue;
    }

    // Extract bullet points
    const bulletMatch = line.match(/^[\s]*[-•*]\s*(.+)/);
    if (bulletMatch) {
      const content = bulletMatch[1].trim();
      switch (currentSection) {
        case 'strengths':
          strengths.push(content);
          break;
        case 'improvements':
          improvements.push(content);
          break;
        case 'steps':
          nextSteps.push(content);
          break;
      }
    }
  }

  return {
    summary,
    strengths: strengths.slice(0, 3),
    improvements: improvements.slice(0, 3),
    nextSteps: nextSteps.slice(0, 3),
    problemAnalysis: null,
  };
}

// Fallback analysis when Gemini is not available - Sales-focused, positive messaging
export function getFallbackAnalysis(results: QuizResults): GeminiAnalysis {
  const { totalPercentage, scores } = results;

  let summary = '';
  const strengths: string[] = [];
  const improvements: string[] = [];
  const nextSteps: string[] = [];

  // Generate positive, sales-focused summary based on score
  if (totalPercentage >= 75) {
    summary =
      'Ausgezeichnet! Ihr habt hervorragende Voraussetzungen für AI-Automatisierung. Wir können direkt mit der Umsetzung starten und schnell erste Ergebnisse liefern.';
  } else if (totalPercentage >= 55) {
    summary =
      'Sehr gute Ausgangslage! Ihr habt bereits wichtige Grundlagen geschaffen. Mit unserer Unterstützung könnt ihr innerhalb kurzer Zeit von AI profitieren.';
  } else if (totalPercentage >= 40) {
    summary =
      'Solide Basis mit viel Potenzial! Wir haben schon vielen Unternehmen in ähnlicher Situation geholfen, erfolgreich AI einzuführen - das schaffen wir auch bei euch.';
  } else {
    summary =
      'Perfekter Zeitpunkt für den Einstieg! Wir begleiten euch von Anfang an und bauen gemeinsam die ideale Grundlage für eure AI-Zukunft auf.';
  }

  // Always identify strengths - focus on positive aspects
  const sortedCategories = Object.entries(scores).sort(([, a], [, b]) => b - a);

  const strengthMessages: Record<string, string[]> = {
    daten: [
      'Eure Datenstruktur bietet gute Anknüpfungspunkte für Automatisierung',
      'Ihr habt bereits Informationen zentral organisiert - das ist eine wichtige Grundlage',
    ],
    aufgaben: [
      'Ihr habt klare Vorstellungen von euren Arbeitsabläufen',
      'Es gibt konkrete Prozesse, die wir automatisieren können',
    ],
    tools: [
      'Eure bestehenden Tools lassen sich gut in AI-Lösungen integrieren',
      'Ihr nutzt moderne Software, die Automatisierung unterstützt',
    ],
    team: [
      'Euer Team zeigt Interesse an neuen Technologien',
      'Es gibt Offenheit für Verbesserungen und neue Wege',
    ],
    ziele: [
      'Ihr wisst, was ihr mit AI erreichen wollt',
      'Eure Erwartungen sind realistisch und umsetzbar',
    ],
    datenschutz: [
      'Ihr habt Datenschutz auf dem Schirm - wichtig für DSGVO-konforme Lösungen',
      'Bewusstsein für Datensicherheit ist vorhanden',
    ],
  };

  // Add top 3 strengths
  for (const [category] of sortedCategories.slice(0, 3)) {
    const messages = strengthMessages[category];
    if (messages && messages.length > 0) {
      strengths.push(messages[0]);
    }
  }

  // Improvements framed as "How we help" - always positive
  const helpMessages: Record<string, string> = {
    daten: 'Wir helfen euch, eure Daten optimal für AI-Nutzung zu strukturieren',
    aufgaben: 'Wir identifizieren gemeinsam die besten Automatisierungs-Kandidaten',
    tools: 'Wir verbinden eure bestehenden Tools zu einem nahtlosen Workflow',
    team: 'Wir begleiten euer Team mit Schulungen und Support beim Umstieg',
    ziele: 'Wir entwickeln mit euch eine klare Roadmap für eure AI-Einführung',
    datenschutz: 'Wir setzen auf DSGVO-konforme Lösungen - 100% made in Germany',
  };

  // Add improvements for lower-scoring categories
  for (const [category, score] of sortedCategories.reverse()) {
    if (score < 70 && improvements.length < 3) {
      const message = helpMessages[category];
      if (message) {
        improvements.push(message);
      }
    }
  }

  // Next steps - realistic for a first call
  nextSteps.push(
    'Kostenloses 15-Minuten Erstgespräch buchen - wir lernen uns kennen'
  );
  nextSteps.push(
    'Wir besprechen eure aktuelle Situation und Herausforderungen'
  );
  nextSteps.push(
    'Ihr bekommt einen klaren Überblick, wie die nächsten Schritte aussehen könnten'
  );

  return {
    summary,
    strengths: strengths.slice(0, 3),
    improvements: improvements.slice(0, 3),
    nextSteps: nextSteps.slice(0, 3),
    isLoading: false,
  };
}
