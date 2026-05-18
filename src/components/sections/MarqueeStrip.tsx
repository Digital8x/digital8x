"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MarqueeStrip({ 
  text, 
  bg = "bg-[#111111]", 
  textColor = "text-white" 
}: { 
  text: string, 
  bg?: string, 
  textColor?: string 
}) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!marqueeRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const elements = marqueeRef.current.querySelectorAll('.marquee-inner');
    
    const tl = gsap.to(elements, {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Double the text to ensure smooth looping
  const content = (
    <div className={`marquee-inner flex whitespace-nowrap px-4 ${textColor}`}>
      <span className="mx-4">{text}</span>
      <span className="mx-4">{text}</span>
      <span className="mx-4">{text}</span>
      <span className="mx-4">{text}</span>
    </div>
  );

  return (
    <div className={`relative w-full overflow-hidden py-3 md:py-4 border-y border-gray-800/60 ${bg}`} ref={marqueeRef}>
      <div className="flex text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-tighter uppercase font-syne">
        {content}
        {content}
      </div>
    </div>
  );
}
