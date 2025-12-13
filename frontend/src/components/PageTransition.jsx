import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import gsap from 'gsap';

// Import Assets
import transitionBg from '../assets/backgrounds/comic_transition_bg.png';
import ironManImg from '../assets/iron_man.png';
import capImg from '../assets/captain_america.png';
import hulkImg from '../assets/hulk.png';
import thorImg from '../assets/thor.png';
import widowImg from '../assets/black_widow.png';
import pantherImg from '../assets/black_panther.png';

// Fallback phrases
const GENERIC_PHRASES = [
  "ASSEMBLE!", "EXCELSIOR!", "ZOOM!", "WHAM!"
];

// Hero Data with ICONIC / Universally Known Quotes
const HERO_DATA = [
  { 
    name: "Iron Man",
    img: ironManImg, 
    color: "bg-yellow-500", 
    quotes: [
      "I AM IRON MAN",
      "I LOVE YOU 3000",
      "GENIUS, BILLIONAIRE...",
      "UNDEROOS!",
      "SOMETIMES YOU GOTTA RUN"
    ]
  },
  { 
    name: "Captain America",
    img: capImg, 
    color: "bg-blue-600",
    quotes: [
      "I CAN DO THIS ALL DAY",
      "AVENGERS... ASSEMBLE",
      "LANGUAGE!",
      "ON YOUR LEFT",
      "TILL THE END OF THE LINE"
    ]
  },
  { 
    name: "Hulk",
    img: hulkImg, 
    color: "bg-green-600",
    quotes: [
      "HULK SMASH!",
      "PUNY GOD",
      "SUN'S GETTING REAL LOW...",
      "THAT'S MY SECRET, CAP",
      "HULK LIKE FIRE"
    ]
  },
  { 
    name: "Thor",
    img: thorImg, 
    color: "bg-cyan-500",
    quotes: [
      "BRING ME THANOS!",
      "FRIEND FROM WORK",
      "I WENT FOR THE HEAD",
      "ANOTHER!",
      "WORTHY"
    ]
  },
  { 
    name: "Black Widow",
    img: widowImg, 
    color: "bg-gray-800",
    quotes: [
      "SHE'S NOT ALONE",
      "I DON'T JUDGE PEOPLE",
      "SUN'S GETTING REAL LOW...",
      "NOTHING LASTS FOREVER",
      "LEDGER IS DRIPPING RED"
    ]
  },
  { 
    name: "Black Panther",
    img: pantherImg, 
    color: "bg-purple-600",
    quotes: [
      "WAKANDA FOREVER!",
      "WE DON'T DO THAT HERE",
      "GET THIS MAN A SHIELD",
      "YIBAMBE!",
      "DEATH IS NOT THE END"
    ]
  }
];

export default function PageTransition({ children, skipInitial = false }) {
  const location = useLocation();
  
  // State for current transition content
  const [content, setContent] = useState({
    hero: HERO_DATA[0],
    text: "LOADING...",
    bgColor: "bg-black"
  });
  
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const heroRef = useRef(null);
  const bgImageRef = useRef(null);
  const tlRef = useRef(null);
  const isFirstRender = useRef(true);

  // Helper to get random item
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  useEffect(() => {
    // Cleanup previous timeline
    if (tlRef.current) tlRef.current.kill();

    // Check if we should skip the initial transition
    if (isFirstRender.current && skipInitial) {
        isFirstRender.current = false;
        // Ensure overlay is hidden
        gsap.set(overlayRef.current, { display: 'none' });
        return;
    }
    isFirstRender.current = false;

    // 1. Select Random Hero
    // To ensure variety, we could potentially check against previous hero, but random is okay for now.
    const selectedHero = getRandom(HERO_DATA);
    
    // 2. Select Quote (From Hero's specific quotes or generic fallback if needed)
    // We prioritize hero quotes.
    const selectedQuote = getRandom(selectedHero.quotes);
    
    setContent({
        hero: selectedHero,
        text: selectedQuote,
        bgColor: selectedHero.color
    });

    // Start Animation
    const tl = gsap.timeline();
    tlRef.current = tl;

    const overlay = overlayRef.current;
    const text = textRef.current;
    const hero = heroRef.current;
    const bgImage = bgImageRef.current;
    
    // Initial State
    gsap.set(overlay, { xPercent: -100, skewX: 0, opacity: 1, display: 'flex' });
    gsap.set(text, { scale: 0, opacity: 0, rotation: -10 });
    gsap.set(hero, { y: 100, opacity: 0, scale: 0.8 });
    gsap.set(bgImage, { scale: 1.2, opacity: 0.5 });

    // Animation Sequence
    // 1. Wipe In
    tl.to(overlay, {
      xPercent: 0,
      skewX: -5,
      duration: 0.5,
      ease: "power4.inOut",
    })
    .to(overlay, {
      skewX: 0,
      duration: 0.3,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.1")
    
    // 2. Elements Pop In
    .to(text, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.2")
    .to(hero, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "<") 
    .to(bgImage, {
        scale: 1,
        duration: 2,
        ease: "none"
    }, "<")

    // 3. Hold
    .to({}, { duration: 0.7 })
    
    // 4. Wipe Out
    .to([text, hero], {
      scale: 0,
      opacity: 0,
      duration: 0.2
    })
    .to(overlay, {
      xPercent: 100,
      skewX: 5,
      duration: 0.4,
      ease: "power4.inOut"
    }, "-=0.1")
    .set(overlay, { display: 'none' });

    return () => {
      if (tlRef.current) tlRef.current.kill();
    };
  }, [location.pathname, skipInitial]);

  return (
    <>
      <div 
        ref={overlayRef}
        className={`fixed inset-0 pointer-events-none flex flex-col items-center justify-center overflow-hidden ${content.bgColor} border-r-8 border-l-8 border-black`}
        style={{ 
          zIndex: 9999,
          position: 'fixed',
          // If we want to skip the initial transition, hide it immediately
          display: (isFirstRender.current && skipInitial) ? 'none' : 'flex'
        }}
      >
        {/* Comic BG Pattern */}
        <div 
            ref={bgImageRef}
            className="absolute inset-0 z-0 opacity-30 mix-blend-overlay"
            style={{
                backgroundImage: `url(${transitionBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />

        {/* Speed Lines Overlay */}
        <div className="absolute inset-0 opacity-10 speed-lines z-0" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center p-4 text-center">
            {/* Hero Image */}
            <img 
                ref={heroRef}
                src={content.hero.img} 
                alt={content.hero.name}
                className="w-56 h-56 md:w-80 md:h-80 object-contain mb-2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
            />
            
            {/* Action Text */}
            <h1 
            ref={textRef}
            className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
            style={{ 
                textShadow: '5px 5px 0 #000', 
                WebkitTextStroke: '2px black',
                fontFamily: 'Montserrat, sans-serif'
            }}
            >
            {content.text}
            </h1>
        </div>
      </div>
      
      {/* Page Content */}
      <div className="w-full min-h-screen">
        {children}
      </div>
    </>
  );
}
