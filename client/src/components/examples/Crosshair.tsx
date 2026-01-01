import { useRef } from 'react';
import Crosshair from '../Crosshair';

export default function CrosshairExample() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative h-[600px] bg-black flex items-center justify-center overflow-hidden">
      <Crosshair containerRef={containerRef} color='#ffffff' />
      <button className="relative z-10 px-8 py-4 bg-white text-black font-bold text-xl rounded-lg">
        Hover Over Me
      </button>
    </div>
  );
}
