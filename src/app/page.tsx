"use client";

import { useEffect, useState } from "react";
import WelcomeScreen from "./components/welcome-screen";
import WhoAmI from "./components/who-am-i";
import ProfessionalExperience from "./components/professional-experience";
import PersonalProjects from "./components/personal-projects";
import TechParticles from "./components/tech-particles";

export default function MainPage() {
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // lock scroll during welcome screen
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

  return (
    <main
      className={`h-screen w-screen flex flex-col scroll-smooth bg-bg text-fg ${
        isMobile ? "overflow-y-auto" : "overflow-y-scroll snap-y snap-mandatory"
      }`}
    >
      {!isMobile && <TechParticles />}
      {!welcomeDone && <WelcomeScreen onFinish={() => setWelcomeDone(true)} />}

      <div
        className={`flex flex-col transition-opacity duration-1000 ${
          welcomeDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <section className="h-screen flex items-center justify-center snap-center">
          <WhoAmI />
        </section>
        <section className="h-screen flex items-center justify-center snap-center">
          <ProfessionalExperience />
        </section>
        <section className="h-screen flex items-center justify-center snap-center">
          <PersonalProjects />
        </section>
      </div>
    </main>
  );
}
