"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/navbar";
import { ContactForm } from "@/components/ui/contact-form";
import { Footer } from "@/components/ui/footer";
import LiquidEther from "@/components/ui/liquid-ether";

const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });

export default function KontaktPage() {
  // Color palette for contact page - calming purple/blue
  const liquidColors = ['#C8B3FF', '#D4C5FF', '#BFA8FF', '#E0D5FF', '#B89FFF', '#DCC8FF', '#C0AAFF'];
  const beamsColor = '#D4C5FF';

  return (
    <main className="min-h-screen bg-black relative">
      {/* Navigation Bar */}
      <Navbar />

      {/* Background Layer 1: Beams */}
      <div className="fixed inset-0 z-0 opacity-65 mix-blend-lighten pointer-events-none">
        <Beams
          lightColor={beamsColor}
          beamWidth={2.5}
          beamHeight={18}
          beamNumber={15}
          speed={2.5}
          noiseIntensity={2}
          scale={0.15}
          rotation={43}
        />
      </div>

      {/* Background Layer 2: LiquidEther */}
      <div className="fixed inset-0 z-0">
        <LiquidEther
          colors={liquidColors}
          mouseForce={0}
          cursorSize={0}
          resolution={0.3}
          autoDemo={true}
          autoSpeed={0.6}
          autoIntensity={6.5}
          autoResumeDelay={0}
          autoRampDuration={0.8}
          dt={0.018}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Vignette overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      {/* Cal.com Booking Section */}
      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
            Kostenloses Erstgespräch buchen
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Wählen Sie einen passenden Termin für Ihr KI-Projekt
          </p>
        </div>

        {/* Cal.com Embed - Direct 30 Min Meeting */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden shadow-2xl">
            <iframe
              src="https://cal.com/sebastian-kauffmann/30min?embed=true&theme=dark"
              width="100%"
              height="600"
              frameBorder="0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              style={{
                border: "none",
                minHeight: "550px",
                display: "block",
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
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
