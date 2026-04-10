import React from "react";

const words = [
  "CHIAROSCURO",
  "CATHARSIS",
  "SUBLIME",
  "VISCERAL",
  "EPHEMERAL",
  "AUTEUR",
  "KINETIC",
  "MISE EN SCÈNE"
];

const FilmStrip = () => {
  const reelFrames = [...words, ...words, ...words, ...words];

  return (
    <section className="relative overflow-hidden bg-[#1c1d20] py-6 md:py-8">

      <style>
        {`
          @keyframes film-scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-reel {
            /* Mobile par thoda fast (25s) aur desktop par slow (35s) */
            animation: film-scroll 25s linear infinite;
          }
          @media (min-width: 768px) {
            .animate-reel {
              animation: film-scroll 35s linear infinite;
            }
          }
        `}
      </style>

      {/* --- RESPONSIVE EDGE FADES --- */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 md:w-32 bg-gradient-to-r from-[#1c1d20] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 md:w-32 bg-gradient-to-l from-[#1c1d20] to-transparent" />

      <div className="relative z-10 w-full flex">
        <div className="flex w-max items-center animate-reel hover:[animation-play-state:paused]">

          {reelFrames.map((word, index) => (
            <div
              key={index}
              className="relative flex-none w-[160px] md:w-[280px] h-[100px] md:h-[150px] bg-[#0a0a0a] flex flex-col justify-between border-r border-[#e9e9e9]/5"
            >

              {/* Top Sprocket Holes - Scaled for mobile */}
              <div className="h-5 md:h-8 w-full flex items-center justify-evenly px-1 md:px-2">
                {[...Array(window?.innerWidth < 768 ? 4 : 6)].map((_, i) => (
                  <div key={`top-${i}`} className="w-2 md:w-3.5 h-2.5 md:h-4 rounded-[1px] md:rounded-[2px] bg-[#1c1d20] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
                ))}
              </div>

              {/* The Frame Content Area */}
              <div className="flex-1 relative flex flex-col justify-center items-center overflow-hidden border-y border-[#e9e9e9]/5 px-2">

                {/* Clean Frame Markings - Smaller on mobile */}
                <div className="absolute top-1 md:top-1.5 left-2 md:left-3 font-mono text-[7px] md:text-[9px] text-[#e9e9e9]/30 tracking-widest">
                  F_{index.toString().padStart(3, '0')}
                </div>

                {/* The Meaningful Word - Scaled for mobile */}
                <h3 className="font-sans font-bold text-sm md:text-xl text-[#e9e9e9] tracking-[0.1em] md:tracking-[0.15em] uppercase select-none transition-transform duration-300 hover:scale-105 hover:text-white text-center">
                  {word}
                </h3>
              </div>

              {/* Bottom Sprocket Holes */}
              <div className="h-5 md:h-8 w-full flex items-center justify-evenly px-1 md:px-2">
                {[...Array(window?.innerWidth < 768 ? 4 : 6)].map((_, i) => (
                  <div key={`bot-${i}`} className="w-2 md:w-3.5 h-2.5 md:h-4 rounded-[1px] md:rounded-[2px] bg-[#1c1d20] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FilmStrip;