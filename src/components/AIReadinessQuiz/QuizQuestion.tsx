'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { Question, QuizAnswer } from './types';

interface QuizQuestionProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
  isLast: boolean;
}

export function QuizQuestion({
  question,
  questionIndex,
  currentAnswer,
  onAnswer,
  onNext,
  isLast,
}: QuizQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    currentAnswer?.selectedOptionIds ?? []
  );
  const [textValue, setTextValue] = useState(currentAnswer?.textValue ?? '');
  const [hasInteracted, setHasInteracted] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOptions(currentAnswer?.selectedOptionIds ?? []);
    setTextValue(currentAnswer?.textValue ?? '');
    setHasInteracted(false);
  }, [question.id, currentAnswer]);

  const handleOptionSelect = (optionId: string) => {
    setHasInteracted(true);
    let newSelected: string[];

    if (question.multiSelect) {
      // Toggle selection for multi-select
      if (selectedOptions.includes(optionId)) {
        newSelected = selectedOptions.filter((id) => id !== optionId);
      } else {
        newSelected = [...selectedOptions, optionId];
      }
    } else {
      // Single select - replace selection
      newSelected = [optionId];
    }

    setSelectedOptions(newSelected);

    // Update answer
    onAnswer({
      questionId: question.id,
      selectedOptionIds: newSelected,
      textValue: question.isTextInput ? textValue : undefined,
    });

    // Auto-advance for single select (after animation)
    if (!question.multiSelect && !question.isTextInput) {
      setTimeout(() => {
        onNext();
      }, 400);
    }
  };

  const handleTextChange = (value: string) => {
    setTextValue(value);
    setHasInteracted(true);
    onAnswer({
      questionId: question.id,
      selectedOptionIds: [],
      textValue: value,
    });
  };

  const canProceed =
    question.isTextInput
      ? textValue.trim().length > 0
      : selectedOptions.length > 0;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      {/* Question */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="font-heading text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed"
      >
        {question.question}
      </motion.h3>

      {/* Multi-select hint */}
      {question.multiSelect && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-sm text-white/50 mb-4 -mt-4"
        >
          Mehrere Antworten möglich
        </motion.p>
      )}

      {/* Text Input for free text questions */}
      {question.isTextInput ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <textarea
            value={textValue}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={question.placeholder}
            className="w-full h-32 md:h-40 p-4 rounded-xl bg-white/5 border border-white/10
                       text-white placeholder-white/30 resize-none
                       focus:outline-none focus:border-[#A0F0FF]/50 focus:ring-2 focus:ring-[#A0F0FF]/20
                       transition-all duration-300"
            style={{ caretColor: '#A0F0FF' }}
          />
          <p className="text-sm text-white/40 mt-2">
            {textValue.length > 0 ? `${textValue.length} Zeichen` : 'Optional, aber hilfreich für personalisierte Empfehlungen'}
          </p>
        </motion.div>
      ) : (
        /* Options */
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {question.options.map((option, index) => {
              const isSelected = selectedOptions.includes(option.id);

              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full p-4 md:p-5 rounded-xl text-left transition-all duration-300
                             flex items-center gap-4 group
                             ${
                               isSelected
                                 ? 'bg-gradient-to-r from-[#A0F0FF]/20 to-[#60A5FA]/10 border-[#A0F0FF]/50'
                                 : 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                             }
                             border backdrop-blur-sm`}
                >
                  {/* Checkbox/Radio indicator */}
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-${
                      question.multiSelect ? 'md' : 'full'
                    } border-2 flex items-center justify-center transition-all duration-300
                               ${
                                 isSelected
                                   ? 'bg-[#A0F0FF] border-[#A0F0FF]'
                                   : 'border-white/30 group-hover:border-white/50'
                               }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        <Check className="w-4 h-4 text-black" strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>

                  {/* Option text */}
                  <span
                    className={`flex-1 text-sm md:text-base transition-colors duration-300
                               ${isSelected ? 'text-white' : 'text-white/70 group-hover:text-white/90'}`}
                  >
                    {option.label}
                    {option.emoji && ` ${option.emoji}`}
                  </span>

                  {/* Arrow indicator for single select */}
                  {!question.multiSelect && (
                    <ChevronRight
                      className={`w-5 h-5 transition-all duration-300
                                 ${
                                   isSelected
                                     ? 'text-[#A0F0FF] translate-x-0'
                                     : 'text-white/30 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                                 }`}
                    />
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Continue Button (for multi-select) */}
      {question.multiSelect && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hasInteracted ? 1 : 0.5, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-8 flex justify-end"
        >
          <motion.button
            whileHover={canProceed ? { scale: 1.02 } : {}}
            whileTap={canProceed ? { scale: 0.98 } : {}}
            onClick={onNext}
            disabled={!canProceed}
            className={`px-6 py-3 rounded-full font-medium flex items-center gap-2
                       transition-all duration-300
                       ${
                         canProceed
                           ? 'bg-gradient-to-r from-[#A0F0FF] to-[#60A5FA] text-black hover:shadow-lg hover:shadow-[#A0F0FF]/20'
                           : 'bg-white/10 text-white/40 cursor-not-allowed'
                       }`}
          >
            {isLast ? 'Auswertung anzeigen' : 'Weiter'}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}

      {/* Buttons for text input - Show both Continue and Skip */}
      {question.isTextInput && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Skip Button - Prominent */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="px-6 py-3 rounded-full font-medium flex items-center gap-2
                      bg-white/10 border border-white/20 text-white hover:bg-white/15
                      transition-all duration-300"
          >
            Überspringen
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          {/* Continue Button */}
          <motion.button
            whileHover={canProceed ? { scale: 1.02 } : {}}
            whileTap={canProceed ? { scale: 0.98 } : {}}
            onClick={onNext}
            className={`px-6 py-3 rounded-full font-medium flex items-center gap-2
                       transition-all duration-300
                       ${
                         canProceed
                           ? 'bg-gradient-to-r from-[#A0F0FF] to-[#60A5FA] text-black hover:shadow-lg hover:shadow-[#A0F0FF]/20'
                           : 'bg-white/10 text-white/40'
                       }`}
          >
            {canProceed ? (isLast ? 'Auswertung anzeigen' : 'Weiter mit Antwort') : 'Text eingeben...'}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
