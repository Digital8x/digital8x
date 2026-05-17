"use client";

import React from "react";
import { motion } from "framer-motion";
import FrameAnimation from "../FrameAnimation";

export default function Hero() {
  return (
    <section className="relative h-[200vh] w-full">
      {/* Motion Background Layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <FrameAnimation 
          frameCount={48} 
          folderPath="/assets/frames/hero" 
          trigger="scroll"
          className="opacity-60"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* First Viewport: Headline */}
        <div className="h-screen flex items-center justify-center container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl"
          >
            <h2 className="text-cyan-500 font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
              Digital Marketing for Real Estate
            </h2>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
              SCALE YOUR <br />
              <span className="text-glow text-cyan-400">INVENTORY</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
              We combine cinematic visual storytelling with data-driven performance marketing to dominate the real estate market.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center pointer-events-auto">
              <button className="bg-cyan-500 text-black px-10 py-4 rounded-full font-bold text-lg neon-glow hover:scale-105 transition-transform">
                Start Growing
              </button>
              <button className="glass text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                View Results
              </button>
            </div>
          </motion.div>
        </div>

        {/* Second Viewport: Secondary Stats/Message */}
        <div className="h-screen flex items-center justify-center container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl"
          >
            <StatItem number="500Cr+" label="Inventory Sold" />
            <StatItem number="12k+" label="Qualified Leads" />
            <StatItem number="15+" label="Premium Projects" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center glass p-10 rounded-3xl backdrop-blur-xl">
      <div className="text-4xl md:text-6xl font-black text-cyan-400 mb-2">{number}</div>
      <div className="text-white/40 uppercase tracking-widest text-sm font-bold">{label}</div>
    </div>
  );
}
