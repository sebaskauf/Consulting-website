"use client";

import { GlassButton } from "./glass-button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#leistungen", label: "Leistungen" },
    { href: "/#prozess", label: "Prozess" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Brand Name */}
          <div className="flex items-center">
            <a href="#home" className="text-xl sm:text-2xl font-bold text-white tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
              KALO AI
            </a>
          </div>

          {/* Glassmorphic Navigation Pills - Desktop */}
          <div className="hidden md:flex items-center space-x-1 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 p-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-5 py-2.5 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/kontakt">
              <GlassButton
                size="sm"
                contentClassName="font-semibold"
              >
                Beratung anfragen
              </GlassButton>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="px-4 py-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-white/90 hover:bg-white/10 hover:text-white transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10">
              <a href="/kontakt" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                <GlassButton
                  size="sm"
                  contentClassName="font-semibold w-full text-center"
                >
                  Beratung anfragen
                </GlassButton>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
