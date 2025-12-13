import { useMemo } from 'react';

const ComicSticker = () => {
    // Generate random comic stickers using SVGs for "generated" look
    const stickers = [
        // "POW!" Style Burst - IMPROVED with Halftone & 3D Depth
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] overflow-visible" key="pow">
            <defs>
                <pattern id="halftone-red" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" className="fill-red-800 opacity-30" />
                </pattern>
            </defs>
            {/* 3D Depth Extrusion */}
            <path d="M60 5 L75 35 L105 25 L88 55 L115 80 L85 90 L75 115 L55 85 L25 105 L35 75 L5 65 L40 45 L25 15 L60 30 Z" 
                  className="fill-black translate-x-1 translate-y-1" />
            
            {/* Main Burst */}
            <path d="M60 5 L75 35 L105 25 L88 55 L115 80 L85 90 L75 115 L55 85 L25 105 L35 75 L5 65 L40 45 L25 15 L60 30 Z" 
                  className="fill-yellow-400 stroke-black stroke-[4px]" />
            
            {/* Inner jagged shape with halftone */}
            <path d="M60 20 L70 40 L90 35 L80 55 L95 70 L75 75 L70 95 L55 75 L35 85 L45 65 L25 55 L45 45 L35 25 L60 35 Z" 
                  style={{ fill: "url(#halftone-red)" }} className="stroke-black stroke-[2px]" />

            <text x="60" y="70" textAnchor="middle" fontSize="26" fontWeight="900" 
                  className="fill-white stroke-black stroke-[1.5px] font-black italic tracking-tighter" 
                  style={{ fontFamily: 'Impact, sans-serif' }}
                  transform="rotate(-5, 60, 60)">
                POW!
            </text>
        </svg>,
        
        // "OMG" Speech Bubble - IMPROVED
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] overflow-visible" key="omg">
             <defs>
                <pattern id="dots-blue" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="2" className="fill-blue-200" />
                </pattern>
            </defs>
            <path d="M10,40 C10,20 30,10 60,10 C90,10 110,25 110,50 C110,75 90,90 60,90 C50,90 40,88 35,85 L15,100 L20,75 C12,65 10,55 10,40 Z" 
                  className="fill-blue-600 stroke-black stroke-[4px]" />
            <path d="M10,40 C10,20 30,10 60,10 C90,10 110,25 110,50 C110,75 90,90 60,90 C50,90 40,88 35,85 L15,100 L20,75 C12,65 10,55 10,40 Z" 
                  style={{ fill: "url(#dots-blue)" }} className="fill-opacity-50 pointer-events-none" />
            
            <text x="60" y="60" textAnchor="middle" fontSize="24" fontWeight="900" 
                  className="fill-white stroke-black stroke-[2px] font-black" 
                  style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                OMG!
            </text>
        </svg>,
        
        // "BOOM" Bomb Shape
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] overflow-visible" key="boom">
             <circle cx="60" cy="65" r="40" className="fill-black" />
             <path d="M60 25 L60 15 M50 20 L55 15 M70 20 L65 15" className="stroke-black stroke-[3px]" />
             <path d="M75 35 Q85 10 100 15" className="fill-none stroke-gray-600 stroke-[3px] animate-pulse" />
             <circle cx="100" cy="15" r="5" className="fill-red-500 animate-ping" />
             
             {/* Shine */}
             <path d="M45 50 Q50 40 60 45" className="fill-none stroke-white stroke-[3px] opacity-50" />
             
             <text x="60" y="75" textAnchor="middle" fontSize="28" fontWeight="900" 
                  className="fill-yellow-400 stroke-red-600 stroke-[2px] font-black italic"
                  style={{ fontFamily: 'Impact, sans-serif' }}>
                BOOM
            </text>
        </svg>,

        // "VS" Badge
         <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] overflow-visible" key="vs">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'rgb(255,255,0)', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:'rgb(255,0,0)', stopOpacity:1}} />
                </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="45" className="fill-black" />
            <circle cx="60" cy="60" r="40" style={{ fill: "url(#grad1)" }} className="stroke-black stroke-[3px]" />
            <path d="M20 60 L100 60" className="stroke-black stroke-[4px] opacity-20" />
            
            <text x="60" y="75" textAnchor="middle" fontSize="40" fontWeight="900" 
                  className="fill-white stroke-black stroke-[3px] font-black italic"
                  style={{ fontFamily: 'Impact, sans-serif' }}>
                VS
            </text>
        </svg>
    ];

    const randomSticker = useMemo(() => stickers[Math.floor(Math.random() * stickers.length)], []);

    return randomSticker;
};

export default ComicSticker;
