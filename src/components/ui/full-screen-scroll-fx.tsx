"use client";
import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidEther from "./liquid-ether";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Section = {
  id?: string;
  background?: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  rightLabel?: ReactNode;
  footer?: string | ReactNode;
  liquidEtherColors?: string[];
  renderBackground?: (active: boolean, previous: boolean) => ReactNode;
};

type Colors = Partial<{
  text: string;
  overlay: string;
  pageBg: string;
  stageBg: string;
}>;

type Durations = Partial<{
  change: number;
  snap: number;
}>;

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
  refresh: () => void;
};

export type FullScreenFXProps = {
  sections: Section[];
  className?: string;
  style?: CSSProperties;

  fontFamily?: string;
  header?: ReactNode;
  footer?: ReactNode;
  gap?: number;
  gridPaddingX?: number;

  showProgress?: boolean;
  debug?: boolean;

  durations?: Durations;
  reduceMotion?: boolean;
  smoothScroll?: boolean;

  bgTransition?: "fade" | "wipe";
  parallaxAmount?: number;

  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;

  colors?: Colors;

  apiRef?: React.Ref<FullScreenFXAPI>;
  ariaLabel?: string;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  (
    {
      sections,
      className,
      style,

      fontFamily = '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
      header,
      footer,
      gap = 1,
      gridPaddingX = 2,

      showProgress = true,
      debug = false,

      durations = { change: 0.7, snap: 800 },
      reduceMotion,
      smoothScroll = false,

      bgTransition = "fade",
      parallaxAmount = 4,

      currentIndex,
      onIndexChange,
      initialIndex = 0,

      colors = {
        text: "rgba(245,245,245,0.92)",
        overlay: "rgba(0,0,0,0.35)",
        pageBg: "#000000",
        stageBg: "#000000",
      },

      apiRef,
      ariaLabel = "Full screen scroll slideshow",
    },
    ref
  ) => {
    const total = sections.length;
    const [localIndex, setLocalIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)));
    const isControlled = typeof currentIndex === "number";
    const index = isControlled ? clamp(currentIndex!, 0, Math.max(0, total - 1)) : localIndex;

    const rootRef = useRef<HTMLDivElement | null>(null);
    const fixedRef = useRef<HTMLDivElement | null>(null);
    const fixedSectionRef = useRef<HTMLDivElement | null>(null);

    const bgRefs = useRef<HTMLImageElement[]>([]);
    const wordRefs = useRef<HTMLSpanElement[][]>([]);

    const leftTrackRef = useRef<HTMLDivElement | null>(null);
    const rightTrackRef = useRef<HTMLDivElement | null>(null);
    const leftItemRefs = useRef<HTMLDivElement[]>([]);
    const rightItemRefs = useRef<HTMLDivElement[]>([]);

    const progressFillRef = useRef<HTMLDivElement | null>(null);
    const currentNumberRef = useRef<HTMLSpanElement | null>(null);

    const stRef = useRef<ScrollTrigger | null>(null);
    const lastIndexRef = useRef(index);
    const isAnimatingRef = useRef(false);
    const isSnappingRef = useRef(false);
    const sectionTopRef = useRef<number[]>([]);

    const prefersReduced = useMemo(() => {
      if (typeof window === "undefined") return false;
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);
    const motionOff = reduceMotion ?? prefersReduced;

    const tempWordBucket = useRef<HTMLSpanElement[]>([]);
    const splitWords = (text: string) => {
      const words = text.split(/\s+/).filter(Boolean);
      return words.map((w, i) => (
        <span className="fx-word-mask" key={i}>
          <span className="fx-word" ref={(el) => { if (el) tempWordBucket.current.push(el); }}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ));
    };
    const WordsCollector = ({ onReady }: { onReady: () => void }) => {
      useEffect(() => onReady(), []); // eslint-disable-line
      return null;
    };

    const computePositions = () => {
      const el = fixedSectionRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      const arr: number[] = [];
      for (let i = 0; i < total; i++) arr.push(top + (h * i) / total);
      sectionTopRef.current = arr;
    };

    const measureAndCenterLists = (toIndex = index, animate = true) => {
      // Skip centering on mobile - numbers are absolute positioned
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
      if (isMobile) return;

      const centerTrack = (
        container: HTMLDivElement | null,
        items: HTMLDivElement[],
        isRight: boolean
      ) => {
        if (!container || items.length === 0) return;
        const first = items[0];
        const second = items[1];
        const contRect = container.getBoundingClientRect();
        let rowH = first.getBoundingClientRect().height;
        if (second) {
          rowH = second.getBoundingClientRect().top - first.getBoundingClientRect().top;
        }
        const targetY = contRect.height / 2 - rowH / 2 - toIndex * rowH;
        const prop = isRight ? rightTrackRef : leftTrackRef;
        if (!prop.current) return;
        if (animate) {
          gsap.to(prop.current, {
            y: targetY,
            duration: (durations.change ?? 0.7) * 0.9,
            ease: "power3.out",
          });
        } else {
          gsap.set(prop.current, { y: targetY });
        }
      };

      measureRAF(() => {
        measureRAF(() => {
          centerTrack(leftTrackRef.current, leftItemRefs.current, false);
          centerTrack(rightTrackRef.current, rightItemRefs.current, true);
        });
      });
    };

    const measureRAF = (fn: () => void) => {
      if (typeof window === "undefined") return;
      requestAnimationFrame(() => requestAnimationFrame(fn));
    };

    useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      const fixed = fixedRef.current;
      const fs = fixedSectionRef.current;
      if (!fixed || !fs || total === 0) return;

      gsap.set(bgRefs.current, { opacity: 0, scale: 1.04, yPercent: 0 });
      if (bgRefs.current[0]) gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });

      // Set initial state for numbers on mobile
      const isMobile = window.innerWidth <= 900;
      if (isMobile) {
        leftItemRefs.current.forEach((el, i) => {
          gsap.set(el, {
            opacity: i === index ? 1 : 0,
            scale: 1,
          });
        });
      }

      // Wait for all word refs to be collected
      requestAnimationFrame(() => {
        wordRefs.current.forEach((words, sIdx) => {
          if (!words || words.length === 0) return;
          words.forEach((w) => {
            gsap.set(w, {
              yPercent: sIdx === index ? 0 : 100,
              opacity: sIdx === index ? 1 : 0,
            });
          });
        });
      });

      computePositions();
      measureAndCenterLists(index, false);

      const st = ScrollTrigger.create({
        trigger: fs,
        start: "top top",
        end: "bottom bottom",
        pin: fixed,
        pinSpacing: true,
        snap: {
          snapTo: (progress) => {
            const total_sections = total - 1;
            const snapped = Math.round(progress * total_sections) / total_sections;
            return snapped;
          },
          duration: { min: 0.4, max: 0.6 },
          delay: 0.1,
          ease: "power2.out",
        },
        onUpdate: (self) => {
          if (motionOff) return;

          const prog = self.progress;
          const target = Math.min(total - 1, Math.max(0, Math.round(prog * (total - 1))));

          if (target === lastIndexRef.current) return;
          if (isAnimatingRef.current) return;

          // Just transition to the target
          changeSection(target);

          // Update progress bar
          if (progressFillRef.current) {
            const p = (lastIndexRef.current / (total - 1 || 1)) * 100;
            progressFillRef.current.style.width = `${p}%`;
          }
        },
      });

      stRef.current = st;

      if (initialIndex && initialIndex > 0 && initialIndex < total) {
        requestAnimationFrame(() => goTo(initialIndex, false));
      }

      const ro = new ResizeObserver(() => {
        computePositions();
        measureAndCenterLists(lastIndexRef.current, false);
        ScrollTrigger.refresh();
      });
      ro.observe(fs);

      return () => {
        ro.disconnect();
        st.kill();
        stRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total, initialIndex, motionOff, bgTransition, parallaxAmount]);

    const changeSection = (to: number) => {
      if (to === lastIndexRef.current) return;

      const from = lastIndexRef.current;
      const down = to > from;

      // Update lastIndexRef IMMEDIATELY
      lastIndexRef.current = to;
      isAnimatingRef.current = true;

      if (!isControlled) setLocalIndex(to);
      onIndexChange?.(to);

      if (currentNumberRef.current) {
        currentNumberRef.current.textContent = String(to + 1).padStart(2, "0");
      }
      if (progressFillRef.current) {
        const p = (to / (total - 1 || 1)) * 100;
        progressFillRef.current.style.width = `${p}%`;
      }

      // Faster transition duration
      const D = 0.45;

      const outWords = wordRefs.current[from] || [];
      const inWords = wordRefs.current[to] || [];
      if (outWords.length) {
        gsap.to(outWords, {
          yPercent: down ? -100 : 100,
          opacity: 0,
          duration: D * 0.5,
          stagger: down ? 0.02 : -0.02,
          ease: "power2.out",
        });
      }
      if (inWords.length) {
        gsap.set(inWords, { yPercent: down ? 100 : -100, opacity: 0 });
        gsap.to(inWords, {
          yPercent: 0,
          opacity: 1,
          duration: D * 0.8,
          stagger: down ? 0.03 : -0.03,
          ease: "power2.out",
        });
      }

      const prevBg = bgRefs.current[from];
      const newBg = bgRefs.current[to];
      if (bgTransition === "fade") {
        if (newBg) {
          gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 1 : -1 });
          gsap.to(newBg, { opacity: 1, scale: 1, yPercent: 0, duration: D, ease: "power2.out" });
        }
        if (prevBg) {
          gsap.to(prevBg, {
            opacity: 0,
            yPercent: down ? -parallaxAmount : parallaxAmount,
            duration: D,
            ease: "power2.out",
          });
        }
      } else {
        if (newBg) {
          gsap.set(newBg, {
            opacity: 1,
            clipPath: down ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
            scale: 1,
            yPercent: 0,
          });
          gsap.to(newBg, { clipPath: "inset(0 0 0 0)", duration: D, ease: "power3.out" });
        }
        if (prevBg) {
          gsap.to(prevBg, { opacity: 0, duration: D * 0.8, ease: "power2.out" });
        }
      }

      measureAndCenterLists(to, true);

      leftItemRefs.current.forEach((el, i) => {
        el.classList.toggle("active", i === to);

        // Different animation for mobile vs desktop
        const isMobile = window.innerWidth <= 900;

        if (isMobile) {
          // Mobile: center numbers with scale animation
          gsap.to(el, {
            opacity: i === to ? 1 : 0,
            scale: i === to ? 1 : 0.8,
            duration: D * 0.6,
            ease: "power3.out",
          });
        } else {
          // Desktop: original animation
          gsap.to(el, {
            opacity: i === to ? 1 : 0.35,
            x: i === to ? 10 : 0,
            duration: D * 0.6,
            ease: "power3.out",
          });
        }
      });
      rightItemRefs.current.forEach((el, i) => {
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : 0.35,
          x: i === to ? -10 : 0,
          duration: D * 0.6,
          ease: "power3.out",
        });
      });

      // Only reset animation flag after animation completes
      gsap.delayedCall(D, () => {
        isAnimatingRef.current = false;
      });
    };

    const goTo = (to: number, withScroll = true) => {
      const clamped = clamp(to, 0, total - 1);
      isSnappingRef.current = true;
      changeSection(clamped);

      const pos = sectionTopRef.current[clamped];
      const snapMs = durations.snap ?? 800;

      if (withScroll && typeof window !== "undefined") {
        window.scrollTo({ top: pos, behavior: "smooth" });
        setTimeout(() => (isSnappingRef.current = false), snapMs);
      } else {
        setTimeout(() => (isSnappingRef.current = false), 10);
      }
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    useImperativeHandle(apiRef, () => ({
      next,
      prev,
      goTo,
      getIndex: () => index,
      refresh: () => ScrollTrigger.refresh(),
    }));

    const handleJump = (i: number) => goTo(i);
    const handleLoadedStagger = () => {
      leftItemRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: i === index ? 1 : 0.35, y: 0, duration: 0.5, delay: i * 0.06, ease: "power3.out" }
        );
      });
      rightItemRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: i === index ? 1 : 0.35, y: 0, duration: 0.5, delay: 0.2 + i * 0.06, ease: "power3.out" }
        );
      });
    };

    useEffect(() => {
      handleLoadedStagger();
      measureAndCenterLists(index, false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cssVars: CSSProperties = {
      ["--fx-font" as any]: fontFamily,
      ["--fx-text" as any]: colors.text ?? "rgba(245,245,245,0.92)",
      ["--fx-overlay" as any]: colors.overlay ?? "rgba(0,0,0,0.35)",
      ["--fx-page-bg" as any]: colors.pageBg ?? "#000",
      ["--fx-stage-bg" as any]: colors.stageBg ?? "#000",
      ["--fx-gap" as any]: `${gap}rem`,
      ["--fx-grid-px" as any]: `${gridPaddingX}rem`,
      ["--fx-row-gap" as any]: "10px",
    };

    return (
      <div
        ref={(node) => {
          (rootRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={["fx", className].filter(Boolean).join(" ")}
        style={{ ...cssVars, ...style }}
        aria-label={ariaLabel}
      >
        {debug && <div className="fx-debug">Section: {index}</div>}

        <div className="fx-scroll">
          <div className="fx-fixed-section" ref={fixedSectionRef}>
            <div className="fx-fixed" ref={fixedRef}>
              {/* Backgrounds */}
              <div className="fx-bgs" aria-hidden="true">
                {sections.map((s, i) => (
                  <div className="fx-bg" key={s.id ?? i}>
                    {s.renderBackground ? (
                      s.renderBackground(index === i, lastIndexRef.current === i)
                    ) : s.liquidEtherColors ? (
                      <div
                        className="fx-liquid-ether-wrapper"
                        style={{
                          opacity: index === i ? 1 : 0,
                          transition: 'opacity 0.7s ease',
                          pointerEvents: index === i ? 'auto' : 'none'
                        }}
                      >
                        <LiquidEther
                          colors={s.liquidEtherColors}
                          mouseForce={20}
                          cursorSize={100}
                          resolution={0.5}
                          autoDemo={true}
                          autoSpeed={0.15}
                          autoIntensity={0.8}
                          autoResumeDelay={0}
                          autoRampDuration={2.0}
                          style={{ position: 'absolute', inset: 0 }}
                        />
                      </div>
                    ) : s.background ? (
                      <>
                        <img
                          ref={(el) => { if (el) bgRefs.current[i] = el; }}
                          src={s.background}
                          alt=""
                          className="fx-bg-img"
                        />
                        <div className="fx-bg-overlay" />
                      </>
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="fx-grid">
                {header && <div className="fx-header">{header}</div>}

                <div className="fx-content">
                  <div className="fx-left" role="list">
                    <div className="fx-track" ref={leftTrackRef}>
                      {sections.map((s, i) => (
                        <div
                          key={`L-${s.id ?? i}`}
                          className={`fx-item fx-left-item ${i === index ? "active" : ""}`}
                          ref={(el) => { if (el) leftItemRefs.current[i] = el; }}
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.leftLabel}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="fx-center">
                    {sections.map((s, sIdx) => {
                      const isString = typeof s.title === "string";
                      const bucketKey = `bucket-${sIdx}`;

                      return (
                        <div key={`C-${s.id ?? sIdx}`} className={`fx-featured ${sIdx === index ? "active" : ""}`}>
                          <h3 className="fx-featured-title">
                            {isString && typeof s.title === 'string' ? (
                              <>
                                {(() => { tempWordBucket.current = []; return null; })()}
                                {(s.title as string).split(/\s+/).filter(Boolean).map((w, i) => (
                                  <span className="fx-word-mask" key={i}>
                                    <span className="fx-word" ref={(el) => {
                                      if (el) {
                                        if (!wordRefs.current[sIdx]) wordRefs.current[sIdx] = [];
                                        if (!wordRefs.current[sIdx].includes(el)) {
                                          wordRefs.current[sIdx].push(el);
                                        }
                                      }
                                    }}>{w}</span>
                                    {i < (s.title as string).split(/\s+/).filter(Boolean).length - 1 ? " " : null}
                                  </span>
                                ))}
                              </>
                            ) : s.title}
                          </h3>
                        </div>
                      );
                    })}
                  </div>

                  <div className="fx-right" role="list">
                    <div className="fx-track" ref={rightTrackRef}>
                      {sections.map((s, i) => (
                        <div
                          key={`R-${s.id ?? i}`}
                          className={`fx-item fx-right-item ${i === index ? "active" : ""}`}
                          ref={(el) => { if (el) rightItemRefs.current[i] = el; }}
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.rightLabel}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="fx-footer">
                  {/* Mobile: Show title and description together */}
                  <div className="sm:hidden">
                    {sections.map((s, i) => (
                      <div
                        key={`footer-mobile-${s.id ?? i}`}
                        className={`${i === index ? "block" : "hidden"}`}
                      >
                        <div className="fx-footer-title">{s.title}</div>
                        <div className="fx-footer-description active">{s.footer}</div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop: Original layout */}
                  <div className="hidden sm:block">
                    {sections.map((s, i) => (
                      <div
                        key={`footer-${s.id ?? i}`}
                        className={`fx-footer-description ${i === index ? "active" : ""}`}
                      >
                        {s.footer}
                      </div>
                    ))}
                    {footer && <div className="fx-footer-title">{footer}</div>}
                  </div>

                  {showProgress && (
                    <div className="fx-progress">
                      <div className="fx-progress-numbers">
                        <span ref={currentNumberRef}>{String(index + 1).padStart(2, "0")}</span>
                        <span>{String(total).padStart(2, "0")}</span>
                      </div>
                      <div className="fx-progress-bar">
                        <div className="fx-progress-fill" ref={progressFillRef} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .fx {
            width: 100%;
            overflow: hidden;
            background: var(--fx-page-bg);
            color: #000;
            font-family: var(--fx-font);
            text-transform: uppercase;
            letter-spacing: -0.02em;
          }

          .fx-debug {
            position: fixed; bottom: 10px; right: 10px; z-index: 9999;
            background: rgba(255,255,255,0.8); color: #000; padding: 6px 8px; font: 12px/1 monospace; border-radius: 4px;
          }

          .fx-fixed-section { height: ${Math.max(1, total)}00vh; position: relative; }
          .fx-fixed { position: sticky; top: 0; height: 100vh; width: 100%; overflow: hidden; background: var(--fx-page-bg); }

          .fx-grid {
            display: flex;
            flex-direction: column;
            padding: 0 var(--fx-grid-px);
            position: relative;
            height: 100%;
            z-index: 2;
          }

          .fx-bgs { position: absolute; inset: 0; background: var(--fx-stage-bg); z-index: 1; }
          .fx-bg { position: absolute; inset: 0; }
          .fx-bg-img {
            position: absolute; inset: -10% 0 -10% 0;
            width: 100%; height: 120%; object-fit: cover;
            filter: brightness(0.8);
            opacity: 0;
            will-change: transform, opacity;
          }
          .fx-bg-overlay { position: absolute; inset: 0; background: var(--fx-overlay); }
          .fx-liquid-ether-wrapper {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }

          .fx-header {
            padding: 8vh 0 3vh;
            line-height: 1.2;
            text-align: center;
            color: var(--fx-text);
            flex-shrink: 0;
          }
          .fx-header > * { display: block; }

          .fx-content {
            flex: 1;
            display: grid;
            grid-template-columns: minmax(200px, 300px) 1fr minmax(150px, 200px);
            gap: 2rem;
            align-items: center;
            min-height: 0;
            padding: 2vh 0;
          }

          @media (max-width: 768px) {
            .fx-content {
              padding: 1vh 0;
            }
          }

          .fx-left, .fx-right {
            height: 100%;
            max-height: 50vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .fx-left { align-items: flex-start; }
          .fx-right { align-items: flex-end; }
          .fx-track { will-change: transform; }

          .fx-item {
            color: var(--fx-text);
            font-weight: 800;
            letter-spacing: 0em;
            line-height: 1.2;
            margin: calc(var(--fx-row-gap) / 2) 0;
            opacity: 0.35;
            transition: opacity 0.3s ease, transform 0.3s ease;
            position: relative;
            font-size: clamp(0.75rem, 2vw, 1.4rem);
            user-select: none;
            cursor: pointer;
            word-wrap: break-word;
            max-width: 100%;
          }

          @media (max-width: 768px) {
            .fx-item {
              font-size: clamp(1.5rem, 4vw, 2rem);
              margin: 0.5rem 0;
            }
          }
          .fx-left-item.active, .fx-right-item.active { opacity: 1; }
          .fx-left-item.active { transform: translateX(0px); }
          .fx-right-item.active { transform: translateX(0px); padding-right: 16px; }

          .fx-right-item.active::after {
            content: "";
            position: absolute; top: 50%; transform: translateY(-50%);
            width: 6px; height: 6px; background: var(--fx-text); border-radius: 50%;
            right: 0;
          }

          .fx-center {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            padding: 0 2rem;
          }
          .fx-featured {
            position: absolute;
            opacity: 0;
            visibility: hidden;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .fx-featured.active { opacity: 1; visibility: visible; }
          .fx-featured-title {
            margin: 0;
            color: var(--fx-text);
            font-weight: 900;
            letter-spacing: -0.02em;
            font-size: clamp(2.5rem, 6vw, 5rem);
            line-height: 1.15;
            max-width: 100%;
            word-wrap: break-word;
          }

          @media (max-width: 768px) {
            .fx-featured-title {
              font-size: clamp(1.75rem, 5vw, 2.5rem);
              line-height: 1.2;
            }
          }
          .fx-word-mask { display: inline-block; overflow: hidden; vertical-align: middle; }
          .fx-word { display: inline-block; vertical-align: middle; white-space: nowrap; }

          .fx-footer {
            padding: 2vh 0 4vh;
            text-align: center;
            position: relative;
            flex-shrink: 0;
          }
          .fx-footer-description {
            color: var(--fx-text);
            font-size: clamp(0.9rem, 1.5vw, 1.2rem);
            font-weight: 700;
            font-style: italic;
            letter-spacing: 0.01em;
            line-height: 1.5;
            text-transform: none;
            max-width: 600px;
            margin: 0 auto 1.5rem;
            opacity: 0;
            visibility: hidden;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%) translateY(10px);
            transition: opacity 0.5s ease, transform 0.5s ease, visibility 0.5s;
          }
          .fx-footer-description.active {
            opacity: 1;
            visibility: visible;
            position: relative;
            left: auto;
            top: auto;
            transform: translateX(0) translateY(0);
          }
          .fx-footer-title { color: var(--fx-text); font-size: clamp(1.6rem, 7vw, 7rem); font-weight: 900; letter-spacing: -0.01em; line-height: 0.9; }
          .fx-progress { width: 200px; height: 2px; margin: 1rem auto 0; background: rgba(245,245,245,0.28); position: relative; }
          .fx-progress-fill { position: absolute; inset: 0 auto 0 0; width: 0%; background: var(--fx-text); height: 100%; transition: width 0.3s ease; }
          .fx-progress-numbers { position: absolute; inset: auto 0 100% 0; display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--fx-text); }

          @media (max-width: 900px) {
            .fx-content {
              grid-template-columns: 120px 1fr;
              grid-template-rows: 1fr;
              gap: 1.5rem;
              padding: 2rem 1rem;
              align-items: center;
            }
            .fx-left {
              order: 1;
              max-height: none;
              min-height: 120px;
              align-items: center;
              justify-content: center;
              display: flex;
              position: relative;
            }
            .fx-right {
              display: none;
            }
            .fx-center {
              order: 2;
              padding: 0;
              min-height: auto;
              display: flex;
              align-items: center;
              text-align: left;
            }
            .fx-featured-title {
              font-size: clamp(1.4rem, 5vw, 1.9rem);
              line-height: 1.3;
              text-align: left;
              width: 100%;
            }
            .fx-track {
              position: relative;
              width: 100%;
              height: 100%;
              min-height: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .fx-item {
              position: absolute;
              font-size: clamp(3.5rem, 15vw, 5rem);
              margin: 0;
              font-weight: 900;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
            .fx-header {
              padding: 4vh 1rem 2vh;
              font-size: clamp(1.25rem, 4vw, 1.5rem);
            }
            .fx-footer {
              padding: 2vh 1rem 4vh;
            }
            .fx-footer-description {
              font-size: clamp(0.85rem, 3vw, 1rem);
              max-width: 95%;
              line-height: 1.5;
              position: relative;
              margin-bottom: 1rem;
            }
            .fx-footer-title {
              font-size: clamp(0.9rem, 3.5vw, 1.1rem);
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              margin-bottom: 0.5rem;
            }
          }
        `}</style>
      </div>
    );
  }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";
