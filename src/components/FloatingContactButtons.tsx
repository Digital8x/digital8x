"use client";

import React from "react";
import { Phone } from "lucide-react";

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-8 right-6 md:right-8 z-50 flex flex-col gap-4">
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918302973330?text=Hi%20Digital8x,%20I%20am%20interested%20in%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-end hover-target"
        aria-label="Contact us on WhatsApp"
      >
        {/* Label (Slides out on hover) */}
        <span className="hidden md:inline-block mr-3 px-4 py-2 bg-[#1A1A1A]/95 text-white font-inter text-xs font-bold uppercase tracking-widest rounded-lg border border-white/5 shadow-2xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none select-none">
          WhatsApp
        </span>
        
        {/* Button Icon Container */}
        <div className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300">
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping -z-10"></span>
          
          {/* WhatsApp SVG Icon */}
          <svg
            className="w-7 h-7 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.388 1.977 13.911.952 11.28.95c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.47 3.393 1.357 4.869l-.993 3.629 3.734-.964zM18.23 15.5c-.3-.15-1.78-.88-2.055-.98-.275-.1-.475-.15-.675.15-.2.3-.77.98-.945 1.18-.175.2-.35.225-.65.075-.3-.15-1.264-.467-2.407-1.485-.89-.792-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.48-.51-.66-.52-.17-.01-.365-.01-.56-.01-.195 0-.51.075-.775.365-.265.29-1.01 1.01-1.01 2.46s1.05 2.85 1.2 3.05c.15.2 2.07 3.16 5.01 4.43 2.45 1.06 2.95.85 3.47.8.52-.05 1.785-.73 2.035-1.43.25-.7.25-1.295.175-1.425-.075-.13-.275-.2-.575-.35z" />
          </svg>
        </div>
      </a>

      {/* Phone Floating Button */}
      <a
        href="tel:+918302973330"
        className="group relative flex items-center justify-end hover-target"
        aria-label="Call us by phone"
      >
        {/* Label (Slides out on hover) */}
        <span className="hidden md:inline-block mr-3 px-4 py-2 bg-[#1A1A1A]/95 text-white font-inter text-xs font-bold uppercase tracking-widest rounded-lg border border-white/5 shadow-2xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none select-none">
          Call Now
        </span>
        
        {/* Button Icon Container */}
        <div className="w-14 h-14 bg-[#1A1A1A]/90 hover:bg-[#222222] border border-white/10 text-white hover:text-[#488E5C] hover:border-[#488E5C]/50 rounded-full flex items-center justify-center shadow-2xl hover:shadow-[0_0_25px_rgba(72,142,92,0.3)] hover:scale-110 active:scale-95 transition-all duration-300">
          <Phone className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300" />
        </div>
      </a>
    </div>
  );
}
