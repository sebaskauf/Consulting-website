"use client";

import { GlassButton } from "./glass-button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand Name */}
          <div className="flex items-center">
            <a href="#home" className="text-2xl font-bold text-white tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
              KALO AI
            </a>
          </div>

          {/* Glassmorphic Navigation Pills */}
          <div className="hidden md:flex items-center space-x-1 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 p-1.5">
            <a
              href="#home"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              Home
            </a>
            <a
              href="#leistungen"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              Leistungen
            </a>
            <a
              href="#prozess"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              Prozess
            </a>
            <a
              href="#kontakt"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              Kontakt
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <a href="#kontakt">
              <GlassButton
                size="sm"
                contentClassName="font-semibold"
              >
                Beratung anfragen
              </GlassButton>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
