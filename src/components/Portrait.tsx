import React, { useState, useEffect, useRef } from "react";
import portraitImg from "@/assets/portrait.jpg";

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { threshold: 0.1, ...options }); // Reduced threshold for mobile better triggering

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isIntersecting] as const;
};

const Portrait = () => {
  const [hover, setHover] = useState(false);
  const [sectionRef, isVisible] = useIntersectionObserver();

  return (
    <section
      id="portrait"
      ref={sectionRef}
      className="relative w-full bg-[#1c1d20] px-6 md:px-16 lg:px-24 py-20 md:py-32 border-t border-[#e9e9e9]/10 overflow-hidden"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#e9e9e9 1px, transparent 1px), linear-gradient(90deg, #e9e9e9 1px, transparent 1px)',
          backgroundSize: '3rem 3rem'
        }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">

        {/* Left Side: Cinematic Portrait Image */}
        <div
          className={`col-span-1 md:col-span-7 relative transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onTouchStart={() => setHover(true)} // Touch support for mobile
          onTouchEnd={() => setHover(false)}
        >
          <div className="relative aspect-[4/3] md:aspect-video w-full overflow-hidden bg-[#0a0a0a] border border-[#e9e9e9]/20 group cursor-crosshair">

            <img
              src={portraitImg}
              alt="Manu Shukla on set"
              className={`h-full w-full object-cover transition-all duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${hover ? "scale-105 grayscale-0" : "scale-100 grayscale contrast-125 brightness-75"
                }`}
              loading="lazy"
            />

            {/* Cinematic Lens Flare */}
            <div
              className={`absolute inset-0 mix-blend-screen transition-opacity duration-1000 pointer-events-none ${hover ? "opacity-100" : "opacity-0"
                }`}
              style={{
                background: "radial-gradient(circle at 30% 40%, rgba(255, 240, 200, 0.3) 0%, transparent 60%)",
              }}
            />

            {/* Director's Monitor UI Overlay */}
            <div className="pointer-events-none absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start w-full opacity-70">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-600 ${hover ? 'animate-pulse' : 'opacity-50'}`} />
                  <span className="font-mono text-[10px] md:text-xs tracking-widest text-white font-bold">REC</span>
                </div>
                <span className="font-mono text-[10px] md:text-xs tracking-widest text-white">ISO 800</span>
              </div>

              {/* Center Crosshairs */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 transition-opacity duration-500 ${hover ? 'opacity-30' : 'opacity-10'}`}>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white -translate-x-1/2" />
                <div className="absolute left-0 right-0 top-1/2 h-px bg-white -translate-y-1/2" />
              </div>

              <div className="flex justify-between items-end w-full opacity-70">
                <span className="font-mono text-[10px] md:text-xs tracking-widest text-white">T 2.8</span>
                <span className="font-mono text-[10px] md:text-xs tracking-widest text-white">24 FPS</span>
              </div>
            </div>

            {/* Framing Marks */}
            <div className="absolute top-3 left-3 w-4 h-4 md:w-8 md:h-8 border-t-2 border-l-2 border-white/40" />
            <div className="absolute top-3 right-3 w-4 h-4 md:w-8 md:h-8 border-t-2 border-r-2 border-white/40" />
            <div className="absolute bottom-3 left-3 w-4 h-4 md:w-8 md:h-8 border-b-2 border-l-2 border-white/40" />
            <div className="absolute bottom-3 right-3 w-4 h-4 md:w-8 md:h-8 border-b-2 border-r-2 border-white/40" />
          </div>

          <div className="mt-4 md:mt-6 flex items-center justify-between border-t border-[#e9e9e9]/10 pt-4">
            <span className="font-mono text-[9px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-[#e9e9e9]/50">
              Fig. 01 — Location
            </span>
            <span className="font-mono text-[9px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-[#e9e9e9]/50">
              Interaction: Hover
            </span>
          </div>
        </div>

        {/* Right Side: Bio Content */}
        <div
          className={`col-span-1 md:col-span-5 flex flex-col justify-center gap-6 md:gap-8 transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 md:translate-x-12 opacity-0"
            }`}
        >
          <div>
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-[#e9e9e9]/50 block mb-3 md:mb-4">
              The Masterpiece
            </span>
            <h2 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] tracking-tighter text-[#e9e9e9]">
              THE
              <br />
              ARCHITECT.
            </h2>
          </div>

          <div className="w-12 h-1 bg-[#e9e9e9] my-1" />

          <p className="font-serif text-base md:text-lg text-[#e9e9e9]/80 leading-relaxed max-w-md">
            Manu Shukla is an award-winning film director whose visceral storytelling
            and painterly compositions have redefined contemporary Indian cinema.
            With over two decades behind the lens, his work bridges the raw and the
            sublime.
          </p>

          <a
            href="#biography"
            className="inline-flex items-center gap-4 group font-mono text-xs md:text-sm uppercase tracking-widest text-[#e9e9e9] hover:text-white transition-colors w-fit mt-2 pb-2 border-b border-[#e9e9e9]/30 hover:border-white"
          >
            Read Full Biography
            <svg
              className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Portrait;