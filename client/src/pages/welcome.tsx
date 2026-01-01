import { useState } from "react";
import { useLocation } from "wouter";
import BlurText from "@/components/BlurText";
import PixelTransition from "@/components/PixelTransition";
import SplashCursor from "@/components/SplashCursor";
import AnimatedButton from "@/components/AnimatedButton";
import { useFadeSwipeTransition } from "@/components/PageTransition";
import catImage from "@assets/selfi_cat_1760778161689.jpeg";

const GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e7 100%)",
];

const getRandomGradient = () => {
  return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
};

const extractColorsFromGradient = (gradient: string) => {
  const hexMatches = gradient.match(/#[a-fA-F0-0]{6}/g);
  if (hexMatches && hexMatches.length >= 2) {
    return [hexMatches[0], hexMatches[hexMatches.length - 1]];
  }
  return ["#667eea", "#764ba2"];
};

export default function Welcome() {
  const [, setLocation] = useLocation();
  const { navigateWithTransition } = useFadeSwipeTransition();
  const [buttonGradient, setButtonGradient] = useState(
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  );
  const [isHovering, setIsHovering] = useState(false);

  const handleNavigate = () => {
    const colors = extractColorsFromGradient(buttonGradient);
    navigateWithTransition(() => {
      setLocation("/intro");
    }, colors);
  };

  const handleDirectGallery = () => {
    // Use a beautiful fade transition for the direct gallery jump
    const colors = ["#000000", "#1a1a1a"]; // Dark elegant fade
    navigateWithTransition(() => {
      setLocation("/gallery");
    }, colors);
  };

  const handleButtonHover = () => {
    setIsHovering(true);
    setButtonGradient(getRandomGradient());
  };

  const handleButtonLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black welcome-container transition-opacity duration-800">
      <SplashCursor TRANSPARENT={false} BACK_COLOR={{ r: 0, g: 0, b: 0 }} />
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center gap-12 px-6">
        <BlurText
          text="Hello, you!"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-white text-[clamp(2rem,6vw,5rem)] font-bold"
        />

        <PixelTransition
          firstContent={
            <img
              src={catImage}
              alt="Cat"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          }
          secondContent={
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column", // Changed to column to stack buttons
                alignItems: "center",
                justifyContent: "center",
                gap: "20px", // Spacing between buttons
                backgroundColor: "#111",
              }}
            >
              <AnimatedButton
                onClick={handleNavigate}
                className="cursor-pointer"
                baseColor="#000000"
                pillColor="#ffffff"
                hoverGradient={isHovering ? buttonGradient : undefined}
                hoveredTextColor="#ffffff"
                onHoverStart={handleButtonHover}
                onHoverEnd={handleButtonLeave}
              >
                START
              </AnimatedButton>

              {/* NEW BUTTON ADDED HERE */}
              <button
                onClick={handleDirectGallery}
                className="px-6 py-2 text-sm text-white/50 hover:text-white transition-colors duration-300 border-b border-transparent hover:border-white/30 tracking-widest uppercase font-light"
              >
                Visit Memory Lane
              </button>
            </div>
          }
          gridSize={5}
          pixelColor="#ffffff"
          animationStepDuration={0.4}
          className="custom-pixel-card"
        />
      </div>
    </div>
  );
}
