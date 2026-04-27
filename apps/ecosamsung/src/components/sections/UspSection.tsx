import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronRight, ArrowUpRight } from "lucide-react";

interface UspSectionProps {
  section3Ref: React.RefObject<HTMLElement | null>;
  usps: any[];
  expandedUsp: number | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const UspSection = ({ section3Ref, usps, expandedUsp, containerRef }: UspSectionProps) => {
  return (
    <section id="service-section" ref={section3Ref} className="relative z-10 w-full bg-white text-black">
      {/* PC Version */}
      <div className="hidden lg:block">
        <UspSectionPC usps={usps} expandedUsp={expandedUsp} containerRef={containerRef} section3Ref={section3Ref} />
      </div>
      
      {/* Mobile Version */}
      <div className="block lg:hidden">
        <UspSectionMobile usps={usps} />
      </div>
    </section>
  );
};

const UspSectionPC = ({ usps, expandedUsp, containerRef, section3Ref }: any) => (
  <div className="relative h-[400vh] w-full">
    <div className="absolute inset-0 pointer-events-none">
      <div className="h-screen snap-start snap-always" />
      <div className="h-screen snap-start snap-always" />
      <div className="h-screen snap-start snap-always" />
      <div className="h-screen snap-start snap-always" />
    </div>
    <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="flex h-full w-full">
          {usps.map((usp: any, i: number) => {
            const isExpanded = expandedUsp === i;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{ 
                  width: isExpanded ? "100%" : (expandedUsp === null ? "33.33%" : "0%"),
                  zIndex: isExpanded ? 10 : 1,
                  opacity: expandedUsp !== null && !isExpanded ? 0 : 1
                }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] as any }}
                onClick={() => {
                  if (!isExpanded && containerRef.current && section3Ref.current) {
                    const sectionTop = section3Ref.current.offsetTop;
                    const viewportHeight = window.innerHeight;
                    containerRef.current.scrollTo({ top: sectionTop + (i + 1) * viewportHeight, behavior: "smooth" });
                  }
                }}
                className={`relative overflow-hidden border-r border-black/5 group cursor-pointer ${isExpanded ? "flex-grow" : ""}`}
              >
                <div className="absolute inset-0 z-0">
                  {usp.video ? (
                    <video autoPlay muted loop playsInline className={`h-full w-full object-cover transition-all duration-1500 ${isExpanded ? "scale-105 opacity-100" : "scale-110 opacity-40 grayscale"}`}>
                      <source src={usp.video} type="video/webm" />
                    </video>
                  ) : (
                    <div className="h-full w-full bg-[#111]" />
                  )}
                  <div className={`absolute inset-0 transition-opacity duration-1000 ${isExpanded ? "bg-black/20" : "bg-brand/90 group-hover:bg-brand/80"}`} />
                </div>
                <div className="relative z-20 h-full w-full">
                  <motion.div animate={{ opacity: (expandedUsp === null || isExpanded) ? 1 : 0, y: isExpanded ? -20 : 0 }} className="absolute bottom-[8vh] left-[5vw] z-30">
                    <div className="flex flex-col gap-2">
                       <span className="text-[14px] font-bold tracking-[0.4em] text-white/50 uppercase">{usp.label}</span>
                       <h3 className={`font-bold tracking-tight text-white transition-all duration-1000 whitespace-pre-line break-keep ${isExpanded ? "text-[42px] lg:text-[72px]" : "text-[32px] lg:text-[42px]"}`}>{usp.title}</h3>
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative h-full w-full z-20">
                        <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1.2, ease: [0.19, 1, 0.22, 1] as any }} className="absolute top-[12vh] right-[5vw] text-right max-w-3xl">
                          <h2 className="text-[42px] lg:text-[72px] font-bold leading-[1.1] tracking-tighter text-white whitespace-pre-line break-keep">{usp.subtitle}</h2>
                          <div className="mt-8 flex justify-end">
                            <a href={usp.link} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 bg-white/10 px-12 py-5 text-[15px] font-bold text-white backdrop-blur-md transition-all hover:bg-white/20">에코삼성 자세히 알아보기</a>
                          </div>
                        </motion.div>
                        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 1.2, ease: [0.19, 1, 0.22, 1] as any }} className="absolute bottom-[8vh] right-[5vw] text-right">
                          <p className="max-w-md text-[20px] leading-relaxed text-white/70 font-medium ml-auto break-keep">{usp.desc}</p>
                          <div className="mt-12 flex items-center justify-end gap-3 text-[12px] font-bold text-white/30 uppercase tracking-[0.3em]">
                            <span>Scroll down for more</span>
                            <div className="h-[1px] w-12 bg-white/20" />
                            <ChevronRight className="h-4 w-4 rotate-90" />
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

const UspSectionMobile = ({ usps }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-0 border-y border-black/5">
      {usps.map((usp: any, i: number) => {
        const isActive = activeIndex === i;
        return (
          <div 
            key={i} 
            className="group relative overflow-hidden border-b border-black/5"
            onClick={() => setActiveIndex(i)}
          >
            {/* Background */}
            <div className="absolute inset-0 z-0">
              {usp.video ? (
                <video autoPlay muted loop playsInline className={`h-full w-full object-cover transition-all duration-1000 ${isActive ? "opacity-40" : "opacity-0"}`}>
                  <source src={usp.video} type="video/webm" />
                </video>
              ) : (
                <div className={`h-full w-full bg-[#111] transition-all duration-1000 ${isActive ? "opacity-40" : "opacity-0"}`} />
              )}
              <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? "bg-black/60" : "bg-white"}`} />
            </div>

            {/* Header Content */}
            <div className="relative z-10 p-[6vw] flex flex-col items-start gap-2">
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-500 ${isActive ? "text-brand" : "text-black/30"}`}>0{usp.id} / {usp.label}</span>
              <div className="flex w-full items-center justify-between">
                <h3 className={`text-[24px] font-bold tracking-tight transition-colors duration-500 ${isActive ? "text-white" : "text-black"}`}>{usp.title}</h3>
                <ChevronRight className={`h-5 w-5 transition-all duration-500 ${isActive ? "rotate-90 text-brand" : "text-black/20"}`} />
              </div>

              {/* Collapsible Content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] as any }}
                    className="overflow-hidden w-full"
                  >
                    <div className="pt-8 pb-4">
                      <h4 className="text-[28px] font-bold leading-[1.2] text-white whitespace-pre-line mb-8">{usp.subtitle}</h4>
                      <p className="text-[15px] leading-relaxed text-white/60 mb-10">{usp.desc}</p>
                      <a href={usp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[13px] font-bold text-white shadow-xl shadow-brand/20">
                        에코삼성 스토리 보기
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
};
