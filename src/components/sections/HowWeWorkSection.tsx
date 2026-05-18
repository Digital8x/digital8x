"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "../AnimatedText";

const steps = [
  { num: "01", title: "Discovery & Strategy", desc: "We deep dive into your project specs, target audience, and local geography to build a bulletproof lead-generation model.", points: ["Competitor auditing", "Audience profiling", "Funnel mapping"] },
  { num: "02", title: "High-Converting Assets", desc: "Our design lab crafts custom landing pages engineered to convert clicks into high-intent buyer inquiries.", points: ["Conversion-led UI/UX", "Lightning speed loading", "Persuasive copywriting"] },
  { num: "03", title: "Precision Paid Campaigns", desc: "We deploy aggressive, targeted ad campaigns across Google, Meta, and LinkedIn, keeping acquisition costs low.", points: ["Hyper-local targeting", "Rigorous A/B testing", "Active budget optimization"] },
  { num: "04", title: "Nurturing & Handover", desc: "Leads are instantly routed, filtered, and handed over to your sales desk for immediate contact and closure.", points: ["Real-time CRM routing", "Lead score filters", "Post-campaign review"] }
];

export default function HowWeWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !leftColRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // Bulletproof responsive pinning using GSAP matchMedia
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Pin left column on desktop
      const pin = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
      });

      return () => {
        pin.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#111111] text-white relative flex flex-col md:flex-row">
      
      {/* Left Sticky Column */}
      <div ref={leftColRef} className="w-full md:w-1/2 md:h-screen p-8 md:p-16 flex flex-col justify-center border-r border-gray-800">
        <AnimatedText 
          text="How We Work" 
          tag="h2" 
          className="text-5xl md:text-7xl font-normal mb-8"
        />
        <p className="text-gray-400 text-xl font-inter max-w-md font-light leading-relaxed">
          A systematic, data-driven approach tailored specifically for real estate growth.
        </p>
      </div>

      {/* Right Scrollable Column */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col gap-32 py-32 md:py-[50vh]">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col gap-6 max-w-xl">
            <div className="flex items-baseline gap-4 mb-4">
              <span 
                className="text-2xl font-normal text-[#488E5C] italic"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {step.num}
              </span>
              <h3 className="text-4xl md:text-5xl font-normal text-white">{step.title}</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed font-inter font-light">
              {step.desc}
            </p>
            <ul className="flex flex-col gap-3 mt-4">
              {step.points.map((point, j) => (
                <li key={j} className="flex items-center gap-3 text-gray-400 font-inter font-light text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#488E5C]"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </section>
  );
}
