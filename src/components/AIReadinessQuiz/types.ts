// Quiz Types for AI Readiness Assessment

export type QuizMode = 'schnell_check' | 'detaillierte_analyse';

export type QuestionCategory =
  | 'daten'
  | 'aufgaben'
  | 'tools'
  | 'team'
  | 'ziele'
  | 'datenschutz'
  | 'detail'; // For detailed analysis specific questions

export interface QuestionOption {
  id: string;
  label: string;
  score: number;
  emoji?: string;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  question: string;
  options: QuestionOption[];
  multiSelect?: boolean;
  isTextInput?: boolean;
  placeholder?: string;
  detailedOnly?: boolean; // Only show in detailed analysis mode
  weight?: number; // Custom weight for scoring (default: 1)
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionIds: string[];
  textValue?: string; // For free text questions
}

export interface CategoryScore {
  category: QuestionCategory;
  score: number;
  maxScore: number;
  percentage: number;
  label: string;
}

export interface QuizScores {
  daten: number;
  aufgaben: number;
  tools: number;
  team: number;
  ziele: number;
  datenschutz: number;
}

export interface QuizResults {
  mode: QuizMode;
  scores: QuizScores;
  categoryScores: CategoryScore[];
  totalScore: number;
  totalPercentage: number;
  answers: QuizAnswer[];
  problemBeschreibung?: string;
  bereich?: string;
  scoreLevel: ScoreLevel;
}

export type ScoreLevel =
  | 'bereit'
  | 'fast_startklar'
  | 'auf_gutem_weg'
  | 'erst_grundlagen'
  | 'anfang_reise';

export interface ScoreLevelInfo {
  level: ScoreLevel;
  minPercentage: number;
  maxPercentage: number;
  title: string;
  emoji: string;
  description: string;
  ctaText: string;
  ctaDescription: string;
}

export interface LeadFormData {
  firstName: string;
  email: string;
  company?: string;
  phone?: string;
  wantsEmailResult: boolean;
  acceptedPrivacy: boolean;
}

export interface GeminiAnalysis {
  summary: string;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  problemAnalysis?: string;
  isLoading: boolean;
  error?: string;
}

export type QuizStep =
  | 'intro'
  | 'questions'
  | 'lead_form'
  | 'result';

export interface QuizState {
  step: QuizStep;
  mode: QuizMode | null;
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  leadData: LeadFormData | null;
  results: QuizResults | null;
  geminiAnalysis: GeminiAnalysis | null;
  showBasicResult: boolean; // Show result without Gemini analysis
}

// Category weights for scoring
export const CATEGORY_WEIGHTS: Record<QuestionCategory, number> = {
  daten: 0.25,
  aufgaben: 0.20,
  tools: 0.15,
  team: 0.15,
  ziele: 0.15,
  datenschutz: 0.10,
  detail: 0, // Detail questions don't contribute to main score
};

// Score level thresholds - All levels encourage booking a call
export const SCORE_LEVELS: ScoreLevelInfo[] = [
  {
    level: 'bereit',
    minPercentage: 75,
    maxPercentage: 100,
    title: 'Top vorbereitet!',
    emoji: '🏆',
    description: 'Ausgezeichnet! Ihr habt ideale Voraussetzungen für AI - wir können direkt mit der Umsetzung starten.',
    ctaText: 'Jetzt Termin buchen',
    ctaDescription: 'Perfekte Ausgangslage! In einem kostenlosen 15-Minuten-Call zeige ich dir, welche AI-Lösung bei euch am schnellsten Ergebnisse bringt.',
  },
  {
    level: 'fast_startklar',
    minPercentage: 55,
    maxPercentage: 74,
    title: 'Sehr gute Basis!',
    emoji: '🚀',
    description: 'Starke Grundlagen! Mit unserer Unterstützung könnt ihr schnell von AI profitieren.',
    ctaText: 'Kostenloses Gespräch',
    ctaDescription: 'Tolle Voraussetzungen! Lass uns in einem kurzen Call besprechen, wie wir eure Stärken optimal nutzen und euch AI-ready machen.',
  },
  {
    level: 'auf_gutem_weg',
    minPercentage: 40,
    maxPercentage: 54,
    title: 'Gutes Potenzial!',
    emoji: '💡',
    description: 'Solide Basis mit viel Potenzial! Wir helfen euch, die richtigen Weichen für AI zu stellen.',
    ctaText: 'Beratung anfragen',
    ctaDescription: 'Ihr habt Potenzial! In einem Gespräch zeige ich dir, wie wir gemeinsam die Grundlagen stärken und AI bei euch einführen.',
  },
  {
    level: 'erst_grundlagen',
    minPercentage: 25,
    maxPercentage: 39,
    title: 'Wir machen euch ready!',
    emoji: '🎯',
    description: 'Es gibt Optimierungspotenzial - und genau dabei unterstützen wir euch. Gemeinsam machen wir euch AI-ready!',
    ctaText: 'Jetzt beraten lassen',
    ctaDescription: 'Kein Problem! Wir begleiten euch auf dem Weg zur AI-Readiness. In einem Gespräch zeige ich dir die ersten konkreten Schritte.',
  },
  {
    level: 'anfang_reise',
    minPercentage: 0,
    maxPercentage: 24,
    title: 'Der perfekte Zeitpunkt!',
    emoji: '🌟',
    description: 'Jetzt ist der ideale Moment, mit Experten zu starten! Wir begleiten euch von Anfang an und bauen gemeinsam eure AI-Zukunft auf.',
    ctaText: 'Erstgespräch vereinbaren',
    ctaDescription: 'Jeder Erfolg beginnt mit dem ersten Schritt! Lass uns gemeinsam herausfinden, wie wir euch am besten unterstützen können.',
  },
];

// Category labels for display
export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  daten: 'Eure Daten',
  aufgaben: 'Eure Aufgaben',
  tools: 'Eure Tools',
  team: 'Euer Team',
  ziele: 'Eure Ziele',
  datenschutz: 'Datenschutz',
  detail: 'Details',
};
