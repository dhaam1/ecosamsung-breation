import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Heading2, BodyText, Button } from "@hero/ui";

interface CtaSectionProps {
  onOpenModal: () => void;
  variant?: 'default' | 'liquid-glass' | 'deep-ocean' | 'iridescent';
}

export const CtaSection = ({ onOpenModal, variant = 'default' }: CtaSectionProps) => {
  const isLiquid = variant !== 'default';

  const containerStyles = {
    default: "bg-brand shadow-brand/20",
    'liquid-glass': "bg-white/5 backdrop-blur-[40px] border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.2)]",
    'deep-ocean': "bg-gradient-to-br from-brand/20 to-blue-900/40 backdrop-blur-[50px] border border-blue-400/20 shadow-[0_20px_80px_rgba(77,120,224,0.3)]",
    'iridescent': "bg-white/10 backdrop-blur-[60px] border border-white/30 shadow-[0_20px_100px_rgba(255,255,255,0.1)]"
  };

  return (
    <section id="cta-section" className="relative z-10 bg-white py-[15vh] px-[5vw] overflow-hidden">
      <div className="mx-auto max-w-[1472px] relative">
        
        {/* Organic Background Blobs for Liquid variants */}
        {isLiquid && (
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className={`absolute top-0 left-0 w-[40%] h-[60%] rounded-full blur-[120px] ${variant === 'iridescent' ? 'bg-purple-500/20' : 'bg-brand/30'}`} 
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                x: [0, -50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className={`absolute bottom-0 right-0 w-[50%] h-[70%] rounded-full blur-[140px] ${variant === 'iridescent' ? 'bg-blue-400/20' : 'bg-blue-600/20'}`} 
            />
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          className={`relative overflow-hidden rounded-[24px] lg:rounded-[32px] px-6 py-16 text-center lg:py-32 transition-all duration-1000 ${containerStyles[variant]}`}
        >
          {/* Surface Gloss Highlight */}
          {isLiquid && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
               <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 rotate-12" />
               <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-[100px] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-12"
               />
            </div>
          )}

          <div className="absolute inset-0 z-0 overflow-hidden">
            {variant === 'default' ? (
              <>
                <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-30 grayscale mix-blend-overlay">
                  <source src="https://hzhedioacvqzxxlkttah.supabase.co/storage/v1/object/public/herolanding-herolanding/0414-EcoSamsung.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-brand/80 via-brand/60 to-brand/80" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
            )}
          </div>

          <div className="relative z-10">
            <Heading2 className={`mb-4 ${variant === 'default' ? 'text-white' : 'text-black'}`}>
              청소가 필요한 모든 순간,<br />
              전문가를 만나면<br />
              1년이 넘도록 깨끗합니다.
            </Heading2>
            <BodyText className={`mx-auto mt-4 lg:mt-6 max-w-xl ${variant === 'default' ? 'text-white/90' : 'text-black/60'}`}>
              지금 바로 에코삼성의 프리미엄 특수 청소 솔루션을 경험해보세요.<br className="hidden lg:block" />전문 상담사가 친절하게 안내해 드립니다.
            </BodyText>
            <div className="mt-12 flex justify-center">
              <Button 
                onClick={onOpenModal} 
                className={`group relative overflow-hidden px-8 py-4 lg:px-10 lg:py-5 shadow-xl transition-all ${
                  variant === 'default' 
                    ? 'bg-white text-brand' 
                    : variant === 'iridescent'
                    ? 'bg-gradient-to-r from-brand to-purple-600 text-white border border-white/20'
                    : 'bg-brand text-white border border-brand/20'
                }`}
              >
                <span>무료 견적 상담하기</span>
                <ArrowUpRight className="absolute right-6 h-5 w-5 translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
