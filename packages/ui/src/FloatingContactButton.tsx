import { motion } from "motion/react";
import { PhoneCall } from "lucide-react";

interface FloatingContactButtonProps {
  onOpenModal: () => void;
}

export const FloatingContactButton = ({ onOpenModal }: FloatingContactButtonProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 1, ease: [0.19, 1, 0.22, 1] as any }}
      className="fixed bottom-6 right-6 z-[90] lg:bottom-10 lg:right-10 flex flex-col items-end gap-3"
    >
      {/* Label for PC */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="hidden lg:block bg-black/80 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10 shadow-2xl"
      >
        <span className="text-[13px] font-bold text-white tracking-widest flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
          실시간 무료 견적 상담
        </span>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpenModal}
        className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-brand to-[#3b5eb3] text-white shadow-[0_20px_50px_rgba(77,120,224,0.4)] transition-all lg:h-20 lg:w-20"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-brand/20 blur-xl group-hover:bg-brand/40 transition-all" />
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <PhoneCall className="h-7 w-7 lg:h-9 lg:w-9" />
            </motion.div>
            <span className="mt-1 hidden text-[11px] font-black text-white/90 uppercase tracking-tighter lg:block">CALL</span>
        </div>
        
        {/* Shine Refraction Surface */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
      </motion.button>
    </motion.div>
  );
};
