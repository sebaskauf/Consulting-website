"use client";

import { useState } from "react";
import { z } from "zod";
import { GlassButton } from "./glass-button";
import { Send, CheckCircle } from "lucide-react";

// Input validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, "Name muss mindestens 2 Zeichen haben")
    .max(100, "Name darf maximal 100 Zeichen haben")
    .trim(),
  email: z.string()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
    .max(200, "E-Mail darf maximal 200 Zeichen haben"),
  company: z.string()
    .max(200, "Unternehmen darf maximal 200 Zeichen haben")
    .optional()
    .or(z.literal("")),
  message: z.string()
    .min(10, "Nachricht muss mindestens 10 Zeichen haben")
    .max(2000, "Nachricht darf maximal 2000 Zeichen haben")
    .trim(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate input
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // TODO: Implement actual form submission to backend API
    // For now, show success message
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  return (
    <section className="relative z-10 bg-gradient-to-b from-black/80 to-zinc-900/80 backdrop-blur-sm text-white py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Bereit für die KI-Transformation?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein kostenloses Erstgespräch und erfahren Sie, wie KI Ihr Geschäft transformieren kann.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Kontaktformular</h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Nachricht gesendet!</h4>
                <p className="text-gray-400">
                  Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none transition-colors text-white placeholder-gray-500 ${
                      errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'
                    }`}
                    placeholder="Ihr vollständiger Name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    maxLength={200}
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none transition-colors text-white placeholder-gray-500 ${
                      errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'
                    }`}
                    placeholder="ihre@email.de"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-300">
                    Unternehmen
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    maxLength={200}
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none transition-colors text-white placeholder-gray-500 ${
                      errors.company ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'
                    }`}
                    placeholder="Ihr Unternehmen"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-400">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={2000}
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none transition-colors text-white placeholder-gray-500 resize-none ${
                      errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'
                    }`}
                    placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                <GlassButton
                  type="submit"
                  size="lg"
                  contentClassName="font-medium tracking-wide flex items-center gap-2"
                >
                  Nachricht senden
                  <Send className="w-4 h-4" />
                </GlassButton>
              </form>
            )}
          </div>

          {/* Alternative Contact Options */}
          <div className="space-y-6">
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6 rounded-2xl">
              <h4 className="text-xl font-bold mb-3">Direkter Kontakt</h4>
              <div className="space-y-3 text-gray-400">
                <div>
                  <p className="text-sm text-gray-500 mb-1">E-Mail</p>
                  <a href="mailto:kontakt@vibe-consulting.de" className="hover:text-white transition-colors">
                    kontakt@vibe-consulting.de
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Telefon</p>
                  <a href="tel:+4915012345678" className="hover:text-white transition-colors">
                    +49 150 1234 5678
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6 rounded-2xl">
              <h4 className="text-xl font-bold mb-3">Termin buchen</h4>
              <p className="text-gray-400 mb-4">
                Buchen Sie direkt einen Termin für ein kostenloses Erstgespräch (30 Min).
              </p>
              <a
                href="https://calendly.com/your-link"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <GlassButton
                  size="lg"
                  contentClassName="font-medium tracking-wide w-full"
                >
                  Kalender öffnen
                </GlassButton>
              </a>
            </div>

            <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6 rounded-2xl">
              <h4 className="text-xl font-bold mb-3">Antwortzeit</h4>
              <p className="text-gray-400">
                Wir melden uns in der Regel innerhalb von <span className="text-white font-semibold">24 Stunden</span> bei Ihnen zurück.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
