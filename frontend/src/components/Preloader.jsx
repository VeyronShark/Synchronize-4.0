import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const containerRef = useRef(null);
  const rocketRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    // Smooth counter animation - completes in ~2 seconds
    const duration = 2000;
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

    // Smooth rocket animation along horizontal path
    if (rocketRef.current) {
      gsap.to(rocketRef.current, {
        left: '100%',
        duration: 2,
        ease: "power1.inOut"
      });
    }

    // Trail follows rocket
    if (trailRef.current) {
      gsap.to(trailRef.current, {
        width: '100%',
        duration: 2,
        ease: "power1.inOut"
      });
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (counter === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
    }
  }, [counter, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black"
      style={{ zIndex: 99999 }}
    >
      {/* Subtle space background */}
      <div className="absolute inset-0">
        {/* Minimal stars - static, no animation */}
        <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-cyan-400/40 rounded-full" />
        <div className="absolute top-[25%] right-[20%] w-1 h-1 bg-cyan-400/30 rounded-full" />
        <div className="absolute top-[60%] left-[25%] w-1 h-1 bg-cyan-400/40 rounded-full" />
        <div className="absolute bottom-[30%] right-[30%] w-1 h-1 bg-cyan-400/30 rounded-full" />
        <div className="absolute top-[40%] left-[70%] w-1 h-1 bg-cyan-400/40 rounded-full" />
        <div className="absolute bottom-[20%] left-[40%] w-1 h-1 bg-cyan-400/30 rounded-full" />
        <div className="absolute top-[70%] right-[15%] w-1 h-1 bg-cyan-400/40 rounded-full" />
        <div className="absolute top-[15%] left-[60%] w-1 h-1 bg-cyan-400/30 rounded-full" />
        
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Brand logo */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
            SYNCHRONIZE <span className="text-cyan-400">4.0</span>
          </h1>
        </div>

        {/* Rocket track container */}
        <div className="relative w-[500px] max-w-[90vw] mb-12">
          {/* Track line */}
          <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
            {/* Progress trail */}
            <div 
              ref={trailRef}
              className="absolute left-0 top-0 h-full bg-cyan-400/30 rounded-full"
              style={{ width: '0%' }}
            />
            
            {/* Rocket */}
            <div 
              ref={rocketRef}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: '0%' }}
            >
              {/* Simple rocket icon */}
              <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-[0_0_10px_rgba(0,242,255,0.8)]">
                {/* Rocket body */}
                <path 
                  d="M 20 8 L 24 16 L 24 28 L 16 28 L 16 16 Z" 
                  fill="#00F2FF" 
                  stroke="#00F2FF" 
                  strokeWidth="1"
                />
                {/* Nose */}
                <path d="M 20 8 L 16 16 L 24 16 Z" fill="#06b6d4" />
                {/* Window */}
                <circle cx="20" cy="20" r="3" fill="#000" opacity="0.3" />
                {/* Wings */}
                <path d="M 16 20 L 12 28 L 16 26 Z" fill="#00F2FF" />
                <path d="M 24 20 L 28 28 L 24 26 Z" fill="#00F2FF" />
                {/* Flame */}
                <ellipse cx="20" cy="30" rx="3" ry="4" fill="#00F2FF" opacity="0.6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="relative mb-8">
          <div className="text-7xl md:text-8xl font-display font-bold text-cyan-400">
            {counter}%
          </div>
        </div>

        {/* Loading text */}
        <div className="text-xs tracking-[0.3em] text-cyan-400/50 uppercase">
          Loading
        </div>
      </div>
    </div>
  );
};

export default Preloader;
