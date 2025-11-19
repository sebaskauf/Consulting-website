"use client";

import { useState } from "react";
import { GlassButton } from "./glass-button";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                    placeholder="Ihr vollständiger Name"
                  />
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
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                    placeholder="ihre@email.de"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-300">
                    Unternehmen
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                    placeholder="Ihr Unternehmen"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500 resize-none"
                    placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                  />
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
              <GlassButton
                size="md"
                contentClassName="font-medium tracking-wide w-full"
                onClick={() => window.open("https://calendly.com/your-link", "_blank")}
              >
                Kalender öffnen
              </GlassButton>
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
