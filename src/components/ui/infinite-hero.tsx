"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { TextRoll } from "./text-roll";
import { GlassButton } from "./glass-button";
import { Logos3 } from "./logos3";

gsap.registerPlugin(SplitText);

export default function InfiniteHero() {
    const rootRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const trustRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const ctas = ctaRef.current ? Array.from(ctaRef.current.children) : [];
            const trustItems = trustRef.current ? Array.from(trustRef.current.children) : [];
            const h1 = h1Ref.current;

            const pSplit = new SplitText(pRef.current, { type: "lines" });

            // Don't split h1 because it contains dynamic GooeyText component
            gsap.set(h1, {
                opacity: 0,
                y: 40,
                filter: "blur(12px)",
            });
            gsap.set(pSplit.lines, {
                opacity: 0,
                y: 20,
                filter: "blur(8px)",
            });
            if (ctas.length) gsap.set(ctas, { opacity: 0, y: 20, scale: 0.95 });
            if (trustItems.length) gsap.set(trustItems, { opacity: 0, y: 20 });

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.to(
                    h1,
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 1.2,
                        clearProps: "transform,filter" // Clear GSAP props after animation
                    },
                    0.2,
                )
                .to(
                    pSplit.lines,
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.8,
                        stagger: 0.1,
                    },
                    "-=0.6",
                )
                .to(ctas, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1 }, "-=0.4")
                .to(trustItems, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.3");

            return () => {
                pSplit.revert();
                // Clear all GSAP inline styles from h1 on cleanup
                if (h1) {
                    gsap.set(h1, { clearProps: "all" });
                }
            };
        },
        { scope: rootRef, dependencies: [] },
    );

    return (
        <div
            id="home"
            ref={rootRef}
            className="relative h-svh w-full overflow-hidden text-white"
            style={{ zIndex: 1, position: 'relative' }}
            data-scroll-section="hero"
        >
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" style={{ zIndex: 1 }} />

            <div className="relative z-10 flex h-svh w-full items-center justify-center px-4 sm:px-6 pb-16 pt-20 sm:pt-16" style={{ zIndex: 10 }}>
                <div className="text-center max-w-4xl mx-auto">
                    <div ref={h1Ref} className="mx-auto max-w-5xl">
                        <div
                            className="text-[clamp(2.5rem,8vw,6.5rem)] text-white text-center"
                            style={{
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                lineHeight: '1.1'
                            }}
                        >
                            <div className="flex items-baseline justify-center sm:flex-nowrap" style={{ gap: 'clamp(0.3rem, 0.7vw, 0.6rem)' }}>
                                <span style={{ whiteSpace: 'nowrap' }}>KI-</span>
                                <TextRoll
                                    texts={["Beratung", "Lösungen", "Automation", "Entwicklung"]}
                                    interval={3000}
                                    className="text-[clamp(2.5rem,8vw,6.5rem)] font-semibold"
                                />
                            </div>
                            <div className="mt-2">für Ihr Unternehmen</div>
                        </div>
                    </div>

                    <p
                        ref={pRef}
                        className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-white/80 leading-relaxed px-2"
                        style={{
                            fontWeight: 400,
                            letterSpacing: '-0.01em'
                        }}
                    >
                        Maßgeschneiderte Automatisierung und intelligente Prozessoptimierung
                        für nachhaltiges Wachstum.
                    </p>

                    <div
                        ref={ctaRef}
                        className="mt-8 sm:mt-10 flex flex-row items-center justify-center gap-2 sm:gap-4 px-4"
                    >
                        <a href="#kontakt" className="flex-1 sm:flex-initial">
                            <GlassButton
                                size="sm"
                                contentClassName="font-semibold tracking-wide text-xs sm:text-sm"
                            >
                                Kostenloses Erstgespräch
                            </GlassButton>
                        </a>

                        <a href="#leistungen" className="flex-1 sm:flex-initial">
                            <GlassButton
                                size="sm"
                                contentClassName="font-semibold tracking-wide text-xs sm:text-sm"
                            >
                                Mehr erfahren
                            </GlassButton>
                        </a>
                    </div>

                    {/* Stats */}
                    <div
                        ref={trustRef}
                        className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-8 max-w-2xl mx-auto px-4"
                    >
                        <div className="text-center">
                            <div className="text-xl sm:text-3xl font-bold text-white mb-1">20+</div>
                            <div className="text-white/60 text-[0.65rem] sm:text-sm uppercase tracking-wide leading-tight">Erfolgreiche Projekte</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl sm:text-3xl font-bold text-white mb-1">98%</div>
                            <div className="text-white/60 text-[0.65rem] sm:text-sm uppercase tracking-wide leading-tight">Kundenzufriedenheit</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl sm:text-3xl font-bold text-white mb-1">24/7</div>
                            <div className="text-white/60 text-[0.65rem] sm:text-sm uppercase tracking-wide leading-tight">Support</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Widget - Company Logos */}
            <div className="absolute bottom-2 sm:bottom-8 left-0 right-0 z-20 px-4">
                <Logos3
                    heading="Vertraut von vielen Unternehmen"
                />
            </div>
        </div>
    );
}
