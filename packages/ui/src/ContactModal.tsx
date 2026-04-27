import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { CheckCircle2, ChevronRight, ArrowUpRight } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  setView: (v: 'privacy' | 'terms') => void;
}

export const ContactModal = ({ isOpen, onClose, setView }: ContactModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setAgreed(false);
    }
  }, [isOpen]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      // 앱스크립트 규격에 맞게 데이터 구성
      const params = new URLSearchParams();
      params.append('name', formData.get('name') as string);
      params.append('email', formData.get('email') as string);
      params.append('phone', formData.get('phone') as string);
      params.append('location', formData.get('location') as string);
      params.append('serviceType', formData.get('serviceType') as string);
      params.append('size', formData.get('size') as string);
      params.append('requestDate', formData.get('requestDate') as string);
      params.append('notes', formData.get('notes') as string);

      // 백그라운드에서 전송 시작 (await 제거)
      fetch('https://script.google.com/macros/s/AKfycbwC4nED-c-9y8lmWkz0PfTDGO-RoRFNRsMv20Xbwwqz2PdJm1jhGRTT-rEfFABfCh4/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: params,
      });

      // 0.8초 동안 "전송 중..." 상태를 유지하여 신뢰감 부여 후 완료 처리
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 lg:p-8 overflow-y-auto py-10 sm:py-20 lg:py-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex w-full max-w-5xl min-h-[580px] lg:min-h-0 overflow-hidden rounded-[24px] lg:rounded-[32px] bg-[#0A0A0A] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] my-auto"
          >
            {/* Left Side: Visual/Info */}
            <div className="relative hidden w-[40%] flex-col justify-between bg-brand p-12 lg:flex">
              <div className="absolute inset-0 z-0 overflow-hidden">
                <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-20 grayscale">
                  <source src="https://hzhedioacvqzxxlkttah.supabase.co/storage/v1/object/public/herolanding-herolanding/0414-EcoSamsung.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-brand/60" />
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col leading-none">
                  <span className="text-[18px] font-black tracking-[0.2em]">ECO</span>
                  <span className="text-[11px] font-light tracking-[0.4em] opacity-60">SAMSUNG</span>
                </div>
                
                <div className="mt-20">
                  <motion.h3 variants={itemVariants} className="text-[32px] font-bold leading-tight">
                    Pure Space,<br />
                    Transparent<br />
                    Excellence.
                  </motion.h3>
                </div>
              </div>
              
              <motion.div variants={itemVariants} className="text-[11px] font-bold uppercase tracking-widest text-white/20">
                © 2024 ECOSAMSUNG<br />Specialized Cleaning
              </motion.div>
            </div>

            {/* Right Side Contents */}
            <div className="flex-1 p-6 sm:p-10 lg:p-14 relative min-h-[580px] lg:min-h-[550px] flex flex-col justify-center bg-[#0A0A0A]">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] as any }}
                  >
                    <div className="mb-8">
                      <motion.span variants={itemVariants} className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/60">Inquiry</motion.span>
                      <motion.h2 variants={itemVariants} className="mt-4 text-[36px] font-bold tracking-tight">무료 견적 상담</motion.h2>
                      <motion.p variants={itemVariants} className="mt-2 text-[15px] text-white/40">전문 상담사가 24시간 이내에 안내해 드립니다.</motion.p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">이름</label>
                          <input 
                            name="name"
                            type="text" 
                            required 
                            placeholder="성함" 
                            className="w-full rounded-xl border px-5 py-3 text-[14px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                          />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">이메일 주소</label>
                          <input 
                            name="email"
                            type="email" 
                            required 
                            placeholder="example@email.com" 
                            className="w-full rounded-xl border px-5 py-3 text-[14px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">연락처</label>
                          <input 
                            name="phone"
                            type="tel" 
                            required 
                            placeholder="010-0000-0000" 
                            className="w-full rounded-xl border px-5 py-3 text-[14px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                          />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">서비스 유형</label>
                          <div className="relative">
                            <select 
                              name="serviceType"
                              required 
                              className="w-full appearance-none rounded-xl border px-5 py-3 text-[14px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                            >
                              <option value="" className="text-black">유형 선택</option>
                              <option value="입주청소" className="text-black">입주 청소</option>
                              <option value="이사청소" className="text-black">이사 청소</option>
                              <option value="방역, 소독업" className="text-black">방역, 소독업</option>
                              <option value="특수청소" className="text-black">특수 청소 (대리석/외벽 등)</option>
                              <option value="정기관리" className="text-black">정기 관리 서비스</option>
                            </select>
                            <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
                              <ChevronRight className="h-4 w-4 rotate-90 opacity-40" />
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">지역</label>
                          <input 
                            name="location"
                            type="text" 
                            required 
                            placeholder="예: 서울시 강남구" 
                            className="w-full rounded-xl border px-5 py-3 text-[14px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                          />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">평수</label>
                          <input 
                            name="size"
                            type="text" 
                            required 
                            placeholder="예: 34평" 
                            className="w-full rounded-xl border px-5 py-3 text-[14px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                          />
                        </motion.div>
                      </div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">작업 희망일</label>
                        <input 
                          name="requestDate"
                          type="date" 
                          required 
                          className="w-full rounded-xl border px-5 py-3 text-[14px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10 [color-scheme:dark]"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">특이사항 (선택)</label>
                        <textarea 
                          name="notes"
                          placeholder="상담 시 참고할 내용을 적어주세요." 
                          rows={2}
                          className="w-full rounded-xl border px-5 py-3 text-[14px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10 resize-none"
                        />
                      </motion.div>

                      {/* Agreement Checkbox */}
                      <motion.div 
                        variants={itemVariants} 
                        className="flex items-center gap-3 py-2 cursor-pointer group"
                        onClick={() => setAgreed(!agreed)}
                      >
                        <div className={`h-5 w-5 rounded border flex items-center justify-center transition-all ${agreed ? 'bg-brand border-brand shadow-[0_0_10px_rgba(77,120,224,0.3)]' : 'border-white/20 group-hover:border-white/40'}`}>
                          {agreed && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                        </div>
                        <p className="text-[13px] text-white/40 group-hover:text-white/60 transition-colors leading-none">
                          개인정보 수집 및 이용에 동의합니다 (필수)
                        </p>
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); setView('privacy'); onClose(); }}
                          className="ml-auto text-[10px] font-bold text-white/20 hover:text-brand transition-all uppercase tracking-[0.2em] border-b border-white/5 hover:border-brand pb-0.5"
                        >
                          View Policy
                        </button>
                      </motion.div>

                      <motion.button 
                        variants={itemVariants}
                        whileHover={(agreed && !isSubmitting) ? { scale: 1.02 } : {}}
                        whileTap={(agreed && !isSubmitting) ? { scale: 0.98 } : {}}
                        type="submit" 
                        disabled={!agreed || isSubmitting}
                        className={`mt-4 w-full rounded-2xl py-5 text-[17.5px] font-bold text-white shadow-xl transition-all ${agreed && !isSubmitting ? 'bg-brand shadow-brand/20 hover:bg-brand/90 opacity-100' : 'bg-white/5 border border-white/5 opacity-40 cursor-not-allowed'}`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>전송 중...</span>
                          </div>
                        ) : "상담 신청하기"}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10 flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-10 lg:p-0 bg-[#0A0A0A] w-full min-h-[500px]"
                  >
                    <div className="absolute inset-0 z-0 opacity-10">
                      <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                        <source src="https://hzhedioacvqzxxlkttah.supabase.co/storage/v1/object/public/herolanding-herolanding/0414-EcoSamsung.webm" type="video/webm" />
                      </video>
                      <div className="absolute inset-0 bg-black/40" />
                    </div>
                    
                    <div className="absolute inset-0 z-0">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-brand/10 blur-[100px]" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="mb-12 flex flex-col items-center gap-2"
                      >
                        <div className="flex flex-col leading-none text-white/40">
                          <span className="text-[14px] font-black tracking-[0.2em]">ECO</span>
                          <span className="text-[9px] font-light tracking-[0.4em]">SAMSUNG</span>
                        </div>
                        <div className="mt-4 h-[1px] w-8 bg-white/20" />
                        <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.5em] text-brand">Registration Successful</span>
                      </motion.div>

                      <div className="relative mb-10">
                        <motion.div
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                          className="flex h-20 w-20 items-center justify-center rounded-full bg-brand shadow-[0_0_40px_rgba(77,120,224,0.3)]"
                        >
                          <CheckCircle2 className="h-10 w-10 text-white" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: [0, 1, 0], scale: 1.5 }}
                          transition={{ delay: 0.5, duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 rounded-full border-2 border-brand/50"
                        />
                      </div>
                      
                      <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-[24px] sm:text-[28px] lg:text-[36px] font-bold tracking-tight text-white mb-4"
                      >
                        문의 남겨주셔서 감사합니다.
                      </motion.h2>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-[14px] lg:text-[16px] text-white/40 leading-relaxed max-w-[280px] lg:max-w-md mb-12"
                      >
                        전문 상담사가 24시간 이내에<br />
                        문의 도와드리겠습니다.
                      </motion.p>
                      
                      <motion.button 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        onClick={onClose}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-10 py-4 text-[13px] font-bold uppercase tracking-widest text-white transition-all overflow-hidden"
                      >
                        <span>Confirm Order</span>
                        <div className="h-1 w-1 rounded-full bg-brand transition-all group-hover:scale-[10]" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Close Button Mobile */}
            <button 
              onClick={onClose}
              className="absolute right-6 top-6 h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 lg:hidden"
            >
              <ArrowUpRight className="h-5 w-5 rotate-45" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
