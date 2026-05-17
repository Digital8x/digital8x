"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? "bg-[#111111]/95 backdrop-blur-md py-4 border-b border-white/5" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex flex-row justify-between items-center w-full">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex flex-col justify-center select-none group">
          <span className="text-2xl font-black tracking-tighter text-white font-syne uppercase group-hover:opacity-85 transition-opacity">
            DIGITAL<span className="text-[#488E5C]">8X</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 -mt-1 font-inter">
            Your growth, our expertise
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex flex-row items-center gap-8">
          <Link 
            href="/" 
            className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-[#488E5C] ${
              pathname === "/" ? "text-[#488E5C]" : "text-white"
            }`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-[#488E5C] ${
              pathname === "/about" ? "text-[#488E5C]" : "text-white"
            }`}
          >
            About
          </Link>
          <Link 
            href="/portfolio" 
            className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-[#488E5C] ${
              pathname === "/portfolio" ? "text-[#488E5C]" : "text-white"
            }`}
          >
            Portfolio
          </Link>
          <Link 
            href="/contact" 
            className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-[#488E5C] ${
              pathname === "/contact" ? "text-[#488E5C]" : "text-white"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <Link href="/contact">
          <button className="bg-[#488E5C] text-[#111111] font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full hover:bg-white transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(72,142,92,0.2)] hover:scale-[1.03]">
            Start Growing
          </button>
        </Link>
      </div>
    </nav>
  );
}
