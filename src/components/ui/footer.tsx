"use client";

export function Footer() {
  const year = new Date().getFullYear();

  const company = [
    { title: "Über uns", href: "/ueber-uns" },
    { title: "Services", href: "/#services" },
    { title: "Blog", href: "#blog" },
  ];

  const legal = [
    { title: "Impressum", href: "/impressum" },
    { title: "Datenschutz", href: "/datenschutz" },
    { title: "AGB", href: "/agb" },
  ];

  const resources = [
    { title: "FAQ", href: "/#faq" },
    { title: "Kontakt", href: "/kontakt" },
  ];

  return (
    <footer className="relative z-10 bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Vibe Consulting
              </h3>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                KI-Beratung & Automation
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Wir helfen Unternehmen dabei, das volle Potenzial von künstlicher Intelligenz zu nutzen - von der Strategie bis zur Implementierung.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 text-gray-300 uppercase tracking-wider">
              Unternehmen
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 text-gray-300 uppercase tracking-wider">
              Ressourcen
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 text-gray-300 uppercase tracking-wider">
              Rechtliches
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex justify-center items-center">
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            © {year} Vibe Consulting. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
