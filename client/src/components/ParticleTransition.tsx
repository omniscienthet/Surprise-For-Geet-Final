import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ParticleTransitionProps {
  children: React.ReactNode;
  duration?: number;
  particleCount?: number;
  particleColor?: string | string[];
  className?: string;
}

export default function ParticleTransition({
  children,
  duration = 5000,
  particleCount = 50,
  particleColor = 'rgba(0, 26, 26, 0.8)',
  className = ''
}: ParticleTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];

    // Support multiple colors
    const colors = Array.isArray(particleColor) ? particleColor : [particleColor];

    // Create particles with more variety and stunning glow effects
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 24 + 6;
      const blurAmount = Math.random() * 10 + 5;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        filter: blur(${blurAmount}px) brightness(1.4) saturate(1.3);
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        left: ${startX}vw;
        top: ${startY}vh;
        box-shadow: 
          0 0 ${blurAmount * 4}px ${color}, 
          0 0 ${blurAmount * 8}px ${color},
          0 0 ${blurAmount * 12}px ${color};
      `;
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles with more organic, flowing movements
    particles.forEach((particle, index) => {
      const delay = (index / particleCount) * (duration / 1000) * 0.4;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 700 + 400;
      const maxOpacity = Math.random() * 0.85 + 0.3;
      
      // Initial fade in and movement
      gsap.to(particle, {
        opacity: maxOpacity,
        x: Math.cos(angle) * distance * 0.3,
        y: Math.sin(angle) * distance * 0.3,
        rotation: Math.random() * 360,
        duration: (duration / 1000) * 0.5,
        delay,
        ease: 'power1.out'
      });

      // Secondary movement with curve
      gsap.to(particle, {
        x: Math.cos(angle + Math.PI / 4) * distance,
        y: Math.sin(angle + Math.PI / 4) * distance,
        scale: Math.random() * 0.5 + 0.8,
        duration: (duration / 1000) * 0.6,
        delay: delay + (duration / 1000) * 0.3,
        ease: 'sine.inOut'
      });

      // Fade out
      gsap.to(particle, {
        opacity: 0,
        scale: 0.3,
        duration: (duration / 1000) * 0.5,
        delay: delay + (duration / 1000) * 0.7,
        ease: 'power2.in',
        onComplete: () => {
          particle.remove();
        }
      });
    });

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, [duration, particleCount, particleColor]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
