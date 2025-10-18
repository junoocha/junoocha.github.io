"use client";

import { useEffect, useRef, useState } from "react";
import { createTimeline, animate, stagger, splitText } from "animejs";

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
      "Manga/Manhwa Reader/Scraper Platform | React, Next.js, Supabase, TypeScript.",
    images: [
      "/projects/worm1.png",
      "/projects/worm2.jpg",
      "/projects/worm3.gif",
    ],
    link: "https://www.wormscans.ca/",
  },
  {
    title: "Fractal Tree Generator",
    description:
      "Interactive fractal tree generator | React, Next.js, TypeScript.",
    images: [
      "/projects/tree1.jpg",
      "/projects/tree2.jpg",
      "/projects/tree3.gif",
    ],
    link: "https://fractal-tree-gen.vercel.app/",
  },
  {
    title: "DnD Stat Setter",
    description:
      "Tool for setting Dungeons & Dragons stats | React, Next.js, Supabase.",
    images: ["/projects/dnd1.gif", "/projects/dnd1.jpg", "/projects/dnd3.gif"],
    link: "https://the-better-dnd-setter.vercel.app/",
  },
];

export default function PersonalProjects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  const project = projects[currentProject];
  const totalProjects = projects.length;
  const totalImages = project.images.length;

  useEffect(() => {
    if (!h2Ref.current) return;

    // Split H2 into characters with clip + bottom clone
    const { chars } = splitText(h2Ref.current, {
      chars: { wrap: "clip", clone: "bottom" },
    });

    // Make sure chars are inline
    chars.forEach((c) => {
      c.style.display = "inline-block";
    });

    // Timeline for continuous looping
    const tl = createTimeline();

    tl.add(
      chars,
      {
        y: "-100%", // move each char up
        duration: 2000, // speed of each char
        easing: "inOut(2)",
        loop: true, // infinite loop
        loopDelay: 0, // no pause between loops
      },
      stagger(200, { from: "center" }) // wave effect
    );

    tl.init();
  }, []);

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
      if (!img) return;
      const offset = getOffset(idx);
      const isCenter = offset === 0;

      // Calculate visual properties
      const translateX = offset * 320;
      const scale = isCenter ? 1 : 0.9;
      const opacity = isCenter ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.3);
      const blur = isCenter ? "0px" : `${Math.abs(offset) * 3}px`;
      const zIndex = isCenter ? 20 : 10 - Math.abs(offset); // centered image always on top

      // Apply non-animated props before animating (zIndex, pointer)
      img.style.zIndex = `${zIndex}`;
      img.style.pointerEvents = isCenter ? "auto" : "none";

      // Animate transforms and visuals
      animate(img, {
        translateX,
        scale,
        opacity,
        filter: `blur(${Math.abs(offset) * 3}px)`,
        duration: 700,
        easing: "spring(1, 80, 10, 0)",
      });
    });
  }, [currentImage, currentProject]);

  return (
    <section className="min-h-screen snap-center flex flex-col items-center justify-center px-6">
      <div className="relative h-24 overflow-hidden mb-12 flex items-center justify-center">
        <h2
          ref={h2Ref}
          className="text-5xl sm:text-6xl font-bold text-accent inline-block"
        >
          Personal Projects
        </h2>
      </div>

      {/* IMAGE CAROUSEL */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-6xl mb-8">
        <div className="relative flex items-center justify-center w-[700px] sm:w-[800px] h-[40vh] sm:h-[45vh] overflow-visible group">
          {/* LEFT hover zone */}
          <div
            className="absolute left-0 top-0 h-full w-[15%] bg-gradient-to-r from-black/25 to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                       flex items-center justify-start pl-3 cursor-pointer rounded-l-xl z-30"
            onClick={prevImage}
          >
            <span className="text-5xl text-white drop-shadow-lg">&#9664;</span>
          </div>

          {/* RIGHT hover zone */}
          <div
            className="absolute right-0 top-0 h-full w-[15%] bg-gradient-to-l from-black/25 to-transparent 
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

      {/* PROJECT SWITCH BUTTONS */}
      <div className="flex justify-center gap-4 sm:gap-6 mt-4">
        <button
          onClick={prevProject}
          className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-bg/50 text-accent font-semibold 
               hover:bg-accent hover:text-bg transform hover:scale-105 transition-all duration-300"
        >
          Prev Project
        </button>
        <button
          onClick={nextProject}
          className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-bg/50 text-accent font-semibold 
               hover:bg-accent hover:text-bg transform hover:scale-105 transition-all duration-300"
        >
          Next Project
        </button>
      </div>

      {/* TITLE + DESCRIPTION */}
      <div className="relative w-full max-w-5xl flex flex-col items-center justify-center text-center mt-2">
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
