'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { QuizResults, GeminiAnalysis, LeadFormData } from './types';
import { getScoreLevelInfo } from './scoring';

interface QuizResultProps {
  results: QuizResults;
  geminiAnalysis: GeminiAnalysis | null;
  showFullAnalysis: boolean;
  leadData: LeadFormData | null;
  onRestart: () => void;
}

// Animated score counter
function AnimatedScore({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value, isInView]);

  return (
    <div ref={ref} className="relative inline-flex items-baseline gap-1">
      <span
        className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-[#A0F0FF] tabular-nums"
        style={{
          textShadow: '0 0 20px rgba(160, 240, 255, 0.6), 0 0 40px rgba(160, 240, 255, 0.4), 0 0 60px rgba(160, 240, 255, 0.2)',
          filter: 'drop-shadow(0 0 8px rgba(160, 240, 255, 0.5))',
        }}
      >
        {displayValue}
      </span>
      <span
        className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-[#A0F0FF]/80"
        style={{
          textShadow: '0 0 15px rgba(160, 240, 255, 0.5), 0 0 30px rgba(160, 240, 255, 0.3)',
        }}
      >
        %
      </span>
    </div>
  );
}

// Category score item with progress bar - Compact
function CategoryScore({ label, percentage, delay }: { label: string; percentage: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
    >
      <span className="text-sm text-white/70">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-16 md:w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ delay: delay + 0.2, duration: 0.6, ease: 'easeOut' }}
            className="h-full bg-[#A0F0FF] rounded-full"
            style={{
              boxShadow: '0 0 6px rgba(160, 240, 255, 0.5)',
            }}
          />
        </div>
        <span className="text-sm font-medium text-white w-10 text-right tabular-nums">{percentage}%</span>
      </div>
    </motion.div>
  );
}

export function QuizResult({
  results,
  geminiAnalysis,
  showFullAnalysis,
  leadData,
}: QuizResultProps) {
  const levelInfo = getScoreLevelInfo(results.scoreLevel);
  const calendlyUrl = 'https://calendly.com/your-link';

  const analysisReady = geminiAnalysis && !geminiAnalysis.isLoading && !geminiAnalysis.error;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto px-4 md:px-6"
    >
      {/* Header Section - Score + Title - More compact */}
      <div className="text-center mb-2 md:mb-3">
        {/* Personalized greeting */}
        {leadData?.firstName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl font-heading text-white mb-1"
          >
            Ergebnis für <span className="text-[#A0F0FF] font-semibold">{leadData.firstName}</span> ✨
          </motion.p>
        )}

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatedScore value={results.totalPercentage} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <h2 className="font-heading text-lg md:text-xl lg:text-2xl font-semibold text-white mt-0.5 mb-0.5 flex items-center justify-center gap-2">
            <span>{levelInfo.emoji}</span>
            <span>{levelInfo.title}</span>
          </h2>
          <p className="text-white/60 text-xs md:text-sm max-w-lg mx-auto">
            {levelInfo.description}
          </p>
        </motion.div>
      </div>

      {/* Main Content Grid - 2 columns - Compact */}
      <div className="grid md:grid-cols-2 gap-2 md:gap-3 mb-2 md:mb-3">
        {/* Left Column - Category Scores */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-white/[0.03] rounded-lg p-3 md:p-4 border border-white/[0.06]"
        >
          <h3 className="text-sm md:text-base font-semibold text-white mb-2">
            Ergebnisse nach Bereich
          </h3>
          <div>
            {results.categoryScores
              .filter((cs) => cs.maxScore > 0)
              .map((cs, index) => (
                <CategoryScore
                  key={cs.category}
                  label={cs.label}
                  percentage={cs.percentage}
                  delay={0.5 + index * 0.05}
                />
              ))}
          </div>
        </motion.div>

        {/* Right Column - Summary or Loading */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-white/[0.03] rounded-lg p-3 md:p-4 border border-white/[0.06]"
        >
          {geminiAnalysis?.isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-[#A0F0FF]/20 border-t-[#A0F0FF] rounded-full mb-2"
              />
              <p className="text-sm text-white/50">Analyse wird erstellt...</p>
            </div>
          ) : analysisReady && geminiAnalysis.summary ? (
            <>
              <h3 className="text-sm md:text-base font-semibold text-white mb-2">
                Zusammenfassung
              </h3>
              <p className="text-white/80 text-sm leading-relaxed line-clamp-4">
                {geminiAnalysis.summary}
              </p>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-4">
              <TrendingUp className="w-6 h-6 text-[#A0F0FF]/40 mb-1" />
              <p className="text-sm text-white/50">
                Gib deine E-Mail an für eine detaillierte Analyse
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Analysis Details - Compact 3-column */}
      {showFullAnalysis && analysisReady && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="bg-white/[0.03] rounded-lg p-3 md:p-4 border border-white/[0.06] mb-2 md:mb-3"
        >
          <div className="grid md:grid-cols-3 gap-3 md:gap-4">
            {/* Strengths */}
            {geminiAnalysis.strengths.length > 0 && (
              <div>
                <h4 className="text-sm md:text-base font-semibold text-white mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#A0F0FF]" />
                  Eure Stärken
                </h4>
                <ul className="space-y-1">
                  {geminiAnalysis.strengths.slice(0, 2).map((item, i) => (
                    <li key={i} className="text-sm text-white/70 leading-snug line-clamp-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How we help */}
            {geminiAnalysis.improvements.length > 0 && (
              <div>
                <h4 className="text-sm md:text-base font-semibold text-white mb-1">
                  Wie wir helfen
                </h4>
                <ul className="space-y-1">
                  {geminiAnalysis.improvements.slice(0, 2).map((item, i) => (
                    <li key={i} className="text-sm text-white/70 leading-snug line-clamp-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Steps */}
            {geminiAnalysis.nextSteps.length > 0 && (
              <div>
                <h4 className="text-sm md:text-base font-semibold text-white mb-1">
                  Nächste Schritte
                </h4>
                <ul className="space-y-1">
                  {geminiAnalysis.nextSteps.slice(0, 2).map((item, i) => (
                    <li key={i} className="text-sm text-white/70 leading-snug flex gap-1 line-clamp-2">
                      <span className="text-[#A0F0FF]/70 font-medium">{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* CTA Section - Compact & Prominent */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="text-center pt-1"
      >
        <p className="text-white/60 text-sm mb-2 max-w-md mx-auto">
          {levelInfo.ctaDescription}
        </p>

        <div className="glass-button-wrap inline-block">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-sm md:text-base"
          >
            <span className="glass-button-text flex items-center gap-2">
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              {levelInfo.ctaText}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </a>
          <div className="glass-button-shadow rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}
