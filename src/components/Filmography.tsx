import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

// Assuming these images are available in your assets folder
import film2 from "@/assets/film2.jpg";
import film3 from "@/assets/film3.jpg";
import film4 from "@/assets/film4.jpg";
import film5 from "@/assets/film5.jpg";

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

const films = [
  { title: "Dust & Dharma", year: "2023", span: "md:col-span-6", img: film2, aspect: "aspect-video md:aspect-[4/3]" },
  { title: "The Vermillion Gate", year: "2021", span: "md:col-span-6", img: film3, aspect: "aspect-video md:aspect-[4/3]" },
  { title: "Monsoon Requiem", year: "2019", span: "md:col-span-12", img: film4, aspect: "aspect-video md:aspect-[21/9]" },
  { title: "Echoes of Calcutta", year: "2017", span: "md:col-span-4", img: film5, aspect: "aspect-square" },
  { title: "The Silence Between", year: "2015", span: "md:col-span-4", img: film2, aspect: "aspect-square" },
  { title: "Ember & Ash", year: "2013", span: "md:col-span-4", img: film3, aspect: "aspect-square" },
];

const Filmography = () => {
  const [sectionRef, isVisible] = useIntersectionObserver();

  return (
    <section
      id="filmography"
      ref={sectionRef}
      className="bg-[#1c1d20] px-6 md:px-16 lg:px-24 py-20 md:py-32 border-t border-[#e9e9e9]/10"
    >
      {/* --- HEADER --- */}
      <div
        className={`flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
      >
        <h2 className="font-sans font-black text-5xl md:text-8xl uppercase leading-none tracking-tighter text-[#e9e9e9]">
          FILMOGRAPHY.
        </h2>
        <span className="font-mono text-[10px] md:text-sm uppercase tracking-[0.2em] text-[#e9e9e9]/50 mb-1 md:mb-2">
          [ ARCHIVE: 2013–2023 ]
        </span>
      </div>

      {/* --- GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {films.map((film, index) => (
          <div
            key={film.title}
            className={`col-span-1 ${film.span} group relative overflow-hidden bg-[#0a0a0a] border border-[#e9e9e9]/10 cursor-crosshair transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]`}
            style={{
              transitionDelay: `${index * 50}ms`,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              opacity: isVisible ? 1 : 0
            }}
          >
            {/* Image Container */}
            <div className={`${film.aspect} relative overflow-hidden bg-[#111]`}>
              <img
                src={film.img}
                alt={film.title}
                className="w-full h-full object-cover grayscale contrast-110 md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                loading="lazy"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />

              {/* Animated Arrow Icon */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm p-2 md:p-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:translate-y-4 md:-translate-x-4 md:group-hover:translate-y-0 md:group-hover:translate-x-0">
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Card Footer / Labels */}
            <div className="p-4 md:p-5 flex items-center justify-between border-t border-[#e9e9e9]/10 transition-colors duration-500 md:group-hover:bg-[#151618]">
              <span className="text-[#e9e9e9] font-sans font-bold tracking-widest uppercase text-xs md:text-base group-hover:text-white transition-colors">
                {film.title}
              </span>
              <span className="font-mono text-[9px] md:text-xs tracking-widest text-[#e9e9e9]/50">
                [ {film.year} ]
              </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Filmography;