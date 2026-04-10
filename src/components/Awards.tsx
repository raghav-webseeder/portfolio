import React, { useState, useEffect, useRef } from "react";

// Assuming these images are available in your assets folder
import film4 from "@/assets/film4.jpg";
import film5 from "@/assets/film5.jpg";
import film2 from "@/assets/film2.jpg";

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { threshold: 0.05, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return [ref, isIntersecting] as const;
};

const awards = [
  { title: "Best Director", event: "National Film Awards", year: "2023", span: "md:col-span-8", img: film5 },
  { title: "Golden Lotus", event: "IFFI Goa", year: "2021", span: "md:col-span-4", img: film4 },
  { title: "Jury Grand Prix", event: "Cannes Film Festival", year: "2019", span: "md:col-span-4", img: film2 },
  { title: "Best Cinematography", event: "Filmfare Awards", year: "2018", span: "md:col-span-8", img: film5 },
];

const Awards = () => {
  const [sectionRef, isVisible] = useIntersectionObserver();

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="bg-[#1c1d20] px-6 md:px-16 lg:px-24 py-20 md:py-32 border-t border-[#e9e9e9]/10 overflow-hidden"
    >
      {/* --- HEADER --- */}
      <div
        className={`flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
      >
        <h2 className="font-sans font-black text-5xl md:text-8xl uppercase leading-none tracking-tighter text-[#e9e9e9]">
          RECOGNITION.
        </h2>
        <span className="font-mono text-[10px] md:text-sm uppercase tracking-[0.2em] text-[#e9e9e9]/50 mb-1 md:mb-2">
          [ HONORS & AWARDS ]
        </span>
      </div>

      {/* --- GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {awards.map((award, index) => (
          <div
            key={award.title}
            className={`col-span-1 ${award.span} group relative overflow-hidden bg-[#0a0a0a] border border-[#e9e9e9]/10 cursor-default transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]`}
            style={{
              transitionDelay: `${index * 100}ms`,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              opacity: isVisible ? 1 : 0
            }}
          >
            {/* Image Container - Responsive aspect ratio */}
            <div className="aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] relative overflow-hidden bg-[#111]">
              <img
                src={award.img}
                alt={award.title}
                className="w-full h-full object-cover grayscale contrast-125 brightness-75 md:group-hover:grayscale-0 md:group-hover:contrast-100 md:group-hover:brightness-100 md:group-hover:scale-105 transition-all duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 md:group-hover:opacity-90 transition-opacity duration-700" />
            </div>

            {/* Card Content */}
            <div className="relative p-5 md:p-8 flex items-end justify-between border-t border-[#e9e9e9]/5 overflow-hidden transition-colors duration-500 md:group-hover:bg-[#121315]">

              {/* Responsive Watermark Year */}
              <div className="absolute right-3 bottom-1 md:right-4 md:bottom-2 font-sans font-black text-6xl md:text-8xl leading-none tracking-tighter text-[#e9e9e9]/5 group-hover:text-[#e9e9e9]/10 transition-colors duration-700 pointer-events-none select-none">
                {award.year}
              </div>

              {/* Text Info */}
              <div className="relative z-10 flex flex-col gap-1.5">
                <h3 className="text-[#e9e9e9] font-sans font-black tracking-widest uppercase text-lg md:text-2xl group-hover:text-white transition-colors">
                  {award.title}
                </h3>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors duration-500" />
                  <span className="font-mono text-[10px] md:text-sm tracking-widest text-[#e9e9e9]/50 group-hover:text-[#e9e9e9]/80 transition-colors">
                    {award.event}
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;