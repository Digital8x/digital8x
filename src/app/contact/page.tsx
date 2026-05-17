import CtaSection from "@/components/sections/CtaSection";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="w-full relative overflow-x-hidden pt-32 bg-[#111111] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-16 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <h1 className="text-5xl md:text-8xl font-black font-syne uppercase tracking-tighter text-white leading-[0.9]">
            Let's Build <br/><span className="text-[#488E5C]">Something</span>
          </h1>
          <p className="text-lg text-gray-400 font-inter leading-relaxed max-w-xl mt-4">
            Whether you’re a real estate channel partner, startup, agency, or business owner — Digital8x helps you grow through high-converting landing pages and performance-driven paid ad campaigns. While our core expertise is in real estate marketing, we proudly collaborate with clients from diverse industries who are ready to scale their digital presence.
          </p>
          
          <div className="flex flex-col gap-8 mt-8 border-t border-white/10 pt-12">
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 font-inter">Contact Us</h3>
              <p className="text-xl font-bold font-syne font-inter">Info@digital8x.com</p>
              <p className="text-xl font-bold font-syne font-inter">+918302973330</p>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 font-inter">Hours of Operation</h3>
              <p className="text-lg font-inter text-gray-300">M-F: 10am – 5pm</p>
              <p className="text-lg font-inter text-gray-300">S-S: Closed</p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-[#1A1A1A] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl flex flex-col justify-center">
          <ContactForm />
        </div>
      </div>

      
      <CtaSection />
    </main>
  );
}
