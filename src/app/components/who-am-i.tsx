"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger, splitText } from "animejs";

export default function WhoAmI() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Animate the h2 header
  useEffect(() => {
    if (!titleRef.current) return;
    const { chars } = splitText(titleRef.current, {
      words: false,
      chars: true,
    });

    animate(chars, {
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: { from: "-1turn" },
      delay: stagger(50),
      easing: "inOutCirc",
      loopDelay: 1500,
      loop: true,
    });
  }, []);

  // paragraph text animate
  useEffect(() => {
    if (!textRef.current) return;

    // Split text into words & chars
    const { words, chars } = splitText(textRef.current, {
      words: { wrap: "hidden" },
      chars: true,
    });

    // Set initial transform before animating IN
    words.forEach((el) => {
      el.style.transform = `translateY(${
        +el.dataset.line! % 2 ? "100%" : "-100%"
      })`;
      el.style.opacity = "0";
    });
    chars.forEach((el) => {
      el.style.opacity = "0";
    });

    // Create timeline animation
    const tl = createTimeline({
      loop: false,
      defaults: { easing: "inOut(3)", duration: 200 },
    });

    // Animate INTO place
    tl.add(
      words,
      {
        y: ["0%", "0%"], // keep end position static
        translateY: ["100%", "0%"], // move up/down into view
        opacity: [0, 1],
      },
      stagger(125)
    ).add(
      chars,
      {
        opacity: [0, 1],
        translateY: [
          ($el) => (+$el.dataset.line! % 2 ? "100%" : "-100%"),
          "0%",
        ],
      },
      stagger(10, { from: "random" })
    );

    tl.init();
  }, []);

  return (
    <section className="min-h-screen animate-fade-in flex flex-col items-center justify-center text-center px-6">
      <h2
        ref={titleRef}
        className="text-5xl sm:text-6xl font-bold text-accent mb-6"
      >
        Hey Hey!
      </h2>

      <p
        ref={textRef}
        className="text-lg sm:text-xl text-fg/90 max-w-2xl leading-relaxed mb-8"
      >
        I’m Caleb — a full-stack developer who loves clean code, neat visuals,
        and a hint of whimsy. I build things that feel good to use and look even
        better.
      </p>

      <div className="flex flex-wrap justify-center gap-5">
        <a
          href="https://github.com/junoocha"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full font-semibold bg-accent text-bg transition-transform duration-300 hover:-translate-y-1"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/junoocha"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full font-semibold bg-accent text-bg transition-transform duration-300 hover:-translate-y-1"
        >
          LinkedIn
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full font-semibold bg-accent text-bg transition-transform duration-300 hover:-translate-y-1"
        >
          Resume
        </a>
      </div>
    </section>
  );
}
