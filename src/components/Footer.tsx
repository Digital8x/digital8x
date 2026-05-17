"use client";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111111] py-16 px-8 md:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-4">
          <a href="/" className="relative z-10 hover-target flex flex-col justify-center select-none group w-max">
            <span className="text-2xl font-black tracking-tighter text-white font-syne uppercase group-hover:opacity-85 transition-opacity">
              DIGITAL<span className="text-[#488E5C]">8X</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 -mt-1 font-inter">
              Your growth, our expertise
            </span>
          </a>
          <p className="text-gray-400 max-w-sm mt-4">
            We build scalable growth ecosystems and deliver high-performance lead generation for real estate developers and channel partners.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex flex-col gap-2 text-sm uppercase tracking-widest">
            <h4 className="text-gray-500 font-bold mb-2">Menu</h4>
            <a href="/" className="hover:text-[#488E5C] transition-colors hover-target text-white">Home</a>
            <a href="/about" className="hover:text-[#488E5C] transition-colors hover-target text-white">About</a>
            <a href="/portfolio" className="hover:text-[#488E5C] transition-colors hover-target text-white">Portfolio</a>
            <a href="/contact" className="hover:text-[#488E5C] transition-colors hover-target text-white">Contact</a>
          </div>
          
          <div className="flex flex-col gap-2 text-sm uppercase tracking-widest">
            <h4 className="text-gray-500 font-bold mb-2">Connect</h4>
            <a href="tel:+918302973330" className="hover:text-[#488E5C] transition-colors hover-target text-white">Call Us</a>
            <a href="https://wa.me/918302973330?text=Hi%20Digital8x,%20I%20am%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer" className="hover:text-[#488E5C] transition-colors hover-target text-white">WhatsApp</a>
            <a href="#" className="hover:text-[#488E5C] transition-colors hover-target text-white">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2025 DIGITAL8X. Crafted with strategy, powered by results.</p>
      </div>
    </footer>
  );
}
