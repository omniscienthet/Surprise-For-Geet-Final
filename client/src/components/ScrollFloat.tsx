import { useEffect, useMemo, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  blueText?: string;
  onAnimationProgress?: (progress: number) => void;
}

export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  blueText = '',
  onAnimationProgress
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    const blueStartIndex = blueText ? text.indexOf(blueText) : -1;
    const blueEndIndex = blueStartIndex >= 0 ? blueStartIndex + blueText.length : -1;
    
    return text.split('').map((char, index) => {
      const isBlue = blueStartIndex >= 0 && index >= blueStartIndex && index < blueEndIndex;
      return (
        <span 
          className={`char ${isBlue ? 'text-[#00d4ff]' : ''}`} 
          key={index}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  }, [children, blueText]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');
    
    if (!charElements || charElements.length === 0) return;

    let ctx: gsap.Context | null = null;

    const initAnimation = () => {
      if (ctx) ctx.revert();
      
      ctx = gsap.context(() => {
        gsap.fromTo(
          charElements,
          {
            willChange: 'opacity, transform',
            opacity: 0,
            yPercent: 120,
            scaleY: 2.3,
            scaleX: 0.7,
            transformOrigin: '50% 0%'
          },
          {
            duration: animationDuration,
            ease: ease,
            opacity: 1,
            yPercent: 0,
            scaleY: 1,
            scaleX: 1,
            stagger: stagger,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: scrollStart,
              end: scrollEnd,
              scrub: 1.5,
              markers: false,
              toggleActions: 'play reverse play reverse',
              onUpdate: (self) => {
                if (onAnimationProgress) {
                  onAnimationProgress(self.progress);
                }
              }
            }
          }
        );
      }, el);
    };

    initAnimation();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, onAnimationProgress]);

  return (
    <h2 ref={containerRef} className={`scroll-float overflow-hidden ${containerClassName}`}>
      <span className={`scroll-float-text inline-block text-[clamp(1.5rem,4vw,3.5rem)] font-semibold text-center leading-[1.5] ${textClassName}`}>{splitText}</span>
    </h2>
  );
}
