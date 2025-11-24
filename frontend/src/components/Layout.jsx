import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './Navbar';
import Footer from './Footer';
import Background from './Background';

const Layout = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Make Lenis accessible globally for other components (like modals)
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-dark-bg text-white selection:bg-cyan-500 selection:text-black">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <main className="relative flex flex-col">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
