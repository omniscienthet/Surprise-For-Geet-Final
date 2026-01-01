import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  baseColor?: string;
  pillColor?: string;
  gradient?: string;
  hoverGradient?: string;
  hoveredTextColor?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export default function AnimatedButton({
  children,
  onClick,
  className = '',
  baseColor = '#00d4ff',
  pillColor = '#ffffff',
  gradient,
  hoverGradient,
  hoveredTextColor = '#ffffff',
  onHoverStart,
  onHoverEnd
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const activeTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const layout = () => {
      const button = buttonRef.current;
      const circle = circleRef.current;
      
      if (!button || !circle) return;

      const rect = button.getBoundingClientRect();
      const { width: w, height: h } = rect;
      
      if (w === 0 || h === 0) return;
      
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`
      });

      const label = button.querySelector('.pill-label') as HTMLElement;
      const hoverLabel = button.querySelector('.pill-label-hover') as HTMLElement;

      if (label) gsap.set(label, { y: 0 });
      if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

      tlRef.current?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.6, ease: 'power3.easeOut', overwrite: 'auto' }, 0);

      if (label) {
        tl.to(label, { y: -(h + 8), duration: 0.6, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
      }

      if (hoverLabel) {
        gsap.set(hoverLabel, { y: Math.ceil(h + 50), opacity: 0 });
        tl.to(hoverLabel, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
      }

      tlRef.current = tl;
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    const button = buttonRef.current;
    if (!button) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            setTimeout(() => layout(), 50);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(button);

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  const handleEnter = () => {
    onHoverStart?.();
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.4,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    }) as gsap.core.Tween;
  };

  const handleLeave = () => {
    onHoverEnd?.();
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(0, {
      duration: 0.3,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    }) as gsap.core.Tween;
  };

  const textColor = gradient ? '#ffffff' : baseColor;

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative overflow-hidden font-semibold rounded-full uppercase tracking-wide px-8 py-6 text-lg border-2 ${className}`}
      style={{
        background: gradient || pillColor,
        color: textColor,
        borderColor: gradient ? 'transparent' : baseColor,
        borderWidth: '2px',
        borderStyle: 'solid'
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-testid="animated-button"
    >
      <span
        ref={circleRef}
        className="absolute left-1/2 bottom-0 rounded-full pointer-events-none will-change-transform"
        style={{
          background: hoverGradient || gradient || baseColor,
          zIndex: 1,
          filter: (hoverGradient || gradient) ? 'brightness(1.2)' : 'none'
        }}
      />
      <span className="relative z-10 inline-block">
        <span className="pill-label inline-block will-change-transform" style={{ color: textColor }}>{children}</span>
        <span 
          className="pill-label-hover absolute left-0 top-0 inline-block will-change-transform"
          style={{ color: hoveredTextColor }}
        >
          {children}
        </span>
      </span>
    </button>
  );
}
