"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu automatically on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Disable background scrolling when mobile menu is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    if (mobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-[#111111]/95 backdrop-blur-md py-4 border-b border-white/5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex flex-row justify-between items-center w-full">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="relative z-[101] flex flex-col justify-center select-none group"
          >
            <span className="text-2xl font-black tracking-tighter text-white font-syne uppercase group-hover:opacity-85 transition-opacity">
              DIGITAL<span className="text-[#488E5C]">8X</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 -mt-1 font-inter">
              Your growth, our expertise
            </span>
          </Link>

          {/* Desktop Navigation Links */}
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

          {/* Right Section Actions */}
          <div className="flex items-center gap-4 relative z-[101]">
            {/* CTA Button (Desktop & Tablet) */}
            <Link href="/contact" className="hidden sm:block">
              <button className="bg-[#488E5C] text-[#111111] font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full hover:bg-white transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(72,142,92,0.2)] hover:scale-[1.03]">
                Start Growing
              </button>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden text-white hover:text-[#488E5C] transition-colors p-2 cursor-pointer focus:outline-none"
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Navigation Drawer Menu */}
      <div 
        className={`fixed inset-0 w-full h-screen bg-[#111111]/98 backdrop-blur-xl z-[90] flex flex-col justify-center items-center gap-8 transition-all duration-500 md:hidden ${
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto translate-y-0" 
            : "opacity-0 pointer-events-none -translate-y-8"
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-center px-8 w-full max-w-sm mt-12">
          <Link 
            href="/" 
            className={`text-3xl font-black font-syne uppercase tracking-tighter transition-colors hover:text-[#488E5C] ${
              pathname === "/" ? "text-[#488E5C]" : "text-white"
            }`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`text-3xl font-black font-syne uppercase tracking-tighter transition-colors hover:text-[#488E5C] ${
              pathname === "/about" ? "text-[#488E5C]" : "text-white"
            }`}
          >
            About
          </Link>
          <Link 
            href="/portfolio" 
            className={`text-3xl font-black font-syne uppercase tracking-tighter transition-colors hover:text-[#488E5C] ${
              pathname === "/portfolio" ? "text-[#488E5C]" : "text-white"
            }`}
          >
            Portfolio
          </Link>
          <Link 
            href="/contact" 
            className={`text-3xl font-black font-syne uppercase tracking-tighter transition-colors hover:text-[#488E5C] ${
              pathname === "/contact" ? "text-[#488E5C]" : "text-white"
            }`}
          >
            Contact
          </Link>

          <Link href="/contact" className="mt-6 w-full">
            <button className="w-full bg-[#488E5C] text-[#111111] font-bold uppercase tracking-widest text-sm py-4 rounded-full transition-all duration-300 hover:bg-white shadow-[0_0_25px_rgba(72,142,92,0.3)]">
              Start Growing &rarr;
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
