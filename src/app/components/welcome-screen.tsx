"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate } from "animejs";

interface WelcomeScreenProps {
  onFinish: () => void;
}

export default function WelcomeScreen({ onFinish }: WelcomeScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    const textEl = rootRef.current.querySelector(".welcome-text");
    const logoEl = rootRef.current.querySelector(".welcome-logo");

    if (!textEl || !logoEl) return;

    if (isMobile) {
      // Mobile: animate horizontally from sides
      animate(textEl, {
        translateX: [-200, 0], // from left
        duration: 1000,
        delay: 300,
        easing: "easeOutCubic",
      });

      animate(logoEl, {
        translateX: [200, 0], // from right
        opacity: [0, 1],
        duration: 1000,
        delay: 500,
        easing: "easeOutCubic",
      });
    } else {
      // Desktop: same vertical animations
      animate(logoEl, {
        translateY: [-60, 0],
        opacity: [0, 1],
        scale: [0.7, 1],
        duration: 1300,
        delay: 600,
        easing: "easeOutExpo",
      });

      animate(textEl, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: 500,
        easing: "easeOutBack",
      });
    }

    // Fade out after 3 seconds
    const timeout = setTimeout(() => {
      setFadingOut(true);
      setTimeout(onFinish, 1000);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onFinish, isMobile]);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 bg-bg z-50 transition-opacity duration-1000 px-4 ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className={`flex ${
          isMobile
            ? "flex-col"
            : "flex-col items-center justify-center gap-2 sm:gap-1"
        } items-center justify-center`}
      >
        <p className="welcome-text italic text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-accent text-center whitespace-nowrap">
          Powered by
        </p>
        <div
          className={`relative ${
            isMobile
              ? "w-48 h-24"
              : "w-48 h-14 sm:w-64 sm:h-20 md:w-72 md:h-20 lg:w-80 lg:h-24"
          }`}
        >
          {isMobile ? (
            <Image
              src="/animejslogo.png"
              alt="anime.js logo"
              width={192} // 48 * 4
              height={96} // 24 * 4
              className="welcome-logo drop-shadow-glowLg object-contain"
              priority
            />
          ) : (
            <Image
              src="/animejslogo.png"
              alt="anime.js logo"
              fill
              className="welcome-logo drop-shadow-glowLg object-contain"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
}
