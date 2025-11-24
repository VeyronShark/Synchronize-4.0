import { Instagram, Twitter, Linkedin, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';


const Footer = () => {
  
  const navigate = useNavigate();

  return (
    <footer className="bg-black border-t border-white/10 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-10 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute bottom-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-0 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 242, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative inline-block">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                SYNCHRONIZE <span className="text-cyan-400">4.0</span>
              </h2>
              <div className="h-0.5 sm:h-1 w-16 sm:w-20 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full" />
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              The ultimate tech fest where innovation meets creativity. Join us for a futuristic experience of coding, gaming, and technology.
            </p>
            
            <div className="flex space-x-2 sm:space-x-3">
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
                    className="group relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
                  >
                    <Icon className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    <div className={`absolute inset-0 bg-linear-to-br ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 blur-xl transition-all duration-300" />
                  </a>
                );
              })}
            </div>

            {/* Previous Editions */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-3">Previous Editions</p>
              <div className="flex flex-col space-y-2">
                {[
                  { name: 'Synchronize 3.0', url: '#' },
                  { name: 'Synchronize 2.0', url: '#' },
                  { name: 'Synchronize 1.0', url: '#' }
                ].map((edition, i) => (
                  <a
                    key={i}
                    href={edition.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-sm text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-cyan-400 transition-colors duration-300" />
                    <span className="relative">
                      {edition.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 relative inline-block">
              Quick Links
              <div className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-10 sm:w-12 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full" />
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/#about'},
                { name: 'Events', path: '/#events' },
                { name: 'Schedule', path: '/#schedule' },
                { name: 'Sponsors', path: '/#sponsors' },
                { name: 'Team', path: '/team' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/#contact' }
              ].map((link, i) => (
                <li 
                  key={i}
                  className="group flex items-center gap-3 cursor-pointer relative overflow-hidden" 
                  onClick={() => {
                    if (link.path.includes('#')) {
                      const [path, hash] = link.path.split('#');
                      navigate(path || '/');
                      setTimeout(() => {
                        const element = document.getElementById(hash);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    } else {
                      navigate(link.path);
                    }
                  }}
                >
                  {/* Animated dash */}
                  <div className="relative flex items-center">
                    <div className="w-8 h-px bg-linear-to-r from-cyan-400/50 to-cyan-400 group-hover:w-12 transition-all duration-500 ease-out" />
                    <div className="absolute right-0 w-1.5 h-1.5 bg-cyan-400 rounded-full group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(0,242,255,0.8)] transition-all duration-300" />
                  </div>
                  
                  {/* Link text */}
                  <span className="text-sm text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 relative">
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-linear-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-500" />
                  </span>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-400/0 via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 relative inline-block">
              Contact Us
              <div className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-10 sm:w-12 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full" />
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="group flex items-start space-x-2 sm:space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all duration-300">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
                <span className="text-xs sm:text-sm pt-1 sm:pt-2">XIM UNIVERSITY<br/>Nijigada, Kurki, Plot No:12(A<br/>Harirajpur, Kakudia<br/>Odisha 752050, India</span>
              </li>
              <li className="group flex items-center space-x-2 sm:space-x-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all duration-300">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
                <span className="text-xs sm:text-sm break-all">techfest-scse@xim.edu.in</span>
              </li>
              <li className="group flex items-center space-x-2 sm:space-x-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all duration-300">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
                <span className="text-xs sm:text-sm">+91 6204-148753</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Map/Location */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 relative inline-block">
              Location
              <div className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-10 sm:w-12 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full" />
            </h3>
            <div className="relative group">
              <div className="w-full h-32 sm:h-40 bg-white/5 rounded-lg sm:rounded-xl overflow-hidden border border-white/10 group-hover:border-cyan-400/30 transition-all duration-500 relative">
                <iframe 
                  src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=XIM+University+Nijigada+Kurki+Harirajpur+Kakudia+Odisha+752050&zoom=15`}
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
            
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=XIM+University+Nijigada+Kurki+Plot+No+12A+Harirajpur+Kakudia+Odisha+752050" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 text-gray-400 text-sm hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Get Directions</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse" />
              <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Synchronize Fest. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-4 sm:space-x-6">
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
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-[10px] sm:text-xs text-gray-600 flex items-center justify-center gap-1.5 sm:gap-2">
              <span>Built with</span>
              <span className="text-cyan-400">❤</span>
              <span>by the Synchronize Team</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
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
