"use client";

import { useEffect } from "react";

export default function FloatingParticles() {
  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        (particle as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="particle" style={{ top: '10%', left: '15%', animationDelay: '0s' }}></div>
      <div className="particle" style={{ top: '30%', left: '75%', animationDelay: '2s' }}></div>
      <div className="particle" style={{ top: '60%', left: '25%', animationDelay: '4s' }}></div>
      <div className="particle" style={{ top: '80%', left: '85%', animationDelay: '6s' }}></div>
      <div className="particle" style={{ top: '45%', left: '50%', animationDelay: '3s' }}></div>
    </>
  );
}
