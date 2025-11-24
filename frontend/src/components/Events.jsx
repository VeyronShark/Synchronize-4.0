import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const eventsData = [
  { title: "Hackathon", category: "Coding", image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=600" },
  { title: "RoboWars", category: "Robotics", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600" },
  { title: "Code Relay", category: "Coding", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600" },
  { title: "Gaming", category: "Esports", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" },
  { title: "Design Derby", category: "Creative", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600" },
];

const Events = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    
    // Calculate the total scrollable width
    const getScrollAmount = () => {
      return -(scrollContainer.scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(scrollContainer, {
      x: getScrollAmount,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      pinSpacing: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
         if (progressRef.current) {
           progressRef.current.style.width = `${self.progress * 100}%`;
         }
      }
    });

    return () => {
      // Kill ScrollTrigger instance
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <section id="events" ref={sectionRef} className="h-screen overflow-hidden relative flex flex-col justify-center z-20">
      <div className="container mx-auto px-6 mb-10 flex justify-between items-end">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
          Featured <span className="text-cyan-400">Events</span>
        </h2>
        {/* Progress Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden hidden md:block">
          <div ref={progressRef} className="h-full bg-cyan-400 w-0 shadow-[0_0_15px_rgba(0,242,255,0.6)]"></div>
        </div>
      </div>

      <div ref={containerRef} className="flex gap-10 px-6 w-fit">
        {eventsData.map((event, index) => (
          <div 
            key={index} 
            className="w-[80vw] md:w-[40vw] lg:w-[30vw] h-[60vh] relative group overflow-hidden rounded-2xl border border-white/10 transition-all duration-300"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              src={event.image} 
              alt={event.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            
            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-cyan-400/70 text-sm uppercase tracking-widest mb-2 block">{event.category}</span>
              <h3 className="text-3xl font-display font-bold text-white mb-4">{event.title}</h3>
              <button className="text-cyan-400 border-b border-cyan-400/60 pb-1 hover:border-cyan-400 hover:shadow-[0_2px_10px_rgba(0,242,255,0.3)] transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
