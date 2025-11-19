"use client";

export function ContactSection() {
  return (
    <section id="kontakt" className="relative z-10 bg-black/80 backdrop-blur-sm text-white py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Kontakt
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Lassen Sie uns über Ihr nächstes KI-Projekt sprechen
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                  placeholder="Ihr Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                  placeholder="ihre@email.de"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white/90 mb-2">
                Unternehmen
              </label>
              <input
                type="text"
                id="company"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                placeholder="Ihr Unternehmen"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                Nachricht
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500 resize-none"
                placeholder="Erzählen Sie uns von Ihrem Projekt..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-[#80E8FF] to-[#A0F0FF] text-black font-semibold rounded-full hover:shadow-2xl hover:shadow-[#80E8FF]/50 transition-all duration-300 hover:scale-105"
              >
                Nachricht senden
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
