import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneModal = ({ isOpen, onClose }: PhoneModalProps) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.19, 1, 0.22, 1] as any
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.98, 
      y: 10,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("010-6273-7511");
    alert("전화번호가 복사되었습니다.");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex w-full max-w-lg overflow-hidden rounded-[24px] lg:rounded-[32px] bg-[#0A0A0A] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] p-8 sm:p-10 lg:p-14 text-center"
          >
            <div className="w-full flex flex-col items-center">
              <motion.div variants={itemVariants} className="mb-6 flex flex-col items-center gap-2">
                <div className="flex flex-col leading-none text-white/40">
                  <span className="text-[14px] font-black tracking-[0.2em]">ECO</span>
                  <span className="text-[9px] font-light tracking-[0.4em]">SAMSUNG</span>
                </div>
                <div className="mt-4 h-[1px] w-8 bg-white/20" />
              </motion.div>

              <motion.h2 variants={itemVariants} className="text-[24px] lg:text-[32px] font-bold tracking-tight text-white mb-2">문의 센터</motion.h2>
              <motion.p variants={itemVariants} className="text-[14px] lg:text-[16px] text-white/40 mb-10">에코삼성 전문 상담사가 친절하게 안내해 드립니다.</motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10 w-full"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand block mb-2">CS HOTLINE</span>
                <span className="text-[28px] lg:text-[36px] font-black text-white tracking-wider">010-6273-7511</span>
              </motion.div>

              <div className="flex flex-col w-full gap-4">
                <motion.a 
                  variants={itemVariants}
                  href="tel:010-6273-7511"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl bg-brand py-5 text-[16px] font-bold text-white shadow-xl shadow-brand/20 transition-all hover:bg-brand/90"
                >
                  지금 바로 전화하기
                </motion.a>
                <motion.button 
                  variants={itemVariants}
                  onClick={handleCopy}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-5 text-[16px] font-bold text-white transition-all"
                >
                  번호 복사하기
                </motion.button>
              </div>

              <button 
                onClick={onClose}
                className="absolute right-8 top-8 h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ArrowUpRight className="h-5 w-5 rotate-45" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
