import { createContext, useContext, useState, useEffect } from 'react';
import ironManCursor from '../assets/cursor_ironman.png';
import spidermanCursor from '../assets/cursor_spiderman.png';
import hulkCursor from '../assets/cursor_hulk.png';
import thorCursor from '../assets/cursor_thor.png';
import capCursor from '../assets/cursor_cap.png';
import pantherCursor from '../assets/cursor_panther.png';
import widowCursor from '../assets/cursor_widow.png';
import strangeCursor from '../assets/cursor_strange.png';
import deadpoolCursor from '../assets/cursor_deadpool.png';
import wolverineCursor from '../assets/cursor_wolverine.png';
import grootCursor from '../assets/cursor_groot.png';

const CursorContext = createContext();

export const CURSOR_OPTIONS = [
  { id: 'default', name: 'Default', icon: null },
  { id: 'ironman', name: 'Iron Man', icon: ironManCursor, color: '#d2161e' },
  { id: 'spiderman', name: 'Spider-Man', icon: spidermanCursor, color: '#f00' },
  { id: 'hulk', name: 'Hulk', icon: hulkCursor, color: '#4caf50' },
  { id: 'thor', name: 'Thor', icon: thorCursor, color: '#00bcd4' },
  { id: 'cap', name: 'Captain America', icon: capCursor, color: '#1976d2' },
  { id: 'panther', name: 'Black Panther', icon: pantherCursor, color: '#9c27b0' },
  { id: 'widow', name: 'Black Widow', icon: widowCursor, color: '#212121' },
  { id: 'strange', name: 'Dr. Strange', icon: strangeCursor, color: '#ff9800' },
  { id: 'deadpool', name: 'Deadpool', icon: deadpoolCursor, color: '#b71c1c' },
  { id: 'wolverine', name: 'Wolverine', icon: wolverineCursor, color: '#fbc02d' },
  { id: 'groot', name: 'Groot', icon: grootCursor, color: '#795548' },
];

export const CursorProvider = ({ children }) => {
  const [currentCursor, setCurrentCursor] = useState('default');
  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem('synchro_cursor');
    if (saved) setCurrentCursor(saved);
  }, []);

  // Save preference
  useEffect(() => {
    localStorage.setItem('synchro_cursor', currentCursor);
  }, [currentCursor]);

  // Track mouse movement for custom cursor element
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a clickable element
      const target = e.target;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
        
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Apply global cursor styles (hiding default cursor if custom is active)
  useEffect(() => {
    if (currentCursor !== 'default') {
      document.body.style.cursor = 'none';
      // Ensure all elements inherit this or set to none
      const style = document.createElement('style');
      style.id = 'cursor-style';
      style.innerHTML = `
        * { cursor: none !important; }
      `;
      document.head.appendChild(style);
    } else {
      document.body.style.cursor = 'auto';
      const existingStyle = document.getElementById('cursor-style');
      if (existingStyle) existingStyle.remove();
    }

    return () => {
        const existingStyle = document.getElementById('cursor-style');
        if (existingStyle) existingStyle.remove();
        document.body.style.cursor = 'auto';
    };
  }, [currentCursor]);

  const selectCursor = (id) => {
    setCurrentCursor(id);
    setShowModal(false);
  };

  return (
    <CursorContext.Provider value={{ 
      currentCursor, 
      selectCursor, 
      showModal, 
      setShowModal,
      position,
      isPointer,
      cursorDetails: CURSOR_OPTIONS.find(c => c.id === currentCursor)
    }}>
      {children}
      
      {/* Custom Cursor Element */}
      {currentCursor !== 'default' && (
        <div 
            className="fixed pointer-events-none z-9999 transition-transform duration-75 will-change-transform"
            style={{ 
                left: 0, 
                top: 0, 
                transform: `translate(${position.x}px, ${position.y}px)` 
            }}
        >
            <div className={`relative -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${isPointer ? 'scale-125 rotate-12' : 'scale-100'}`}>
                <img 
                    src={CURSOR_OPTIONS.find(c => c.id === currentCursor)?.icon} 
                    alt="cursor" 
                    className="w-12 h-12 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                />
            </div>
        </div>
      )}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
