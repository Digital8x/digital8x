"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SplitTextProps {
  text: string;
  className?: string;
  type?: "words" | "chars";
  delay?: number;
  stagger?: number;
}

export default function SplitText({
  text,
  className = "",
  type = "words",
  delay = 0,
  stagger = 0.05,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(".split-item");
      if (!elements || elements.length === 0) return;

      gsap.fromTo(
        elements,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: stagger,
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, stagger]);

  // Split logic
  const renderText = () => {
    if (type === "words") {
      const words = text.split(" ");
      return words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ paddingRight: "0.25em" }}
        >
          <span className="inline-block split-item">{word}</span>
        </span>
      ));
    }

    // Characters
    const chars = text.split("");
    return chars.map((char, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden"
        style={{ minWidth: char === " " ? "0.25em" : "auto" }}
      >
        <span className="inline-block split-item">{char}</span>
      </span>
    ));
  };

  return (
    <div ref={containerRef} className={`${className} leading-tight`}>
      {renderText()}
    </div>
  );
}
