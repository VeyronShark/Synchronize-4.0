import { FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              SYNCHRONIZE <span className="text-white/90">4.0</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The ultimate tech fest where innovation meets creativity. Join us for a futuristic experience of coding, gaming, and technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
              <li><a href="#schedule" className="text-gray-400 hover:text-white transition-colors">Schedule</a></li>
              <li><a href="#sponsors" className="text-gray-400 hover:text-white transition-colors">Sponsors</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <FaMapMarkerAlt className="mt-1 text-white/60" />
                <span>123 Tech Street, Innovation City, Bangalore, India 560001</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaEnvelope className="text-white/60" />
                <span>contact@synchronize.in</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaPhone className="text-white/60" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Map/Location */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Location</h3>
            <div className="w-full h-40 bg-white/5 rounded-lg overflow-hidden border border-white/10 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0036733909793!2d77.63997831482193!3d12.971598990855768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a77f100f77%3A0x274158d481266114!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1645432123456!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                className="grayscale group-hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
            <button className="mt-4 text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2">
              Get Directions <span className="text-lg">→</span>
            </button>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Synchronize Fest. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Subtle Decorative Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
