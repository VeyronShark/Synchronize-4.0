import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [theme, setTheme] = useState('captain'); // 'captain' or 'panther'
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const bgRef = useRef(null);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll Trigger for Theme Change
  useEffect(() => {
    const aboutSection = document.getElementById('about');
    
    if (aboutSection) {
      ScrollTrigger.create({
        trigger: aboutSection,
        start: "top 20%",
        end: "bottom 20%",
        onEnter: () => setTheme('panther'),
        onLeaveBack: () => setTheme('captain'),
        onEnterBack: () => setTheme('panther'),
        onLeave: () => setTheme('captain'),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  // Re-check theme on location change
  useEffect(() => {
    const checkAbout = () => {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) {
            setTheme('captain');
        } else {
             ScrollTrigger.refresh();
        }
    };
    setTimeout(checkAbout, 100);
  }, [window.location.pathname]);


  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(bgRef.current, {
      yPercent: 100,
      duration: 0.8,
      ease: "power4.inOut"
    })
    .fromTo(linksRef.current, 
      { y: 100, opacity: 0, rotate: 5 },
      { 
        y: 0, 
        opacity: 1, 
        rotate: 0,
        stagger: 0.1, 
        duration: 0.6, 
        ease: "back.out(1.7)" 
      },
      "-=0.4"
    );

    menuRef.current = tl;
  }, [isLargeScreen]);

  useEffect(() => {
    if (isOpen) {
      menuRef.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      menuRef.current.reverse();
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (path) => {
    setIsOpen(false);
    
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      navigate(route || '/');
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      navigate(path);
    }
  };

  const navLinks = [
    { name: "Home", path: "/", color: "var(--color-marvel-red)" },
    { name: "Events", path: "/events", color: "var(--color-hulk-green)" },
    { name: "Schedule", path: "/#schedule", color: "var(--color-iron-gold)" },
    { name: "Sponsors", path: "/#sponsors", color: "var(--color-cap-blue)" },
    { name: "Team", path: "/team", color: "var(--color-vibranium)" },
    { name: "Gallery", path: "/gallery", color: "var(--color-arc-reactor)" },
  ];

  // Theme Styles
  const isPanther = theme === 'panther';
  
  // Dynamic Styles based on theme
  const containerClass = 'navbar-blur border-b-4 border-black';
    
  // Comic "Sticker" effect class
  const stickerClass = "comic-panel bg-white text-black";

  return (
    <>
      <nav className={`fixed top-6 left-0 w-full z-50 px-4 sm:px-8 py-4 transition-all duration-300 ${isOpen ? '' : 'pointer-events-none'}`}>
        <div className={`max-w-7xl mx-auto flex justify-between items-center pointer-events-auto`}>
          
          {/* Logo Badge */}
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className={`relative group cursor-pointer bg-white px-6 py-3 transform -skew-x-6 transition-all duration-300 ${stickerClass} hover:scale-105 hover:rotate-2 hover:shadow-[8px_8px_0px_var(--color-marvel-red)]! hover:-translate-y-1`}
          >
            <div className="flex items-center gap-2 transform skew-x-6">
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-display font-black italic leading-none text-black tracking-tighter transition-all duration-300 group-hover:tracking-widest" style={{ textShadow: '2px 2px 0px #ED1D24' }}>SYNCHRONIZE</span>
                    <span className="text-xs font-black tracking-[0.5em] bg-black text-white px-2 py-0.5 mt-[-4px] -rotate-2 group-hover:rotate-0 transition-transform duration-300">4.0 EDITION</span>
                </div>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className={`hidden lg:flex items-center gap-4 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             {navLinks.slice(0, 4).map((link, i) => ( // Show first 4 links on nav bar
               <button 
                  key={i}
                  onClick={() => handleNavigation(link.path)}
                  className="comic-button px-6 py-2 bg-white text-black text-sm"
                  style={{ '--hover-color': link.color }}
               >
                  <span className="relative z-10">{link.name}</span>
               </button>
            ))}
          </div>
          
          {/* Menu Toggle - "SECRET FILES" Badge */}
          <div className="relative z-50">
            <MagneticButton 
                onClick={toggleMenu} 
                className={`w-16 h-16 cursor-pointer flex items-center justify-center bg-marvel-red border-4 border-black shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:translate-y-[-2px] transition-all rounded-full`}
            >
               <div className="flex flex-col gap-1.5 items-center justify-center">
                   <span className={`block w-8 h-[4px] bg-white border-2 border-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                   <span className={`block w-8 h-[4px] bg-white border-2 border-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                   <span className={`block w-8 h-[4px] bg-white border-2 border-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
               </div>
            </MagneticButton>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div 
        ref={bgRef} 
        className="fixed inset-0 bg-[#0a0a0a] z-40 transform -translate-y-full flex flex-col justify-center items-center overflow-hidden"
      >
        {/* Halftone & Action Lines */}
        <div className="absolute inset-0 halftone-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 speed-lines opacity-5 pointer-events-none"></div>

        {/* Floating Comic Particles */}
        <div className="absolute top-20 left-20 text-6xl font-black text-white/5 rotate-[-15deg]">POW!</div>
        <div className="absolute bottom-20 right-20 text-8xl font-black text-white/5 rotate-15">BAM!</div>

        <div className="flex flex-col items-center gap-6 relative z-10 w-full max-w-2xl px-4">
          <h2 className="text-xl font-mono text-marvel-red tracking-widest mb-8 border-b-2 border-marvel-red pb-2">CLASSIFIED FILES</h2>
          
          {navLinks.map((link, index) => (
            <button
              key={index}
              ref={el => linksRef.current[index] = el}
              onClick={() => handleNavigation(link.path)}
              className="group relative w-full text-center py-2"
            >
              <div className="relative inline-block transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
                <div className="absolute -inset-2 bg-white skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-2 border-black shadow-[4px_4px_0px_#000]"></div>
                <span 
                    className="relative z-10 text-5xl sm:text-7xl font-display font-black text-transparent bg-clip-text bg-white italic uppercase group-hover:text-black transition-colors duration-200"
                    style={{ WebkitTextStroke: '2px black' }}
                >
                    {link.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
