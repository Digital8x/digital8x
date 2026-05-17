import AboutSection from "@/components/sections/AboutSection";

export default function AboutPage() {
  return (
    <main className="w-full relative overflow-x-hidden min-h-screen">
      <div className="pt-48 pb-24 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <h1 className="text-5xl md:text-8xl font-black font-syne uppercase tracking-tighter text-white">
            About <span className="text-[#488E5C]">Us</span>
          </h1>
          <p className="text-xl text-gray-400 mt-6 max-w-2xl font-inter">We build scalable growth ecosystems and deliver high-performance lead generation.</p>
        </div>
      </div>
      
      <AboutSection />
      
      <section className="py-24 px-8 md:px-16 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold font-syne mb-16 uppercase tracking-tighter">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "Innovation", desc: "We push boundaries to create unique, forward-thinking designs." },
              { title: "Quality", desc: "Every project meets the highest standards of excellence." },
              { title: "User-Centric", desc: "We craft experiences that are intuitive and engaging." },
              { title: "Collaboration", desc: "Great design happens when ideas and expertise come together." },
              { title: "Integrity", desc: "Transparency and honesty drive our work and relationships." },
              { title: "Growth", desc: "We evolve with trends, technology, and client needs." },
            ].map((value, i) => (
              <div key={i} className="flex flex-col gap-4 border-t border-gray-800 pt-8">
                <h3 className="text-2xl font-bold text-[#488E5C] font-syne uppercase">{value.title}</h3>
                <p className="text-gray-400 font-inter">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 px-8 md:px-16 bg-[#F5F2EE] text-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/3">
              <h2 className="text-4xl md:text-5xl font-bold font-syne uppercase tracking-tighter mb-6">How We Turn Ideas into Impactful Solutions</h2>
              <p className="text-gray-600 font-inter">We simplify the web design process to deliver exceptional results. Our proven approach ensures your website is visually stunning, user-friendly, and aligned with your business goals every step of the way.</p>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-12">
              {[
                { step: "01", title: "Discover & Strategize", desc: "We start by getting to know your business, audience, and objectives. Through research and collaboration, we define a strategy to create a website that aligns with your brand and stands out from the competition." },
                { step: "02", title: "Design & Develop", desc: "Our team crafts visually engaging, user-friendly designs and brings them to life with modern development tools. Every website is optimized for speed, functionality, and mobile responsiveness." },
                { step: "03", title: "Launch & Optimize", desc: "After a smooth launch, we provide ongoing maintenance, updates, and performance tracking to ensure your website stays relevant and effective over time." },
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <span className="text-4xl font-bold text-gray-300 font-syne group-hover:text-[#488E5C] transition-colors">{item.step}</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 font-syne uppercase">{item.title}</h3>
                    <p className="text-gray-600 font-inter leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
