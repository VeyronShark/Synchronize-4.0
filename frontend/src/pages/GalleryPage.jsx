import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, X, RotateCcw, Bug, Binary } from 'lucide-react';
import LoadingAnimation from '../components/LoadingAnimation';
import MagneticButton from '../components/MagneticButton';

const GalleryPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [draggedPositions, setDraggedPositions] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef(null);
  const panelsRef = useRef([]);
  const loaderRef = useRef(null);
  const dragState = useRef({});

  const galleryImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600", caption: "OPENING NIGHT", date: "ISSUE #1", color: "bg-[#E62429]" },
    { id: 2, url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=1000", caption: "WEB SLINGING", date: "ISSUE #2", color: "bg-[#2563EB]" },
    { id: 3, url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=1200", caption: "SPIDER-VERSE", date: "ISSUE #3", color: "bg-white" },
    { id: 4, url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=700", caption: "TEAM UP", date: "ISSUE #4", color: "bg-[#E62429]" },
    { id: 5, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600", caption: "DAILY BUGLE", date: "ISSUE #5", color: "bg-[#2563EB]" },
    { id: 6, url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=900", caption: "NETWORKING", date: "ISSUE #6", color: "bg-white" },
    { id: 7, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=1100", caption: "AWARDS", date: "ISSUE #7", color: "bg-[#E62429]" },
    { id: 8, url: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=650", caption: "CULTURAL", date: "ISSUE #8", color: "bg-[#2563EB]" },
    { id: 9, url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=800", caption: "CODE SPRINT", date: "ISSUE #9", color: "bg-white" },
    { id: 10, url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600", caption: "COLLAB", date: "ISSUE #10", color: "bg-[#E62429]" },
    { id: 11, url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=1000", caption: "INNOVATION", date: "ISSUE #11", color: "bg-[#2563EB]" },
    { id: 12, url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=700", caption: "SPIRIT", date: "ISSUE #12", color: "bg-white" },
  ];

  const getRandomRotation = (index) => {
    const rotations = [-4, -3, -2, 2, 3, 4, -4, 3, -2, 4, -3, 2];
    return rotations[index % rotations.length];
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const loaderTimeline = gsap.timeline({
      onComplete: () => setLoading(false)
    });

    // Simulate loading
    loaderTimeline.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 2.2,
      ease: "power2.inOut"
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" }
      );

      gsap.fromTo(panelsRef.current,
        { opacity: 0, y: 100, rotation: 180 },
        {
          opacity: 1,
          y: 0,
          rotation: (index) => getRandomRotation(index),
          duration: 0.8,
          stagger: 0.1,
          ease: "elastic.out(1, 0.7)",
          delay: 0.2
        }
      );
    }
  }, [loading]);

  const handleMouseDown = (e, id, index) => {
    if (isMobile) return;
    if (e.target.closest('.panel-image-wrapper')) return;
    
    e.preventDefault();
    const element = panelsRef.current[index];
    
    dragState.current[id] = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      currentX: draggedPositions[id]?.x || 0,
      currentY: draggedPositions[id]?.y || 0,
      element: element
    };

    gsap.to(element, { 
      scale: 1.1, 
      boxShadow: '12px 12px 0px rgba(0,0,0,1)',
      duration: 0.2, 
      ease: "power2.out" 
    });
    element.style.cursor = 'grabbing';
    element.style.zIndex = '1000';
  };

  const handleMouseMove = (e) => {
    Object.keys(dragState.current).forEach(id => {
      const state = dragState.current[id];
      if (state?.isDragging) {
        const deltaX = e.clientX - state.startX;
        const deltaY = e.clientY - state.startY;
        
        setDraggedPositions(prev => ({
          ...prev,
          [id]: {
            x: state.currentX + deltaX,
            y: state.currentY + deltaY
          }
        }));
      }
    });
  };

  const handleMouseUp = (id, index) => {
    if (dragState.current[id]) {
      const element = panelsRef.current[index];
      gsap.to(element, { 
        scale: 1, 
        boxShadow: '6px 6px 0px rgba(0,0,0,1)',
        duration: 0.3, 
        ease: "back.out(1.7)" 
      });
      dragState.current[id].element.style.cursor = 'grab';
      dragState.current[id].element.style.zIndex = '';
      dragState.current[id].isDragging = false;
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => {
      Object.keys(dragState.current).forEach((id, index) => handleMouseUp(id, index));
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [draggedPositions]);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const resetPositions = () => {
    setDraggedPositions({});
    panelsRef.current.forEach((el, index) => {
      gsap.fromTo(el,
        { scale: 0.5, rotation: 360 },
        { 
          scale: 1, 
          rotation: getRandomRotation(index),
          duration: 0.8, 
          ease: "elastic.out(1, 0.5)",
          delay: index * 0.05
        }
      );
    });
  };

  return (
    <>
      {loading && <LoadingAnimation loaderRef={loaderRef} loadingText="SENSORS ONLINE..." />}

      <div className="min-h-screen pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 relative z-10 overflow-hidden bg-linear-to-br from-red-50 via-blue-50 to-white">
        {/* Enhanced Spider-Man Web Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main Spider Web Pattern */}
          <div 
            className="absolute inset-0 opacity-15 z-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, transparent 0, transparent 15px, #E62429 16px, transparent 18px),
                radial-gradient(circle at 75% 25%, transparent 0, transparent 15px, #2563EB 16px, transparent 18px),
                radial-gradient(circle at 25% 75%, transparent 0, transparent 15px, #2563EB 16px, transparent 18px),
                radial-gradient(circle at 75% 75%, transparent 0, transparent 15px, #E62429 16px, transparent 18px),
                radial-gradient(circle at 50% 50%, transparent 0, transparent 30px, #000 31px, transparent 33px),
                repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 10deg, rgba(0,0,0,0.3) 11deg, transparent 12deg),
                linear-gradient(45deg, transparent 48%, rgba(230,36,41,0.1) 49%, rgba(230,36,41,0.1) 51%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(37,99,235,0.1) 49%, rgba(37,99,235,0.1) 51%, transparent 52%)
              `,
              backgroundSize: '200px 200px, 200px 200px, 200px 200px, 200px 200px, 400px 400px, 100% 100%, 60px 60px, 60px 60px'
            }}
          />
          
          {/* Comic Book Halftone Dots */}
          <div 
            className="absolute inset-0 opacity-10 z-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, #E62429 2px, transparent 3px),
                radial-gradient(circle at 80% 20%, #2563EB 2px, transparent 3px),
                radial-gradient(circle at 20% 80%, #2563EB 2px, transparent 3px),
                radial-gradient(circle at 80% 80%, #E62429 2px, transparent 3px)
              `,
              backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px'
            }}
          />
          
          {/* Dynamic Comic Stripes - Enhanced Spidey Colors */}
          <div className="absolute top-0 right-0 w-full h-full opacity-25 pointer-events-none">
            <div className="absolute top-10 right-[-200px] w-[800px] h-[60px] bg-linear-to-r from-[#E62429] to-[#FF6B6B] rotate-12 transform shadow-lg" />
            <div className="absolute top-32 right-[-150px] w-[600px] h-[30px] bg-linear-to-r from-[#2563EB] to-[#60A5FA] rotate-12 transform shadow-lg" />
            <div className="absolute top-56 right-[-250px] w-[700px] h-[20px] bg-black rotate-12 transform shadow-lg" />
            <div className="absolute bottom-40 left-[-200px] w-[800px] h-[80px] bg-linear-to-r from-[#E62429] to-[#DC2626] rotate-12 transform shadow-lg" />
            <div className="absolute bottom-20 left-[-150px] w-[600px] h-[40px] bg-linear-to-r from-[#2563EB] to-[#3B82F6] rotate-12 transform shadow-lg" />
            <div className="absolute bottom-[-20px] left-[-100px] w-[500px] h-[25px] bg-black rotate-12 transform shadow-lg" />
          </div>
          
          {/* Floating Spider Symbols & Comic Elements */}
          <div className="absolute inset-0 pointer-events-none opacity-8">
            <div className="absolute top-20 left-20 text-6xl text-[#E62429] transform rotate-12 animate-pulse">🕷️</div>
            <div className="absolute top-40 right-32 text-4xl text-[#2563EB] transform -rotate-12 animate-pulse delay-1000">🕸️</div>
            <div className="absolute bottom-32 left-40 text-5xl text-[#E62429] transform rotate-45 animate-pulse delay-2000">🕷️</div>
            <div className="absolute bottom-20 right-20 text-3xl text-[#2563EB] transform -rotate-45 animate-pulse delay-3000">🕸️</div>
            
            {/* Comic Book Action Words */}
            <div className = "absolute top-1/4 left-1/4 transform -rotate-12 opacity-10">
              <div className="bg-[#E62429] text-white font-black text-2xl px-4 py-2 border-4 border-black shadow-[4px_4px_0px_#000] animate-bounce">
                POW!
              </div>
            </div>
            <div className="absolute top-3/4 right-1/4 transform rotate-12 opacity-10">
              <div className="bg-[#2563EB] text-white font-black text-xl px-3 py-1 border-4 border-black shadow-[4px_4px_0px_#000] animate-bounce delay-1000">
                THWIP!
              </div>
            </div>
            <div className="absolute top-1/2 left-1/6 transform rotate-45 opacity-10">
              <div className="bg-yellow-400 text-black font-black text-lg px-3 py-1 border-4 border-black shadow-[4px_4px_0px_#000] animate-bounce delay-2000">
                ZAP!
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <div ref={titleRef} className="relative">
              {/* Daily Bugle Style Box */}
              <div className="absolute -top-8 -left-8 bg-[#E62429] text-white px-4 py-2 font-bold transform -rotate-6 border-4 border-black shadow-[6px_6px_0px_#000] z-20">
                <div className="flex items-center gap-2">
                <span className="text-sm font-black uppercase tracking-wider">DAILY BUGLE EXCLUSIVE</span>
                </div>
              </div>
              
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-black italic relative z-10 tracking-tighter">
                <span className="text-[#1e56cd] drop-shadow-[4px_4px_0px_rgba(37,99,235,0.5)] stroke-white stroke-2">AMAZING</span>{' '}
                <span className="text-[#E62429] drop-shadow-[4px_4px_0px_rgba(230,36,41,0.5)] stroke-white stroke-2">GALLERY</span>
              </h1>
              
              <div className="mt-4 bg- text-black bg-white border-2 border-black p-3 inline-block shadow-[4px_4px_0px_#111] max-w-md transform rotate-1">
                 <p className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                   <Bug className="w-5 h-5 fill-black text-black" />
                   {isMobile ? 'Touch for details' : 'Use your web shooters to drag panels'}
                 </p>
              </div>
            </div>
            
            <div className="flex gap-4 z-50">
              {!isMobile && (
                <MagneticButton
                  onClick={resetPositions}
                  className="cursor-pointer px-6 py-3 bg-white text-black font-black border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#E62429] transition-all"
                >
                    <span className="flex items-center gap-2">
                      <RotateCcw className="w-5 h-5 font-bold" />
                      RESET
                    </span>
                </MagneticButton>
              )}
              
              <Link to="/">
                <MagneticButton className="cursor-pointer px-6 py-3 bg-[#E62429] text-white font-black border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all">
                  <span className="flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5 font-bold" />
                    BACK
                  </span>
                </MagneticButton>
              </Link>
            </div>
          </div>

          {/* Comic Panel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-16 max-w-7xl mx-auto py-8 px-4">
            {galleryImages.map((image, index) => {
              const position = draggedPositions[image.id] || { x: 0, y: 0 };
              
              return (
                <div
                  key={image.id}
                  ref={el => panelsRef.current[index] = el}
                  className="panel-container relative"
                  style={{
                    transform: `rotate(${getRandomRotation(index)}deg) translate(${position.x}px, ${position.y}px)`,
                    cursor: isMobile ? 'default' : 'grab',
                    touchAction: isMobile ? 'auto' : 'none',
                    zIndex: 1
                  }}
                  onMouseDown={(e) => !isMobile && handleMouseDown(e, image.id, index)}
                >
                  {/* Comic Panel */}
                  <div className="group relative bg-white border-4 border-black p-2 shadow-[6px_6px_0px_#000] transition-transform hover:scale-[1.02]">
                    
                    {/* Spider Icon Accent */}
                    <div className={`absolute -top-3 -right-3 w-8 h-8 ${index % 2 === 0 ? 'bg-[#E62429]' : 'bg-[#2563EB]'} border-2 border-black z-20 flex items-center justify-center shadow-[2px_2px_0px_#000] rounded-full`}>
                       <Bug className="w-4 h-4 text-white fill-current" />
                    </div>

                    <div 
                      className={`panel-image-wrapper border-2 border-black overflow-hidden relative aspect-4/5 bg-gray-100 ${!isMobile ? 'cursor-pointer' : ''}`}
                      onClick={() => !isMobile && openLightbox(image)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.caption}
                        className="w-full h-full object-cover filter hover:scale-110 transition-transform duration-500"
                        draggable="false"
                      />
                      
                      {/* Web Overlay Pattern on Hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle at center, transparent 0, transparent 10px, black 11px, transparent 12px)',
                            backgroundSize: '20px 20px'
                        }}
                      />
                    </div>
                    
                    {/* Caption Box */}
                    <div className="mt-2 relative">
                      <div className={`absolute inset-0 ${image.color} opacity-20 -skew-x-6 transform`} />
                      <div className="relative border-b-2 border-black pb-1 flex justify-between items-end">
                        <div>
                           <p className="text-lg font-display font-black italic text-black uppercase leading-none">{image.caption}</p>
                           <p className="text-xs font-mono font-bold text-[#E62429] mt-1">{image.date} // 2024</p>
                        </div>
                        {/* Binary deco */}
                        <Binary className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comic Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
            onClick={closeLightbox}
          >
           {/* Enhanced Spider-Web Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" >
              {/* Animated Spider Symbols */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 text-4xl text-[#E62429] animate-pulse">🕷️</div>
                <div className="absolute top-20 right-20 text-3xl text-[#2563EB] animate-pulse delay-500">🕸️</div>
                <div className="absolute bottom-20 left-20 text-5xl text-[#E62429] animate-pulse delay-1000">🕷️</div>
                <div className="absolute bottom-10 right-10 text-2xl text-[#2563EB] animate-pulse delay-1500">🕸️</div>
              </div>
            </div>

            <div className="relative max-w-5xl w-full z-10" onClick={(e) => e.stopPropagation()}>
              <div className="relative bg-white border-[6px] border-black shadow-[16px_16px_0px_#E62429] p-2 sm:p-4 transform rotate-1">
                
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="cursor-pointer absolute -top-8 -right-8 z-50 w-16 h-16 flex items-center justify-center bg-[#E62429] border-4 border-black text-white shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#fff] transition-all hover:rotate-90 group rounded-full"
                >
                  <X className="w-8 h-8 stroke-[3px]" />
                </button>

                <div className="relative border-4 border-black overflow-hidden bg-black">
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.caption}
                    className="w-full max-h-[80vh] object-contain"
                  />
                  
                  {/* Comic Overlay Details */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#E62429] border-t-4 border-black p-6 transform translate-y-full hover:translate-y-0 transition-transform duration-300 ease-out text-white">
                     <h3 className="text-4xl font-display font-black italic uppercase text-shadow-black">{selectedImage.caption}</h3>
                     <p className="font-mono font-bold mt-2 text-black bg-white inline-block px-2">DAILY BUGLE // {selectedImage.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryPage;
