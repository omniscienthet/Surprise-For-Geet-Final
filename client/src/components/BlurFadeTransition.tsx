
import { gsap } from 'gsap';

export function useBlurFadeTransition() {
  const navigateWithTransition = (callback: () => void) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[9999] bg-black';
    overlay.style.opacity = '0';
    overlay.style.filter = 'blur(0px)';
    document.body.appendChild(overlay);

    const tl = gsap.timeline();

    tl.to(overlay, {
      opacity: 1,
      filter: 'blur(20px)',
      duration: 0.8,
      ease: 'power2.inOut'
    });

    tl.call(() => {
      callback();
      window.dispatchEvent(new Event('pageTransitionComplete'));
    }, [], 0.5);

    tl.to(overlay, {
      opacity: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        overlay.remove();
      }
    }, 0.6);
  };

  return { navigateWithTransition };
}
