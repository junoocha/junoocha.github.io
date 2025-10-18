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
    logo: "/ubild.png",
    description:
      "At UBILD (Jul – Dec 2024), I worked as a Full Stack Intern with React, Next.js, Supabase, and TypeScript. I built a full-featured admin panel from scratch that displayed all user data, included links to profiles in admin view, showcased available jobs (allowing admins to add users to them), and tracked progress through job certifications. On top of that, I optimized API endpoints, refined profile upload and display for a smoother UX, and integrated Playwright tests into our CI pipeline to ensure login flows stayed rock-solid across GitHub merges.",
    link: "https://ubild.com",
  },
  {
    name: "Enki",
    logo: "/enki.jpg",
    description:
      "At Enki (Aug 2023 – Jul 2024), I developed and published a full course on Roblox Scripting with Lua. I also revamped the Python and Java curricula, updating outdated beginner lessons to improve clarity and engagement. Throughout my time at Enki, I collaborated closely with senior developers via Git to streamline content and maintain proper version control.",
    link: "https://enki.com",
  },
];

export default function ProfessionalExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  // Subtle continuous wave animation for H2
  useEffect(() => {
    if (!h2Ref.current) return;

    const letters = h2Ref.current.textContent!.split("");
    h2Ref.current.innerHTML = letters
      .map((l) => {
        if (l === " ")
          return `<span style="display:inline-block">&nbsp;</span>`;
        return `<span style="display:inline-block">${l}</span>`;
      })
      .join("");

    const chars = h2Ref.current.querySelectorAll("span");

    chars.forEach((el, i) => {
      el.animate(
        [
          { transform: "scale(1) rotate(-2deg)", opacity: 0.8 },
          { transform: "scale(1.15) rotate(2deg)", opacity: 1 },
        ],
        {
          duration: 800,
          iterations: Infinity,
          direction: "alternate",
          easing: "ease-in-out",
          delay: i * 60, // like stagger
        }
      );
    });
  }, []);

  // Animate cards on scroll
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardRefs.current.forEach((card, i) => {
              animate(card, {
                translateY: [50, 0],
                scale: [0.9, 1],
                opacity: [0, 1],
                delay: stagger(150 * i),
                duration: 700,
                easing: "easeOutCubic",
              });

              // Animate title letters
              const titleEl = card.querySelector("h3");
              if (titleEl) {
                const letters = titleEl.textContent!.split("");
                titleEl.innerHTML = letters
                  .map(
                    (l) => `<span class="inline-block opacity-0">${l}</span>`
                  )
                  .join("");
                animate(titleEl.querySelectorAll("span"), {
                  translateY: [-10, 0],
                  opacity: [0, 1],
                  delay: stagger(30),
                  easing: "easeOutCubic",
                  duration: 400,
                });
              }

              // Animate description words
              const descEl = card.querySelector("p");
              if (descEl) {
                const words = descEl.textContent!.split(" ");
                descEl.innerHTML = words
                  .map(
                    (w) =>
                      `<span class="inline-block opacity-0 mr-1">${w}</span>`
                  )
                  .join(" ");
                animate(descEl.querySelectorAll("span"), {
                  translateY: [5, 0],
                  opacity: [0, 1],
                  delay: stagger(20),
                  easing: "easeOutCubic",
                  duration: 400,
                });
              }
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
  }, []);

  // Card hover animation
  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const handleMouseEnter = () =>
        animate(card, {
          scale: 1.03,
          rotate: 1,
          duration: 400,
          easing: "easeOutCubic",
        });
      const handleMouseLeave = () =>
        animate(card, {
          scale: 1,
          rotate: 0,
          duration: 300,
          easing: "easeOutCubic",
        });
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [cardRefs.current]);

  return (
    <section className="min-h-screen snap-center flex flex-col items-center justify-center px-6">
      <h2
        ref={h2Ref}
        className="text-5xl sm:text-6xl font-bold text-accent mb-6"
      >
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
            className="exp-item flex items-start gap-4 p-4 bg-card rounded-lg shadow-md"
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
