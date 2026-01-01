import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { gsap } from 'gsap';
import CountUp from '@/components/CountUp';
import { useScaleFadeTransition } from '@/components/ScaleFadeTransition';
import confetti from 'canvas-confetti';

export default function CounterPage() {
  const [, setLocation] = useLocation();
  const { navigateWithTransition } = useScaleFadeTransition();
  const [countComplete, setCountComplete] = useState(false);
  const confettiAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    confettiAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3');
    confettiAudioRef.current.volume = 0.6;
  }, []);

  const handleCountComplete = () => {
    setCountComplete(true);

    if (confettiAudioRef.current) {
      confettiAudioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }

    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 45,
      spread: 360,
      ticks: 90,
      zIndex: 9999,
      gravity: 1.2,
      decay: 0.94,
      shapes: ['circle', 'square'],
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#ffa500', '#ff1493', '#00d4ff']
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimeout(() => {
          const counterContainer = document.querySelector('.counter-container');
          if (counterContainer) {
            gsap.to(counterContainer, {
              opacity: 0,
              scale: 0.8,
              filter: 'blur(20px)',
              duration: 1,
              ease: 'power2.in',
              onComplete: () => {
                navigateWithTransition(() => {
                  setLocation('/birthday-wish');
                });
              }
            });
          } else {
            navigateWithTransition(() => {
              setLocation('/birthday-wish');
            });
          }
        }, 1000);
        return;
      }

      const particleCount = 80 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        angle: randomInRange(55, 125)
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        angle: randomInRange(55, 125)
      });

      confetti({
        ...defaults,
        particleCount: particleCount * 0.5,
        origin: { x: 0.5, y: 0.3 },
        angle: 90,
        spread: 120
      });
    }, 150);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <div className="text-center counter-container">
        <CountUp
          from={0}
          to={18}
          direction="up"
          duration={5}
          className="text-[clamp(8rem,20vw,16rem)] font-bold text-white"
          onEnd={handleCountComplete}
          data-testid="count-up-18"
        />
      </div>
    </div>
  );
}
