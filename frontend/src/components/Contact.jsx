import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Twitter, Instagram, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Animated background particles
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${particle.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 242, 255, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    // GSAP animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Enhanced Title Section */}
          <div ref={titleRef} className="text-center mb-16">
            <div className="inline-block relative">
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 text-white relative">
                Get in <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-gradient-text">Touch</span>
                
                {/* Decorative elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 border-2 border-cyan-400/30 rounded-full animate-ping-slow" />
                <div className="absolute -bottom-8 -right-8 w-20 h-20 border-2 border-purple-400/30 rounded-full animate-ping-slow" style={{ animationDelay: '0.5s' }} />
              </h2>
              
              {/* Animated underline */}
              <div className="h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-shimmer" />
            </div>
            
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Have questions? Want to sponsor? Or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* Enhanced Contact Info */}
            <div className="flex flex-col justify-center space-y-8">
              
              {/* Contact cards with hover effects */}
              <div 
                className="group relative p-6 rounded-2xl bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,242,255,0.3)] cursor-pointer transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/50 group-hover:scale-110 transition-transform">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                    <span className="text-white font-medium">techfest-scse@xim.edu.in</span>
                  </div>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              </div>

              <div className="group relative p-6 rounded-2xl bg-linear-to-br from-purple-500/10 to-cyan-500/10 border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(138,43,226,0.3)] cursor-pointer transform hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform shrink-0">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Location</p>
                    <span className="text-white font-medium">XIM UNIVERSITY<br/>Nijigada, Kurki, Plot No:12(A<br/>Harirajpur, Kakudia<br/>Odisha 752050</span>
                  </div>
                </div>
                
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              </div>

              {/* Social links */}
              <div className="flex space-x-4 pt-4">
                <div 
                  className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all cursor-pointer transform hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </div>
                <div 
                  className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all cursor-pointer transform hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </div>
                <div 
                  className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all cursor-pointer transform hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Enhanced Form */}
            <form 
              ref={formRef} 
              className="relative p-8 rounded-2xl space-y-6 border border-cyan-400/20 bg-black/40 backdrop-blur-xl shadow-2xl"
            >

              
              <div className="relative z-10 space-y-6">
                <div className="group/input">
                  <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within/input:text-cyan-400 transition-colors">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(0,242,255,0.3)] focus:bg-white/10 transition-all duration-300" 
                    placeholder="John Doe" 
                  />
                </div>
                
                <div className="group/input">
                  <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within/input:text-cyan-400 transition-colors">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(0,242,255,0.3)] focus:bg-white/10 transition-all duration-300" 
                    placeholder="john@example.com" 
                  />
                </div>
                
                <div className="group/input">
                  <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within/input:text-cyan-400 transition-colors">Message</label>
                  <textarea 
                    rows="4" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(0,242,255,0.3)] focus:bg-white/10 transition-all duration-300 resize-none" 
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="relative w-full py-4 bg-linear-to-r from-cyan-400 to-cyan-500 text-black font-bold rounded-xl overflow-hidden group/button transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,242,255,0.6)]"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Send Message</span>
                    <Mail className="w-5 h-5 transform group-hover/button:translate-x-1 transition-transform" />
                  </span>
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-700" />
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 3s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;
