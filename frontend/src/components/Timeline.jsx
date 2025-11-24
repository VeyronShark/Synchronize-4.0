import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scheduleData = [
  { time: "09:00 AM", title: "Opening Ceremony", description: "Inauguration and Keynote Speech" },
  { time: "10:30 AM", title: "Hackathon Begins", description: "24-hour coding marathon starts" },
  { time: "01:00 PM", title: "Lunch Break", description: "Networking and Refreshments" },
  { time: "02:30 PM", title: "Tech Talk", description: "Guest lecture by Industry Expert" },
  { time: "05:00 PM", title: "Gaming Finals", description: "Valorant and FIFA showdown" },
];

const Timeline = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Fade in the entire section
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Draw the line
    gsap.fromTo(lineRef.current, 
      { height: 0 },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: "#timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <section id="schedule" ref={sectionRef} className="py-20 relative min-h-screen z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-center mb-20 text-white">
          Event <span className="text-cyan-400">Schedule</span>
        </h2>

        <div id="timeline-container" className="relative max-w-3xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2"></div>
          <div ref={lineRef} className="absolute left-[19px] md:left-1/2 top-0 w-1 bg-linear-to-b from-cyan-400/80 to-cyan-500/40 -translate-x-1/2 origin-top shadow-[0_0_15px_rgba(0,242,255,0.5)]"></div>

          {scheduleData.map((item, index) => (
            <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Dot */}
              <div className="absolute left-[19px] md:left-1/2 w-4 h-4 bg-black border-2 border-cyan-400 rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,242,255,0.8)]"></div>
              
              {/* Content */}
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-12">
                <div className={`glass-card p-6 rounded-xl hover:border-cyan-400/30 hover:shadow-[0_0_20px_rgba(0,242,255,0.15)] transition-all ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <span className="text-cyan-400/80 font-mono text-sm">{item.time}</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
