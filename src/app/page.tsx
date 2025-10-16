"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { createScope, animate } from "animejs";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<any>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    scopeRef.current = createScope({ root: rootRef.current }).add(
      (self: any) => {
        // Animate logo
        animate(".logo", {
          translateY: [-40, 0],
          opacity: [0, 1],
          rotate: [0, 360],
          duration: 1500,
          easing: "easeOutExpo",
        });

        // Animate title after delay
        animate(".title", {
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 1200,
          delay: 500,
          easing: "easeOutBack",
        });

        // Animate CTA buttons staggered
        animate(".cta", {
          translateY: [20, 0],
          opacity: [0, 1],
          delay: (el, i) => 1000 + i * 150,
          duration: 800,
          easing: "easeOutQuad",
        });
      }
    );

    return () => {
      // Clean up all animations on unmount
      scopeRef.current?.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="font-sans min-h-screen flex flex-col items-center justify-center bg-bg text-fg p-8 gap-12"
    >
      {/* Logo */}
      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        className="logo drop-shadow-glowLg"
        priority
      />

      {/* Title */}
      <h1 className="title text-5xl font-bold text-accent drop-shadow-glowLg text-center sm:text-left">
        Welcome to My Portfolio
      </h1>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="cta px-6 py-3 rounded-full bg-accent text-bg font-semibold hover:brightness-110 transition"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="cta px-6 py-3 rounded-full bg-accent text-bg font-semibold hover:brightness-110 transition"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
