
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { gsap } from 'gsap';
import CurvedLoop from '@/components/CurvedLoop';
import SplitText from '@/components/SplitText';
import GlassSurface from '@/components/GlassSurface';
import CakeAnimation from '@/components/CakeAnimation';
import { useScaleFadeTransition } from '@/components/ScaleFadeTransition';
import birthdayPiano from '@/assets/music/birthday-piano.mp3';
import curvedBg from '@/assets/curved-bg.jpeg';

export default function BirthdayWish() {
  const [, setLocation] = useLocation();
  const { navigateWithTransition } = useScaleFadeTransition();
  const [showCake, setShowCake] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMessageButton, setShowMessageButton] = useState(false);
  const [stopCurvedLoop, setStopCurvedLoop] = useState(false);
  const [bgColor, setBgColor] = useState('from-pink-300 via-purple-300 to-indigo-400');
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load fonts
    const link1 = document.createElement('link');
    link1.href = 'https://fonts.googleapis.com/css2?family=Cookie&display=swap';
    link1.rel = 'stylesheet';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&display=swap';
    link2.rel = 'stylesheet';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
    link3.rel = 'stylesheet';
    document.head.appendChild(link3);

    return () => {
      if (link1.parentNode) document.head.removeChild(link1);
      if (link2.parentNode) document.head.removeChild(link2);
      if (link3.parentNode) document.head.removeChild(link3);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));

      let volume = 0;
      const fadeIn = setInterval(() => {
        if (volume < 0.7) {
          volume += 0.05;
          if (audioRef.current) {
            audioRef.current.volume = Math.min(volume, 0.7);
          }
        } else {
          clearInterval(fadeIn);
        }
      }, 100);

      return () => {
        clearInterval(fadeIn);
        if (audioRef.current) {
          let vol = audioRef.current.volume;
          const fadeOut = setInterval(() => {
            if (vol > 0) {
              vol -= 0.05;
              if (audioRef.current) {
                audioRef.current.volume = Math.max(vol, 0);
              }
            } else {
              clearInterval(fadeOut);
              if (audioRef.current) {
                audioRef.current.pause();
              }
            }
          }, 100);
        }
      };
    }
  }, []);

  useEffect(() => {
    const handleCakeComplete = () => {
      setTimeout(() => {
        setShowButton(true);
        if (buttonRef.current) {
          gsap.fromTo(
            buttonRef.current,
            { opacity: 0, scale: 0.8, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power3.out' }
          );
        }
      }, 500);
    };

    window.addEventListener('cakeAnimationComplete', handleCakeComplete);
    return () => window.removeEventListener('cakeAnimationComplete', handleCakeComplete);
  }, []);

  const handleButtonClick = () => {
    if (buttonRef.current) {
      // Stop the curved loop animation
      setStopCurvedLoop(true);
      // Change background to warm beige/cream color matching the image
      setBgColor('from-[#f5e6d3] via-[#e8d4ba] to-[#d9c7b0]');
      
      gsap.to(buttonRef.current, {
        scale: 0,
        opacity: 0,
        filter: 'blur(20px)',
        duration: 0.8,
        ease: 'back.in(1.7)',
        onComplete: () => {
          setShowButton(false);
          // Hide the cake
          setShowCake(false);
          // Show message after cake is hidden
          setTimeout(() => {
            setShowMessage(true);
          }, 300);
        }
      });
    }
  };

  useEffect(() => {
    if (!showMessage) return;

    // Show button after fade animations complete
    const timer = setTimeout(() => {
      setShowMessageButton(true);
    }, 6000); // 4s last line delay + 1.2s animation + 0.8s buffer

    return () => clearTimeout(timer);
  }, [showMessage]);

  const handleMessageComplete = () => {
    setTimeout(() => {
      setShowMessageButton(true);
    }, 4000);
  };

  const handleVideoPageClick = () => {
    navigateWithTransition(() => {
      setLocation('/remember');
    });
  };

  return (
    <div className={`relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br ${bgColor} transition-all duration-1000 ease-in-out`}>
      <audio ref={audioRef} src={birthdayPiano} loop />

      {showCake && (
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-center pb-8">
          <div className="relative">
            <CakeAnimation />
          </div>
        </div>
      )}

      {showButton && !showMessage && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div
            ref={buttonRef}
            className="button-fade-in"
          >
            <GlassSurface
              onClick={handleButtonClick}
              width="auto"
              height="auto"
              borderRadius={16}
              borderWidth={0.1}
              brightness={40}
              opacity={0.85}
              blur={15}
              displace={0}
              backgroundOpacity={0.1}
              saturation={1.2}
              distortionScale={-200}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <div className="px-8 py-4 text-white text-[clamp(1rem,1.8vw,1.3rem)] font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 700 }}>
                For: बरसाने वाली
              </div>
            </GlassSurface>
          </div>
        </div>
      )}

      {!stopCurvedLoop && (
        <div className="absolute top-0 left-0 right-0 z-10" style={{ height: '120px', overflow: 'visible', paddingTop: '60px' }}>
          <CurvedLoop
            marqueeText="HAPPY BIRTHDAY AAROHI "
            speed={3}
            curveAmount={300}
            direction="left"
            interactive={false}
            highlightWord="AAROHI"
            highlightColor="#00d4ff"
            className="curved-birthday-text"
          />
        </div>
      )}

      {showMessage && (
        <div className="absolute inset-0 z-30 flex items-center justify-center px-4">
          <div className="relative flex flex-col items-center message-container-fade">
            <div 
              className="relative rounded-[3rem] overflow-hidden shadow-2xl"
              style={{
                width: 'min(380px, 85vw)',
                aspectRatio: '9/16',
              }}
            >
              <img 
                src={curvedBg} 
                alt="Curved Background" 
                className="block w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 flex flex-col justify-between px-5 py-6">
                {/* Top text - राधे कृष्ण Aarohi :) */}
                <div className="fade-line text-white text-center" style={{ 
                  fontFamily: "'Cookie', 'Noto Sans Devanagari', cursive", 
                  fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', 
                  animationDelay: '0s', 
                  fontWeight: 600,
                  textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
                  marginTop: '0.5rem'
                }}>
                  'राधे कृष्ण' Aarohi :)
                </div>

                {/* Center messages */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="fade-message-container text-white space-y-2.5 text-center w-full" style={{ fontFamily: "'Cookie', 'Noto Sans Devanagari', cursive" }}>
                    <div className="fade-line" style={{ animationDelay: '0.8s', fontSize: 'clamp(1.05rem, 3.2vw, 1.4rem)', lineHeight: '1.3', textShadow: '2px 2px 6px rgba(0,0,0,0.7)', fontWeight: 600 }}>
                      Happy Birthday Aarohi (GEET) :)
                    </div>
                    <div className="fade-line" style={{ animationDelay: '1.6s', fontSize: 'clamp(0.8rem, 2.5vw, 1.05rem)', lineHeight: '1.4', textShadow: '2px 2px 6px rgba(0,0,0,0.7)', fontWeight: 500 }}>
                      Always Stays Happy And In A Blissful State . As Always You Are.
                    </div>
                    <div className="fade-line" style={{ animationDelay: '2.4s', fontSize: 'clamp(0.95rem, 3vw, 1.25rem)', lineHeight: '1.3', textShadow: '2px 2px 6px rgba(0,0,0,0.7)', fontWeight: 600 }}>
                      Happy Birthday🎂
                    </div>
                    <div className="fade-line" style={{ animationDelay: '3.2s', fontSize: 'clamp(1rem, 3.1vw, 1.3rem)', lineHeight: '1.5', textShadow: '2px 2px 6px rgba(0,0,0,0.7)', fontWeight: 700, fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      'सदेव राधा रानी की कृपा रहे'
                    </div>
                    <div className="fade-line" style={{ animationDelay: '4s', fontSize: 'clamp(0.9rem, 2.8vw, 1.15rem)', lineHeight: '1.3', textShadow: '2px 2px 6px rgba(0,0,0,0.7)', fontWeight: 600 }}>
                      From -: वैष्णव :)💛
                    </div>
                  </div>
                </div>

                {/* Button at bottom inside the image */}
                {showMessageButton && (
                  <div
                    className="flex justify-center pb-2"
                    style={{
                      animation: 'fadeSlideIn 1.2s ease-out forwards'
                    }}
                  >
                    <GlassSurface
                      width="auto"
                      height="auto"
                      borderRadius={12}
                      borderWidth={0.1}
                      brightness={45}
                      opacity={0.9}
                      blur={15}
                      displace={0}
                      backgroundOpacity={0.15}
                      saturation={1.3}
                      distortionScale={-220}
                      onClick={handleVideoPageClick}
                      className="cursor-pointer hover:scale-105 transition-transform duration-300"
                    >
                      <div className="px-6 py-2.5 text-white text-[clamp(0.85rem,2.5vw,1.1rem)] font-semibold">
                        Message
                      </div>
                    </GlassSurface>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .curved-birthday-text {
          fill: #ffffff;
          font-family: 'Poppins', sans-serif;
          font-size: clamp(1.2rem, 2.5vw, 2rem);
          font-weight: 600;
        }
        
        .fade-message-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .fade-line {
          opacity: 0;
          animation: fadeIn 1.2s ease-out forwards;
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
        
        @keyframes buttonFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .button-fade-in {
          animation: buttonFadeIn 1.5s ease-out forwards;
        }
        
        .message-container-fade {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
