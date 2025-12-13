import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import { Images, Star } from 'lucide-react';
import HeroBg from '../assets/backgrounds/hero-bg.png';
import ComicShield from './ComicShield';

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const shieldRef = useRef(null);
  const tagRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    const shieldContainer = shieldRef.current?.parentElement;

    // Simple fade-in animation for all elements
    tl.fromTo(tagRef.current, 
      { opacity: 0, y: -20, scale: 0.8 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
    .fromTo(textRef.current.children, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }, 
      '-=0.3'
    )
    .fromTo(subTextRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 
      '-=0.4'
    )
    .fromTo(buttonsRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 
      '-=0.3'
    );

    // Animate shield container and shield separately
    if (shieldContainer) {
      tl.fromTo(shieldContainer, 
        { opacity: 0, scale: 0.5 }, 
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, 
        '-=0.6'
      );
    }

    if (shieldRef.current) {
      tl.fromTo(shieldRef.current, 
        { rotation: -180 }, 
        { rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }, 
        '-=0.8'
      );

      // Continuous subtle rotation for the shield
      gsap.to(shieldRef.current, {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        delay: 2
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#F0F4F8]">
      
      {/* 1. Background Visuals: Patriot Style */}
      <div className="absolute inset-0 z-0">
        {/* Blue Multiply to tint the video Captain America Blue */}
        <div className="absolute inset-0 bg-[#001D4A] mix-blend-multiply opacity-80 z-10" />
        <img
          src={HeroBg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Comic Book Content - Clean Layout */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-4 sm:px-8 md:px-20 lg:px-32 pointer-events-none pt-16">
        
        {/* Floating Tag */}
        <div ref={tagRef} className="mb-4 bg-white border-2 border-black shadow-[4px_4px_0px_#000] px-3 py-1 sm:px-4 sm:py-1 -rotate-2 inline-block opacity-0">
            <span className="font-display font-black text-[#AA0505] tracking-widest text-xs sm:text-sm">FIRST AVENGER EDITION</span>
        </div>

        <div ref={textRef} className="flex flex-col relative">
            <h1 className="hero-title-responsive font-display font-black italic tracking-tighter text-white inline-block drop-shadow-[5px_5px_0px_#000] opacity-0" style={{ WebkitTextStroke: '2px black' }}>
                SYNCHRONIZE
            </h1>
            
            {/* Title with integrated shield */}
            <div className="flex items-center gap-1 sm:gap-2 mt-2 opacity-0">
                <h1 className="hero-title-responsive font-display font-black italic tracking-tighter text-[#AA0505] inline-block pop-art-text" style={{ WebkitTextStroke: '2px black' }}>
                    4.
                </h1>
                
                {/* Shield positioned as the "0" in "4.0" */}
                <div className="hero-shield-container opacity-0" style={{ width: 'clamp(3rem, 8vw, 8rem)', height: 'clamp(3rem, 8vw, 8rem)' }}>
                    <ComicShield 
                        ref={shieldRef} 
                        className="w-full h-full" 
                    />
                </div>
            </div>
        </div>
        
        <div ref={subTextRef} className="mt-6 sm:mt-8 relative opacity-0">
            <div className="absolute -left-3 sm:-left-4 top-0 bottom-0 w-1.5 sm:w-2 bg-[#AA0505] -skew-x-12"></div>
            <p className="pl-3 sm:pl-4 text-white font-bold tracking-wider font-display max-w-xl shadow-black drop-shadow-md" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)' }}>
                "I CAN DO THIS ALL DAY." <br/>
                <span className="text-blue-200 font-normal font-sans hero-subtitle-responsive mt-2 block">Join the initiative. Defend the future.</span>
            </p>
        </div>

        <div ref={buttonsRef} className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 pointer-events-auto opacity-0">
          {/* Primary Action Button - Captain America Blue */}
          <MagneticButton className="cursor-pointer px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-[#0055AA] text-white font-black text-sm sm:text-lg md:text-xl rounded-none border-4 border-white shadow-[4px_4px_0px_#AA0505] sm:shadow-[6px_6px_0px_#AA0505] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#AA0505] sm:hover:shadow-[8px_8px_0px_#AA0505] transition-all clip-path-slant group">
             <span className="relative z-10 flex items-center justify-center gap-2">
                REGISTER NOW
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
             </span>
          </MagneticButton>
          
          {/* Secondary Action - White/Red */}
          <Link to="/gallery">
            <MagneticButton className="cursor-pointer px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-white text-[#AA0505] font-black text-sm sm:text-lg md:text-xl rounded-none border-4 border-[#AA0505] shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] sm:hover:shadow-[8px_8px_0px_#000] transition-all clip-path-slant">
              <span className="flex items-center justify-center gap-2">
                <span>VIEW GALLERY</span>
                <Images className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </span>
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* Decorative Stripes (Red/White) */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full pointer-events-none z-0 opacity-20 -skew-x-12 origin-bottom-right translate-x-1/4">
        <div className="w-full h-full flex gap-8">
            <div className="h-full w-12 bg-[#AA0505]"></div>
            <div className="h-full w-12 bg-white"></div>
            <div className="h-full w-12 bg-[#AA0505]"></div>
            <div className="h-full w-12 bg-white"></div>
            <div className="h-full w-24 bg-[#0055AA]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
