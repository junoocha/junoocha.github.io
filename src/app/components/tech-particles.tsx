"use client";

import { useEffect } from "react";

export default function TechRain() {
  useEffect(() => {
    const stack = [
      "/tech-rain/react.svg",
      "/tech-rain/cpp.svg",
      "/tech-rain/html.svg",
      "/tech-rain/java.svg",
      "/tech-rain/js.svg",
      "/tech-rain/lua.svg",
      "/tech-rain/node.svg",
      "/tech-rain/python.svg",
      "/tech-rain/sql.svg",
      "/tech-rain/tailwind.svg",
      "/tech-rain/ts.svg",
    ];

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.zIndex = "-1";
    container.style.pointerEvents = "none";
    document.body.appendChild(container);

    const avoidCenterMin = 0.3;
    const avoidCenterMax = 0.7;

    let interval: number;

    const spawnParticle = () => {
      const size = 16 + Math.random() * 20;

      let x: number;
      do {
        x = Math.random();
      } while (x > avoidCenterMin && x < avoidCenterMax);

      const img = document.createElement("img");
      img.src = stack[Math.floor(Math.random() * stack.length)];
      img.style.position = "absolute";
      img.style.top = `${-50 - Math.random() * 50}px`;
      img.style.left = `${x * 100}%`;
      img.style.width = `${size}px`;
      img.style.height = "auto";
      img.style.opacity = `${0.1 + Math.random() * 0.5}`; // brighter
      img.style.pointerEvents = "none";
      container.appendChild(img);

      const duration = 8000 + Math.random() * 6000;
      const xOffset = (Math.random() - 0.5) * 50;

      img.animate(
        [
          { transform: `translate(0px, 0px)` },
          {
            transform: `translate(${xOffset}px, ${window.innerHeight + 200}px)`,
          },
        ],
        {
          duration,
          easing: "linear",
          iterations: 1,
          fill: "forwards",
        }
      ).onfinish = () => {
        if (img.parentElement) container.removeChild(img);
      };
    };

    // Spawn a new particle every 150ms for continuous rain
    interval = window.setInterval(spawnParticle, 150);

    return () => {
      clearInterval(interval);
      document.body.removeChild(container);
    };
  }, []);

  return null;
}
