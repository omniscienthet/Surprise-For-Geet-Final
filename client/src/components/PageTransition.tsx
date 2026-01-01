import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!transitionRef.current) return;

    gsap.fromTo(
      transitionRef.current,
      {
        scaleY: 1,
        transformOrigin: 'top'
      },
      {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 1.2,
        ease: 'power2.inOut',
        delay: 0.2,
        onComplete: () => {
          window.dispatchEvent(new Event('pageTransitionComplete'));
        }
      }
    );
  }, []);

  return (
    <>
      <div
        ref={transitionRef}
        className="fixed inset-0 bg-gradient-to-b from-black via-[#001a1a] to-black z-[9999] pointer-events-none"
        style={{ transformOrigin: 'top' }}
      />
      {children}
    </>
  );
}

export function usePageTransition() {
  const navigateWithTransition = (callback: () => void) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[9999]';
    overlay.style.transformOrigin = 'bottom';
    overlay.style.background = 'linear-gradient(to bottom, #000000, #001a1a, #000000)';
    overlay.style.pointerEvents = 'auto';
    document.body.appendChild(overlay);

    gsap.fromTo(
      overlay,
      {
        scaleY: 0,
        transformOrigin: 'bottom'
      },
      {
        scaleY: 1,
        transformOrigin: 'bottom',
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => {
          callback();
          window.dispatchEvent(new Event('pageTransitionComplete'));
          overlay.style.pointerEvents = 'none';
          setTimeout(() => {
            gsap.to(overlay, {
              scaleY: 0,
              transformOrigin: 'top',
              duration: 0.5,
              ease: 'power3.inOut',
              onComplete: () => {
                overlay.remove();
              }
            });
          }, 50);
        }
      }
    );
  };

  return { navigateWithTransition };
}

export function useFadeSwipeTransition() {
  const navigateWithTransition = (callback: () => void, colors: string[] = ['#667eea', '#764ba2']) => {
    const container = document.createElement('div');
    container.className = 'fixed inset-0 z-[9999] overflow-hidden';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    const numPanels = 5;
    const panels: HTMLDivElement[] = [];
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < numPanels; i++) {
      const panel = document.createElement('div');
      panel.className = 'absolute inset-y-0';
      panel.style.width = `${100 / numPanels}%`;
      panel.style.left = `${(100 / numPanels) * i}%`;
      panel.style.background = `linear-gradient(135deg, ${colors[0]}ee 0%, ${colors[1] || colors[0]}ee 100%)`;
      panel.style.transform = 'scaleY(0)';
      panel.style.transformOrigin = 'bottom';
      panel.style.boxShadow = `0 0 50px ${colors[0]}88`;
      container.appendChild(panel);
      panels.push(panel);
    }

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      particle.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]})`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = '0';
      particle.style.filter = 'blur(1px)';
      container.appendChild(particle);
      particles.push(particle);
    }

    const tl = gsap.timeline();

    tl.to(panels, {
      scaleY: 1,
      duration: 1.4,
      ease: 'power3.inOut',
      stagger: {
        each: 0.1,
        from: 'center'
      }
    }, 0);

    tl.to(particles, {
      opacity: 0.8,
      y: () => gsap.utils.random(-200, 200),
      x: () => gsap.utils.random(-200, 200),
      scale: () => gsap.utils.random(0.5, 2),
      duration: 1.4,
      ease: 'power2.out',
      stagger: {
        each: 0.02,
        from: 'random'
      }
    }, 0.2);

    tl.call(() => {
      callback();
      window.dispatchEvent(new Event('pageTransitionComplete'));
    }, [], 1.1);

    tl.to(particles, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in'
    }, 1.2);

    tl.to(panels, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.4,
      ease: 'power3.inOut',
      stagger: {
        each: 0.1,
        from: 'edges'
      },
      onComplete: () => {
        container.remove();
      }
    }, 1.5);
  };

  return { navigateWithTransition };
}
