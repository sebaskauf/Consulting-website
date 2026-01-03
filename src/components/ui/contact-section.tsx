"use client";

export function ContactSection() {
  return (
    <section id="kontakt" className="relative z-10 bg-black/80 backdrop-blur-sm text-white py-20 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            Kostenloses Erstgespräch buchen
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Wählen Sie einen passenden Termin und lassen Sie uns über Ihr KI-Projekt sprechen
          </p>
        </div>

        {/* Cal.com iFrame Embed */}
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <iframe
            src="https://cal.com/sebastian-kauffmann?embed=true&theme=dark"
            width="100%"
            height="800"
            frameBorder="0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            style={{
              border: "none",
              minHeight: "600px",
            }}
          />
        </div>

        {/* Alternative Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-sm sm:text-base text-gray-400 mb-4">
            Alternativ können Sie uns auch direkt kontaktieren:
          </p>
          <a
            href="mailto:sebaskauf.business@gmail.com"
            className="inline-flex items-center gap-2 text-[#A0F0FF] hover:text-[#80E8FF] transition-colors text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            sebaskauf.business@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
