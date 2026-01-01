
import { gsap } from 'gsap';

export function useScaleFadeTransition() {
  const navigateWithTransition = (callback: () => void) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center';
    overlay.style.background = 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 100%)';
    overlay.style.opacity = '0';
    document.body.appendChild(overlay);

    const circle = document.createElement('div');
    circle.className = 'absolute';
    circle.style.width = '0px';
    circle.style.height = '0px';
    circle.style.borderRadius = '50%';
    circle.style.background = 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)';
    overlay.appendChild(circle);

    const tl = gsap.timeline();

    tl.to(overlay, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in'
    });

    tl.to(circle, {
      width: '800px',
      height: '800px',
      duration: 0.8,
      ease: 'power3.out'
    }, 0.2);

    tl.call(() => {
      callback();
      window.dispatchEvent(new Event('pageTransitionComplete'));
    }, [], 0.6);

    tl.to(circle, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in'
    }, 0.8);

    tl.to(overlay, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        overlay.remove();
      }
    }, 1.0);
  };

  return { navigateWithTransition };
}
