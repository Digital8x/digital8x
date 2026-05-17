"use client";

import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#111111] text-white select-none">
      {/* 1. Fullscreen video background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90"
      >
        <source 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Subtle overlay to enhance text contrast */}
      <div className="absolute inset-0 bg-[#111111]/25 z-0"></div>

      {/* 2. Hero Section Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl pt-24">
        {/* H1 Cinematic Heading */}
        <h1 
          className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] font-normal text-white"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where <em className="text-[#488E5C] italic font-normal">growth</em> rises <em className="text-white/60 italic font-normal">through the noise.</em>
        </h1>

        {/* Elegant Cinematic Subtext */}
        <p className="animate-fade-rise-delay text-white/70 text-base sm:text-lg font-inter font-light max-w-2xl mt-8 leading-relaxed">
          We build scalable growth ecosystems, high-converting landing pages, and performance-driven paid ad campaigns. Expertly tailored for real estate developers and channel partners.
        </p>

        {/* Liquid Glass Hero CTA */}
        <Link href="/contact" className="animate-fade-rise-delay-2 mt-12">
          <button className="bg-[#488E5C] text-[#111111] font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-full hover:scale-[1.03] cursor-pointer transition-all duration-300 shadow-[0_0_25px_rgba(72,142,92,0.3)] hover:bg-white hover:text-[#111111]">
            Start Growing &rarr;
          </button>
        </Link>
      </div>
    </div>
  );
}
