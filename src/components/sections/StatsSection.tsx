"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    countersRef.current.forEach((counter, i) => {
      if (!counter) return;
      const targetVal = parseInt(counter.getAttribute("data-target") || "0");
      const obj = { val: 0 };
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(obj, {
            val: targetVal,
            duration: 2,
            ease: "power2.out",
            onUpdate: function() {
              const current = Math.round(obj.val);
              if (targetVal === 10) {
                counter.innerHTML = current + "K+";
              } else if (targetVal === 500 || targetVal === 50) {
                counter.innerHTML = current + "+";
              } else if (targetVal === 5) {
                counter.innerHTML = current + "X";
              } else {
                counter.innerHTML = current.toString();
              }
            }
          });
        },
        once: true
      });
    });

  }, []);

  const stats = [
    { num: 500, label: "Campaigns Launched" },
    { num: 10, label: "Leads Generated" },
    { num: 50, label: "Real Estate Brands" },
    { num: 5, label: "Average ROI" },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-8 md:px-16 bg-[#111111] text-white border-y border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <h3 
              ref={el => { countersRef.current[i] = el; }} 
              data-target={stat.num}
              className="text-5xl md:text-6xl lg:text-7xl font-syne font-black text-[#488E5C] mb-4"
            >
              0
            </h3>
            <p className="text-gray-400 font-inter tracking-widest uppercase text-sm font-semibold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
