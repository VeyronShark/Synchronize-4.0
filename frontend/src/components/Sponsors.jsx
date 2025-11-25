import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" }
];

const Sponsors = () => {
  const sectionRef = useRef(null);
  const duplicatedSponsors = [...sponsors, ...sponsors];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sponsors" ref={sectionRef} className="py-16 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white">
            Our <span className="text-cyan-400">Sponsors</span>
          </h2>
        </div>
        
        {/* Infinite Scroll Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-infinite-scroll">
            {duplicatedSponsors.map((sponsor, index) => (
              <div 
                key={index} 
                className="shrink-0 mx-4 sm:mx-6 md:mx-8 glass-card p-4 sm:p-6 rounded-lg sm:rounded-xl flex items-center justify-center h-24 w-36 sm:h-28 sm:w-40 md:h-32 md:w-48 hover:bg-white/10 transition-all duration-300 sponsor-card group"
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="max-h-8 sm:max-h-10 md:max-h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <style>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        
        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }
        
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Sponsors;
