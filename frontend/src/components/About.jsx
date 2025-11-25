import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Cpu, Globe, Zap, Trophy, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x,
        y: y,
        duration: 0.1,
        ease: "none"
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden glass-card rounded-3xl border border-white/10 group hover:border-cyan-400/30 transition-colors duration-300 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        ref={glowRef}
        className="absolute w-[300px] h-[300px] bg-cyan-400/20 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label, delay }) => (
  <div className="flex flex-col items-center justify-center p-6 text-center space-y-2">
    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6 text-cyan-400" />
    </div>
    <h4 className="text-3xl font-bold text-white font-display">{value}</h4>
    <p className="text-sm text-gray-400 uppercase tracking-wider">{label}</p>
  </div>
);

const About = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1
          }
        }
      );

      // Cards Stagger Animation
      gsap.from(".bento-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%",
          end: "bottom 80%",
          scrub: 1
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 sm:mb-24">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-linear-to-b from-white to-white/20 mb-6">
            THE <span className="text-cyan-400">VISION</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Where technology meets creativity. Synchronize 4.0 is the ultimate convergence of innovation, competition, and future-tech.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* Main Description Card - Large */}
          <div className="md:col-span-6 lg:col-span-8 row-span-2 bento-card">
            <TiltCard className="h-full p-8 sm:p-10 flex flex-col justify-between bg-linear-to-br from-white/5 to-transparent">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">Global Tech Ecosystem</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Join a vibrant community of developers, designers, and innovators. We're building a platform where ideas transform into reality through collaboration and competition.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-400">Innovation</div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-purple-400">Creativity</div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-pink-400">Future</div>
              </div>
            </TiltCard>
          </div>

          {/* Stat Card 1 */}
          <div className="md:col-span-3 lg:col-span-4 bento-card">
            <TiltCard className="h-full bg-black/20">
              <StatCard icon={Users} value="1000+" label="Participants" />
            </TiltCard>
          </div>

          {/* Stat Card 2 */}
          <div className="md:col-span-3 lg:col-span-4 bento-card">
            <TiltCard className="h-full bg-black/20">
              <StatCard icon={Trophy} value="₹50k+" label="Prize Pool" />
            </TiltCard>
          </div>

          {/* Feature Card 1 */}
          <div className="md:col-span-3 lg:col-span-4 bento-card">
            <TiltCard className="h-full p-6 flex flex-col items-start justify-center bg-linear-to-br from-purple-500/10 to-transparent">
              <Cpu className="w-10 h-10 text-purple-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Cutting Edge</h4>
              <p className="text-sm text-gray-400">Latest tech stack and hardware integration challenges.</p>
            </TiltCard>
          </div>

          {/* Feature Card 2 */}
          <div className="md:col-span-3 lg:col-span-4 bento-card">
            <TiltCard className="h-full p-6 flex flex-col items-start justify-center bg-linear-to-br from-cyan-500/10 to-transparent">
              <Code className="w-10 h-10 text-cyan-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">24h Hackathon</h4>
              <p className="text-sm text-gray-400">Non-stop coding marathon to solve real-world problems.</p>
            </TiltCard>
          </div>

          {/* Wide Bottom Card */}
          <div className="md:col-span-6 lg:col-span-4 bento-card">
            <TiltCard className="h-full p-6 flex items-center justify-between bg-linear-to-r from-cyan-500/5 to-purple-500/5">
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">Join Us</h4>
                <p className="text-sm text-gray-400">Be part of the revolution</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-colors duration-300">
                <Zap className="w-6 h-6" />
              </div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
