import PortfolioSection from "@/components/sections/PortfolioSection";
import StatsSection from "@/components/sections/StatsSection";

export default function PortfolioPage() {
  return (
    <main className="w-full relative overflow-x-hidden pt-32 bg-[#111111] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-16 mb-16">
        <h1 className="text-5xl md:text-8xl font-black font-syne uppercase tracking-tighter mb-6 text-white">
          Our <span className="text-[#488E5C]">Portfolio</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl font-inter">Recent work and data-driven results for our clients.</p>
      </div>
      
      <StatsSection />
      
      <PortfolioSection />
      
      <section className="py-24 px-8 md:px-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
           {[
             { title: "High-Volume Lead Generation", desc: "Campaigns have collectively generated well over 10,000 qualified leads in Bangalore and Pune, leveraging strategic targeting and persuasive landing page design." },
             { title: "Exceptional ROI", desc: "Clients have seen an average campaign ROI of 200–300% (2x–3x return on ad spend) by optimizing budget allocation and creative performance, substantially outperforming industry benchmarks." },
             { title: "Data-Driven Optimization", desc: "We continuously monitor key metrics (CTR, CPL, conversion rate, etc.) and use insights to adjust targeting, budget, and creative. This ensures efficient budget use and steadily improves performance throughout each campaign." },
             { title: "Conversion-Optimized Landing Pages", desc: "Custom-designed landing pages ensure that every click converts into a meaningful action. Rigorous A/B testing of headlines, forms, and calls-to-action consistently boosts conversion rates above industry norms." },
             { title: "Diverse Project Portfolio", desc: "Projects span a wide spectrum of real estate segments – luxury residential high-rises, mid-market apartments, integrated townships, commercial complexes, and retail centers – with customized marketing tactics for each segment." },
             { title: "Versatile Ad Strategies", desc: "We utilize a mix of paid channels (Google Search, Facebook/Instagram, display networks, etc.) tailored to each project’s audience, capturing both immediate inquiries and longer-term interest." },
           ].map((stat, i) => (
             <div key={i} className="flex flex-col gap-4 bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#488E5C]/50 transition-colors">
               <h3 className="text-2xl font-bold font-syne text-[#488E5C] uppercase tracking-wide">{stat.title}</h3>
               <p className="text-gray-400 leading-relaxed font-inter">{stat.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </main>
  );
}
