"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface ExperienceItem {
  name: string;
  logo: string; // path to logo
  description: string;
  link: string;
}

const experiences: ExperienceItem[] = [
  {
    name: "UBILD",
    logo: "/logos/ubild.png",
    description:
      "Full Stack Intern - React, Next.js, Supabase, TypeScript. Engineered and launched a fully functional admin panel integrated with Supabase from scratch. Developed and optimized API endpoints.",
    link: "https://ubild.com",
  },
  {
    name: "Enki",
    logo: "/logos/enki.png",
    description:
      "Course Developer - Lua, Java, Python, Git. Developed and published an entire course on Roblox Scripting and Lua. Revamped outdated curricula on Python and Java.",
    link: "https://enki.com",
  },
];

export default function ProfessionalExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate all cards in stagger
            animate(cardRefs.current, {
              translateY: [100, -20, 0], // start far down, overshoot up, settle at 0
              scale: [0.8, 1.1, 1], // start small, pop slightly larger, settle at 1
              rotate: [-10, 5, 0], // slight rotation wiggle
              opacity: [0, 1],
              delay: stagger(150),
              duration: 900,
              easing: "spring(1, 80, 15, 0)", // stronger spring effect
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
  }, []);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (!card) return;

      // Mouse enter: pop + rotate slightly
      const handleMouseEnter = () => {
        animate(card, {
          scale: 1.03,
          rotate: 1,
          duration: 600,
          easing: "easeOutElastic(1, .9)", // springy feel
        });
      };

      // Mouse leave: return to normal
      const handleMouseLeave = () => {
        animate(card, {
          scale: 1,
          rotate: 0,
          duration: 400,
          easing: "easeOutCubic",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [cardRefs.current]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      // Floating animation
      animate(card, {
        translateY: [0, 6 + Math.random() * 4], // float 6-10px randomly
        rotate: [0, 1 + Math.random() * 2], // rotate 1-3 degrees
        duration: 1800 + Math.random() * 800,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine", // smooth, gentle oscillation
      });
    });
  }, []);

  return (
    <section className="min-h-screen snap-center flex flex-col items-center justify-center px-6">
      <h2 className="text-5xl sm:text-6xl font-bold text-accent mb-6">
        Professional Experience
      </h2>

      <div
        ref={containerRef}
        className="w-full max-w-4xl p-4 space-y-6"
        style={{ minHeight: "400px" }}
      >
        {experiences.map((exp, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className="exp-item flex items-start gap-4 p-4 bg-card-bg rounded-lg shadow-md "
          >
            <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center">
              <img
                src={exp.logo}
                alt={`${exp.name} logo`}
                className="max-w-full max-h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-accent">{exp.name}</h3>
              <p className="text-fg/90 mt-2">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
