"use client";

export function ContactSection() {
  return (
    <section id="kontakt" className="relative z-10 bg-black/80 backdrop-blur-sm text-white py-20 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            Kontakt
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Lassen Sie uns über Ihr nächstes KI-Projekt sprechen
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500 text-sm sm:text-base"
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500 text-sm sm:text-base"
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
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500 text-sm sm:text-base"
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
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500 resize-none text-sm sm:text-base"
                placeholder="Erzählen Sie uns von Ihrem Projekt..."
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#80E8FF] to-[#A0F0FF] text-black font-semibold rounded-full hover:shadow-2xl hover:shadow-[#80E8FF]/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
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
