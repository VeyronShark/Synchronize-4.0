import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scheduleData = {
  day1: [
    { time: "09:00 AM", title: "Opening Ceremony", description: "Inauguration and Keynote Speech" },
    { time: "10:30 AM", title: "Hackathon Begins", description: "24-hour coding marathon starts" },
    { time: "01:00 PM", title: "Lunch Break", description: "Networking and Refreshments" },
    { time: "02:30 PM", title: "Tech Talk", description: "Guest lecture by Industry Expert" },
    { time: "05:00 PM", title: "Gaming Finals", description: "Valorant and FIFA showdown" },
    { time: "07:00 PM", title: "Dinner & Networking", description: "Meet sponsors and mentors" },
  ],
  day2: [
    { time: "08:00 AM", title: "Breakfast", description: "Morning refreshments" },
    { time: "09:30 AM", title: "Workshop: AI/ML", description: "Hands-on machine learning workshop" },
    { time: "12:00 PM", title: "RoboWars Qualifiers", description: "Robot combat competition begins" },
    { time: "02:00 PM", title: "Lunch Break", description: "Food and relaxation" },
    { time: "03:30 PM", title: "Design Derby", description: "UI/UX design competition" },
    { time: "06:00 PM", title: "Cultural Night", description: "Music, dance, and entertainment" },
  ],
  day3: [
    { time: "09:00 AM", title: "Final Presentations", description: "Hackathon project demos" },
    { time: "11:00 AM", title: "RoboWars Finals", description: "Championship battle" },
    { time: "01:00 PM", title: "Lunch Break", description: "Last meal together" },
    { time: "02:30 PM", title: "Prize Distribution", description: "Awards and recognition ceremony" },
    { time: "04:00 PM", title: "Closing Ceremony", description: "Thank you and farewell" },
  ],
};

const Timeline = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const [activeDay, setActiveDay] = useState('day1');

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

  const handleDayChange = (day) => {
    if (day === activeDay) return;

    // Animate out current timeline
    gsap.to(timelineContainerRef.current.children, {
      opacity: 0,
      x: activeDay < day ? -50 : 50,
      stagger: 0.03,
      duration: 0.3,
      onComplete: () => {
        setActiveDay(day);
        // Animate in new timeline
        gsap.fromTo(timelineContainerRef.current.children,
          { opacity: 0, x: activeDay < day ? 50 : -50 },
          { opacity: 1, x: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" }
        );
      }
    });

    // Reset and redraw the line
    gsap.to(lineRef.current, {
      height: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.to(lineRef.current, {
          height: '100%',
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
  };

  const currentSchedule = scheduleData[activeDay];

  return (
    <section id="schedule" ref={sectionRef} className="py-20 relative min-h-screen z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-center mb-12 text-white">
          Event <span className="text-cyan-400">Schedule</span>
        </h2>

        {/* Day Selector */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {['day1', 'day2', 'day3'].map((day, idx) => (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={`cursor-pointer relative px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 overflow-hidden group ${
                activeDay === day
                  ? 'text-black'
                  : 'text-white hover:text-cyan-400 border border-white/20 hover:border-cyan-400/50'
              }`}
            >
              {/* Active background with glow */}
              {activeDay === day && (
                <>
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-cyan-500 animate-pulse"></div>
                  <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50"></div>
                </>
              )}
              
              {/* Hover effect for inactive buttons */}
              {activeDay !== day && (
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400/0 to-cyan-500/0 group-hover:from-cyan-400/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
              )}
              
              <span className="relative z-10 flex items-center gap-2">
                <span className="hidden sm:inline">Day</span> {idx + 1}
                {activeDay === day && (
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
                )}
              </span>
            </button>
          ))}
        </div>

        <div id="timeline-container" ref={timelineContainerRef} className="relative max-w-3xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2"></div>
          <div ref={lineRef} className="absolute left-[19px] md:left-1/2 top-0 w-1 bg-linear-to-b from-cyan-400/80 to-cyan-500/40 -translate-x-1/2 origin-top shadow-[0_0_15px_rgba(0,242,255,0.5)]"></div>

          {currentSchedule.map((item, index) => (
            <div key={`${activeDay}-${index}`} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Dot */}
              <div className="absolute left-[19px] md:left-1/2 w-4 h-4 bg-black border-2 border-cyan-400 rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,242,255,0.8)] hover:scale-150 transition-transform duration-300"></div>
              
              {/* Content */}
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-12">
                <div className={`glass-card p-6 rounded-xl hover:border-cyan-400/30 hover:shadow-[0_0_20px_rgba(0,242,255,0.15)] transition-all duration-300 hover:scale-105 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
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
