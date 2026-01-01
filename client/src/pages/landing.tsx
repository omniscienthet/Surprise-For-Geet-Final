import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidChrome from '@/components/LiquidChrome';
import ScrollFloat from '@/components/ScrollFloat';
import SplitText from '@/components/SplitText';
import PageTransition, { usePageTransition } from '@/components/PageTransition';
import FadeContent from '@/components/FadeContent';
import GlassSurface from '@/components/GlassSurface';
import AnimatedContent from '@/components/AnimatedContent';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const [showButton, setShowButton] = useState(false);
  const { navigateWithTransition } = usePageTransition();

  useEffect(() => {
    let hasExecuted = false;
    
    const handleTransitionComplete = () => {
      if (hasExecuted) return;
      hasExecuted = true;
      
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener('pageTransitionComplete', handleTransitionComplete, { once: true });
    
    return () => {
      window.removeEventListener('pageTransitionComplete', handleTransitionComplete);
    };
  }, []);

  useEffect(() => {
    if (!scrollTextRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(scrollTextRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '500px top',
          scrub: true,
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleScrollProgress = (progress: number) => {
    if (progress === 1 && !showButton) {
      setShowButton(true);
    }
  };

  const handleButtonClick = () => {
    navigateWithTransition(() => {
      setLocation('/counter');
    });
  };

  return (
    <PageTransition>
      <div className="relative w-full min-h-[300vh] overflow-x-hidden bg-[#001a1a]">
        <div className="fixed inset-0 z-0 pointer-events-auto">
          <LiquidChrome
            baseColor={[0, 0.1, 0.1]}
            speed={0.3}
            amplitude={0.3}
            interactive={true}
          />
        </div>

        
        <div className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none gap-12 px-6">
          <div ref={scrollTextRef} className="flex justify-center pointer-events-none">
            <SplitText
              text="Scroll Down Slowly"
              tag="h1"
              className="text-white/30 text-4xl font-semibold"
              delay={70}
              duration={2}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center px-4 min-h-[300vh]">
          <div className="w-full flex flex-col items-center justify-center gap-8" style={{ marginTop: '100vh' }}>
            <div className="pointer-events-none">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="top bottom-=20%"
                scrollEnd="center center"
                stagger={0.07}
                containerClassName="text-center"
                textClassName="text-white text-[clamp(2rem,5vw,4rem)] font-semibold"
                blueText="(The Blue)"
              >
                Hello Aarohi (The Blue) :)
              </ScrollFloat>
            </div>
            
            <div className="pointer-events-none mt-4">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="top bottom-=20%"
                scrollEnd="center center"
                stagger={0.07}
                containerClassName="text-center"
                textClassName="text-white text-[clamp(1.5rem,3vw,2.5rem)] font-semibold"
                onAnimationProgress={handleScrollProgress}
              >
                Are You Ready For The Surprise?
              </ScrollFloat>
            </div>
            
            {showButton && (
              <AnimatedContent
                distance={200}
                direction="vertical"
                reverse={true}
                duration={1.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                scale={1}
                threshold={0.1}
                delay={0.3}
              >
                <div className="pointer-events-auto mt-8" data-testid="button-see-surprise">
                  <GlassSurface
                    onClick={handleButtonClick}
                    width="auto"
                    height="auto"
                    borderRadius={24}
                    brightness={54}
                    opacity={0.93}
                    blur={11}
                    displace={0.5}
                    backgroundOpacity={0}
                    saturation={0.6}
                    distortionScale={-180}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-white font-semibold text-lg px-12 py-6 block">See The Surprise</span>
                  </GlassSurface>
                </div>
              </AnimatedContent>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
