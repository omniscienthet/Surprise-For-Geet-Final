import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: { opacity?: number; y?: number; x?: number };
  to?: { opacity?: number; y?: number; x?: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  onLetterAnimationComplete?: () => void;
  blueText?: string;
}

export default function SplitText({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
  blueText = ''
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const hasAnimatedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded || hasAnimatedRef.current) return;
    const el = ref.current;
    
    hasAnimatedRef.current = true;

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign =
      marginValue === 0
        ? ''
        : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    // Split text into characters
    const blueStartIndex = blueText ? text.indexOf(blueText) : -1;
    const blueEndIndex = blueStartIndex >= 0 ? blueStartIndex + blueText.length : -1;
    
    const chars = text.split('').map((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      const isBlue = blueStartIndex >= 0 && i >= blueStartIndex && i < blueEndIndex;
      span.className = isBlue ? 'inline-block text-[#00d4ff]' : 'inline-block';
      return span;
    });

    // Clear and populate element
    el.innerHTML = '';
    chars.forEach(char => el.appendChild(char));

    // Animate
    gsap.fromTo(
      chars,
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
          fastScrollEnd: true,
        },
        onComplete: () => {
          animationCompletedRef.current = true;
          onLetterAnimationComplete?.();
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, fontsLoaded, onLetterAnimationComplete, blueText]);

  const style = {
    textAlign,
    wordWrap: 'break-word' as const,
  };
  const classes = `overflow-hidden inline-block whitespace-normal ${className}`;

  if (tag === 'h1') return <h1 ref={ref as any} style={style} className={classes}>{text}</h1>;
  if (tag === 'h2') return <h2 ref={ref as any} style={style} className={classes}>{text}</h2>;
  if (tag === 'h3') return <h3 ref={ref as any} style={style} className={classes}>{text}</h3>;
  if (tag === 'h4') return <h4 ref={ref as any} style={style} className={classes}>{text}</h4>;
  if (tag === 'h5') return <h5 ref={ref as any} style={style} className={classes}>{text}</h5>;
  if (tag === 'h6') return <h6 ref={ref as any} style={style} className={classes}>{text}</h6>;
  return <p ref={ref as any} style={style} className={classes}>{text}</p>;
}
