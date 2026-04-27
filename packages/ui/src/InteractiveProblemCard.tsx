import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { GsapVisual } from "./GsapVisual";

interface InteractiveProblemCardProps {
  item: {
    id: string;
    text: string;
    desc: string;
  };
  isPreview?: boolean;
}

export const InteractiveProblemCard = ({ item, isPreview = false }: InteractiveProblemCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isPreview ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : rotateX),
        rotateY: isPreview ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : rotateY),
        transformStyle: "preserve-3d",
      }}
      className={`group relative h-full w-full overflow-hidden rounded-[16px] bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 lg:p-10 transition-all hover:bg-white/20 ${isPreview ? "opacity-30 grayscale blur-[2px]" : ""} touch-none md:touch-auto`}
    >
      <div 
        style={{ transform: "translateZ(60px)" }}
        className="relative mb-4 sm:mb-6 lg:mb-8 h-[140px] sm:h-[220px] lg:h-[260px] w-full flex items-center justify-center rounded-[8px] bg-black/40 border border-white/5 overflow-hidden"
      >
        <GsapVisual type={item.id} />
      </div>

      <div style={{ transform: "translateZ(40px)" }} className="mt-auto relative z-10">
        <div className="flex items-center gap-4 mb-4">
           <span className="text-[11px] font-bold text-white tracking-[0.4em] uppercase">Issue 0{item.id}</span>
           <div className="h-[1px] w-10 bg-white/30" />
        </div>
        <h3 className="text-[20px] lg:text-[24px] font-bold text-white group-hover:text-white transition-colors leading-tight">
          {item.text}
        </h3>
        {!isPreview && (
          <p className="mt-2 sm:mt-4 lg:mt-6 text-[14px] sm:text-[15px] lg:text-[17px] leading-relaxed text-white/40 group-hover:text-white/70 transition-colors whitespace-pre-line break-keep">
            {item.desc}
          </p>
        )}
      </div>

      {/* GSAP Flare Interaction */}
      <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
              background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15) 0%, transparent 70%)`,
          } as any}
      />
    </motion.div>
  );
};
