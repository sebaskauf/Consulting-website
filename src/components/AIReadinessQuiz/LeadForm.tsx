'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Building2, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { LeadFormData } from './types';

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  onSkip: () => void;
  totalScore: number;
}

export function LeadForm({ onSubmit, onSkip, totalScore }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: '',
    email: '',
    company: '',
    phone: '',
    wantsEmailResult: true,
    acceptedPrivacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Bitte gib deinen Vornamen ein';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Bitte gib deine E-Mail ein';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Bitte gib eine gültige E-Mail ein';
    }

    if (!formData.acceptedPrivacy) {
      newErrors.privacy = 'Bitte akzeptiere die Datenschutzerklärung';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof LeadFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A0F0FF]/20 to-[#D4C5FF]/20 border border-white/10 mb-4"
        >
          <Sparkles className="w-8 h-8 text-[#A0F0FF]" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="font-heading text-2xl md:text-3xl font-semibold text-white mb-2"
        >
          Fast geschafft!
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-white/60"
        >
          Wohin sollen wir dein Ergebnis schicken?
        </motion.p>

        {/* Preview of score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
        >
          <span className="text-sm text-white/60">Dein Score:</span>
          <span className="text-lg font-semibold text-[#A0F0FF]">{totalScore}%</span>
        </motion.div>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* First Name */}
        <div>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Vorname *"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border text-white
                         placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300
                         ${
                           errors.firstName
                             ? 'border-red-500/50 focus:ring-red-500/20'
                             : 'border-white/10 focus:border-[#A0F0FF]/50 focus:ring-[#A0F0FF]/20'
                         }`}
              style={{ caretColor: '#A0F0FF' }}
            />
          </div>
          {errors.firstName && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 ml-1"
            >
              {errors.firstName}
            </motion.p>
          )}
        </div>

        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              placeholder="E-Mail *"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border text-white
                         placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300
                         ${
                           errors.email
                             ? 'border-red-500/50 focus:ring-red-500/20'
                             : 'border-white/10 focus:border-[#A0F0FF]/50 focus:ring-[#A0F0FF]/20'
                         }`}
              style={{ caretColor: '#A0F0FF' }}
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1 ml-1"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Optional Fields Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Company */}
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Firma"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10
                        text-white placeholder-white/40 focus:outline-none focus:border-[#A0F0FF]/50
                        focus:ring-2 focus:ring-[#A0F0FF]/20 transition-all duration-300"
              style={{ caretColor: '#A0F0FF' }}
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="tel"
              placeholder="Telefon"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10
                        text-white placeholder-white/40 focus:outline-none focus:border-[#A0F0FF]/50
                        focus:ring-2 focus:ring-[#A0F0FF]/20 transition-all duration-300"
              style={{ caretColor: '#A0F0FF' }}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-2">
          {/* Email Results Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={formData.wantsEmailResult}
                onChange={(e) => handleInputChange('wantsEmailResult', e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 transition-all duration-200
                           ${
                             formData.wantsEmailResult
                               ? 'bg-[#A0F0FF] border-[#A0F0FF]'
                               : 'border-white/30 group-hover:border-white/50'
                           }`}
              >
                {formData.wantsEmailResult && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                )}
              </div>
            </div>
            <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
              Schickt mir die ausführliche Auswertung per E-Mail
            </span>
          </label>

          {/* Privacy Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={formData.acceptedPrivacy}
                onChange={(e) => {
                  handleInputChange('acceptedPrivacy', e.target.checked);
                  if (errors.privacy) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.privacy;
                      return newErrors;
                    });
                  }
                }}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 transition-all duration-200
                           ${
                             formData.acceptedPrivacy
                               ? 'bg-[#A0F0FF] border-[#A0F0FF]'
                               : errors.privacy
                               ? 'border-red-500/50'
                               : 'border-white/30 group-hover:border-white/50'
                           }`}
              >
                {formData.acceptedPrivacy && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                )}
              </div>
            </div>
            <span
              className={`text-sm transition-colors ${
                errors.privacy ? 'text-red-400' : 'text-white/70 group-hover:text-white/90'
              }`}
            >
              Ich akzeptiere die{' '}
              <a
                href="/datenschutz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A0F0FF] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Datenschutzerklärung
              </a>{' '}
              *
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2
                    bg-gradient-to-r from-[#A0F0FF] to-[#D4C5FF] text-black
                    hover:shadow-lg hover:shadow-[#A0F0FF]/20 transition-all duration-300
                    disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
              />
              <span>Wird geladen...</span>
            </>
          ) : (
            <>
              <span>Ergebnis anzeigen</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>

        {/* Skip Button */}
        <motion.button
          type="button"
          onClick={onSkip}
          whileHover={{ scale: 1.01 }}
          className="w-full py-3 text-white/50 hover:text-white/70 text-sm transition-colors"
        >
          Erstmal nur Ergebnis zeigen (ohne E-Mail)
        </motion.button>
      </motion.form>

      {/* Privacy Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="text-center text-xs text-white/30 mt-6"
      >
        Deine Daten sind sicher. Wir versenden keinen Spam.
      </motion.p>
    </motion.div>
  );
}
