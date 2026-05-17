"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import AnimatedText from "../AnimatedText";

export default function CtaSection() {
  const blobRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (blobRef.current) {
      gsap.to(blobRef.current, {
        rotation: -360,
        scale: 1.2,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center py-32 px-8 md:px-16 overflow-hidden bg-[#488E5C] text-white">
      {/* Background shape */}
      <svg
        ref={blobRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] opacity-10 pointer-events-none mix-blend-overlay"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FFFFFF"
          d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,80.7,-46.2C89.6,-33.3,94.5,-17.6,93.6,-2.4C92.7,12.8,86,27.5,76.5,40.1C67,52.7,54.7,63.2,40.9,71.4C27.1,79.6,11.8,85.5,-3.6,87.6C-19,89.7,-34.5,88,-48.3,81C-62.1,74,-74.2,61.7,-81.9,47.1C-89.6,32.5,-92.9,15.6,-92,0.6C-91.1,-14.4,-86,-27.5,-78.1,-39.3C-70.2,-51.1,-59.5,-61.6,-46.6,-69.6C-33.7,-77.6,-18.6,-83.1,-2.5,-78.7C13.6,-74.3,27.2,-60,44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        <AnimatedText 
          text="GOT A PROJECT IN MIND?" 
          tag="h2" 
          className="text-6xl md:text-8xl lg:text-[100px] font-black font-syne mb-6" 
        />
        
        <p className="text-xl md:text-2xl font-inter font-light mb-12 max-w-2xl opacity-90">
          Let's build your next growth campaign. Our team of experts is ready to scale your real estate brand.
        </p>

        <a 
          href="tel:+918302973330"
          className="magnetic-btn bg-[#111111] text-white px-10 py-5 rounded-full font-bold tracking-widest uppercase hover-target overflow-hidden border border-[#111111]"
        >
          <span className="relative z-10 mix-blend-difference">Book A Consultation &rarr;</span>
        </a>
      </div>
    </section>
  );
}
