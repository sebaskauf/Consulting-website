'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Clock, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { QuizMode } from './types';

interface QuizIntroProps {
  onSelectMode?: (mode: QuizMode) => void;
  navigateToPage?: boolean;
}

export function QuizIntro({ onSelectMode, navigateToPage = false }: QuizIntroProps) {
  const router = useRouter();

  const handleSelectMode = (mode: QuizMode) => {
    if (navigateToPage) {
      router.push(`/quiz?mode=${mode}`);
    } else if (onSelectMode) {
      onSelectMode(mode);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12"
    >
      {/* Header */}
      <div className="text-center mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#A0F0FF]" />
          <span className="text-sm text-white/70">Kostenloser AI-Check</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="font-heading text-3xl md:text-5xl font-semibold text-white mb-4"
        >
          Wie AI-ready ist{' '}
          <span className="relative inline-block">
            <span className="relative z-10">dein Unternehmen</span>
            <span
              className="absolute bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#A0F0FF] to-[#D4C5FF]"
              style={{ transform: 'scaleX(1)' }}
            />
          </span>
          ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
        >
          Finde heraus, ob AI euch helfen kann - und wie ihr am besten
          startet.
        </motion.p>
      </div>

      {/* Mode Selection Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Schnell-Check Card */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelectMode('schnell_check')}
          className="group relative p-6 md:p-8 rounded-2xl text-left transition-all duration-300
                     bg-gradient-to-br from-white/[0.08] to-white/[0.02]
                     border border-white/10 hover:border-[#A0F0FF]/40
                     backdrop-blur-xl overflow-hidden"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#A0F0FF]/10 to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-[#A0F0FF]/10 border border-[#A0F0FF]/20">
                <Zap className="w-6 h-6 text-[#A0F0FF]" />
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-sm">
                <Clock className="w-4 h-4" />
                <span>~2 Min</span>
              </div>
            </div>

            <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mb-2">
              Schnell-Check
            </h3>

            <p className="text-white/50 text-sm md:text-base mb-6">
              Schnelle Übersicht für Eilige. 7 Fragen, generischer AI-Readiness-Score.
            </p>

            <div className="flex items-center gap-2 text-[#A0F0FF] font-medium">
              <span>Jetzt starten</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.button>

        {/* Detaillierte Analyse Card */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelectMode('detaillierte_analyse')}
          className="group relative p-6 md:p-8 rounded-2xl text-left transition-all duration-300
                     bg-gradient-to-br from-white/[0.08] to-white/[0.02]
                     border border-white/10 hover:border-[#D4C5FF]/40
                     backdrop-blur-xl overflow-hidden"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4C5FF]/10 to-transparent" />
          </div>

          {/* Recommended badge */}
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#D4C5FF]/20 text-[#D4C5FF] border border-[#D4C5FF]/30">
              Empfohlen
            </span>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-[#D4C5FF]/10 border border-[#D4C5FF]/20">
                <Sparkles className="w-6 h-6 text-[#D4C5FF]" />
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-sm">
                <Clock className="w-4 h-4" />
                <span>~5 Min</span>
              </div>
            </div>

            <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mb-2">
              Detaillierte Analyse
            </h3>

            <p className="text-white/50 text-sm md:text-base mb-6">
              Tiefgehende Analyse mit persönlichen Empfehlungen. Beschreibe dein konkretes Problem.
            </p>

            <div className="flex items-center gap-2 text-[#D4C5FF] font-medium">
              <span>Analyse starten</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.button>
      </div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="text-center mt-10 text-white/40 text-sm"
      >
        <p>100% kostenlos - Keine versteckten Kosten</p>
      </motion.div>
    </motion.div>
  );
}
