
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useFadeTransition() {
  const navigateWithTransition = (callback: () => void) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[9999] bg-black';
    overlay.style.opacity = '0';
    document.body.appendChild(overlay);

    gsap.to(overlay, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        callback();
        window.dispatchEvent(new Event('pageTransitionComplete'));
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          delay: 0.1,
          onComplete: () => {
            overlay.remove();
          }
        });
      }
    });
  };

  return { navigateWithTransition };
}
