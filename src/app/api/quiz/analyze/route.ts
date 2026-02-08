import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Gemini API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const { quizData } = await request.json();

    if (!quizData) {
      return NextResponse.json(
        { error: 'Quiz data is required' },
        { status: 400 }
      );
    }

    const userPrompt = `Hier sind die Quiz-Ergebnisse eines Unternehmens:

${JSON.stringify(quizData, null, 2)}

Bitte analysiere diese Ergebnisse und gib deine Einschätzung ab.`;

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
      return NextResponse.json(
        { error: `Gemini API error: ${response.status}` },
        { status: 502 }
      );
    }

    const data: GeminiResponse = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 502 }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json(
        { error: 'No response from Gemini' },
        { status: 502 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Gemini API route error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to get AI analysis' },
      { status: 500 }
    );
  }
}
