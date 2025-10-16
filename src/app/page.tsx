"use client";

import { useState } from "react";
import WelcomeScreen from "./components/welcome-screen";
import WhoAmI from "./components/who-am-i";

export default function MainPage() {
  const [welcomeDone, setWelcomeDone] = useState(false);

  return (
    <main className="relative min-h-screen bg-bg text-fg overflow-hidden">
      {!welcomeDone && <WelcomeScreen onFinish={() => setWelcomeDone(true)} />}
      <div
        className={`transition-opacity duration-1000 ${
          welcomeDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <WhoAmI />
      </div>
    </main>
  );
}
