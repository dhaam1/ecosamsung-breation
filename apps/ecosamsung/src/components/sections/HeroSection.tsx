import { motion, AnimatePresence } from "motion/react";
import { Heading1 } from "@hero/ui";

interface HeroSectionProps {
  videoKey: number;
  handleVideoEnd: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const HeroSection = ({ videoKey, handleVideoEnd, videoRef }: HeroSectionProps) => {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden snap-start snap-always">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={videoKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              onEnded={handleVideoEnd} 
              className="h-full w-full object-cover"
            >
              <source src="https://hzhedioacvqzxxlkttah.supabase.co/storage/v1/object/public/herolanding-herolanding/0414-EcoSamsung.webm" type="video/webm" />
            </video>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-[1]" />
      </div>
      <main className="relative z-10 grid h-full grid-cols-12 px-[5vw] pb-[8vh] lg:pb-[12vh]">
          <div className="col-span-12 flex flex-col justify-end lg:col-span-7 pt-[10svh] lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] as any }}
          >
            {/* Mobile Title */}
            <Heading1 className="block md:hidden">
              겉만 청소하면 다시 더러워집니다.<br />
              원인마저 제거하려면<br />
              <span className="text-brand">에코삼성</span>입니다.
            </Heading1>
            {/* PC Title */}
            <Heading1 className="hidden md:block">
              겉만 청소하면 다시 더러워집니다.<br />
              원인마저 제거하려면 <span className="text-brand">에코삼성</span>입니다.
            </Heading1>
            <p className="hidden md:block mt-[20px] lg:mt-[28px] max-w-[600px] text-[15px] md:text-[18px] lg:text-[20px] font-semibold text-white/90 drop-shadow-md leading-relaxed">
              프리미엄 특수 청소 솔루션. 에코삼성입니다.
            </p>
          </motion.div>
        </div>
        <div className="col-span-12 flex flex-col justify-end lg:col-start-10 lg:col-end-13 mt-8 lg:mt-0">
          <div className="flex flex-col gap-[2vh] lg:gap-[4vh]">
            {["하도급없는 100% 직영 시공", "철두철미 섬세한 여전문가 드림팀", "원인부터 완벽히 제거하는 청소 시공"].map((feature, i) => (
              <motion.div 
                key={feature} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.6 + i * 0.1 }} 
                className="group relative border-t border-white/10 pt-[1.5vh] lg:border-t-2 lg:pt-[2vh] transition-colors hover:border-brand"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] lg:text-[11px] font-bold text-brand opacity-70 tracking-wider">0{i + 1}</span>
                    <h2 className="text-[16px] lg:text-[20px] font-bold leading-tight text-white/90 drop-shadow-lg group-hover:text-white transition-colors">{feature}</h2>
                  </div>
                  <div className="mt-1 h-1 w-1 lg:h-1.5 lg:w-1.5 rounded-full bg-brand opacity-0 transition-all group-hover:opacity-100 group-hover:scale-125" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};
