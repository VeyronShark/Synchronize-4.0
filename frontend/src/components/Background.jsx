import React, { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    // Optimized starfield with fewer stars for better performance
    const starLayers = [
      // Distant stars (small, dim)
      Array.from({ length: 150 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.05 + 0.02,
        opacity: Math.random() * 0.3 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: '#ffffff',
        layer: 1
      })),
      // Mid-distance stars
      Array.from({ length: 100 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.5,
        speed: Math.random() * 0.1 + 0.05,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.85 ? '#00f2ff' : '#ffffff',
        layer: 2
      })),
      // Close stars (bright, larger)
      Array.from({ length: 50 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.8,
        speed: Math.random() * 0.15 + 0.08,
        opacity: Math.random() * 0.6 + 0.4,
        twinkleSpeed: Math.random() * 0.04 + 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.8 ? '#00d4ff' : '#ffffff',
        layer: 3
      }))
    ];

    const stars = starLayers.flat();

    // Shooting stars
    const shootingStars = [];
    const createShootingStar = () => {
      if (Math.random() > 0.985) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          length: Math.random() * 100 + 60,
          speed: Math.random() * 10 + 8,
          opacity: 1,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3
        });
      }
    };

    // Milky Way effect
    const drawGalaxy = () => {
      // Deep space black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle milky way band with cyan tint
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(20, 20, 25, 0)');
      gradient.addColorStop(0.3, 'rgba(20, 40, 45, 0.12)');
      gradient.addColorStop(0.5, 'rgba(30, 55, 65, 0.2)');
      gradient.addColorStop(0.7, 'rgba(20, 40, 45, 0.12)');
      gradient.addColorStop(1, 'rgba(20, 20, 25, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle nebula dust with cyan tint
      const parallaxX1 = (mouseX / canvas.width - 0.5) * 30;
      const parallaxY1 = (mouseY / canvas.height - 0.5) * 30;
      
      const nebula1 = ctx.createRadialGradient(
        canvas.width * 0.3 + parallaxX1, 
        canvas.height * 0.4 + parallaxY1, 
        0, 
        canvas.width * 0.3 + parallaxX1, 
        canvas.height * 0.4 + parallaxY1, 
        400
      );
      nebula1.addColorStop(0, 'rgba(0, 242, 255, 0.08)');
      nebula1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const parallaxX2 = (mouseX / canvas.width - 0.5) * -25;
      const parallaxY2 = (mouseY / canvas.height - 0.5) * -25;
      
      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.7 + parallaxX2, 
        canvas.height * 0.6 + parallaxY2, 
        0, 
        canvas.width * 0.7 + parallaxX2, 
        canvas.height * 0.6 + parallaxY2, 
        450
      );
      nebula2.addColorStop(0, 'rgba(0, 212, 255, 0.06)');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGalaxy();

      // Draw stars with parallax and twinkling
      stars.forEach(star => {
        const parallaxX = (mouseX / canvas.width - 0.5) * star.layer * 8;
        const parallaxY = (mouseY / canvas.height - 0.5) * star.layer * 8;

        // Twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();
        
        // Add soft glow to brighter stars
        if (star.size > 1.5 && currentOpacity > 0.6) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color === '#ffffff' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 242, 255, 0.6)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        ctx.globalAlpha = 1;

        // Slow drift
        star.y += star.speed;
        if (star.y > canvas.height + 10) {
          star.y = -10;
          star.x = Math.random() * canvas.width;
        }
      });

      // Create and draw shooting stars
      createShootingStar();
      shootingStars.forEach((star, index) => {
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();
        ctx.shadowBlur = 0;

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.008;

        if (star.opacity <= 0) {
          shootingStars.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default Background;
