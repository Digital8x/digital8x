"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "../AnimatedText";

const services = [
  { num: "01", title: "Paid Advertising", desc: "Google ads, Meta Ads, Linkedin Ads and Others. Unique, responsive websites expertly tailored to your brand’s needs." },
  { num: "02", title: "Website Design & Maintenance", desc: "Speed Optimization & Mobile Responsiveness Landing page and Ongoing Site Maintenance & Updates" },
  { num: "03", title: "Domain & Hosting", desc: "Domain, Hosting & Basic Security Setup. Seamless, secure experiences to increase conversions." },
  { num: "04", title: "Brand Design & Strategy", desc: "Intuitive, visually stunning interfaces for exceptional user engagement." },
  { num: "05", title: "SEO Optimization", desc: "Search Engine Optimization for high visibility and ranking." },
  { num: "06", title: "Campaign Management", desc: "End-to-End Campaign Management. We handle everything from setup to scaling." }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const tls: gsap.core.Timeline[] = [];

    rowsRef.current.forEach((row, i) => {
      if (!row) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 90%",
        }
      });

      // Animate the line drawing on scroll
      const line = row.querySelector(".service-line");
      if (line) {
        tl.fromTo(line, 
          { width: "0%" },
          { 
            width: "100%", 
            duration: 1.2, 
            ease: "power3.out",
          }
        );
      }

      // Animate the last bottom line on scroll
      const bottomLine = row.querySelector(".service-bottom-line");
      if (bottomLine) {
        tl.fromTo(bottomLine,
          { width: "0%" },
          { 
            width: "100%", 
            duration: 1.2, 
            ease: "power3.out",
          },
          "<" // Start at the same time as top line
        );
      }

      tls.push(tl);

      // ScrollTrigger to toggle active class as user scrolls past
      ScrollTrigger.create({
        trigger: row,
        start: "top 60%",   // Triggers when row enters the top 60% of the screen
        end: "bottom 40%", // Triggers when row leaves the bottom 40% of the screen
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
        onLeave: () => {
          setActiveIndex(prev => prev === i ? null : prev);
        },
        onLeaveBack: () => {
          setActiveIndex(prev => prev === i ? null : prev);
        }
      });
    });

    return () => {
      tls.forEach(tl => tl.kill());
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section id="services" className="py-32 bg-[#F5F2EE] text-[#0D0D0D] relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 mb-20">
        <AnimatedText 
          text="Our Expertise" 
          tag="h2" 
          className="text-5xl md:text-7xl font-normal tracking-tight"
        />
      </div>

      <div className="flex flex-col">
        {services.map((service, i) => {
          const isActive = activeIndex === i;

          return (
            <div 
              key={i} 
              ref={el => { rowsRef.current[i] = el; }}
              className="group relative w-full hover-target cursor-pointer"
            >
              {/* Top border line */}
              <div 
                className="absolute top-0 left-0 h-[1px] bg-[#0D0D0D]/10 w-0 service-line"
              />
              
              {/* Content row */}
              <div className={`max-w-7xl mx-auto px-8 md:px-16 py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between relative z-10 transition-all duration-500 ${
                isActive ? "bg-[#488E5C]" : "group-hover:bg-[#488E5C]"
              }`}>
                
                {/* Number Background */}
                <div 
                  className={`absolute left-8 md:left-16 top-1/2 -translate-y-1/2 text-[100px] md:text-[150px] font-normal pointer-events-none z-[-1] select-none italic transition-all duration-500 ${
                    isActive 
                      ? "opacity-100 text-white/10" 
                      : "text-[#0D0D0D]/5 opacity-80 group-hover:opacity-100 group-hover:text-white/10"
                  }`}
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {service.num}
                </div>

                {/* Title */}
                <h3 className={`text-4xl md:text-6xl font-normal max-w-xl relative z-10 transition-all duration-500 ${
                  isActive 
                    ? "translate-x-8 text-white" 
                    : "text-[#0D0D0D] group-hover:translate-x-8 group-hover:text-white"
                }`}>
                  {service.title}
                </h3>
                
                {/* Description Details */}
                <div className="mt-6 md:mt-0 max-w-md overflow-hidden relative z-10">
                  <p className={`text-base md:text-lg font-inter transition-all duration-500 ${
                    isActive 
                      ? "opacity-100 translate-y-0 text-white" 
                      : "text-gray-700 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-white"
                  }`}>
                    {service.desc}
                  </p>
                </div>

              </div>

              {/* Bottom line for the last item */}
              {i === services.length - 1 && (
                <div 
                  className="absolute bottom-0 left-0 h-[1px] bg-[#0D0D0D]/10 w-0 service-bottom-line"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
