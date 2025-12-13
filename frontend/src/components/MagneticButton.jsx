import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children, className = "", onClick }) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  // Magnetic effect removed as per user request
  // Keeping the component wrapper for consistent styling usage

  return (
    <button 
      ref={buttonRef} 
      className={`relative overflow-hidden group ${className}`}
      onClick={onClick}
    >
      <span ref={textRef} className="relative z-10 block">
        {children}
      </span>
      <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out origin-center pointer-events-none"></div>
    </button>
  );
};

export default MagneticButton;
