import { useEffect, useRef, useState } from 'react';
import { useCursor, CURSOR_OPTIONS } from '../context/CursorContext';
import gsap from 'gsap';

const CursorChoiceModal = () => {
    const { showModal, setShowModal, selectCursor, currentCursor } = useCursor();
    const [hoveredOption, setHoveredOption] = useState(null);
    const modalRef = useRef(null);
    const containerRef = useRef(null);
    const optionsRef = useRef([]);

    // Determine background color based on hover or selection
    const activeColor = hoveredOption 
        ? CURSOR_OPTIONS.find(c => c.id === hoveredOption)?.color 
        : (CURSOR_OPTIONS.find(c => c.id === currentCursor)?.color || '#000000');

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
            
            const tl = gsap.timeline();
            tl.set(modalRef.current, { display: 'flex' })
              .fromTo(modalRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3 }
              )
              .fromTo(containerRef.current,
                { scale: 0.8, y: 100, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, ease: "back.out(1.2)", duration: 0.5 }
              )
              .fromTo(optionsRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.05, ease: "power2.out", duration: 0.3 },
                "-=0.2"
              );
              
        } else {
            document.body.style.overflow = 'auto';
            if (modalRef.current) gsap.set(modalRef.current, { display: 'none' });
        }
    }, [showModal]);

    if (!showModal) return null;

    return (
        <div 
            ref={modalRef}
            className="fixed inset-0 z-100 hidden items-center justify-center bg-black backdrop-blur-md p-4 transition-colors duration-700"
            style={{ 
                background: `radial-gradient(circle at center, ${activeColor}, #000000ee 100%)`
            }}
        >
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 halftone-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none"></div>

            <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transform hover:scale-125 transition-all duration-300 z-20"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Modal Container */}
            <div 
                ref={containerRef}
                className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center"
            >
                <div className="text-center mb-8 relative z-10">
                    <h2 
                        className="text-5xl md:text-7xl font-display font-black italic uppercase tracking-tighter text-stroke-comic transform -skew-x-6"
                        style={{ 
                            textShadow: `4px 4px 0px ${activeColor || '#fff'}`,
                            color: 'white'
                        }}
                    >
                        CHOOSE YOUR <span style={{ color: activeColor === '#000000' ? '#ffffff' : activeColor, textShadow: 'none' }}>CHARACTER</span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="w-full overflow-y-auto overflow-x-hidden p-4 scrollbar-hide">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {CURSOR_OPTIONS.map((option, index) => (
                            <button
                                key={option.id}
                                ref={el => optionsRef.current[index] = el}
                                onClick={() => selectCursor(option.id)}
                                onMouseEnter={() => setHoveredOption(option.id)}
                                onMouseLeave={() => setHoveredOption(null)}
                                className={`group relative aspect-square border-4 cursor-pointer transition-all duration-200 overflow-hidden
                                    ${currentCursor === option.id 
                                        ? 'border-white bg-white/10 scale-105 z-10' 
                                        : 'border-white/20 bg-black/40 hover:border-white hover:bg-white/5 hover:scale-105 hover:z-10'
                                    }
                                `}
                                style={{ 
                                    borderColor: (currentCursor === option.id || hoveredOption === option.id) ? (option.color || 'white') : '',
                                    boxShadow: (currentCursor === option.id || hoveredOption === option.id) 
                                        ? `0 0 20px ${option.color}40` 
                                        : 'none'
                                }}
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2">
                                    {option.icon ? (
                                        <img 
                                            src={option.icon} 
                                            alt={option.name} 
                                            className={`w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-transform duration-300
                                                ${(currentCursor === option.id || hoveredOption === option.id) ? 'scale-125 rotate-6' : 'grayscale opacity-70'}
                                            `}
                                        />
                                    ) : (
                                        <div className={`w-12 h-12 border-2 border-dashed rounded-full flex items-center justify-center
                                            ${(currentCursor === option.id || hoveredOption === option.id) ? 'border-white opacity-100' : 'border-white/30 opacity-50'}
                                        `}>
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    )}
                                    
                                    <span className={`text-xs md:text-sm font-black italic uppercase tracking-wider text-center transition-colors duration-200
                                         ${(currentCursor === option.id || hoveredOption === option.id) ? 'text-white' : 'text-gray-500'}
                                    `}>
                                        {option.name}
                                    </span>
                                </div>
                                
                                {/* Background glow effect on hover */}
                                <div 
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                                    style={{ background: option.color }}
                                ></div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6 text-xs font-mono text-white uppercase tracking-widest opacity-60">
                    HOVER TO PREVIEW • CLICK TO EQUIP
                </div>
            </div>
        </div>
    );
};

export default CursorChoiceModal;
