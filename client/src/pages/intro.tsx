import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { gsap } from 'gsap';
import AnimatedButton from '@/components/AnimatedButton';
import PageTransition from '@/components/PageTransition';
import ClickSpark from '@/components/ClickSpark';

export default function Intro() {
  const [, setLocation] = useLocation();
  const [showButton, setShowButton] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTransitionComplete = () => {
      setTimeout(() => {
        setStartAnimation(true);
      }, 200);
    };

    window.addEventListener('pageTransitionComplete', handleTransitionComplete, { once: true });
    
    const fallbackTimer = setTimeout(() => {
      setStartAnimation(true);
    }, 1500);
    
    return () => {
      window.removeEventListener('pageTransitionComplete', handleTransitionComplete);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!textRef.current || !startAnimation) return;

    const lines = [
      { text: "Ready to Swirl around in the deep sea of the surprise that is made for you 'blue'.", highlightWords: ["'blue'."] }
    ];

    textRef.current.innerHTML = '';

    const allElements: HTMLElement[] = [];

    lines.forEach((line, lineIndex) => {
      const lineContainer = document.createElement('div');
      lineContainer.className = 'mb-6';

      const words = line.text.split(' ');
      words.forEach((word) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'inline-block mr-[0.3em]';
        wordSpan.textContent = word;

        if (line.highlightWords.includes(word)) {
          wordSpan.className += ' text-[#00d4ff]';
        }

        lineContainer.appendChild(wordSpan);
        allElements.push(wordSpan);
      });

      textRef.current?.appendChild(lineContainer);
    });

    gsap.fromTo(
      allElements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.15,
        onComplete: () => {
          setShowButton(true);
        }
      }
    );
  }, [startAnimation]);

  useEffect(() => {
    if (!showButton || !buttonRef.current) return;

    gsap.fromTo(
      buttonRef.current,
      {
        y: 190,
        opacity: 0,
        scale: 1
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2.7,
        ease: 'power3.out',
        delay: 0.5
      }
    );
  }, [showButton]);

  const handleNavigate = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setLocation('/main');
  };

  return (
    <PageTransition>
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="particle-bg absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="particle-dot absolute rounded-full"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  background: '#00d4ff',
                  filter: `blur(${Math.random() * 2 + 1}px)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.4 + 0.2,
                  animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>
        <div ref={contentRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-16 px-6">
          <div className="w-full flex justify-center max-w-5xl mx-auto">
            <div
              ref={textRef}
              className="text-white text-[clamp(1.5rem,4vw,3.5rem)] font-semibold leading-relaxed text-center overflow-hidden whitespace-normal"
            />
          </div>

          {showButton && (
            <div ref={buttonRef}>
              <ClickSpark
                sparkColor="#ffffff"
                sparkSize={56}
                sparkRadius={80}
                sparkCount={20}
                duration={900}
                extraScale={1.9}
              >
                <AnimatedButton
                  onClick={handleNavigate}
                  className=""
                  baseColor="#00d4ff"
                  pillColor="#ffffff"
                  hoveredTextColor="#000000"
                  data-testid="button-ready"
                >
                  Ready
                </AnimatedButton>
              </ClickSpark>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
