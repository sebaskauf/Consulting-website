"use client";

import { useState, useRef, useCallback } from "react";
import { Play, Pause, ExternalLink, Shield, Zap, Clock } from "lucide-react";
import { GlassButton } from "./glass-button";

export function KatchupSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = useCallback(async () => {
    const video = videoRef.current;
    if (!video || isLoading) return;

    try {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        // Wait for video to be ready
        if (video.readyState < 3) {
          await new Promise<void>((resolve) => {
            const onCanPlay = () => {
              video.removeEventListener('canplay', onCanPlay);
              resolve();
            };
            video.addEventListener('canplay', onCanPlay);
            video.load();
          });
        }
        await video.play();
        setIsPlaying(true);
      }
    } catch (error) {
      // Ignore AbortError - happens when play() is interrupted
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Video playback error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, isLoading]);

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section className="relative z-10 w-full py-20 sm:py-28">
      {/* Full-width background bar - heller Weißton */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full"
            style={{
              background: 'rgba(220, 38, 38, 0.15)',
              color: '#FF6B6B',
              border: '1px solid rgba(220, 38, 38, 0.3)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Unsere Software
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-red-400">Katchup</span>{" "}
            <span className="text-white">AI</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Integrieren Sie KI in Ihr Unternehmen - einfach, schnell und DSGVO-konform.
            Erstellen Sie Ihren eigenen Custom AI Chatbot in nur 30 Minuten.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video Section */}
          <div className="relative">
            <div
              className="relative rounded-2xl overflow-hidden aspect-video cursor-pointer group"
              onClick={handlePlayClick}
              style={{
                background: 'linear-gradient(135deg, #1a0a0a 0%, #0a0a0a 100%)',
                border: '1px solid rgba(220, 38, 38, 0.2)',
                boxShadow: '0 20px 60px rgba(220, 38, 38, 0.15)',
              }}
            >
              {/* Video */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                onEnded={handleVideoEnded}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                playsInline
                preload="metadata"
              >
                <source src="/videos/katchup-demo.mp4" type="video/mp4" />
              </video>

              {/* Play/Pause Button Overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all ${
                  isPlaying ? 'bg-transparent opacity-0 hover:opacity-100 hover:bg-black/20' : 'bg-black/40 group-hover:bg-black/30'
                }`}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isLoading ? 'animate-pulse' : ''
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                    boxShadow: '0 8px 32px rgba(220, 38, 38, 0.4)',
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" fill="white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  )}
                </div>
              </div>

              {/* Katchup AI Branding */}
              {!isPlaying && (
                <div className="absolute top-4 left-4">
                  <span className="text-sm font-bold text-white bg-red-600/80 px-3 py-1 rounded-full">
                    Katchup AI Demo
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(220, 38, 38, 0.1)',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                }}
              >
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Schnelle Einrichtung
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Verbinden Sie ChatGPT, Claude oder Gemini mit Ihren internen Tools und Daten in nur 30 Minuten.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(220, 38, 38, 0.1)',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                }}
              >
                <Zap className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Top AI Modelle
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Nutzen Sie die leistungsstärksten AI-Modelle - ChatGPT, Claude, Gemini - mit Ihren Unternehmensdaten.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(220, 38, 38, 0.1)',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                }}
              >
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  DSGVO-Konform
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Vollständig datenschutzkonform nach EU-Richtlinien. Ihre Daten bleiben sicher und geschützt.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="https://katchup.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <GlassButton
                  size="lg"
                  contentClassName="font-semibold tracking-wide"
                  style={{
                    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(220, 38, 38, 0.1))',
                    borderColor: 'rgba(220, 38, 38, 0.4)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    Katchup AI entdecken
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </GlassButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
