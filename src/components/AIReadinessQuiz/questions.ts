import { Question, QuizMode } from './types';

// BEREICH 1: Eure Daten (Gewichtung: 25%)
const datenQuestions: Question[] = [
  {
    id: 'daten_1',
    category: 'daten',
    question: 'Wo speichert ihr eure wichtigsten Informationen - Kundendaten, Rechnungen, Notizen?',
    options: [
      {
        id: 'daten_1_a',
        label: 'In einem zentralen System, auf das alle zugreifen können (z.B. ein Kundenverwaltungs-Programm)',
        score: 4,
      },
      {
        id: 'daten_1_b',
        label: 'Hauptsächlich in Excel-Tabellen oder Word-Dokumenten auf dem Computer',
        score: 3,
      },
      {
        id: 'daten_1_c',
        label: 'Überall verstreut - Google Drive, Dropbox, E-Mails, Notizen-Apps...',
        score: 2,
      },
      {
        id: 'daten_1_d',
        label: 'Ehrlich gesagt: Ich weiß nicht genau, wo was liegt',
        score: 1,
        emoji: '😅',
      },
    ],
  },
  {
    id: 'daten_2',
    category: 'daten',
    question: 'Wenn ein neuer Mitarbeiter wissen will, wie ein bestimmter Ablauf funktioniert - wo findet er das?',
    options: [
      {
        id: 'daten_2_a',
        label: 'Es gibt eine Anleitung oder ein Handbuch, wo alles aufgeschrieben ist',
        score: 4,
      },
      {
        id: 'daten_2_b',
        label: 'Bei manchen Sachen ja, bei anderen nicht',
        score: 3,
      },
      {
        id: 'daten_2_c',
        label: 'Das muss man den Kollegen fragen - es steht nirgendwo',
        score: 2,
      },
      {
        id: 'daten_2_d',
        label: 'Wir haben keine festen Abläufe, jeder macht es ein bisschen anders',
        score: 1,
      },
    ],
  },
  {
    id: 'daten_3',
    category: 'daten',
    question: 'Wie ordentlich sind eure gespeicherten Informationen?',
    options: [
      {
        id: 'daten_3_a',
        label: 'Ziemlich gut - wir haben ein System und halten uns dran',
        score: 4,
      },
      {
        id: 'daten_3_b',
        label: 'Geht so - manche Sachen sind ordentlich, andere chaotisch',
        score: 3,
      },
      {
        id: 'daten_3_c',
        label: 'Eher Chaos - jeder speichert, wie er will',
        score: 2,
      },
      {
        id: 'daten_3_d',
        label: 'Wir finden oft Sachen nicht wieder',
        score: 1,
      },
    ],
  },
];

// BEREICH 2: Eure Aufgaben (Gewichtung: 20%)
const aufgabenQuestions: Question[] = [
  {
    id: 'aufgaben_1',
    category: 'aufgaben',
    question: 'Welche Aufgaben kosten euch am meisten Zeit?',
    options: [
      {
        id: 'aufgaben_1_a',
        label: 'Immer das Gleiche tippen - Daten von hier nach da kopieren, Formulare ausfüllen',
        score: 4,
      },
      {
        id: 'aufgaben_1_b',
        label: 'E-Mails beantworten und Nachrichten schreiben',
        score: 4,
      },
      {
        id: 'aufgaben_1_c',
        label: 'Informationen zusammensuchen und Recherche',
        score: 3,
      },
      {
        id: 'aufgaben_1_d',
        label: 'Nachdenken, planen, kreativ sein',
        score: 2,
      },
      {
        id: 'aufgaben_1_e',
        label: 'Alles! Wir haben zu viel zu tun',
        score: 3,
      },
    ],
  },
  {
    id: 'aufgaben_2',
    category: 'aufgaben',
    question: 'Wie oft macht ihr diese zeitfressenden Aufgaben?',
    options: [
      {
        id: 'aufgaben_2_a',
        label: 'Jeden Tag - immer wieder das Gleiche',
        score: 4,
      },
      {
        id: 'aufgaben_2_b',
        label: 'Mehrmals pro Woche',
        score: 3,
      },
      {
        id: 'aufgaben_2_c',
        label: 'Ab und zu',
        score: 2,
      },
      {
        id: 'aufgaben_2_d',
        label: 'Selten - jede Aufgabe ist anders',
        score: 1,
      },
    ],
  },
  {
    id: 'aufgaben_3',
    category: 'aufgaben',
    question: 'Könnte man diese Aufgaben mit klaren Regeln beschreiben? Also: "Wenn X passiert, dann mache Y"?',
    options: [
      {
        id: 'aufgaben_3_a',
        label: 'Ja, eigentlich schon - es sind meistens die gleichen Schritte',
        score: 4,
      },
      {
        id: 'aufgaben_3_b',
        label: 'Teilweise - manches ist klar, manches braucht Erfahrung',
        score: 3,
      },
      {
        id: 'aufgaben_3_c',
        label: 'Eher nicht - man muss immer abwägen und entscheiden',
        score: 2,
      },
      {
        id: 'aufgaben_3_d',
        label: 'Nein, das kann nur ein Mensch mit Erfahrung',
        score: 1,
      },
    ],
  },
];

