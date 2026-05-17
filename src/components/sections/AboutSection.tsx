"use client";

import AnimatedText from "../AnimatedText";

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-32 px-8 md:px-16 bg-[#F5F2EE] text-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-32">
        
        {/* Left Column - Giant Number */}
        <div className="w-full md:w-1/3 relative flex justify-center md:justify-start">
          <div 
            className="text-[300px] md:text-[500px] leading-none font-normal text-[#488E5C] -ml-10 md:-ml-20 opacity-90 select-none transform hover:rotate-3 transition-transform duration-700 italic"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            8
          </div>
        </div>

        {/* Right Column - Text */}
        <div className="w-full md:w-2/3 flex flex-col items-start gap-8 z-10">
          <AnimatedText 
            text="We build growth engines, not just ads." 
            tag="h2" 
            className="text-5xl md:text-7xl font-normal"
          />
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed font-inter font-light">
            At Digital8X, we specialize in crafting high-impact digital marketing strategies that generate leads, drive sales, and build scalable growth ecosystems. 
            <br/><br/>
            With a sharp focus on real estate marketing, we help our clients consistently generate qualified leads and achieve measurable growth.
          </p>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
            Digital8x is a results-focused digital marketing agency specializing in paid advertising and high-converting landing pages for the real estate sector. We help developers, channel partners, and property consultants generate qualified leads and drive real ROI through strategic digital campaigns.
          </p>
          
          <a 
            href="#portfolio"
            className="magnetic-btn border border-[#0D0D0D] text-[#0D0D0D] mt-8 px-8 py-4 rounded-full font-bold tracking-widest uppercase hover-target transition-colors hover:text-white hover:border-[#488E5C]"
          >
            <span className="relative z-10 font-inter text-xs">Our Work &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
