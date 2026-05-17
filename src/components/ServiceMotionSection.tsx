"use client";

import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ScrollAnimation from "./ScrollAnimation";

interface ServiceMotionSectionProps {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  frameFolder: string;
  frameCount: number;
  align: "left" | "right";
}

export default function ServiceMotionSection({
  id,
  index,
  title,
  subtitle,
  description,
  bullets,
  frameFolder,
  frameCount,
  align,
}: ServiceMotionSectionProps) {
  return (
    <section id={id} className="relative">
      {/* Section Header */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className={`flex flex-col ${align === "right" ? "items-end text-right" : "items-start text-left"}`}
        >
          <span className="text-[#5DB85C] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            0{index + 1} — {subtitle}
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white/90">
            {title}
          </h2>
        </motion.div>
      </div>

      {/* Motion Canvas Area */}
      <div className="relative">
        <ScrollAnimation
          frameCount={frameCount}
          folderPath={frameFolder}
          scrollHeight="300vh"
        />

        {/* Overlay Text - floats over the sticky canvas */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Top overlay at 0% scroll within this section */}
          <div className="h-[100vh]" /> {/* spacer for first viewport */}

          {/* Middle overlay at ~33% scroll */}
          <div className="h-[100vh] flex items-center">
            <div className={`container mx-auto px-6 md:px-12 max-w-7xl ${align === "right" ? "text-right" : "text-left"}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className={`max-w-lg ${align === "right" ? "ml-auto" : ""}`}
              >
                <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                  {description}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom overlay at ~66% scroll */}
          <div className="h-[100vh] flex items-center">
            <div className={`container mx-auto px-6 md:px-12 max-w-7xl ${align === "right" ? "text-right" : "text-left"}`}>
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className={`space-y-4 max-w-md ${align === "right" ? "ml-auto" : ""}`}
              >
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/50">
                    <span className="pulse-dot flex-shrink-0" />
                    <span className="text-base md:text-lg">{b}</span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