// BEREICH 3: Eure Programme & Tools (Gewichtung: 15%)
const toolsQuestions: Question[] = [
  {
    id: 'tools_1',
    category: 'tools',
    question: 'Welche Programme nutzt ihr für eure Arbeit?',
    multiSelect: true,
    options: [
      {
        id: 'tools_1_a',
        label: 'E-Mail (Gmail, Outlook, oder ähnliches)',
        score: 1,
      },
      {
        id: 'tools_1_b',
        label: 'Google-Sachen (Drive, Docs, Tabellen)',
        score: 1,
      },
      {
        id: 'tools_1_c',
        label: 'Microsoft-Sachen (Word, Excel, Teams)',
        score: 1,
      },
      {
        id: 'tools_1_d',
        label: 'Ein Programm für Kundenverwaltung (CRM)',
        score: 2,
      },
      {
        id: 'tools_1_e',
        label: 'Buchhaltungs-Software',
        score: 2,
      },
      {
        id: 'tools_1_f',
        label: 'Projektmanagement-Tools (z.B. Trello, Asana, Monday)',
        score: 2,
      },
      {
        id: 'tools_1_g',
        label: 'WhatsApp oder Telegram fürs Geschäft',
        score: 1,
      },
      {
        id: 'tools_1_h',
        label: 'Branchen-spezifische Software (z.B. Handwerker-Software, Praxis-Software)',
        score: 2,
      },
    ],
  },
  {
    id: 'tools_2',
    category: 'tools',
    question: 'Tauschen eure Programme untereinander Daten aus? Oder müsst ihr Sachen manuell übertragen?',
    options: [
      {
        id: 'tools_2_a',
        label: 'Ja, vieles läuft automatisch - wenn ich hier was eintrage, ist es dort auch',
        score: 4,
      },
      {
        id: 'tools_2_b',
        label: 'Ein bisschen, aber viel machen wir noch per Hand',
        score: 3,
      },
      {
        id: 'tools_2_c',
        label: 'Nein, jedes Programm ist für sich - wir kopieren viel hin und her',
        score: 2,
      },
      {
        id: 'tools_2_d',
        label: 'Ich weiß nicht, ob das überhaupt geht',
        score: 1,
      },
    ],
  },
];

// BEREICH 4: Euer Team (Gewichtung: 15%)
const teamQuestions: Question[] = [
  {
    id: 'team_1',
    category: 'team',
    question: 'Wie reagiert euer Team, wenn ihr ein neues Tool einführen wollt?',
    options: [
      {
        id: 'team_1_a',
        label: 'Die meisten freuen sich und probieren gerne Neues aus',
        score: 4,
      },
      {
        id: 'team_1_b',
        label: 'Offen, wenn es ihnen die Arbeit erleichtert',
        score: 3,
      },
      {
        id: 'team_1_c',
        label: 'Skeptisch - "Muss das sein? Das alte funktioniert doch"',
        score: 2,
      },
      {
        id: 'team_1_d',
        label: 'Widerstand - Veränderungen kommen nicht gut an',
        score: 1,
      },
    ],
  },
  {
    id: 'team_2',
    category: 'team',
    question: 'Wer würde sich um ein AI-Projekt kümmern?',
    options: [
      {
        id: 'team_2_a',
        label: 'Die Chefs wollen das - es ist eine Priorität von oben',
        score: 4,
      },
      {
        id: 'team_2_b',
        label: 'Ein paar technik-begeisterte Mitarbeiter würden das übernehmen',
        score: 3,
      },
      {
        id: 'team_2_c',
        label: 'Keiner speziell - da bräuchten wir externe Hilfe',
        score: 2,
      },
      {
        id: 'team_2_d',
        label: 'Ich glaube, niemand hätte Zeit oder Lust dafür',
        score: 1,
      },
    ],
  },
];

