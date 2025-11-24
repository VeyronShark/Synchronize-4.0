import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ZoomIn, X } from 'lucide-react';

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const titleRef = useRef(null);
  const imagesRef = useRef([]);
  const loaderRef = useRef(null);

  // Bento grid layout with varying sizes
  const galleryImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", title: "Opening Ceremony", category: "Events", size: "large" },
    { id: 2, url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800", title: "Tech Workshop", category: "Workshops", size: "medium" },
    { id: 3, url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800", title: "Hackathon", category: "Competition", size: "medium" },
    { id: 4, url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800", title: "Team Building", category: "Activities", size: "small" },
    { id: 5, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", title: "Keynote Speech", category: "Events", size: "small" },
    { id: 6, url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800", title: "Networking", category: "Social", size: "wide" },
    { id: 7, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800", title: "Awards Night", category: "Events", size: "tall" },
    { id: 8, url: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800", title: "Cultural Show", category: "Entertainment", size: "medium" },
    { id: 9, url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800", title: "Code Sprint", category: "Competition", size: "small" },
    { id: 10, url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800", title: "Collaboration", category: "Activities", size: "small" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const loaderTimeline = gsap.timeline({
      onComplete: () => setLoading(false)
    });

    loaderTimeline.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.8,
      ease: "power2.inOut"
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(imagesRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.2)",
          delay: 0.2
        }
      );
    }
  }, [loading]);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {loading && (
        <div 
          ref={loaderRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-white text-lg font-display">Loading Gallery...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen pt-24 pb-12 px-6 relative z-10 overflow-hidden">
        {/* Animated background */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div ref={titleRef}>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white relative">
                Event <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-cyan-400 to-purple-400 animate-gradient-text">Gallery</span>
                <div className="absolute -bottom-4 left-0 w-32 h-1 bg-linear-to-r from-purple-400 to-cyan-400 rounded-full" />
              </h1>
              <p className="text-gray-400 mt-8 text-lg">Capturing moments from Synchronize 4.0</p>
            </div>
            
            <Link 
              to="/" 
              className="group px-8 py-4 border-2 border-purple-400/30 rounded-full text-white hover:border-purple-400 hover:bg-purple-400/10 transition-all backdrop-blur-sm relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-purple-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>

          {/* Bento Grid Moodboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
            {galleryImages.map((image, index) => {
              const sizeClasses = {
                small: 'col-span-1 row-span-1',
                medium: 'col-span-2 row-span-1',
                large: 'col-span-2 md:col-span-3 row-span-2',
                wide: 'col-span-2 md:col-span-4 row-span-1',
                tall: 'col-span-1 md:col-span-2 row-span-2'
              };

              return (
                <div 
                  key={image.id}
                  ref={el => imagesRef.current[index] = el}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl glass-card border-2 border-white/5 hover:border-purple-400/50 transition-all duration-500 ${sizeClasses[image.size]}`}
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6">
                      <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-1">{image.category}</span>
                      <h3 className="text-base md:text-xl font-display font-bold text-white">{image.title}</h3>
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-50"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="mt-6 text-center">
                <span className="text-sm uppercase tracking-wider text-purple-400 font-semibold">{selectedImage.category}</span>
                <h3 className="text-3xl font-display font-bold text-white mt-2">{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.05); opacity: 0.5; }
          }
          @keyframes gradient-text {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          .animate-gradient-text {
            background-size: 200% 200%;
            animation: gradient-text 3s ease infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default Gallery;
