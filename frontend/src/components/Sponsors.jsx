import { Link } from 'react-router-dom';

const sponsors = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" }
];

const Sponsors = () => {
  // Duplicate sponsors array for seamless loop
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section id="sponsors" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
            Our <span className="text-cyan-400">Sponsors</span>
          </h2>
          
          <Link 
            to="/gallery" 
            className="group px-8 py-4 border-2 border-purple-400/30 rounded-full text-white hover:border-purple-400 hover:bg-purple-400/10 transition-all backdrop-blur-sm relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Gallery
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-purple-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>
        </div>
        
        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee-sponsors group">
            {duplicatedSponsors.map((sponsor, index) => (
              <div 
                key={index} 
                className="shrink-0 mx-8 glass-card p-6 rounded-xl flex items-center justify-center h-32 w-48 hover:bg-white/10 transition-all duration-300 sponsor-card"
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default Sponsors;
