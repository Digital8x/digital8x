"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  delay?: number;
}

export default function AnimatedText({ text, className = "", tag: Tag = "h1", delay = 0 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".word");
    
    gsap.fromTo(
      words,
      { y: 80, opacity: 0, rotationZ: 5 },
      {
        y: 0,
        opacity: 1,
        rotationZ: 0,
        duration: 0.8,
        stagger: 0.05,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === containerRef.current) {
          t.kill();
        }
      });
    };
  }, [delay]);

  const splitWords = text.split(" ").map((word, i) => (
    <span key={i} className="inline-block overflow-hidden pb-2 mr-[0.2em] last:mr-0">
      <span className="word inline-block origin-bottom-left will-change-transform">{word}</span>
    </span>
  ));

  return (
    // @ts-ignore
    <Tag ref={containerRef} className={className}>
      {splitWords}
    </Tag>
  );
}
