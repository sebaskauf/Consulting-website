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

      {/* Contact Form Section */}
      <div className="relative z-10 pt-24">
        <ContactForm />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
