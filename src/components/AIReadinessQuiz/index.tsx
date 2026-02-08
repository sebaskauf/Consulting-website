'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  QuizState,
  QuizMode,
  QuizAnswer,
  LeadFormData,
  GeminiAnalysis,
  CATEGORY_LABELS,
} from './types';
import { getQuestionsForMode } from './questions';
import { calculateQuizResults } from './scoring';
import { getGeminiAnalysis, getFallbackAnalysis } from './geminiService';
import { sendQuizResultEmail } from './emailService';
import { QuizIntro } from './QuizIntro';
import { QuizProgress } from './QuizProgress';
import { QuizQuestion } from './QuizQuestion';
import { LeadForm } from './LeadForm';
import { QuizResult } from './QuizResult';

interface AIReadinessQuizProps {
  initialMode?: QuizMode | null;
  onLeadSubmit?: (data: LeadFormData, results: unknown) => void;
}

export function AIReadinessQuiz({
  initialMode,
  onLeadSubmit,
}: AIReadinessQuizProps) {
  const [state, setState] = useState<QuizState>(() => ({
    step: initialMode ? 'questions' : 'intro',
    mode: initialMode || null,
    currentQuestionIndex: 0,
    answers: [],
    leadData: null,
    results: null,
    geminiAnalysis: null,
    showBasicResult: false,
  }));

  // Track if email has been sent to avoid duplicates
  const [emailSent, setEmailSent] = useState(false);

  // Handle initialMode changes (e.g., from URL params)
  useEffect(() => {
    if (initialMode && state.step === 'intro') {
      setState((prev) => ({
        ...prev,
        mode: initialMode,
        step: 'questions',
        currentQuestionIndex: 0,
        answers: [],
      }));
    }
  }, [initialMode, state.step]);

  // Send email when Gemini analysis is ready
  useEffect(() => {
    async function sendEmailWhenReady() {
      // Only send if:
      // - We're on the result step
      // - User provided lead data and wants email
      // - Gemini analysis is done (not loading, no error)
      // - Email hasn't been sent yet
      if (
        state.step === 'result' &&
        state.leadData?.wantsEmailResult &&
        state.results &&
        state.geminiAnalysis &&
        !state.geminiAnalysis.isLoading &&
        !emailSent
      ) {
        setEmailSent(true);

        const result = await sendQuizResultEmail({
          leadData: state.leadData,
          results: state.results,
          geminiAnalysis: state.geminiAnalysis,
        });

        if (!result.success && !result.skipped) {
          console.warn('Email send failed');
        }
      }
    }

    sendEmailWhenReady();
  }, [
    state.step,
    state.leadData,
    state.results,
    state.geminiAnalysis,
    emailSent,
  ]);

  // Get current questions based on mode
  const questions = useMemo(() => {
    if (!state.mode) return [];
    return getQuestionsForMode(state.mode);
  }, [state.mode]);

  // Get current question
  const currentQuestion = questions[state.currentQuestionIndex];

  // Get current answer for the current question
  const currentAnswer = state.answers.find(
    (a) => a.questionId === currentQuestion?.id
  );

  // Get category label for progress
  const categoryLabel = currentQuestion
    ? CATEGORY_LABELS[currentQuestion.category]
    : '';

  // Handle mode selection
  const handleSelectMode = useCallback((mode: QuizMode) => {
    setState((prev) => ({
      ...prev,
      mode,
      step: 'questions',
      currentQuestionIndex: 0,
      answers: [],
    }));
  }, []);

  // Handle answer
  const handleAnswer = useCallback((answer: QuizAnswer) => {
    setState((prev) => {
      const existingIndex = prev.answers.findIndex(
        (a) => a.questionId === answer.questionId
      );

      let newAnswers: QuizAnswer[];
      if (existingIndex >= 0) {
        newAnswers = [...prev.answers];
        newAnswers[existingIndex] = answer;
      } else {
        newAnswers = [...prev.answers, answer];
      }

      return {
        ...prev,
        answers: newAnswers,
      };
    });
  }, []);

  // Handle next question
  const handleNext = useCallback(() => {
    setState((prev) => {
      const isLastQuestion = prev.currentQuestionIndex >= questions.length - 1;

      if (isLastQuestion) {
        // Calculate results and go to lead form
        const results = calculateQuizResults(prev.answers, prev.mode!);
        return {
          ...prev,
          step: 'lead_form',
          results,
        };
      }

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      };
    });
  }, [questions.length]);

  // Fetch Gemini analysis via server-side API route
  const fetchGeminiAnalysis = useCallback(
    async (results: QuizState['results']) => {
      if (!results) return;

      // Set loading state
      setState((prev) => ({
        ...prev,
        geminiAnalysis: {
          summary: '',
          strengths: [],
          improvements: [],
          nextSteps: [],
          isLoading: true,
        },
      }));

      try {
        const analysis = await getGeminiAnalysis(results);

        // If the API returned an error, use fallback
        if (analysis.error) {
          const fallback = getFallbackAnalysis(results);
          setState((prev) => ({
            ...prev,
            geminiAnalysis: fallback,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            geminiAnalysis: analysis,
          }));
        }
      } catch {
        // Use fallback on error
        const fallback = getFallbackAnalysis(results);
        setState((prev) => ({
          ...prev,
          geminiAnalysis: fallback,
        }));
      }
    },
    []
  );

  // Handle lead form submission
  const handleLeadSubmit = useCallback(
    async (data: LeadFormData) => {
      setState((prev) => ({
        ...prev,
        leadData: data,
        step: 'result',
        showBasicResult: false,
      }));

      // Fetch Gemini analysis
      fetchGeminiAnalysis(state.results);

      // Call external handler if provided
      if (onLeadSubmit && state.results) {
        onLeadSubmit(data, state.results);
      }
    },
    [state.results, fetchGeminiAnalysis, onLeadSubmit]
  );

  // Handle skip lead form
  const handleSkipLeadForm = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: 'result',
      showBasicResult: true,
    }));

    // Still get fallback analysis
    if (state.results) {
      const fallback = getFallbackAnalysis(state.results);
      setState((prev) => ({
        ...prev,
        geminiAnalysis: fallback,
      }));
    }
  }, [state.results]);

  // Handle restart
  const handleRestart = useCallback(() => {
    setState({
      step: 'intro',
      mode: null,
      currentQuestionIndex: 0,
      answers: [],
      leadData: null,
      results: null,
      geminiAnalysis: null,
      showBasicResult: false,
    });
    setEmailSent(false); // Reset email sent flag
  }, []);

  return (
    <section
      id="ai-readiness-quiz"
      className="relative w-full py-4 md:py-6 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#A0F0FF]/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Intro / Mode Selection */}
          {state.step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizIntro onSelectMode={handleSelectMode} />
            </motion.div>
          )}

          {/* Questions */}
          {state.step === 'questions' && currentQuestion && (
            <motion.div
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              {/* Progress Bar */}
              <div className="px-4 mb-4 md:mb-6">
                <QuizProgress
                  currentIndex={state.currentQuestionIndex}
                  totalQuestions={questions.length}
                  categoryLabel={categoryLabel}
                />
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <QuizQuestion
                  key={currentQuestion.id}
                  question={currentQuestion}
                  questionIndex={state.currentQuestionIndex}
                  totalQuestions={questions.length}
                  currentAnswer={currentAnswer}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  isLast={state.currentQuestionIndex >= questions.length - 1}
                />
              </AnimatePresence>
            </motion.div>
          )}

          {/* Lead Form */}
          {state.step === 'lead_form' && state.results && (
            <motion.div
              key="lead_form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LeadForm
                totalScore={state.results.totalPercentage}
                onSubmit={handleLeadSubmit}
                onSkip={handleSkipLeadForm}
              />
            </motion.div>
          )}

          {/* Results */}
          {state.step === 'result' && state.results && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizResult
                results={state.results}
                geminiAnalysis={state.geminiAnalysis}
                showFullAnalysis={!state.showBasicResult}
                leadData={state.leadData}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Named export for convenience
export default AIReadinessQuiz;
