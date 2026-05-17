"use client";

import { useEffect, useRef } from "react";
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
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    linesRef.current.forEach((line, i) => {
      if (!line) return;
      gsap.fromTo(line, 
        { width: "0%" },
        { 
          width: "100%", 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
          }
        }
      );
    });
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
        {services.map((service, i) => (
          <div key={i} className="group relative w-full hover-target cursor-pointer">
            <div 
              ref={el => { linesRef.current[i] = el; }} 
              className="absolute top-0 left-0 h-[1px] bg-[#0D0D0D]/10 w-0"
            />
            
            <div className="max-w-7xl mx-auto px-8 md:px-16 py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between relative z-10 transition-colors duration-500 group-hover:bg-[#488E5C]">
              
              <div 
                className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 text-[100px] md:text-[150px] font-normal text-[#0D0D0D]/5 opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:text-white/10 pointer-events-none z-[-1] select-none italic"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {service.num}
              </div>

              <h3 className="text-4xl md:text-6xl font-normal max-w-xl relative z-10 transition-all duration-500 group-hover:translate-x-8 text-[#0D0D0D] group-hover:text-white">
                {service.title}
              </h3>
              
              <div className="mt-6 md:mt-0 max-w-md overflow-hidden relative z-10">
                <p className="text-base md:text-lg text-gray-700 font-inter opacity-0 translate-y-8 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-white">
                  {service.desc}
                </p>
              </div>

            </div>

            {/* Bottom line for the last item */}
            {i === services.length - 1 && (
              <div 
                ref={el => { linesRef.current[i + 1] = el; }} 
                className="absolute bottom-0 left-0 h-[1px] bg-[#0D0D0D]/10 w-0"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
