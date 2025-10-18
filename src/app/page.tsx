"use client";

import { useEffect, useRef, useState } from "react";
import WelcomeScreen from "./components/welcome-screen";
import WhoAmI from "./components/who-am-i";
import ProfessionalExperience from "./components/professional-experience";
import PersonalProjects from "./components/personal-projects";
import TechParticles from "./components/tech-particles";

export default function MainPage() {
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isBottomSection, setIsBottomSection] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null); // ref for scroll container

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock scroll during welcome screen
  useEffect(() => {
    if (!welcomeDone) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [welcomeDone]);

  // Detect if near bottom of scroll container
  useEffect(() => {
    if (!mainRef.current || isMobile) return;

    const handleScroll = () => {
      const el = mainRef.current!;
      const nearBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 100;
      setIsBottomSection(nearBottom);
    };

    const el = mainRef.current;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <main
      ref={mainRef}
      className={`w-screen flex flex-col scroll-smooth bg-bg text-fg ${
        isMobile
          ? "overflow-y-auto"
          : "h-screen overflow-y-scroll snap-y snap-mandatory"
      }`}
    >
      {!isMobile && <TechParticles />}
      {!welcomeDone && <WelcomeScreen onFinish={() => setWelcomeDone(true)} />}

      <div
        className={`flex flex-col transition-opacity duration-1000 ${
          welcomeDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <section
          className={`flex items-center justify-center ${
            isMobile ? "min-h-screen" : "h-screen snap-center"
          }`}
        >
          <WhoAmI />
        </section>
        <section
          className={`flex items-center justify-center ${
            isMobile ? "min-h-screen" : "h-screen snap-center"
          }`}
        >
          <ProfessionalExperience />
        </section>
        <section
          className={`flex items-center justify-center ${
            isMobile ? "min-h-screen" : "h-screen snap-center"
          }`}
        >
          <PersonalProjects />
        </section>
      </div>

      {/* Scroll indicator */}
      {!isMobile && !isBottomSection && welcomeDone && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-fg/70 transition-opacity duration-500 animate-bounce z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      )}
    </main>
  );
}
