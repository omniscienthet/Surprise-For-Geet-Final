import { useMemo, useState, useEffect, useRef } from "react";
import DomeGallery from "@/components/DomeGallery";
import tumSeHi from "../assets/music/tum-se-hi.mp3";

import img1 from "../assets/gallery_media/img1.jpg";
import img2 from "../assets/gallery_media/img2.jpg";
import img3 from "../assets/gallery_media/img3.jpg";
import img4 from "../assets/gallery_media/img4.jpg";
import img5 from "../assets/gallery_media/img5.jpg";
import img6 from "../assets/gallery_media/img6.jpg";
import img7 from "../assets/gallery_media/img7.jpg";
import img8 from "../assets/gallery_media/img8.jpg";
import img9 from "../assets/gallery_media/img9.jpg";
import img10 from "../assets/gallery_media/img10.jpg";
import img11 from "../assets/gallery_media/img11.jpg";
import img12 from "../assets/gallery_media/img12.jpg";
import img13 from "../assets/gallery_media/img13.jpg";
import img14 from "../assets/gallery_media/img14.jpg";
import img15 from "../assets/gallery_media/img15.jpg";
import img16 from "../assets/gallery_media/img16.jpg";
import img17 from "../assets/gallery_media/img17.jpg";
import img18 from "../assets/gallery_media/img18.jpg";
import img19 from "../assets/gallery_media/img19.jpg";
import img20 from "../assets/gallery_media/img20.jpg";
import img21 from "../assets/gallery_media/img21.jpg";
import img22 from "../assets/gallery_media/img22.jpg";
import img23 from "../assets/gallery_media/img23.jpg";
import img24 from "../assets/gallery_media/img24.jpg";
import img25 from "../assets/gallery_media/img25.jpg";
import img26 from "../assets/gallery_media/img26.jpg";
import img27 from "../assets/gallery_media/img27.jpg";
import img28 from "../assets/gallery_media/img28.jpg";
import img29 from "../assets/gallery_media/img29.jpg";
import img30 from "../assets/gallery_media/img30.jpg";
import img31 from "../assets/gallery_media/img31.jpg";
import img32 from "../assets/gallery_media/img32.jpg";
import img33 from "../assets/gallery_media/img33.jpg";
import img34 from "../assets/gallery_media/img34.jpg";
import img35 from "../assets/gallery_media/img35.jpg";
import img36 from "../assets/gallery_media/img36.jpg";
import img37 from "../assets/gallery_media/img37.jpg";
import img38 from "../assets/gallery_media/img38.jpg";
import img39 from "../assets/gallery_media/img39.jpg";
import img40 from "../assets/gallery_media/img40.jpg";
import img41 from "../assets/gallery_media/img41.jpg";
import img42 from "../assets/gallery_media/img42.jpg";
import img43 from "../assets/gallery_media/img43.jpg";
import img44 from "../assets/gallery_media/img44.jpg";
import img45 from "../assets/gallery_media/img45.jpg";
import img46 from "../assets/gallery_media/img46.jpg";
import vid2 from "../assets/gallery_media/vid2.mp4";
import vid3 from "../assets/gallery_media/vid3.mp4";
import vid6 from "../assets/gallery_media/vid6.mp4";
import vid7 from "../assets/gallery_media/vid7.mp4";
import vid8 from "../assets/gallery_media/vid8.mp4";
import vid9 from "../assets/gallery_media/vid9.mp4";

interface MediaItem {
  src: string;
  alt: string;
  type: "image" | "video";
  orientation?: "landscape" | "portrait";
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const extractDominantColor = (
  src: string,
  type: "image" | "video",
): Promise<string> => {
  return new Promise((resolve) => {
    if (type === "video") {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.src = src;
      video.currentTime = 1;
      video.addEventListener("loadeddata", () => {
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, 100, 100);
          const imageData = ctx.getImageData(0, 0, 100, 100);
          const color = getDominantColorFromImageData(imageData);
          resolve(color);
        } else {
          resolve("#000000");
        }
      });
      video.addEventListener("error", () => {
        resolve("#000000");
      });
    } else {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, 100, 100);
          const imageData = ctx.getImageData(0, 0, 100, 100);
          const color = getDominantColorFromImageData(imageData);
          resolve(color);
        } else {
          resolve("#000000");
        }
      };
      img.onerror = () => {
        resolve("#000000");
      };
    }
  });
};

const getDominantColorFromImageData = (imageData: ImageData): string => {
  const data = imageData.data;
  let r = 0,
    g = 0,
    b = 0,
    count = 0;

  for (let i = 0; i < data.length; i += 16) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const factor = brightness > 128 ? 0.3 : 0.5;

  r = Math.floor(r * factor);
  g = Math.floor(g * factor);
  b = Math.floor(b * factor);

  return `rgb(${r}, ${g}, ${b})`;
};

