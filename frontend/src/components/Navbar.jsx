import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const bgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(bgRef.current, {
      yPercent: 100,
      duration: 0.8,
      ease: "power4.inOut"
    })
    .fromTo(linksRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" },
      "-=0.4"
    );

    menuRef.current = tl;
  }, []);

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

  const handleSmoothScroll = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        setIsOpen(false);
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  };

  const navLinks = [
    { name: "Events", href: "#events", isRoute: false },
    { name: "Schedule", href: "#schedule", isRoute: false },
    { name: "Sponsors", href: "#sponsors", isRoute: false },
    { name: "Team", href: "/team", isRoute: true },
    { name: "Gallery", href: "/gallery", isRoute: true },
    { name: "Contact", href: "#contact", isRoute: false }
  ];

  return (
    <>
      {/* Floating Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <Link 
          to="/" 
          onClick={() => setIsOpen(false)} 
          className="text-2xl font-display font-bold tracking-tighter hover:opacity-80 transition-opacity cursor-pointer"
        >
          SYNCHRONIZE <span className="text-cyan-400">4.0</span>
        </Link>
        
        <button 
          onClick={toggleMenu}
          className="relative z-50 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div 
        ref={bgRef} 
        className="fixed inset-0 bg-black z-40 transform -translate-y-full flex flex-col justify-center items-center"
      >
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link, index) => (
            link.isRoute ? (
              <Link
                key={index}
                to={link.href}
                ref={el => linksRef.current[index] = el}
                onClick={() => setIsOpen(false)}
                className="group text-5xl md:text-7xl font-display font-bold text-white transition-all duration-300 opacity-0 relative"
              >
                <span className="relative z-10 inline-block transition-all duration-300 group-hover:text-cyan-400">
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_15px_rgba(0,242,255,0.8)]"></span>
              </Link>
            ) : (
              <a 
                key={index}
                href={link.href}
                ref={el => linksRef.current[index] = el}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="group text-5xl md:text-7xl font-display font-bold text-white transition-all duration-300 opacity-0 relative"
              >
                <span className="relative z-10 inline-block transition-all duration-300 group-hover:text-cyan-400">
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_15px_rgba(0,242,255,0.8)]"></span>
              </a>
            )
          ))}
        </div>
        
        <div className="absolute bottom-10 left-0 w-full text-center text-gray-500 font-sans text-sm">
          &copy; 2024 Synchronize Fest. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Navbar;
