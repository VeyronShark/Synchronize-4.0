import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import Events from '../components/Events';
import Timeline from '../components/Timeline';
import Contact from '../components/Contact';
import Sponsors from '../components/Sponsors';
import Preloader from '../components/Preloader';

gsap.registerPlugin(ScrollTrigger);

const HomePage = ({ loading, setLoading }) => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const eventsRef = useRef(null);
  const timelineRef = useRef(null);
  const sponsorsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Hero Pinning Effect
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      });

      // Hero Fade/Scale out
      gsap.to(heroRef.current, {
        scale: 0.9,
        opacity: 0,
        filter: "blur(10px)",
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      });

      // Sections Slide Up Effect (Excluding Events to fix pinning)
      const slideUpSections = [timelineRef, sponsorsRef, contactRef];
      
      slideUpSections.forEach((sectionRef) => {
        if (!sectionRef.current) return;
        
        gsap.fromTo(sectionRef.current, 
          { y: 100, opacity: 0, scale: 0.95, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 1.5,
            }
          }
        );
      });

      // About Section Specific Animation (Parallax/Fade)
      if (aboutRef.current) {
        gsap.fromTo(aboutRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            }
          }
        );
      }

    }, mainRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Layout>
        <div ref={mainRef} className="relative w-full">
          <div ref={heroRef} className="relative z-0 w-full h-screen">
            <Hero startAnimation={!loading} />
          </div>
          
          <div className="relative z-10">
            <div ref={aboutRef} className="relative">
              <About />
            </div>
            <div ref={eventsRef} className="relative">
              <Events />
            </div>
            <div ref={timelineRef} className="relative">
              <Timeline />
            </div>
            <div ref={sponsorsRef} className="relative">
              <Sponsors />
            </div>
            <div ref={contactRef} className="relative pb-20">
              <Contact />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
