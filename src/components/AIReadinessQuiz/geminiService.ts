import { QuizResults, GeminiAnalysis } from './types';
import { prepareDataForGemini } from './scoring';

interface ParsedAnalysis {
  summary: string;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  problemAnalysis?: string | null;
}

export async function getGeminiAnalysis(
  results: QuizResults
): Promise<GeminiAnalysis> {
  const quizData = prepareDataForGemini(results);

  try {
    const response = await fetch('/api/quiz/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quizData }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.text) {
      throw new Error('No response text');
    }

    // Parse the Gemini response
    const analysis = parseGeminiResponse(data.text);

    return {
      summary: analysis.summary,
      strengths: analysis.strengths,
      improvements: analysis.improvements,
      nextSteps: analysis.nextSteps,
      problemAnalysis: analysis.problemAnalysis || undefined,
      isLoading: false,
    };
  } catch (error) {
    console.error('Analysis error:', error instanceof Error ? error.message : 'Unknown error');
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
    const bulletMatch = line.match(/^[\s]*[-\u2022*]\s*(.+)/);
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
