"use client";

import { useEffect, useRef } from "react";

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

  // Optional: IntersectionObserver for triggering animations on enter
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animations for each experience item
            entry.target.querySelectorAll(".exp-item").forEach((el, i) => {
              el.classList.add("animate-fade-in-up");
              // stagger delay
              (el as HTMLElement).style.animationDelay = `${i * 150}ms`;
            });
          } else {
            // reset animation
            entry.target
              .querySelectorAll(".exp-item")
              .forEach((el) => el.classList.remove("animate-fade-in-up"));
          }
        });
      },
      { threshold: 0.5 } // triggers when half visible
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen snap-center flex flex-col items-center justify-center px-6">
      <h2 className="text-5xl sm:text-6xl font-bold text-accent mb-6">
        Professional Experience
      </h2>

      <div
        ref={containerRef}
        className="w-full max-w-4xl p-4 bg-bg/70 rounded-lg shadow-lg space-y-6 overflow-y-auto"
        style={{ minHeight: "400px" }} // ensures container has room
      >
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="exp-item flex items-start gap-4 p-4 bg-card-bg rounded-lg shadow-md opacity-100"
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
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent mt-1 inline-block hover:underline"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
