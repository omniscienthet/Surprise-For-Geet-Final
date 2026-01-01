import { useEffect, useRef } from 'react';

interface ParticlesCSSProps {
  particleCount?: number;
  particleColor?: string;
  className?: string;
}

export default function ParticlesCSS({
  particleCount = 100,
  particleColor = '#ffffff',
  className = ''
}: ParticlesCSSProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing particles
    container.innerHTML = '';

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${particleColor};
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        opacity: ${Math.random() * 0.5 + 0.3};
        animation: float ${duration}s ${delay}s infinite ease-in-out;
      `;
      
      container.appendChild(particle);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(20px, -20px);
        }
        50% {
          transform: translate(-15px, 15px);
        }
        75% {
          transform: translate(15px, -15px);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [particleCount, particleColor]);

  return <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} />;
}
