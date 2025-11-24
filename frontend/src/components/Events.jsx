import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EventDetailsCard from './EventDetailsCard';

gsap.registerPlugin(ScrollTrigger);

const eventsData = [
  { 
    title: "Hackathon", 
    category: "Coding", 
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=600",
    description: "Join us for an intense 24-hour coding marathon where innovation meets creativity. Build groundbreaking solutions to real-world problems.",
    date: "March 15-16, 2024",
    venue: "Tech Hub, Main Campus",
    prize: "₹50,000",
    poc: { name: "John Doe", email: "john@xim.edu.in" }
  },
  { 
    title: "RoboWars", 
    category: "Robotics", 
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
    description: "Battle it out with your custom-built robots in an epic arena showdown. May the best bot win!",
    date: "March 17, 2024",
    venue: "Arena Ground",
    prize: "₹40,000",
    poc: { name: "Jane Smith", email: "jane@xim.edu.in" }
  },
  { 
    title: "Code Relay", 
    category: "Coding", 
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    description: "A team-based coding competition where speed and accuracy matter. Pass the baton and solve challenges together.",
    date: "March 18, 2024",
    venue: "Computer Lab A",
    prize: "₹30,000",
    poc: { name: "Mike Johnson", email: "mike@xim.edu.in" }
  },
  { 
    title: "Gaming", 
    category: "Esports", 
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
    description: "Compete in popular esports titles and prove your gaming prowess. Multiple tournaments across different games.",
    date: "March 19-20, 2024",
    venue: "Gaming Arena",
    prize: "₹60,000",
    poc: { name: "Sarah Williams", email: "sarah@xim.edu.in" }
  },
  { 
    title: "Design Derby", 
    category: "Creative", 
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
    description: "Showcase your creative design skills in UI/UX, graphic design, and digital art competitions.",
    date: "March 21, 2024",
    venue: "Design Studio",
    prize: "₹35,000",
    poc: { name: "Alex Brown", email: "alex@xim.edu.in" }
  },
];

const Events = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const handleCardClick = (e, event) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedEvent(event);
  };

  return (
    <>
    <section id="events" ref={sectionRef} className="h-screen overflow-hidden relative flex flex-col justify-center z-20">
      <div className="container mx-auto px-4 sm:px-6 mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3 sm:mb-4">
            Featured <span className="text-cyan-400">Events</span>
          </h2>
          <button 
            onClick={() => window.location.href = '/events'}
            className="px-4 sm:px-6 py-2 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400 text-cyan-400 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105"
          >
            View All Events →
          </button>
        </div>
        {/* Progress Bar */}
        <div className="w-32 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden hidden md:block">
          <div ref={progressRef} className="h-full bg-cyan-400 w-0 shadow-[0_0_15px_rgba(0,242,255,0.6)]"></div>
        </div>
      </div>

      <div ref={containerRef} className="flex gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 w-fit">
        {eventsData.map((event, index) => (
          <div 
            key={index} 
            className="w-[85vw] sm:w-[70vw] md:w-[45vw] lg:w-[35vw] xl:w-[30vw] h-[55vh] sm:h-[60vh] relative group overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 cursor-pointer shrink-0"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => handleCardClick(e, event)}
          >
            <img 
              src={event.image} 
              alt={event.title} 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-500"></div>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-linear-to-t from-cyan-500/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,242,255,0.15)]"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
              <span className="text-cyan-400/70 text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2 block transition-all duration-300 group-hover:text-cyan-400 group-hover:tracking-[0.2em]">{event.category}</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-2 sm:mb-4 transition-all duration-300 group-hover:text-cyan-50 group-hover:scale-105 origin-left">{event.title}</h3>
              <div className="flex items-center gap-2 text-cyan-400 transition-all duration-300 group-hover:gap-4">
                <span className="text-xs sm:text-sm font-medium">View Details</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    
    {selectedEvent && (
      <EventDetailsCard 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    )}
    </>
  );
};

export default Events;
