"use client";

import { useState } from "react";
import WelcomeScreen from "./components/welcome-screen";
import WhoAmI from "./components/who-am-i";
import ProfessionalExperience from "./components/professional-experience";
import PersonalProjects from "./components/personal-projects";

export default function MainPage() {
  const [welcomeDone, setWelcomeDone] = useState(false);

  return (
    <main className="h-screen w-screen flex flex-col overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-bg text-fg">
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

        {/* Add more sections here */}
      </div>
    </main>
  );
}
