'use client';

import { motion } from 'framer-motion';

interface QuizProgressProps {
  currentIndex: number;
  totalQuestions: number;
  categoryLabel?: string;
}

export function QuizProgress({
  currentIndex,
  totalQuestions,
  categoryLabel,
}: QuizProgressProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Progress Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-white/90">
            Frage {currentIndex + 1} von {totalQuestions}
          </span>
          {categoryLabel && (
            <>
              <span className="text-white/30">|</span>
              <span className="text-sm text-white/50">{categoryLabel}</span>
            </>
          )}
        </div>
        <span className="text-sm font-medium text-[#A0F0FF]">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        {/* Animated Progress Fill - Blau-Gradient */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(90deg, #A0F0FF 0%, #60A5FA 100%)',
          }}
        />

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ['-80px', '500px'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Step Indicators (for quick check mode with fewer questions) */}
      {totalQuestions <= 10 && (
        <div className="flex justify-between mt-3">
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: index <= currentIndex ? 1 : 0.8,
                opacity: index <= currentIndex ? 1 : 0.4,
              }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index < currentIndex
                  ? 'bg-[#60A5FA]'
                  : index === currentIndex
                  ? 'bg-[#A0F0FF]'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
