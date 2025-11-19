"use client";

import { useEffect, useState, useRef } from "react";

interface TextRollProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export function TextRoll({ texts, interval = 2500, className = "" }: TextRollProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [width, setWidth] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const animationDuration = 1000;

  useEffect(() => {
    const timer = setInterval(() => {
      setPreviousIndex(currentIndex);
      const nextIndex = (currentIndex + 1) % texts.length;
      setCurrentIndex(nextIndex);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), animationDuration);
    }, interval);
    return () => clearInterval(timer);
  }, [currentIndex, texts.length, interval, animationDuration]);

  useEffect(() => {
    if (measureRef.current) {
      const newWidth = measureRef.current.offsetWidth;
      setWidth(newWidth);
    }
  }, [currentIndex]);

  const currentWord = texts[currentIndex];
  const previousWord = texts[previousIndex];

  return (
    <>
      <style>{`
        @keyframes textroll-slideIn {
          0% {
            transform: translateY(110%) rotateX(35deg) scale(0.85);
            opacity: 0;
            filter: blur(7px) drop-shadow(0 0 8px rgba(160, 240, 255, 0.4))
                    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
                    drop-shadow(0 0 20px rgba(160, 240, 255, 0.2));
          }
          60% {
            transform: translateY(-3%) rotateX(-2deg) scale(1.015);
            opacity: 1;
            filter: blur(0px) drop-shadow(0 0 11px rgba(160, 240, 255, 0.55))
                    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
                    drop-shadow(0 0 23px rgba(160, 240, 255, 0.28));
          }
          100% {
            transform: translateY(0) rotateX(0deg) scale(1);
            opacity: 1;
            filter: blur(0px) drop-shadow(0 0 8px rgba(160, 240, 255, 0.4))
                    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
                    drop-shadow(0 0 20px rgba(160, 240, 255, 0.2));
          }
        }

        @keyframes textroll-slideOut {
          0% {
            transform: translateY(0) rotateX(0deg) scale(1);
            opacity: 1;
            filter: blur(0px) drop-shadow(0 0 8px rgba(160, 240, 255, 0.4))
                    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
                    drop-shadow(0 0 20px rgba(160, 240, 255, 0.2));
          }
          45% {
            transform: translateY(-20%) rotateX(5deg) scale(0.96);
            opacity: 0.75;
            filter: blur(2.5px) drop-shadow(0 0 6px rgba(160, 240, 255, 0.3))
                    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
                    drop-shadow(0 0 15px rgba(160, 240, 255, 0.15));
          }
          100% {
            transform: translateY(-110%) rotateX(-25deg) scale(0.75);
            opacity: 0;
            filter: blur(9px) drop-shadow(0 0 4px rgba(160, 240, 255, 0.2))
                    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
                    drop-shadow(0 0 10px rgba(160, 240, 255, 0.1));
          }
        }

        .text-roll-glass-text {
          background: linear-gradient(
            145deg,
            rgba(160, 240, 255, 0.85) 0%,
            rgba(140, 220, 255, 0.75) 50%,
            rgba(160, 240, 255, 0.85) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 8px rgba(160, 240, 255, 0.4))
                  drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
                  drop-shadow(0 0 20px rgba(160, 240, 255, 0.2));
          font-weight: 600;
        }
      `}</style>

      <span
        className={`inline-block relative ${className}`}
        style={{
          width: width > 0 ? `${width + 15}px` : 'auto',
          overflow: "visible",
          verticalAlign: "text-bottom",
          minHeight: "1.5em",
          display: "inline-block",
          paddingBottom: "0.4em",
          paddingTop: "0.1em",
          transition: "width 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
          lineHeight: "1.2",
          perspective: "1000px",
        }}
      >
        {/* Hidden element to measure width */}
        <span
          ref={measureRef}
          style={{
            position: "absolute",
            visibility: "hidden",
            whiteSpace: "nowrap",
          }}
          className={className}
        >
          {currentWord}
        </span>

        {/* Animation wrapper with extra space for descenders */}
        <span
          style={{
            position: "relative",
            display: "inline-block",
            overflow: "visible",
            paddingBottom: "0.25em",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Previous word sliding out */}
          {isAnimating && previousIndex !== currentIndex && (
            <span
              className="text-roll-glass-text"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                display: "inline-block",
                transformStyle: "preserve-3d",
                animation: `textroll-slideOut ${animationDuration}ms cubic-bezier(0.3, 0.7, 0.4, 1) forwards`,
              }}
            >
              {previousWord}
            </span>
          )}

          {/* Current word sliding in */}
          <span
            key={currentIndex}
            className="text-roll-glass-text"
            style={{
              display: "inline-block",
              transformStyle: "preserve-3d",
              animation: isAnimating && previousIndex !== currentIndex
                ? `textroll-slideIn ${animationDuration}ms cubic-bezier(0.34, 1.2, 0.64, 1) forwards`
                : "none",
            }}
          >
            {currentWord}
          </span>
        </span>
      </span>
    </>
  );
}
