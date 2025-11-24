import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const logoRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    // Faster counter animation - completes in ~1.5 seconds
    const duration = 1500; // milliseconds
    const steps = 100;
    const stepDuration = duration / steps;
    
    let currentCount = 0;
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev < 100) {
          currentCount = prev + 1;
          return currentCount;
        }
        clearInterval(interval);
        return 100;
      });
    }, stepDuration);

    // Animate loading bars
    barsRef.current.forEach((bar, i) => {
      if (bar) {
        gsap.to(bar, {
          scaleY: 1,
          duration: 0.8,
          delay: i * 0.05,
          ease: "power2.out",
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.2
        });
      }
    });

    // Logo entrance animation
    gsap.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Smooth counter animation
    if (counterRef.current) {
      gsap.to(counterRef.current, {
        textContent: counter,
        duration: 0.3,
        ease: "power1.out",
        snap: { textContent: 1 }
      });
    }
  }, [counter]);

  useEffect(() => {
    if (counter === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      // Fast, smooth exit animation
      tl.to(logoRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      }, "-=0.2");
    }
  }, [counter, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black"
      style={{ zIndex: 99999 }}
    >
      {/* Minimal animated background */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(0, 242, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div ref={logoRef} className="relative z-10 flex flex-col items-center">
        {/* Brand logo */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            SYNCHRONIZE <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">4.0</span>
          </h1>
        </div>

        {/* Loading bars */}
        <div className="flex items-end space-x-2 h-16 mb-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              ref={el => barsRef.current[i] = el}
              className="w-2 bg-linear-to-t from-cyan-400 to-purple-400 rounded-full origin-bottom"
              style={{
                height: `${20 + i * 10}%`,
                transform: 'scaleY(0.3)'
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="relative mb-4">
          <div 
            ref={counterRef}
            className="text-6xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400"
          >
            0
          </div>
          <div className="absolute inset-0 text-6xl md:text-7xl font-display font-bold text-cyan-400 opacity-30 blur-lg">
            {counter}
          </div>
        </div>

        {/* Loading text */}
        <div className="text-sm tracking-[0.3em] text-gray-500 uppercase">
          Loading Experience
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-linear-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,242,255,0.5)]"
            style={{ width: `${counter}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