// BEREICH 5: Eure Ziele (Gewichtung: 15%)
const zieleQuestions: Question[] = [
  {
    id: 'ziele_1',
    category: 'ziele',
    question: 'Was wäre für euch der größte Gewinn durch AI?',
    options: [
      {
        id: 'ziele_1_a',
        label: 'Zeit sparen bei nervigen Routine-Aufgaben',
        score: 4,
      },
      {
        id: 'ziele_1_b',
        label: 'Weniger Fehler und Vergessen',
        score: 4,
      },
      {
        id: 'ziele_1_c',
        label: 'Mehr schaffen ohne mehr Leute einstellen zu müssen',
        score: 4,
      },
      {
        id: 'ziele_1_d',
        label: 'Modern bleiben - die Konkurrenz macht das ja auch',
        score: 3,
      },
      {
        id: 'ziele_1_e',
        label: 'Ich bin einfach neugierig, was möglich ist',
        score: 2,
      },
    ],
  },
  {
    id: 'ziele_2',
    category: 'ziele',
    question: 'Habt ihr schon eine konkrete Idee, was AI bei euch machen könnte?',
    options: [
      {
        id: 'ziele_2_a',
        label: 'Ja, ich weiß genau, was ich will',
        score: 4,
      },
      {
        id: 'ziele_2_b',
        label: 'So grob - ein paar Ideen schwirren mir im Kopf',
        score: 3,
      },
      {
        id: 'ziele_2_c',
        label: 'Nicht wirklich - ich will erstmal verstehen, was geht',
        score: 2,
      },
      {
        id: 'ziele_2_d',
        label: 'Nein, ich mache das Quiz einfach aus Interesse',
        score: 1,
      },
    ],
  },
  {
    id: 'ziele_3',
    category: 'ziele',
    question: 'Was wärt ihr bereit, für eine gute Lösung zu investieren?',
    options: [
      {
        id: 'ziele_3_a',
        label: 'Über 10.000€ - wenn es sich lohnt, ist das kein Problem',
        score: 4,
      },
      {
        id: 'ziele_3_b',
        label: '2.000€ bis 10.000€ zum Starten',
        score: 4,
      },
      {
        id: 'ziele_3_c',
        label: 'Unter 2.000€ - erstmal klein anfangen',
        score: 3,
      },
      {
        id: 'ziele_3_d',
        label: 'Möglichst wenig - wir haben kein großes Budget',
        score: 2,
      },
      {
        id: 'ziele_3_e',
        label: 'Keine Ahnung - müsste ich erstmal klären',
        score: 1,
      },
    ],
  },
];

// BEREICH 6: Datenschutz (Gewichtung: 10%)
const datenschutzQuestions: Question[] = [
  {
    id: 'datenschutz_1',
    category: 'datenschutz',
    question: 'Wie sensibel sind die Daten, mit denen ihr arbeitet?',
    options: [
      {
        id: 'datenschutz_1_a',
        label: 'Sehr sensibel - Gesundheitsdaten, Finanzen, persönliche Infos von Kunden',
        score: 2, // Lower score = more considerations needed
      },
      {
        id: 'datenschutz_1_b',
        label: 'Normal sensibel - Geschäftsdaten, Kontakte, Aufträge',
        score: 3,
      },
      {
        id: 'datenschutz_1_c',
        label: 'Wenig sensibel - hauptsächlich öffentliche Informationen',
        score: 4,
      },
      {
        id: 'datenschutz_1_d',
        label: 'Gemischt - teils sensibel, teils nicht',
        score: 3,
      },
    ],
  },
  {
    id: 'datenschutz_2',
    category: 'datenschutz',
    question: 'Wie gut kennt ihr euch mit Datenschutz-Regeln aus?',
    options: [
      {
        id: 'datenschutz_2_a',
        label: 'Gut - wir haben das im Griff und dokumentiert',
        score: 4,
      },
      {
        id: 'datenschutz_2_b',
        label: 'Einigermaßen - wir versuchen alles richtig zu machen',
        score: 3,
      },
      {
        id: 'datenschutz_2_c',
        label: 'Nicht so gut - da müssten wir uns mehr drum kümmern',
        score: 2,
      },
      {
        id: 'datenschutz_2_d',
        label: 'Ehrlich gesagt: Das Thema haben wir vernachlässigt',
        score: 1,
      },
    ],
  },
];

