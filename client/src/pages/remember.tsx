
import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useBlurFadeTransition } from '@/components/BlurFadeTransition';
import GlassSurface from '@/components/GlassSurface';
import SplitText from '@/components/SplitText';
import Particles from '@/components/Particles';
import krishnaVideo from '@/assets/gallery_media/vid4.mp4';

export default function RememberPage() {
  const [, setLocation] = useLocation();
  const { navigateWithTransition } = useBlurFadeTransition();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const musicElements = document.querySelectorAll('audio');
    musicElements.forEach(audio => {
      audio.pause();
    });
  }, []);

  const handleTextAnimationComplete = () => {
    setTimeout(() => {
      setShowButton(true);
    }, 15000);
  };

  const handleGalleryClick = () => {
    navigateWithTransition(() => {
      setLocation('/gallery');
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#cccccc']}
          particleCount={150}
          particleSpread={15}
          speed={0.3}
          particleBaseSize={80}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-6 gap-8">
        <div className="relative rounded-[40px] overflow-hidden shadow-2xl" style={{ width: 'auto', height: 'auto' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[40px] pointer-events-none z-10" />
          <video
            ref={videoRef}
            className="rounded-[40px] block"
            autoPlay
            loop
            playsInline
            src={krishnaVideo}
            style={{ maxHeight: '80vh', width: 'auto', height: 'auto' }}
          />
        </div>

        <div className="text-center mt-4">
          <SplitText
            text="And Yes Remember This :)"
            tag="p"
            className="text-white text-[clamp(1.2rem,3vw,2.2rem)] font-bold leading-relaxed text-center"
            delay={70}
            duration={2}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleTextAnimationComplete}
          />
        </div>

        {showButton && (
          <div
            className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000"
            style={{
              animation: 'fadeSlideIn 1.2s ease-out forwards'
            }}
          >
            <GlassSurface
              width="auto"
              height="auto"
              borderRadius={20}
              borderWidth={0.1}
              brightness={45}
              opacity={0.9}
              blur={15}
              displace={0}
              backgroundOpacity={0.15}
              saturation={1.3}
              distortionScale={-220}
              onClick={handleGalleryClick}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <div className="px-8 py-4 text-white text-[clamp(1rem,2vw,1.3rem)] font-semibold">
                Surprise 🎁
              </div>
            </GlassSurface>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
