import { useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface NotFoundViewProps {
  setView: (v: 'home') => void;
}

export const NotFoundView = ({ setView }: NotFoundViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.to(".not-found-particle", {
      y: "random(-100, 100)",
      x: "random(-100, 100)",
      opacity: "random(0.1, 0.5)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full bg-black flex flex-col items-center justify-center overflow-hidden px-[5vw]">
       {/* Background Particles */}
       <div className="absolute inset-0 pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div 
              key={i} 
              className="not-found-particle absolute h-1 w-1 rounded-full bg-brand"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%` 
              }}
            />
          ))}
       </div>

       <motion.div 
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] as any }}
         className="relative z-10 text-center"
       >
         <div className="relative inline-block mb-12">
            <span className="text-[120px] md:text-[180px] lg:text-[240px] font-black text-white/5 tracking-tighter select-none">404</span>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="h-[2px] w-24 bg-brand/50 mb-8" />
            </div>
         </div>
         
         <h2 className="text-[12px] lg:text-[14px] font-bold text-brand tracking-[0.6em] uppercase mb-8">Page Not Found</h2>
         
         <h1 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white mb-6 leading-tight">
            보이지 않는 먼지까지 찾아내지만,<br />
            요청하신 페이지는 찾을 수 없습니다.
         </h1>
         
         <p className="text-white/40 text-[16px] lg:text-[18px] mb-12 max-w-xl mx-auto leading-relaxed font-medium">
            찾으시는 페이지가 삭제되었거나 경로가 변경되었을 수 있습니다.<br />
            아래 버튼을 통해 메인 화면으로 돌아가실 수 있습니다.
         </p>

         <motion.button
           whileHover={{ scale: 1.05, backgroundColor: "#4D78E0" }}
           whileTap={{ scale: 0.95 }}
           onClick={() => setView('home')}
           className="px-12 py-5 bg-brand text-white font-bold text-[14px] rounded-full shadow-2xl shadow-brand/20 transition-all uppercase tracking-[0.3em]"
         >
           Return to Main
         </motion.button>
       </motion.div>
    </section>
  );
};
