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

            <div className="relative z-10 flex h-svh w-full items-center justify-center px-4 sm:px-6 pb-20 sm:pb-16 pt-12 sm:pt-12" style={{ zIndex: 10 }}>
                <div className="text-center max-w-4xl mx-auto -mt-12 sm:-mt-6">
                    <div ref={h1Ref} className="mx-auto max-w-5xl">
                        <div
                            className="text-white text-center"
                            style={{
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                lineHeight: '1.15'
                            }}
                        >
                            {/* Mobile: 2 lines, Desktop: 3 lines */}
                            <div className="sm:hidden text-[clamp(1.8rem,7vw,5rem)]">
                                <div className="flex items-baseline justify-center flex-nowrap" style={{ gap: 'clamp(0.2rem, 0.4vw, 0.4rem)' }}>
                                    <span style={{ whiteSpace: 'nowrap' }}>KI-</span>
                                    <TextRoll
                                        texts={["Beratung", "Lösungen", "Automation", "Entwicklung"]}
                                        interval={3000}
                                        className="font-semibold whitespace-nowrap"
                                    />
                                    <span style={{ whiteSpace: 'nowrap' }}>für</span>
                                </div>
                                <div className="mt-1 whitespace-nowrap">Ihr Unternehmen</div>
                            </div>

                            {/* Desktop: Original 3-line layout */}
                            <div className="hidden sm:block text-[clamp(3.5rem,8vw,6.5rem)]">
                                <div className="flex items-baseline justify-center" style={{ gap: 'clamp(0.4rem, 0.7vw, 0.6rem)', flexWrap: 'nowrap', marginBottom: '-0.3em' }}>
                                    <span style={{ whiteSpace: 'nowrap' }}>KI-</span>
                                    <TextRoll
                                        texts={["Beratung", "Lösungen", "Automation", "Entwicklung"]}
                                        interval={3000}
                                        className="font-semibold"
                                    />
                                    <span style={{ whiteSpace: 'nowrap' }}>für</span>
                                </div>
                                <div style={{ marginTop: '-0.45em' }}>Ihr Unternehmen</div>
                            </div>
                        </div>
                    </div>

                    <p
                        ref={pRef}
                        className="mx-auto mt-6 sm:mt-4 max-w-2xl text-sm sm:text-lg md:text-xl text-white/80 leading-relaxed px-2"
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
                            <div className="sm:hidden">
                                <GlassButton
                                    size="sm"
                                    contentClassName="font-semibold tracking-wide text-xs"
                                >
                                    Kostenloses Erstgespräch
                                </GlassButton>
                            </div>
                            <div className="hidden sm:block">
                                <GlassButton
                                    size="lg"
                                    contentClassName="font-semibold tracking-wide"
                                >
                                    Kostenloses Erstgespräch
                                </GlassButton>
                            </div>
                        </a>

                        <a href="#leistungen" className="flex-1 sm:flex-initial">
                            <div className="sm:hidden">
                                <GlassButton
                                    size="sm"
                                    contentClassName="font-semibold tracking-wide text-xs"
                                >
                                    Mehr erfahren
                                </GlassButton>
                            </div>
                            <div className="hidden sm:block">
                                <GlassButton
                                    size="lg"
                                    contentClassName="font-semibold tracking-wide"
                                >
                                    Mehr erfahren
                                </GlassButton>
                            </div>
                        </a>
                    </div>

                    {/* Stats */}
                    <div
                        ref={trustRef}
                        className="mt-6 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-8 max-w-2xl mx-auto px-2 sm:px-4"
                    >
                        <div className="text-center">
                            <div className="text-lg sm:text-3xl font-bold text-white mb-1 sm:mb-2">20+</div>
                            <div className="text-white/60 text-[0.55rem] sm:text-sm uppercase tracking-tight sm:tracking-wide leading-tight px-1">Erfolgreiche Projekte</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg sm:text-3xl font-bold text-white mb-1 sm:mb-2">98%</div>
                            <div className="text-white/60 text-[0.55rem] sm:text-sm uppercase tracking-tight sm:tracking-wide leading-tight px-1">Kunden-zufriedenheit</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg sm:text-3xl font-bold text-white mb-1 sm:mb-2">24/7</div>
                            <div className="text-white/60 text-[0.55rem] sm:text-sm uppercase tracking-tight sm:tracking-wide leading-tight px-1">Support</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Widget - Company Logos */}
            <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 z-20 px-4">
                <Logos3
                    heading="Vertraut von vielen Unternehmen"
                />
            </div>
        </div>
    );
}
