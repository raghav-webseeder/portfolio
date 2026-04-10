import React, { useState, useEffect, useRef, useCallback } from 'react';

// ==========================================
// UTILITY FUNCTIONS & CUSTOM HOOKS
// ==========================================

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = throttle((ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    }, 50);

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// ==========================================
// SUB-COMPONENTS
// ==========================================

const CinematicGrain = () => (
  <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden opacity-10">
    <svg className="absolute h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves={3}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const DustParticles = ({ density = 40 }: { density?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * -0.5 - 0.1;
        this.opacity = Math.random() * 0.4;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < 0 || this.x < 0 || this.x > canvas!.width) {
          this.y = canvas!.height;
          this.x = Math.random() * canvas!.width;
        }
      }
      draw() {
        ctx!.fillStyle = `rgba(220, 220, 225, ${this.opacity})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const init = () => {
      resizeCanvas();
      particles = [];
      for (let i = 0; i < density; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 mix-blend-screen opacity-70"
    />
  );
};

const SplitTextReveal = ({ text, delayOffset = 0, className = '' }: { text: string, delayOffset?: number, className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const words = text.split(' ');

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => {
            const delay = delayOffset + wordIndex * 0.1 + charIndex * 0.04;
            return (
              <span
                key={charIndex}
                className="inline-block transition-transform"
                style={{
                  transitionDuration: '1400ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isLoaded ? 'translateY(0)' : 'translateY(110%)',
                  opacity: isLoaded ? 1 : 0,
                  transitionDelay: `${delay}s`,
                }}
              >
                {char}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

// ==========================================
// MAIN HERO COMPONENT
// ==========================================

const Hero = () => {
  const mousePosition = useMousePosition();
  const windowSize = useWindowSize();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculateLightTransform = useCallback(() => {
    if (!mousePosition.x || !mousePosition.y || windowSize.width < 768)
      return 'rotate(-12deg) translateY(-50%)'; // Disable parallax on mobile

    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;
    const moveX = (mousePosition.x - centerX) / 100;
    const moveY = (mousePosition.y - centerY) / 120;

    return `rotate(${-12 + moveY}deg) translateX(${moveX}px) translateY(-50%)`;
  }, [mousePosition, windowSize]);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#1c1d20] text-[#e9e9e9] flex items-center pt-20 md:pt-0">
      <CinematicGrain />
      <DustParticles density={windowSize.width < 768 ? 30 : 60} /> {/* Less particles on mobile */}

      {/* Main Grid Layout */}
      <div className="relative z-30 mx-auto flex h-full w-full max-w-screen-2xl flex-col justify-center px-6 md:grid md:grid-cols-12 md:items-center md:px-16 lg:px-24">

        {/* Left Content: Massive Typography */}
        <div className="z-40 flex w-full flex-col justify-center text-left md:col-span-7 lg:col-span-8 pt-10 md:pt-0">

          <div
            className={`mb-3 md:mb-4 overflow-hidden transition-all duration-1000 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="font-mono text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.4em] text-[#e9e9e9]/50">
              BCKS India
            </span>
          </div>

          <h1 className="flex flex-col font-sans font-black uppercase leading-[0.85] tracking-tighter text-[#e9e9e9]">
            <SplitTextReveal
              text="MANU"
              className="text-[18vw] md:text-[12vw] lg:text-[12vw]"
              delayOffset={0.3}
            />
            <SplitTextReveal
              text="SHUKLA."
              className="text-[18vw] md:text-[12vw] lg:text-[12vw]"
              delayOffset={0.6}
            />
          </h1>

          {/* Centered Quote and Divider */}
          <div className="mt-10 md:mt-16 flex flex-col items-start md:items-center gap-6 w-full max-w-[85%] md:max-w-[60%]">
            <p
              className={`font-serif text-base md:text-lg lg:text-xl italic text-[#e9e9e9]/70 text-left md:text-center transition-all duration-1000 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              style={{ transitionDelay: '1.2s' }}
            >
              "Every frame is a painting, every cut a heartbeat."
            </p>
            <div
              className={`w-px h-16 md:h-24 bg-[#e9e9e9]/30 transition-all duration-1000 ${isMounted ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                }`}
              style={{ transformOrigin: 'top', transitionDelay: '1.4s' }}
            />
          </div>
        </div>

        {/* Right Content: Vector Spotlight and Light Beam */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-10 pointer-events-none md:pointer-events-auto md:relative md:col-span-5 md:opacity-100 lg:col-span-4 md:inset-auto md:h-full md:w-full overflow-visible">

          <div className="relative flex h-full w-full items-center justify-center md:justify-end">

            {/* Projecting Light Rays (Hidden on very small screens for clarity) */}
            <div className="absolute right-[50%] top-1/2 z-10 h-1 w-1 hidden md:block">
              <div
                className="pointer-events-none absolute right-0 top-0 origin-right transition-transform duration-300 ease-out"
                style={{ transform: calculateLightTransform() }}
              >
                <div className="absolute right-0 top-1/2 h-[100vh] w-[160vw] -translate-y-1/2 rounded-full bg-gradient-to-l from-[#ffffff] via-[#ffffff]/10 to-transparent opacity-60 mix-blend-overlay blur-[40px]" />
              </div>
            </div>

            {/* The Vector Spotlight Image */}
            <div
              className={`relative z-40 w-[120vw] max-w-[600px] md:w-[140%] lg:w-full transition-all ${isMounted ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
                }`}
              style={{
                transitionDelay: '0.5s',
                transitionDuration: '1500ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div className="w-full mx-auto transform translate-x-1/4 md:translate-x-0">
                <img
                  src="/efd8ef09-c303-4ccd-a483-9a2e739c9c8d.png"
                  alt="Vector Studio Camera"
                  className="h-auto w-full md:scale-125 object-contain filter drop-shadow-[-10px_10px_20px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Lens flare */}
              <div className="absolute left-[8%] top-[38%] h-12 w-12 md:h-16 md:w-16 -translate-y-1/2 rounded-full bg-white opacity-90 blur-[15px] md:blur-[20px] hidden md:block" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;