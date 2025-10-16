"use client";

import { useEffect, useState } from "react";

export default function WhoAmI() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay entry animation slightly after welcome fades
    const timeout = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      {/* Title */}
      <h2 className="text-5xl sm:text-6xl font-bold text-accent mb-6 tracking-tight relative inline-block">
        Who Am I
        <span className="block w-16 h-1 bg-accent mx-auto mt-3 rounded-full"></span>
      </h2>

      {/* Description */}
      <p className="text-lg sm:text-xl text-fg/90 max-w-2xl leading-relaxed mb-8">
        Hey! I’m <span className="text-accent font-semibold">Caleb</span> — a
        full-stack developer who loves <em>clean code</em>,{" "}
        <em>neat visuals</em>, and a hint of <em>whimsy</em>. I build things
        that feel good to use and look even better.
      </p>

      {/* Links */}
      <div className="flex flex-wrap justify-center gap-5">
        <a
          href="https://github.com/junoocha"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-6 py-3 rounded-full font-semibold bg-accent text-bg transition-transform duration-300 hover:-translate-y-1"
        >
          GitHub
          <span className="absolute inset-0 rounded-full border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </a>

        <a
          href="https://linkedin.com/in/junoocha"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-6 py-3 rounded-full font-semibold bg-accent text-bg transition-transform duration-300 hover:-translate-y-1"
        >
          LinkedIn
          <span className="absolute inset-0 rounded-full border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </a>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-6 py-3 rounded-full font-semibold bg-accent text-bg transition-transform duration-300 hover:-translate-y-1"
        >
          Resume
          <span className="absolute inset-0 rounded-full border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </a>
      </div>
    </section>
  );
}
