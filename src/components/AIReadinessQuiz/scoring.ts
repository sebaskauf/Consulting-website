import {
  QuizAnswer,
  QuizResults,
  QuizMode,
  QuizScores,
  CategoryScore,
  ScoreLevel,
  QuestionCategory,
  CATEGORY_WEIGHTS,
  SCORE_LEVELS,
  CATEGORY_LABELS,
} from './types';
import { allQuestions, getQuestionsForMode } from './questions';

// Calculate score for a single category
function calculateCategoryScore(
  answers: QuizAnswer[],
  category: QuestionCategory,
  mode: QuizMode
): { score: number; maxScore: number } {
  const questions = getQuestionsForMode(mode).filter(
    (q) => q.category === category && !q.isTextInput
  );

  if (questions.length === 0) {
    return { score: 0, maxScore: 0 };
  }

  let totalScore = 0;
  let maxPossibleScore = 0;

  for (const question of questions) {
    const answer = answers.find((a) => a.questionId === question.id);

    if (answer && answer.selectedOptionIds.length > 0) {
      if (question.multiSelect) {
        // For multi-select, sum up all selected options
        const selectedScores = answer.selectedOptionIds
          .map((optId) => {
            const option = question.options.find((o) => o.id === optId);
            return option?.score ?? 0;
          })
          .reduce((sum, s) => sum + s, 0);

        totalScore += selectedScores;
        // Max score for multi-select: sum of all option scores (capped at 12)
        const allScoresSum = question.options.reduce(
          (sum, o) => sum + o.score,
          0
        );
        maxPossibleScore += Math.min(allScoresSum, 12);
      } else {
        // For single select, get the selected option's score
        const selectedOption = question.options.find(
          (o) => o.id === answer.selectedOptionIds[0]
        );
        totalScore += selectedOption?.score ?? 0;
        // Max score is the highest scoring option
        const maxOptionScore = Math.max(...question.options.map((o) => o.score));
        maxPossibleScore += maxOptionScore;
      }
    } else {
      // No answer - still count max possible
      if (question.multiSelect) {
        const allScoresSum = question.options.reduce(
          (sum, o) => sum + o.score,
          0
        );
        maxPossibleScore += Math.min(allScoresSum, 12);
      } else {
        const maxOptionScore = Math.max(...question.options.map((o) => o.score));
        maxPossibleScore += maxOptionScore;
      }
    }
  }

  return { score: totalScore, maxScore: maxPossibleScore };
}

// Add variation to scores to make them more interesting
function addScoreVariation(basePercentage: number, category: QuestionCategory): number {
  // Add a slight positive bias (scores tend to be higher)
  const bias = 10;

  // Add category-specific variation for more interesting results
  const categoryVariation: Record<QuestionCategory, number> = {
    daten: 5,
    aufgaben: 8,
    tools: 3,
    team: 6,
    ziele: 10,
    datenschutz: 4,
    detail: 0,
  };

  const variation = categoryVariation[category] || 0;
  const adjusted = basePercentage + bias + variation;

  // Ensure score is between 25 and 100 (no score below 25%)
  return Math.min(100, Math.max(25, Math.round(adjusted)));
}

// Calculate all category scores
function calculateAllCategoryScores(
  answers: QuizAnswer[],
  mode: QuizMode
): CategoryScore[] {
  const categories: QuestionCategory[] = [
    'daten',
    'aufgaben',
    'tools',
    'team',
    'ziele',
    'datenschutz',
  ];

  return categories.map((category) => {
    const { score, maxScore } = calculateCategoryScore(answers, category, mode);
    const rawPercentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 50;
    const percentage = addScoreVariation(rawPercentage, category);

    return {
      category,
      score,
      maxScore,
      percentage,
      label: CATEGORY_LABELS[category],
    };
  });
}

// Calculate weighted total score
function calculateTotalScore(categoryScores: CategoryScore[]): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const cs of categoryScores) {
    const weight = CATEGORY_WEIGHTS[cs.category];
    if (weight > 0 && cs.maxScore > 0) {
      weightedSum += cs.percentage * weight;
      totalWeight += weight;
    }
  }

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
}

// Determine score level based on percentage
function getScoreLevel(percentage: number): ScoreLevel {
  for (const level of SCORE_LEVELS) {
    if (percentage >= level.minPercentage && percentage <= level.maxPercentage) {
      return level.level;
    }
  }
  return 'anfang_reise';
}

// Extract problem description and bereich from answers
function extractDetailedInfo(
  answers: QuizAnswer[],
  mode: QuizMode
): { problemBeschreibung?: string; bereich?: string } {
  if (mode !== 'detaillierte_analyse') {
    return {};
  }

  const problemAnswer = answers.find((a) => a.questionId === 'detail_problem');
  const bereichAnswer = answers.find((a) => a.questionId === 'detail_bereich');

  const problemBeschreibung = problemAnswer?.textValue;

  let bereich: string | undefined;
  if (bereichAnswer && bereichAnswer.selectedOptionIds.length > 0) {
    const question = allQuestions.find((q) => q.id === 'detail_bereich');
    const selectedOption = question?.options.find(
      (o) => o.id === bereichAnswer.selectedOptionIds[0]
    );
    bereich = selectedOption?.label;
  }

  return { problemBeschreibung, bereich };
}

// Convert category scores to QuizScores object
function categoryScoresToQuizScores(categoryScores: CategoryScore[]): QuizScores {
  const scores: QuizScores = {
    daten: 0,
    aufgaben: 0,
    tools: 0,
    team: 0,
    ziele: 0,
    datenschutz: 0,
  };

  for (const cs of categoryScores) {
    if (cs.category in scores) {
      scores[cs.category as keyof QuizScores] = cs.percentage;
    }
  }

  return scores;
}

// Main function to calculate quiz results
export function calculateQuizResults(
  answers: QuizAnswer[],
  mode: QuizMode
): QuizResults {
  const categoryScores = calculateAllCategoryScores(answers, mode);
  const totalPercentage = calculateTotalScore(categoryScores);
  const scoreLevel = getScoreLevel(totalPercentage);
  const { problemBeschreibung, bereich } = extractDetailedInfo(answers, mode);

  return {
    mode,
    scores: categoryScoresToQuizScores(categoryScores),
    categoryScores,
    totalScore: totalPercentage, // Using percentage as score
    totalPercentage,
    answers,
    problemBeschreibung,
    bereich,
    scoreLevel,
  };
}

// Get score level info
export function getScoreLevelInfo(level: ScoreLevel) {
  return SCORE_LEVELS.find((l) => l.level === level) ?? SCORE_LEVELS[4];
}

// Format answers for display or API
export function formatAnswersForDisplay(answers: QuizAnswer[]): string[] {
  return answers.map((answer) => {
    const question = allQuestions.find((q) => q.id === answer.questionId);
    if (!question) return '';

    if (question.isTextInput) {
      return `${question.question}\n→ ${answer.textValue || 'Keine Antwort'}`;
    }

    const selectedLabels = answer.selectedOptionIds
      .map((optId) => {
        const option = question.options.find((o) => o.id === optId);
        return option?.label ?? '';
      })
      .filter(Boolean)
      .join(', ');

    return `${question.question}\n→ ${selectedLabels || 'Keine Antwort'}`;
  });
}

// Prepare data for Gemini API
export function prepareDataForGemini(results: QuizResults): object {
  return {
    mode: results.mode,
    scores: results.scores,
    total_score: results.totalPercentage,
    answers: formatAnswersForDisplay(results.answers),
    problem_beschreibung: results.problemBeschreibung,
    bereich: results.bereich,
  };
}
