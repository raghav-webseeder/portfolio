import React from "react";

const Footer = () => {
  // Smooth scroll functionality for the 'Back to Top' button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      className="bg-[#050505] px-6 md:px-16 lg:px-24 py-20 md:py-32 border-t border-[#e9e9e9]/10 relative overflow-hidden flex flex-col items-center"
    >
      {/* --- HUGE BACKGROUND WATERMARK --- */}
      {/* Scaled based on viewport width for better responsive fit */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="font-sans font-black text-[20vw] md:text-[12vw] leading-none tracking-tighter text-[#e9e9e9] whitespace-nowrap">
          MANU SHUKLA.
        </span>
      </div>

      {/* --- MAIN FOOTER CONTENT --- */}
      <div className="relative z-10 w-full max-w-screen-2xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">

        {/* Left: Branding & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
          <span className="font-mono text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.4em] text-[#e9e9e9]/50 uppercase">
            Bhartiye Cine Karmchari Sangh
          </span>
          <span className="font-mono text-[9px] md:text-xs tracking-[0.2em] text-[#e9e9e9]/30 uppercase">
            © {new Date().getFullYear()} Manu Shukla. All rights reserved.
          </span>
        </div>

        {/* Center: Social Links (Wrapped for smaller screens) */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-12">
          {['Instagram', 'Vimeo', 'IMDb', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="group relative font-mono text-[11px] md:text-sm tracking-widest text-[#e9e9e9]/60 hover:text-white transition-colors uppercase py-1"
            >
              {link}
              {/* Clean underline animation on hover */}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#e9e9e9]/20 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[#e9e9e9] group-hover:border-[#e9e9e9] group-hover:-translate-y-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#e9e9e9] group-hover:text-[#050505] transition-colors"
            >
              <path d="M12 20V4M12 4L5 11M12 4L19 11" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            </svg>
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#e9e9e9] uppercase">
            Return
          </span>
        </button>

      </div>
    </footer>
  );
};

export default Footer;