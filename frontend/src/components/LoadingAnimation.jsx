import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LoadingAnimation = ({ loaderRef, loadingText = "Preparing Launch..." }) => {
  const [percentage, setPercentage] = useState(0);
  const rocketRef = useRef(null);
  const starsRef = useRef([]);
  const flameRef = useRef(null);

  useEffect(() => {
    // Animate percentage from 0 to 100
    gsap.to({ value: 0 }, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: function() {
        setPercentage(Math.floor(this.targets()[0].value));
      }
    });

    // Animate rocket with bounce and hover effect
    if (rocketRef.current) {
      gsap.fromTo(rocketRef.current,
        { y: 50, opacity: 0, scale: 0.5 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 1,
          ease: "back.out(2)"
        }
      );

      // Continuous hover animation
      gsap.to(rocketRef.current, {
        y: -15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Animate rocket flame
    if (flameRef.current) {
      gsap.to(flameRef.current, {
        scaleY: 0.8,
        opacity: 0.6,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Animate stars twinkling and moving
    starsRef.current.forEach((star, i) => {
      if (star) {
        gsap.to(star, {
          opacity: Math.random() * 0.5 + 0.3,
          scale: Math.random() * 0.5 + 0.8,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2
        });

        // Slow downward movement for parallax effect
        gsap.to(star, {
          y: '+=150',
          duration: 10 + Math.random() * 10,
          repeat: -1,
          ease: "linear"
        });
      }
    });
  }, []);

  // Generate stars for galaxy background
  const stars = Array(100).fill(0).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.7 + 0.3
  }));

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)'
      }}
    >
      {/* Galaxy stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            ref={el => starsRef.current[i] = el}
            className="absolute rounded-full"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: 'white',
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      {/* Nebula-like glow effects */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'nebula-pulse 4s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'nebula-pulse 5s ease-in-out infinite reverse'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Rocket */}
        <div ref={rocketRef} className="relative mb-8 inline-block">
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 120 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))' }}
          >
            {/* Rocket Body */}
            <path 
              d="M60 10 L45 60 L45 80 L60 90 L75 80 L75 60 Z" 
              fill="url(#rocketGradient)"
              stroke="white"
              strokeWidth="2"
            />
            {/* Rocket Nose */}
            <path 
              d="M60 10 L45 30 L75 30 Z" 
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
            />
            {/* Window */}
            <circle cx="60" cy="45" r="8" fill="#1e3a8a" stroke="#93c5fd" strokeWidth="2"/>
            <circle cx="60" cy="45" r="5" fill="#3b82f6" opacity="0.6"/>
            {/* Left Fin */}
            <path 
              d="M45 65 L30 85 L45 80 Z" 
              fill="#2563eb"
              stroke="white"
              strokeWidth="1.5"
            />
            {/* Right Fin */}
            <path 
              d="M75 65 L90 85 L75 80 Z" 
              fill="#2563eb"
              stroke="white"
              strokeWidth="1.5"
            />
            {/* Flame */}
            <g ref={flameRef} style={{ transformOrigin: '60px 90px' }}>
              <path 
                d="M52 90 L60 110 L68 90" 
                fill="url(#flameGradient)"
                opacity="0.9"
              />
              <path 
                d="M55 90 L60 105 L65 90" 
                fill="white"
                opacity="0.6"
              />
            </g>
            
            <defs>
              <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Synchronize 4.0 Text */}
        <div className="mb-6">
          <h1 
            className="text-4xl md:text-5xl font-display font-bold tracking-wider mb-2"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 50%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-shift 3s ease infinite',
              textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
            }}
          >
            SYNCHRONIZE 4.0
          </h1>
        </div>

        {/* Percentage Display */}
        <div className="text-6xl md:text-7xl font-bold text-white mb-6" style={{
          textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)'
        }}>
          {percentage}%
        </div>

        {/* Loading Bar */}
        <div className="w-80 max-w-md mx-auto">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
            <div 
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${percentage}%`,
                background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)'
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-blue-200 text-sm mt-6 tracking-[0.3em] uppercase animate-pulse">
          {loadingText}
        </p>
      </div>

    </div>
  );
};

export default LoadingAnimation;