export default function GalleryPage() {
  const [bgColor, setBgColor] = useState("#000000");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          let volume = 0;
          const fadeIn = setInterval(() => {
            if (volume < 0.5) {
              volume += 0.05;
              if (audioRef.current) {
                audioRef.current.volume = Math.min(volume, 0.5);
              }
            } else {
              clearInterval(fadeIn);
            }
          }, 100);
        })
        .catch((err) => console.log("Audio play failed:", err));
    }

    const handleVideoPlay = () => setIsVideoPlaying(true);
    const handleVideoPause = () => setIsVideoPlaying(false);

    document.addEventListener("play", handleVideoPlay, true);
    document.addEventListener("pause", handleVideoPause, true);
    document.addEventListener("ended", handleVideoPause, true);

    return () => {
      document.removeEventListener("play", handleVideoPlay, true);
      document.removeEventListener("pause", handleVideoPause, true);
      document.removeEventListener("ended", handleVideoPause, true);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const targetVolume = isVideoPlaying ? 0.15 : 0.5;
    const currentVolume = audioRef.current.volume;
    const step = (targetVolume - currentVolume) / 10;

    let count = 0;
    const interval = setInterval(() => {
      if (count >= 10) {
        clearInterval(interval);
        if (audioRef.current) {
          audioRef.current.volume = targetVolume;
        }
        return;
      }

      if (audioRef.current) {
        audioRef.current.volume += step;
      }
      count++;
    }, 50);

    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  const galleryMedia = useMemo(() => {
    const media: MediaItem[] = [
      { src: img1, alt: "Memory 1", type: "image" },
      { src: img2, alt: "Memory 2", type: "image" },
      { src: img3, alt: "Memory 3", type: "image" },
      { src: img4, alt: "Memory 4", type: "image" },
      { src: img5, alt: "Memory 5", type: "image" },
      { src: img6, alt: "Memory 6", type: "image" },
      { src: img7, alt: "Memory 7", type: "image", orientation: "landscape" },
      { src: img8, alt: "Memory 8", type: "image" },
      { src: img9, alt: "Memory 9", type: "image" },
      { src: img10, alt: "Memory 10", type: "image" },
      { src: img11, alt: "Memory 11", type: "image" },
      { src: img12, alt: "Memory 12", type: "image" },
      { src: img13, alt: "Memory 13", type: "image" },
      { src: img14, alt: "Memory 14", type: "image", orientation: "landscape" },
      { src: img15, alt: "Memory 15", type: "image", orientation: "landscape" },
      { src: img16, alt: "Memory 16", type: "image", orientation: "landscape" },
      { src: img17, alt: "Memory 17", type: "image", orientation: "landscape" },
      { src: img18, alt: "Memory 18", type: "image", orientation: "landscape" },
      { src: img19, alt: "Memory 19", type: "image", orientation: "landscape" },
      { src: img20, alt: "Memory 20", type: "image", orientation: "landscape" },
      { src: img21, alt: "Memory 21", type: "image", orientation: "portrait" },
      { src: img22, alt: "Memory 22", type: "image", orientation: "landscape" },
      { src: img23, alt: "Memory 23", type: "image", orientation: "landscape" },
      { src: img24, alt: "Memory 24", type: "image", orientation: "landscape" },
      { src: img25, alt: "Memory 25", type: "image", orientation: "landscape" },
      { src: img26, alt: "Memory 26", type: "image", orientation: "landscape" },
      { src: img27, alt: "Memory 27", type: "image", orientation: "landscape" },
      { src: img28, alt: "Memory 28", type: "image", orientation: "landscape" },
      { src: img29, alt: "Memory 29", type: "image", orientation: "landscape" },
      { src: img30, alt: "Memory 30", type: "image", orientation: "portrait" },
      { src: img31, alt: "Memory 31", type: "image", orientation: "landscape" },
      { src: img32, alt: "Memory 32", type: "image", orientation: "landscape" },
      { src: img33, alt: "Memory 33", type: "image", orientation: "landscape" },
      { src: img34, alt: "Memory 34", type: "image", orientation: "portrait" },
      { src: img35, alt: "Memory 35", type: "image", orientation: "portrait" },
      { src: img36, alt: "Memory 36", type: "image", orientation: "portrait" },
      { src: img37, alt: "Memory 37", type: "image", orientation: "portrait" },
      { src: img38, alt: "Memory 38", type: "image", orientation: "portrait" },
      { src: img39, alt: "Memory 39", type: "image", orientation: "portrait" },
      { src: img40, alt: "Memory 40", type: "image", orientation: "portrait" },
      { src: img41, alt: "Memory 41", type: "image", orientation: "portrait" },
      { src: img42, alt: "Memory 42", type: "image", orientation: "portrait" },
      { src: img43, alt: "Memory 43", type: "image", orientation: "portrait" },
      { src: img44, alt: "Memory 44", type: "image", orientation: "portrait" },
      { src: img45, alt: "Memory 45", type: "image", orientation: "portrait" },
      { src: img46, alt: "Memory 46", type: "image", orientation: "portrait" },
      { src: vid2, alt: "Video 2", type: "video" },
      { src: vid3, alt: "Video 3", type: "video", orientation: "landscape" },
      { src: vid6, alt: "Video 6", type: "video" },
      { src: vid7, alt: "Video 7", type: "video" },
      { src: vid8, alt: "Video 8", type: "video" },
      { src: vid9, alt: "Video 9", type: "video" },
    ];
    return shuffleArray(media);
  }, []);

  const lastClickedMediaRef = useRef<string>("");

  const handleMediaClick = async (src: string, type: "image" | "video") => {
    if (lastClickedMediaRef.current !== src) {
      const color = await extractDominantColor(src, type);
      setBgColor(color);
      lastClickedMediaRef.current = src;
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black md:h-screen"
      style={{
        height: "100dvh",
      }}
    >
      <audio ref={audioRef} src={tumSeHi} loop />
      <div
        className="absolute inset-0 transition-colors duration-1000 ease-in-out"
        style={{ backgroundColor: bgColor, opacity: 0.35 }}
      />
      <DomeGallery
        images={galleryMedia}
        fit={1}
        minRadius={300}
        maxVerticalRotationDeg={0}
        segments={34}
        dragDampening={2}
        overlayBlurColor="rgba(0, 0, 0, 0.1)"
        grayscale={false}
        autoRotationSpeed={-0.05}
        onMediaClick={handleMediaClick}
      />
    </div>
  );
}
