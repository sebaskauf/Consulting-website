"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // Show after scrolling past hero section
      if (currentScrollY > heroHeight * 0.8) {
        // Hide when scrolling down fast, show when scrolling up or slow
        if (currentScrollY < lastScrollY || currentScrollY - lastScrollY < 50) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Gradient fade at top */}
      <div className="h-6 bg-gradient-to-t from-black/95 to-transparent" />

      {/* CTA Bar */}
      <div className="bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 pb-safe">
        <a
          href="/kontakt"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-[#A0F0FF]/20 to-[#70FFAF]/20 hover:from-[#A0F0FF]/30 hover:to-[#70FFAF]/30 border border-white/20 rounded-xl transition-all duration-300"
        >
          <Calendar className="w-4 h-4 text-[#A0F0FF]" />
          <span className="text-white font-semibold text-sm">
            Unverbindlich beraten lassen
          </span>
        </a>
      </div>
    </div>
  );
}
