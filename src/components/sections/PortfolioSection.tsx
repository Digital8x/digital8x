"use client";

import AnimatedText from "../AnimatedText";

const projects = [
  { id: 1, name: "Sobha Wood", result: "200% ROI in 3 Months" },
  { id: 2, name: "Riverview City", result: "10K+ Leads Generated" },
  { id: 3, name: "HOABL Goa", result: "Brand Authority Established" },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-32 px-8 md:px-16 bg-[#F5F2EE] text-[#0D0D0D]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <AnimatedText 
            text="Our Portfolio" 
            tag="h2" 
            className="text-5xl md:text-7xl font-normal"
          />
          <a href="#" className="uppercase tracking-widest text-sm font-bold border-b-2 border-[#0D0D0D] pb-1 hover:text-[#488E5C] hover:border-[#488E5C] transition-colors hover-target">
            View All Work &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div key={p.id} className="group relative aspect-[4/5] bg-gray-200 overflow-hidden rounded-xl hover-target cursor-pointer">
              {/* Blurred placeholder background since we don't have images */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 blur-sm transform scale-110 transition-transform duration-700 group-hover:scale-100"></div>
              
              {/* Overlay reveal */}
              <div className="absolute inset-0 bg-[#111111]/80 clip-path-inset-bottom transition-all duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:clip-path-inset-full"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white opacity-0 transform translate-y-8 transition-all duration-700 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="text-[#488E5C] font-bold tracking-widest uppercase text-sm mb-2">{p.result}</span>
                <h3 className="text-3xl font-normal">{p.name}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .clip-path-inset-bottom {
          clip-path: inset(100% 0 0 0);
        }
        .clip-path-inset-full {
          clip-path: inset(0 0 0 0);
        }
      `}} />
    </section>
  );
}
