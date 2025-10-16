"use client";

import { useState } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "WormScans",
    description:
      "Manga/Manhwa Reader Platform | Next.js, React, Supabase, TypeScript. Full-featured library, reader, and admin panel.",
    image: "/projects/wormscans.png",
    link: "https://www.wormscans.ca/",
  },
  {
    title: "Fractal Tree Generator",
    description:
      "Interactive fractal tree generator | React, Next.js, TypeScript. Explore infinite tree variations with adjustable parameters.",
    image: "/projects/fractal-tree.png",
    link: "https://fractal-tree-gen.vercel.app/",
  },
  {
    title: "DnD Stat Setter",
    description:
      "Tool for setting Dungeons & Dragons stats | React, Next.js, Supabase. Quickly generate and manage character stats for campaigns.",
    image: "/projects/dnd-stat.png",
    link: "https://the-better-dnd-setter.vercel.app/",
  },
];

export default function PersonalProjects() {
  const [current, setCurrent] = useState(0);
  const total = projects.length;

  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const next = () => setCurrent((prev) => (prev + 1) % total);

  const goTo = (idx: number) => setCurrent(idx);

  return (
    <section className="min-h-screen snap-center flex flex-col items-center justify-center px-6 bg-bg">
      <h2 className="text-7xl font-bold text-accent mb-12">
        Personal Projects
      </h2>

      <div className="relative w-full max-w-7xl h-[36rem] flex items-center justify-center">
        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-5 bg-bg/50 rounded-full hover:bg-bg/70 transition"
        >
          &#9664;
        </button>
        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-5 bg-bg/50 rounded-full hover:bg-bg/70 transition"
        >
          &#9654;
        </button>

        <div className="w-full h-full relative perspective-1000 overflow-visible">
          {projects.map((proj, idx) => {
            let offset = idx - current;
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            const isCenter = offset === 0;

            // Bigger scale for center, push side previews further
            const translateX = offset * 350; // side previews further out
            const scale = isCenter ? 1.2 : 0.65; // bigger center
            const opacity = isCenter ? 1 : 0.3;
            const blur = isCenter ? "0px" : "10px";
            const zIndex = isCenter ? 20 : 10;
            const rotateY = offset * -20;

            return (
              <div
                key={idx}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 flex flex-col items-center cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  zIndex,
                  opacity,
                  filter: `blur(${blur})`,
                }}
                onClick={() => {
                  if (!isCenter) goTo(idx); // bring side preview to center
                }}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  className={`rounded-lg shadow-2xl object-cover ${
                    isCenter ? "w-[32rem] h-[20rem]" : "w-72 h-48"
                  }`}
                />
                {isCenter && (
                  <div className="mt-6 text-center max-w-2xl px-4">
                    <h3 className="text-3xl font-semibold text-accent">
                      {proj.title}
                    </h3>
                    <p className="text-lg text-fg/90 mt-3">
                      {proj.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
