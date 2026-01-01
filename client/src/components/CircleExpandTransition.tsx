import { gsap } from 'gsap';

interface CircleExpandTransitionOptions {
  callback: () => void;
  color?: string;
  duration?: number;
}

export function useCircleExpandTransition() {
  const navigateWithTransition = ({ 
    callback, 
    color = '#9C43FE',
    duration = 1.2 
  }: CircleExpandTransitionOptions) => {
    const maxDimension = Math.max(window.innerWidth, window.innerHeight);
    const circleDiameter = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight) * 1.5);
    const container = document.createElement('div');
    container.className = 'fixed inset-0 z-[9999] overflow-hidden pointer-events-none';
    container.style.perspective = '1000px';
    document.body.appendChild(container);

    const circle = document.createElement('div');
    circle.className = 'absolute';
    circle.style.width = '0px';
    circle.style.height = '0px';
    circle.style.borderRadius = '50%';
    circle.style.background = `radial-gradient(circle at center, #9C43FE 0%, #4CC2E9 40%, #101499 80%, #000000 100%)`;
    circle.style.boxShadow = `0 0 100px #9C43FEaa, 0 0 200px #4CC2E966, inset 0 0 100px #9C43FE44`;
    circle.style.left = '50%';
    circle.style.top = '50%';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.filter = 'blur(0px)';
    container.appendChild(circle);

    const particleCount = 40;
    const particles: HTMLDivElement[] = [];
    const particleColors = ['#9C43FE', '#4CC2E9', '#101499'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const particleColor = particleColors[Math.floor(Math.random() * particleColors.length)];
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 6 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      particle.style.background = particleColor;
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.opacity = '0';
      particle.style.boxShadow = `0 0 20px ${particleColor}`;
      container.appendChild(particle);
      particles.push(particle);
    }

    const rings: HTMLDivElement[] = [];
    const ringColors = ['#9C43FE', '#4CC2E9', '#9C43FE', '#4CC2E9', '#101499'];
    for (let i = 0; i < 5; i++) {
      const ring = document.createElement('div');
      const ringColor = ringColors[i];
      ring.style.position = 'absolute';
      ring.style.left = '50%';
      ring.style.top = '50%';
      ring.style.transform = 'translate(-50%, -50%)';
      ring.style.border = `2px solid ${ringColor}${Math.floor((1 - i * 0.15) * 255).toString(16).padStart(2, '0')}`;
      ring.style.borderRadius = '50%';
      ring.style.width = '0px';
      ring.style.height = '0px';
      ring.style.boxShadow = `0 0 30px ${ringColor}88`;
      container.appendChild(ring);
      rings.push(ring);
    }

    const tl = gsap.timeline();

    tl.to(particles, {
      opacity: 0.8,
      x: () => gsap.utils.random(-400, 400),
      y: () => gsap.utils.random(-400, 400),
      scale: () => gsap.utils.random(1, 2.5),
      duration: duration * 0.6,
      ease: 'power2.out',
      stagger: {
        each: 0.015,
        from: 'random'
      }
    }, 0);

    tl.to(rings, {
      width: () => `${circleDiameter + gsap.utils.random(-200, 200)}px`,
      height: () => `${circleDiameter + gsap.utils.random(-200, 200)}px`,
      opacity: 0,
      duration: duration * 0.8,
      ease: 'power2.out',
      stagger: {
        each: 0.08,
        from: 'start'
      }
    }, 0.1);

    tl.to(circle, {
      width: `${circleDiameter}px`,
      height: `${circleDiameter}px`,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: function() {
        const progress = this.progress();
        if (progress > 0.5) {
          circle.style.filter = `blur(${(progress - 0.5) * 40}px)`;
        }
      }
    }, 0);

    tl.call(() => {
      callback();
      window.dispatchEvent(new Event('pageTransitionComplete'));
    }, [], duration * 0.5);

    tl.to(particles, {
      opacity: 0,
      scale: 0.5,
      duration: duration * 0.4,
      ease: 'power2.in'
    }, duration * 0.5);

    tl.to(circle, {
      opacity: 0,
      duration: duration * 0.3,
      ease: 'power2.in',
      onComplete: () => {
        container.remove();
      }
    }, duration * 0.7);
  };

  return { navigateWithTransition };
}