// Detaillierte Analyse: Zusätzliche Fragen
const detailQuestions: Question[] = [
  {
    id: 'detail_problem',
    category: 'detail',
    question: 'Beschreib kurz das Problem oder den Ablauf, den du gerne automatisieren würdest:',
    isTextInput: true,
    placeholder: 'z.B. Wir müssen jeden Tag Rechnungen aus E-Mails in unser System übertragen...',
    detailedOnly: true,
    options: [], // No options for text input
  },
  {
    id: 'detail_bereich',
    category: 'detail',
    question: 'In welchem Bereich liegt das Problem?',
    detailedOnly: true,
    options: [
      {
        id: 'detail_bereich_a',
        label: 'Verkauf & Kundengewinnung',
        score: 0,
      },
      {
        id: 'detail_bereich_b',
        label: 'Marketing & Social Media',
        score: 0,
      },
      {
        id: 'detail_bereich_c',
        label: 'Kundenservice & Support',
        score: 0,
      },
      {
        id: 'detail_bereich_d',
        label: 'Verwaltung & Organisation',
        score: 0,
      },
      {
        id: 'detail_bereich_e',
        label: 'Personal & Bewerbungen',
        score: 0,
      },
      {
        id: 'detail_bereich_f',
        label: 'Buchhaltung & Finanzen',
        score: 0,
      },
      {
        id: 'detail_bereich_g',
        label: 'Etwas anderes',
        score: 0,
      },
    ],
  },
  {
    id: 'detail_personen',
    category: 'detail',
    question: 'Wie viele Leute bei euch sind davon betroffen?',
    detailedOnly: true,
    options: [
      {
        id: 'detail_personen_a',
        label: 'Nur ich',
        score: 0,
      },
      {
        id: 'detail_personen_b',
        label: '2-5 Personen',
        score: 0,
      },
      {
        id: 'detail_personen_c',
        label: '6-20 Personen',
        score: 0,
      },
      {
        id: 'detail_personen_d',
        label: 'Mehr als 20 / das ganze Unternehmen',
        score: 0,
      },
    ],
  },
  {
    id: 'detail_haeufigkeit',
    category: 'detail',
    question: 'Wie oft kommt dieses Problem vor?',
    detailedOnly: true,
    options: [
      {
        id: 'detail_haeufigkeit_a',
        label: 'Mehrmals am Tag',
        score: 0,
      },
      {
        id: 'detail_haeufigkeit_b',
        label: 'Einmal am Tag',
        score: 0,
      },
      {
        id: 'detail_haeufigkeit_c',
        label: 'Mehrmals pro Woche',
        score: 0,
      },
      {
        id: 'detail_haeufigkeit_d',
        label: 'Einmal pro Woche oder seltener',
        score: 0,
      },
    ],
  },
  {
    id: 'detail_nervt',
    category: 'detail',
    question: 'Was nervt euch an diesem Ablauf am meisten?',
    detailedOnly: true,
    options: [
      {
        id: 'detail_nervt_a',
        label: 'Es dauert einfach zu lange',
        score: 0,
      },
      {
        id: 'detail_nervt_b',
        label: 'Es passieren immer wieder Fehler',
        score: 0,
      },
      {
        id: 'detail_nervt_c',
        label: 'Es kostet zu viel (Zeit oder Geld)',
        score: 0,
      },
      {
        id: 'detail_nervt_d',
        label: 'Es ist zu kompliziert',
        score: 0,
      },
      {
        id: 'detail_nervt_e',
        label: 'Es wird zu viel, wir kommen nicht mehr hinterher',
        score: 0,
      },
    ],
  },
];

// All questions combined
export const allQuestions: Question[] = [
  ...datenQuestions,
  ...aufgabenQuestions,
  ...toolsQuestions,
  ...teamQuestions,
  ...zieleQuestions,
  ...datenschutzQuestions,
  ...detailQuestions,
];

// Get questions based on quiz mode
export function getQuestionsForMode(mode: QuizMode): Question[] {
  if (mode === 'schnell_check') {
    // Quick check: 7 core questions (skip some detailed ones)
    return [
      datenQuestions[0], // Where are your data stored
      datenQuestions[2], // How organized is your data
      aufgabenQuestions[0], // What tasks take most time
      aufgabenQuestions[2], // Can tasks be described with rules
      toolsQuestions[1], // Do your tools exchange data
      teamQuestions[0], // How does team react to new tools
      zieleQuestions[0], // What's the biggest gain from AI
    ];
  }

  // Detailed analysis: all questions
  return allQuestions;
}

// Get total number of questions for mode
export function getQuestionCountForMode(mode: QuizMode): number {
  return getQuestionsForMode(mode).length;
}

// Export individual category questions for reference
export {
  datenQuestions,
  aufgabenQuestions,
  toolsQuestions,
  teamQuestions,
  zieleQuestions,
  datenschutzQuestions,
  detailQuestions,
};
