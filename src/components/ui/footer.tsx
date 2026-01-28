"use client";

import { Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  const company = [
    { title: "Über uns", href: "#about" },
    { title: "Services", href: "#services" },
    { title: "Use Cases", href: "#use-cases" },
    { title: "Blog", href: "#blog" },
  ];

  const legal = [
    { title: "Impressum", href: "/impressum" },
    { title: "Datenschutz", href: "/datenschutz" },
    { title: "AGB", href: "/agb" },
    { title: "Cookie-Richtlinie", href: "/cookies" },
  ];

  const resources = [
    { title: "FAQ", href: "#faq" },
    { title: "Kontakt", href: "#contact" },
    { title: "Karriere", href: "/karriere" },
    { title: "Partner werden", href: "/partner" },
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/company/vibe-consulting",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:sebastian@skaile.de",
      label: "E-Mail",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      href: "tel:+4915012345678",
      label: "Telefon",
    },
  ];

  return (
    <footer className="relative z-10 bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Vibe Consulting
              </h3>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                KI-Beratung & Automation
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 sm:mb-6 max-w-md">
              Wir helfen Unternehmen dabei, das volle Potenzial von künstlicher Intelligenz zu nutzen - von der Strategie bis zur Implementierung.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 rounded-lg p-2.5 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
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

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="max-w-md">
            <h4 className="text-base sm:text-lg font-semibold mb-2">Newsletter abonnieren</h4>
            <p className="text-gray-400 text-sm mb-4">
              Bleiben Sie auf dem Laufenden über KI-Trends und Best Practices.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="ihre@email.de"
                className="flex-1 px-3 sm:px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500 text-sm"
              />
              <button
                type="submit"
                className="px-5 sm:px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-all duration-300 text-sm font-medium whitespace-nowrap"
              >
                Anmelden
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © {year} Vibe Consulting. Alle Rechte vorbehalten.
          </p>
          <p className="text-gray-500 text-xs text-center md:text-right">
            Made with 🤖 & ❤️ in Deutschland
          </p>
        </div>
      </div>
    </footer>
  );
}
