import React, { useState, useEffect } from "react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  // Detect scroll to trigger glassmorphism background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Custom function for smooth scrolling with offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu when a link is clicked

    // Handle "back to top" for logo click
    if (targetId === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 85;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { name: "Archive", href: "#filmography" },
    { name: "Vision", href: "#portrait" },
    { name: "Awards", href: "#awards" }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || isOpen
            ? "bg-[#050505]/90 backdrop-blur-md border-b border-[#e9e9e9]/10 py-4 shadow-2xl"
            : "bg-transparent py-6"
          }`}
      >
        <div className="mx-auto max-w-screen-2xl px-8 md:px-16 lg:px-24 flex items-center justify-between">

          {/* --- BRANDING / LOGO --- */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="flex items-center gap-3 font-sans font-black text-xl md:text-2xl tracking-tighter text-[#e9e9e9] uppercase select-none transition-transform hover:scale-[1.02] relative z-50"
          >
            {/* Blinking Cinematic REC Dot */}
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse hidden md:block shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
            <span>
              MANU SHUKLA<span className="text-red-600">.</span>
            </span>
          </a>

          {/* --- DESKTOP LINKS --- */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group relative font-mono text-xs tracking-[0.2em] text-[#e9e9e9]/60 hover:text-white transition-colors uppercase py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </a>
            ))}

            <a
              href="#footer"
              onClick={(e) => handleNavClick(e, "#footer")}
              className="ml-4 bg-[#e9e9e9] text-[#050505] font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:scale-105 hover:shadow-[0_0_20px_rgba(233,233,233,0.3)]"
            >
              Connect
            </a>
          </div>

          {/* --- MOBILE MENU TOGGLE (Animated Hamburger) --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 flex flex-col justify-center items-end gap-1.5 w-8 h-8 focus:outline-none"
          >
            <span className={`block h-px bg-[#e9e9e9] transition-all duration-300 ease-in-out ${isOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`} />
            <span className={`block h-px bg-[#e9e9e9] transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-px bg-[#e9e9e9] transition-all duration-300 ease-in-out ${isOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6'}`} />
          </button>

        </div>
      </nav>

      {/* --- MOBILE MENU FULLSCREEN OVERLAY --- */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center gap-8 w-full px-8">
          {navLinks.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-sans font-black text-4xl uppercase tracking-widest text-[#e9e9e9] hover:text-white transition-colors"
              style={{
                transitionDelay: isOpen ? `${index * 100 + 100}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {item.name}
            </a>
          ))}

          <div className="w-12 h-px bg-[#e9e9e9]/20 my-4"
            style={{
              transitionDelay: isOpen ? '400ms' : '0ms',
              opacity: isOpen ? 1 : 0,
              transition: 'all 0.5s ease'
            }}
          />

          <a
            href="#footer"
            onClick={(e) => handleNavClick(e, "#footer")}
            className="bg-[#e9e9e9] text-[#050505] font-mono text-sm font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all hover:bg-white w-full max-w-xs text-center"
            style={{
              transitionDelay: isOpen ? '500ms' : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isOpen ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            Connect
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;