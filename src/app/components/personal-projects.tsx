"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger, splitText } from "animejs";

interface Project {
  title: string;
  description: string;
  images: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "WormScans",
    description:
      "Manga/Manhwa Reader Platform | Next.js, React, Supabase, TypeScript.",
    images: [
      "/projects/wormscans.png",
      "/projects/wormscans-2.png",
      "/projects/wormscans-3.png",
    ],
    link: "https://www.wormscans.ca/",
  },
  {
    title: "Fractal Tree Generator",
    description:
      "Interactive fractal tree generator | React, Next.js, TypeScript.",
    images: [
      "/projects/fractal-tree.png",
      "/projects/fractal-tree-2.png",
      "/projects/fractal-tree-3.png",
    ],
    link: "https://fractal-tree-gen.vercel.app/",
  },
  {
    title: "DnD Stat Setter",
    description:
      "Tool for setting Dungeons & Dragons stats | React, Next.js, Supabase.",
    images: [
      "/projects/dnd-stat.png",
      "/projects/dnd-stat-2.png",
      "/projects/dnd-stat-3.png",
    ],
    link: "https://the-better-dnd-setter.vercel.app/",
  },
];

export default function PersonalProjects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  const project = projects[currentProject];
  const totalProjects = projects.length;
  const totalImages = project.images.length;

  // Reset refs when project changes
  useEffect(() => {
    imageRefs.current = [];
  }, [currentProject]);

  const prevProject = () => {
    setCurrentProject((p) => (p - 1 + totalProjects) % totalProjects);
    setCurrentImage(0);
  };
  const nextProject = () => {
    setCurrentProject((p) => (p + 1) % totalProjects);
    setCurrentImage(0);
  };
  const prevImage = () =>
    setCurrentImage((p) => (p - 1 + totalImages) % totalImages);
  const nextImage = () => setCurrentImage((p) => (p + 1) % totalImages);

  const getOffset = (idx: number) => {
    const diff = (idx - currentImage + totalImages) % totalImages;
    if (diff > totalImages / 2) return diff - totalImages;
    return diff;
  };

  // Animate title + description on project change
  useEffect(() => {
    if (titleRef.current) {
      const { chars } = splitText(titleRef.current, { chars: true });
      chars.forEach((c) => {
        c.style.opacity = "0";
        c.style.transform = "translateY(-20px)";
      });
      animate(chars, {
        translateY: [-20, 0],
        opacity: [0, 1],
        delay: stagger(50),
        easing: "easeOutExpo",
      });
    }
    if (descRef.current) {
      const { words } = splitText(descRef.current, { words: true });
      words.forEach((w) => {
        w.style.opacity = "0";
        w.style.transform = "translateY(10px)";
      });
      animate(words, {
        translateY: [10, 0],
        opacity: [0, 1],
        delay: stagger(40),
        easing: "easeOutCubic",
      });
    }
  }, [currentProject]);

  // Animate images whenever currentImage changes
  useEffect(() => {
    imageRefs.current.forEach((img, idx) => {
      const offset = getOffset(idx);
      const isCenter = offset === 0;
      animate(img, {
        translateX: offset * 320,
        scale: isCenter ? 1 : 0.9,
        opacity: isCenter ? 1 : 0.4,
        duration: 600,
        delay: stagger(50),
        easing: "spring(1, 80, 10, 0)",
      });
    });
  }, [currentImage, currentProject]);

  return (
    <section className="min-h-screen snap-center flex flex-col items-center justify-center px-6">
      <h2 className="text-5xl sm:text-6xl font-bold text-accent mb-12">
        Personal Projects
      </h2>

      {/* IMAGE CAROUSEL */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-6xl mb-8">
        <div className="relative flex items-center justify-center w-[700px] sm:w-[800px] h-[40vh] sm:h-[45vh] overflow-visible group">
          {/* LEFT hover zone */}
          <div
            className="absolute left-0 top-0 h-full w-[15%] bg-gradient-to-r from-black/8 to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                       flex items-center justify-start pl-3 cursor-pointer rounded-l-xl z-30"
            onClick={prevImage}
          >
            <span className="text-5xl text-white drop-shadow-lg">&#9664;</span>
          </div>

          {/* RIGHT hover zone */}
          <div
            className="absolute right-0 top-0 h-full w-[15%] bg-gradient-to-l from-black/3 to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                       flex items-center justify-end pr-3 cursor-pointer rounded-r-xl z-30"
            onClick={nextImage}
          >
            <span className="text-5xl text-white drop-shadow-lg">&#9654;</span>
          </div>

          {/* Images */}
          <div className="relative flex items-center justify-center w-full h-full">
            {project.images.map((img, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  if (el) imageRefs.current[idx] = el;
                }}
                className="absolute carousel-image w-[700px] sm:w-[800px] h-[40vh] sm:h-[45vh] object-cover rounded-xl shadow-2xl"
              >
                <img
                  src={img}
                  alt={`${project.title} ${idx}`}
                  className="w-full h-full object-cover rounded-xl shadow-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TITLE + DESCRIPTION */}
      <div className="relative w-full max-w-5xl flex flex-col items-center justify-center text-center mt-2">
        <button
          onClick={prevProject}
          className="absolute left-[-100px] top-1/2 -translate-y-1/2 z-30 p-4 bg-bg/50 rounded-full opacity-80 hover:opacity-100 transition text-2xl"
        >
          &#9664;
        </button>

        <button
          onClick={nextProject}
          className="absolute right-[-100px] top-1/2 -translate-y-1/2 z-30 p-4 bg-bg/50 rounded-full opacity-80 hover:opacity-100 transition text-2xl"
        >
          &#9654;
        </button>

        <div
          className="cursor-pointer"
          onClick={() => window.open(project.link, "_blank")}
        >
          <h3
            ref={titleRef}
            className="project-title text-4xl sm:text-5xl font-bold text-accent mb-2"
          >
            {project.title}
          </h3>
          <p
            ref={descRef}
            className="project-desc text-fg/90 text-lg sm:text-xl"
          >
            {project.description}
          </p>
        </div>
      </div>
    </section>
  );
}
