import { Instagram, Twitter, Linkedin, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleSmoothScroll = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 242, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="relative inline-block">
              <h2 className="text-2xl font-display font-bold text-white mb-2">
                SYNCHRONIZE <span className="text-cyan-400">4.0</span>
              </h2>
              <div className="h-1 w-20 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full" />
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              The ultimate tech fest where innovation meets creativity. Join us for a futuristic experience of coding, gaming, and technology.
            </p>
            
            <div className="flex space-x-3">
              {[
                { icon: Instagram, color: 'from-pink-500 to-purple-500', href: '#' },
                { icon: Twitter, color: 'from-cyan-400 to-blue-500', href: '#' },
                { icon: Linkedin, color: 'from-blue-600 to-cyan-500', href: '#' }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={i}
                    href={social.href} 
                    className="group relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
                  >
                    <Icon className="relative z-10 w-5 h-5 group-hover:scale-110 transition-transform" />
                    <div className={`absolute inset-0 bg-linear-to-br ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 blur-xl transition-all duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Events', href: '#events' },
                { label: 'Schedule', href: '#schedule' },
                { label: 'Sponsors', href: '#sponsors' },
                { label: 'Team', to: '/team' }
              ].map((link, i) => (
                <li key={i} className="group flex items-center">
                  <span className="w-0 h-px bg-cyan-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                  {link.to ? (
                    <Link to={link.to} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              Contact Us
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full" />
            </h3>
            <ul className="space-y-4">
              <li className="group flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-sm pt-2">123 Tech Street, Innovation City, Bangalore, India 560001</span>
              </li>
              <li className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all duration-300">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-sm">contact@synchronize.in</span>
              </li>
              <li className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all duration-300">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-sm">+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Map/Location */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              Location
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full" />
            </h3>
            <div className="relative group">
              <div className="w-full h-40 bg-white/5 rounded-xl overflow-hidden border border-white/10 group-hover:border-cyan-400/30 transition-all duration-500 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0036733909793!2d77.63997831482193!3d12.971598990855768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a77f100f77%3A0x274158d481266114!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1645432123456!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy"
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                  title="Location Map"
                ></iframe>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-cyan-400/0 group-hover:bg-cyan-400/5 blur-xl transition-all duration-500 -z-10" />
            </div>
            
            <button className="mt-4 text-gray-400 text-sm hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group">
              <span>Get Directions</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <p>&copy; {new Date().getFullYear()} Synchronize Fest. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300 relative group">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
              <span className="text-white/20">|</span>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300 relative group">
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Tech badge */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-600 flex items-center justify-center gap-2">
              <span>Built with</span>
              <span className="text-cyan-400">❤</span>
              <span>by the Synchronize Team</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
