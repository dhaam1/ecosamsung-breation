import { useState, useRef } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
}

export const BeforeAfterSlider = ({ before, after }: BeforeAfterSliderProps) => {
  const [sliderPos, setSliderPos] = useState(50);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-[4px] select-none bg-gray-100 shadow-2xl shadow-black/5 touch-none"
    >
      {/* After Image (Base) */}
      <div className="relative h-full w-full">
        <img 
          src={after} 
          alt={`에코삼성 프리미엄 청소 시공 후 - 깨끗해진${after.includes('public') ? ' 공공기관' : after.includes('kitchen') ? ' 주방' : ' 건물'} 환경`} 
          className="absolute inset-0 h-full w-full object-cover" 
          referrerPolicy="no-referrer" 
        />
      </div>
      
      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden border-r-2 border-brand"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="relative h-full" style={{ width: `${10000 / Math.max(0.1, sliderPos)}%` }}>
          <img 
            src={before} 
            alt={`에코삼성 프리미엄 청소 시공 전 - 오염된${before.includes('public') ? ' 공공기관' : before.includes('kitchen') ? ' 주방' : ' 건물'} 환경`} 
            className="h-full w-full object-cover" 
            referrerPolicy="no-referrer" 
          />
        </div>
        <div className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md uppercase tracking-widest">Before</div>
      </div>
      
      <div className="absolute top-4 right-4 rounded-full bg-brand/80 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md uppercase tracking-widest">After</div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20 w-[60px] -translate-x-1/2 cursor-col-resize flex items-center justify-center group/handle"
        style={{ left: `${sliderPos}%` }}
        onPointerDown={(e) => {
          e.preventDefault();
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          isDraggingRef.current = true;
        }}
        onPointerMove={(e) => {
          if (isDraggingRef.current) handleMove(e.clientX);
        }}
        onPointerUp={() => isDraggingRef.current = false}
        onPointerCancel={() => isDraggingRef.current = false}
      >
        <div className="h-full w-1 bg-brand shadow-[0_0_10px_rgba(77,120,224,0.5)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-xl active:scale-90 transition-transform">
          <div className="flex gap-1">
            <div className="h-4 w-0.5 bg-white/40" />
            <div className="h-4 w-0.5 bg-white" />
            <div className="h-4 w-0.5 bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
};
