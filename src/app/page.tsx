import HeroSection from "@/components/sections/HeroSection";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import ServicesSection from "@/components/sections/ServicesSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";

export default function Home() {
  return (
    <main className="w-full relative overflow-x-hidden bg-[#111111]">
      <HeroSection />
      
      <MarqueeStrip 
        text="GOOGLE ADS ✦ META ADS ✦ LINKEDIN ADS ✦ LANDING PAGES ✦ SEO ✦ BRAND STRATEGY ✦ REAL ESTATE CAMPAIGNS ✦ " 
        bg="bg-[#488E5C]"
        textColor="text-[#111111] font-bold"
      />
      
      <ServicesSection />
      
      <HowWeWorkSection />
      
      <MarqueeStrip 
        text="RESULTS-DRIVEN ✦ DATA-BACKED ✦ REAL ESTATE FOCUSED ✦ HIGH-CONVERTING ✦ GROWTH-OBSESSED ✦ " 
        bg="bg-[#1a1a1a]"
        textColor="text-white/70"
      />
    </main>
  );
}
