"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Marquee({
  text,
  className = "",
  speed = 1,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    // Clone the text to create a seamless loop
    const clone = textEl.cloneNode(true) as HTMLDivElement;
    container.appendChild(clone);

    let xPercent = 0;
    let direction = -1;

    const ctx = gsap.context(() => {
      // Connect to scroll velocity
      ScrollTrigger.create({
        onUpdate: (self) => {
          if (self.direction === 1) direction = -1;
          else direction = 1;
        },
      });

      gsap.ticker.add(() => {
        if (xPercent < -100) {
          xPercent = 0;
        } else if (xPercent > 0) {
          xPercent = -100;
        }

        // Use constant speed
        xPercent += speed * direction;
        
        gsap.set(textEl, { xPercent });
        gsap.set(clone, { xPercent });
      });
    }, container);

    return () => {
      ctx.revert();
      if (container.contains(clone)) container.removeChild(clone);
    };
  }, [speed]);

  return (
    <div className={`overflow-hidden flex whitespace-nowrap ${className}`}>
      <div ref={containerRef} className="flex relative w-fit">
        <div ref={textRef} className="flex items-center gap-8 pr-8">
          {text}
        </div>
      </div>
    </div>
  );
}
