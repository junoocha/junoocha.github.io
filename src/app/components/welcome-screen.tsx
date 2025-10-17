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

  useEffect(() => {
    if (!rootRef.current) return;

    // Logo animation
    animate(rootRef.current.querySelector(".welcome-logo"), {
      translateY: [-60, 0],
      opacity: [0, 1],
      scale: [0.7, 1],
      duration: 1300,
      delay: 600,
      easing: "easeOutExpo",
    });

    // Text animation
    animate(rootRef.current.querySelector(".welcome-text"), {
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: 500,
      easing: "easeOutBack",
    });

    // After 3 seconds, start fading out
    const timeout = setTimeout(() => {
      setFadingOut(true);
      setTimeout(onFinish, 1000); // matches the fade duration
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <div
      ref={rootRef}
      className={`absolute inset-0 flex flex-col items-center justify-center gap-6 bg-bg z-50 transition-opacity duration-1000 ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <p className="welcome-text mb-1 italic text-4xl sm:text-6xl font-bold text-accent">
          Powered by
        </p>
        <Image
          src="/animejslogo.png"
          alt="anime.js logo"
          width={300}
          height={90}
          className="welcome-logo drop-shadow-glowLg"
          priority
        />
      </div>
    </div>
  );
}
