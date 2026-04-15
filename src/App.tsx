/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, MoreHorizontal, ChevronRight, AlertCircle, Wind, Search, Instagram, Facebook, Youtube } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const BeforeAfterSlider = ({ before, after }: { before: string, after: string }) => {
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
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[4px] select-none bg-gray-100 shadow-2xl shadow-black/5 touch-none"
    >
      {/* After Image (Base) */}
      <div className="relative h-full w-full">
        <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="rounded-full bg-black/40 px-6 py-2 text-[14px] font-bold text-white/40 backdrop-blur-md uppercase tracking-[0.2em] border border-white/10">(dummy image)</div>
        </div>
      </div>
      
      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden border-r-2 border-brand"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="relative h-full" style={{ width: `${10000 / Math.max(0.1, sliderPos)}%` }}>
          <img src={before} alt="Before" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-full bg-black/40 px-6 py-2 text-[14px] font-bold text-white/40 backdrop-blur-md uppercase tracking-[0.2em] border border-white/10">(dummy image)</div>
          </div>
        </div>
        <div className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md uppercase tracking-widest">Before</div>
      </div>
      
      <div className="absolute top-4 right-4 rounded-full bg-brand/80 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md uppercase tracking-widest">After</div>

      {/* Slider Handle - Wide hit area (60px) */}
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
        onPointerUp={() => {
          isDraggingRef.current = false;
        }}
        onPointerCancel={() => {
          isDraggingRef.current = false;
        }}
      >
        {/* Visual Line */}
        <div className="h-full w-1 bg-brand shadow-[0_0_10px_rgba(77,120,224,0.5)]" />
        
        {/* Visual Circle */}
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


export default function App() {
  const navLinks = ["시공 사례", "서비스 소개", "이용 후기", "견적 문의", "FAQ"];
  const [videoKey, setVideoKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const stats = [
    { label: "누적 시공 건수", value: "12,480" },
    { label: "고객 만족도", value: "99.8%" },
    { label: "보유 전문 장비", value: "42" },
  ];

  const [activeOption, setActiveOption] = useState(1);

  const problems = [
    {
      id: "01",
      icon: <AlertCircle className="h-6 w-6 text-brand" />,
      text: "청소해도 며칠 지나면 다시 더러워져요",
      desc: "표면만 닦아내는 청소는 한계가 있습니다. 오염의 근본적인 원인을 해결하지 않으면 오염은 반드시 재발합니다.",
      image: "https://picsum.photos/seed/dust/400/500"
    },
    {
      id: "02",
      icon: <Wind className="h-6 w-6 text-brand" />,
      text: "업체 이용 후에도 냄새는 똑같이 나는 것 같아요",
      desc: "냄새는 공기 중이 아닌, 보이지 않는 틈새와 깊숙한 곳에 박힌 오염원에서 시작됩니다. 원인을 찾아 제거해야 합니다.",
      image: "https://picsum.photos/seed/smell/400/500"
    },
    {
      id: "03",
      icon: <Search className="h-6 w-6 text-brand" />,
      text: "눈에 보이는 곳만 청소해주지, 다른 곳은 여전히 먼지 투성이",
      desc: "대부분의 업체는 매뉴얼에 따른 표면 청소에 집중합니다. 에코삼성은 보이지 않는 사각지대까지 철저하게 파고듭니다.",
      image: "https://picsum.photos/seed/hidden/400/500"
    }
  ];

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 50; // Update every 50ms for smooth progress
    const step = (interval / 2500) * 100;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentProblemIndex((idx) => (idx + 1) % problems.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [problems.length]);

  const [expandedUsp, setExpandedUsp] = useState<number | null>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: section3Progress } = useScroll({
    container: containerRef,
    target: section3Ref,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    return section3Progress.onChange((v) => {
      if (v < 0.25) setExpandedUsp(null);
      else if (v < 0.5) setExpandedUsp(0);
      else if (v < 0.75) setExpandedUsp(1);
      else setExpandedUsp(2);
    });
  }, [section3Progress]);

  const usps = [
    {
      id: "01",
      title: "100% 직영 시공",
      subtitle: "Direct Management",
      label: "OUR MANAGEMENT",
      desc: "에코삼성은 하도급을 주지 않습니다. 모든 현장은 본사 소속의 숙련된 전문가들이 직접 책임지고 시공하여 균일하고 높은 품질을 보장합니다.",
      detail: "Responsibility",
      value: "100%",
      image: "https://picsum.photos/seed/direct/1200/800"
    },
    {
      id: "02",
      title: "여성 전문 드림팀",
      subtitle: "Expert Female Team",
      label: "OUR TEAM",
      desc: "섬세함이 필요한 공간에는 여성 전문가들의 손길이 닿습니다. 철두철미한 디테일과 꼼꼼함으로 보이지 않는 곳까지 프리미엄 케어를 제공합니다.",
      detail: "Meticulous",
      value: "Premium",
      image: "https://picsum.photos/seed/team/1200/800"
    },
    {
      id: "03",
      title: "근본 원인 제거",
      subtitle: "Root Cause Solution",
      label: "OUR TECHNOLOGY",
      desc: "단순한 오염 제거를 넘어, 오염과 악취의 근본 원인을 분석하고 해결합니다. 에코삼성만의 특수 세정 솔루션으로 깨끗함의 기준을 다시 정의합니다.",
      detail: "Solution",
      value: "Advanced",
      image: "https://picsum.photos/seed/solution/1200/800"
    }
  ];

  const [activeOptionSection4, setActiveOptionSection4] = useState(1);

  const portfolios = [
    {
      id: "01",
      title: "강남 프리미엄 아파트 입주 청소",
      location: "서울특별시 강남구",
      before: "https://picsum.photos/seed/dirty1/1200/800",
      after: "https://picsum.photos/seed/clean1/1200/800",
      desc: "오랜 공사 분진과 미세먼지를 완벽하게 제거하여 신축 아파트의 쾌적함을 되찾아드렸습니다."
    },
    {
      id: "02",
      title: "한남동 고급 빌라 대리석 세정",
      location: "서울특별시 용산구",
      before: "https://picsum.photos/seed/dirty2/1200/800",
      after: "https://picsum.photos/seed/clean2/1200/800",
      desc: "변색된 대리석 표면의 오염원을 특수 세정 솔루션으로 제거하여 본연의 광택을 복원했습니다."
    },
    {
      id: "03",
      title: "성수동 오피스 통유리 외벽 세정",
      location: "서울특별시 성동구",
      before: "https://picsum.photos/seed/dirty3/1200/800",
      after: "https://picsum.photos/seed/clean3/1200/800",
      desc: "외부 오염으로 불투명해진 통유리창을 전문 장비를 활용해 투명하게 복원하였습니다."
    }
  ];





  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoEnd = () => {
    setVideoKey(prev => prev + 1);
  };


  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black font-sans text-white selection:bg-brand/30 overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden snap-start snap-always">
        {/* Section Label */}
        <div className="absolute left-[5vw] top-[5vh] z-30">
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">Section 01</span>
        </div>
        
        {/* Background Video with Cross-fade Loop */}
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

        {/* Navigation Bar */}
        <nav className="relative z-20 flex h-[120px] items-center justify-between px-[5vw]">
          <div className="flex items-center gap-[8vw]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col leading-none"
            >
              <span className="text-[22px] font-black tracking-[0.2em] text-white">ECO</span>
              <span className="text-[14px] font-light tracking-[0.4em] text-white/80">SAMSUNG</span>
            </motion.div>
            
            <div className="hidden items-center gap-[2.5vw] lg:flex">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="text-[14px] font-semibold tracking-tight text-white/80 transition-colors hover:text-brand"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-[3vw]">
            <div className="hidden items-center gap-[2vw] lg:flex">
              <a href="#" className="text-[14px] font-semibold text-white/80 hover:text-brand">상담센터</a>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#4D78E0" }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-[6px] bg-brand px-[24px] py-[14px] text-[14px] font-bold shadow-lg shadow-brand/20 transition-all"
            >
              무료 견적 받기
            </motion.button>
          </div>
        </nav>

        {/* Main Grid Layout */}
        <main className="relative z-10 grid h-[calc(100vh-120px)] grid-cols-12 px-[5vw] pb-[5vh]">
          <div className="col-span-12 flex flex-col justify-end pb-[12vh] lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <h1 className="max-w-[850px] text-[52px] font-bold leading-[1.25] tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                겉만 청소하면 다시 더러워집니다.<br />
                원인마저 제거하려면 <span className="text-brand">에코삼성</span>입니다.
              </h1>
              <p className="mt-[28px] max-w-[600px] text-[20px] font-semibold text-white/90 drop-shadow-md">
                보이지 않는 오염의 근본 원인을 찾아 해결하는<br />
                프리미엄 특수 세정 솔루션. 에코삼성입니다.
              </p>
            </motion.div>
          </div>

          <div className="col-span-12 flex flex-col justify-end pb-[12vh] lg:col-start-9 lg:col-end-13">
            <div className="flex flex-col gap-[4vh]">
              {[
                "하도급없는 100% 직영 시공",
                "철두철미 여성 전문 드림팀",
                "원인을 제거하는 청소 시공"
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="group relative border-t-2 border-white/10 pt-[2vh] transition-colors hover:border-brand"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-brand opacity-70 tracking-wider">0{i + 1}</span>
                      <h2 className="text-[20px] font-bold leading-tight text-white/90 drop-shadow-lg group-hover:text-white transition-colors">
                        {feature}
                      </h2>
                    </div>
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-brand opacity-0 transition-all group-hover:opacity-100 group-hover:scale-125" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </section>

      {/* Problem Statement Section */}
      <section className="relative z-10 bg-black py-[20vh] px-[5vw] snap-start snap-always">
        {/* Section Label */}
        <div className="absolute left-[5vw] top-[5vh] z-30">
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">Section 02</span>
        </div>

        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-12 gap-12">
            {/* Left: Title & Desc (Ref Style) */}
            <div className="col-span-12 lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-[48px] font-bold leading-tight tracking-tight text-white lg:text-[56px]">
                  우리가 주목하는<br />문제는.
                </h2>
                <p className="mt-8 text-[18px] leading-relaxed text-white/40">
                  에코삼성은 단순한 청소를 넘어,<br />
                  공간의 본질적인 쾌적함을 방해하는<br />
                  근본적인 문제들에 집중합니다.
                </p>
                
                {/* Visual Timer Indicator */}
                <div className="mt-12 flex items-center gap-4">
                  <div className="h-[2px] w-32 bg-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.05, ease: "linear" }}
                    />
                  </div>
                  <span className="text-[12px] font-mono text-white/40 tracking-widest">
                    0{currentProblemIndex + 1} / 0{problems.length}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right: Sliding Cards (Ref Style) */}
            <div className="col-span-12 lg:col-span-8 overflow-hidden">
              <div className="relative h-[550px] w-full">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentProblemIndex}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute inset-0"
                  >
                    <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
                      {/* Current Card */}
                      <div className="group relative h-full overflow-hidden rounded-[4px] bg-[#111] p-8 transition-all hover:bg-[#161616]">
                        <div className="relative mb-12 flex h-[60%] items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                          <img 
                            src={problems[currentProblemIndex].image} 
                            alt={problems[currentProblemIndex].text}
                            className="h-full w-full object-cover opacity-40 mix-blend-luminosity grayscale transition-all group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="rounded-full bg-black/40 px-6 py-2 text-[14px] font-bold text-white/40 backdrop-blur-md uppercase tracking-[0.2em] border border-white/10">(dummy image)</div>
                          </div>
                          <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                            {problems[currentProblemIndex].icon}
                          </div>
                        </div>

                        <div className="mt-auto">
                          <h3 className="text-[22px] font-bold text-white/90 group-hover:text-brand transition-colors">
                            {problems[currentProblemIndex].text}
                          </h3>
                          <p className="mt-4 text-[16px] leading-relaxed text-white/30 group-hover:text-white/60 transition-colors">
                            {problems[currentProblemIndex].desc}
                          </p>
                        </div>
                      </div>

                      {/* Next Preview Card (Desktop only) */}
                      <div className="hidden lg:block relative h-full overflow-hidden rounded-[4px] bg-[#080808] p-8 opacity-30 grayscale">
                        <div className="relative mb-12 flex h-[60%] items-center justify-center">
                          <img 
                            src={problems[(currentProblemIndex + 1) % problems.length].image} 
                            alt="Next"
                            className="h-full w-full object-cover opacity-20"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="rounded-full bg-white/5 px-6 py-2 text-[14px] font-bold text-white/20 uppercase tracking-[0.2em] border border-white/5">(dummy image)</div>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <h3 className="text-[22px] font-bold text-white/20">
                            {problems[(currentProblemIndex + 1) % problems.length].text}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USP Section: Vertical Expanding Accordion (Scroll Linked) */}
      <section ref={section3Ref} className="relative z-10 h-[400vh] w-full bg-white text-black">
        {/* Snap Markers: 4 steps (Start, 01, 02, 03) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-screen snap-start snap-always" />
          <div className="h-screen snap-start snap-always" />
          <div className="h-screen snap-start snap-always" />
          <div className="h-screen snap-start snap-always" />
        </div>

        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background & Content (Shared for all 4 steps via sticky) */}
          <div className="absolute inset-0 z-0">
             <div className="flex h-full w-full">
              {usps.map((usp, i) => {
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
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    className={`relative h-full overflow-hidden border-r border-black/5 group ${isExpanded ? "flex-grow" : ""}`}
                  >
                    <div className="absolute inset-0 z-0">
                      <motion.img
                        src={usp.image}
                        alt={usp.title}
                        animate={{ 
                          scale: isExpanded ? 1.02 : 1.1,
                          opacity: isExpanded ? 1 : 0.4,
                          filter: isExpanded ? "grayscale(0%)" : "grayscale(100%) brightness(0.8)"
                        }}
                        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    <div className="absolute inset-0 flex items-start justify-start p-10 pointer-events-none z-10">
                      <div className="rounded-full bg-white/5 px-6 py-3 text-[14px] font-bold text-white/20 backdrop-blur-xl uppercase tracking-[0.4em] border border-white/10 select-none">(dummy image)</div>
                    </div>
                    <div className={`absolute inset-0 transition-opacity duration-1000 ${isExpanded ? "bg-black/20" : "bg-brand/90 group-hover:bg-brand/80"}`} />
                  </div>

                  {/* Anti-Squish Wrapper for all content */}
                  <div className="relative z-20 h-full w-full">
                    {/* Cover Label (Reference Style) - Bottom aligned */}
                    <AnimatePresence>
                      {(!isExpanded || expandedUsp === null) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="absolute bottom-[8vh] left-[4vw] right-[4vw]"
                        >
                          <div className="flex flex-col gap-2">
                             <span className="text-[12px] font-bold tracking-[0.4em] text-white/60 uppercase">
                              {usp.label}
                            </span>
                            <h3 className="text-[28px] font-bold tracking-tight text-white lg:text-[42px]">
                              {usp.title}
                            </h3>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                      {/* Expanded Content (Ref 2 Style) - Fixed width to prevent squishing */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex h-full w-full flex-col items-center justify-center px-[10vw] text-center"
                          >
                            <motion.div
                              initial={{ y: 40, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.5, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                              className="w-full max-w-[1400px]"
                            >
                              <span className="text-[14px] font-bold uppercase tracking-[0.5em] text-white/60">
                                {usp.subtitle}
                              </span>
                              <h2 className="mt-8 whitespace-nowrap text-[48px] font-bold leading-tight tracking-tighter text-white lg:text-[84px]">
                                {usp.title}
                              </h2>
                              
                              <div className="mt-12 flex justify-center">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="rounded-full border border-white/20 bg-white/10 px-12 py-5 text-[15px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
                                >
                                  Explore Experience
                                </motion.button>
                              </div>

                              <div className="mt-20 flex flex-col items-center gap-6">
                                <p className="max-w-2xl text-[20px] leading-relaxed text-white/70">
                                  {usp.desc}
                                </p>
                                <div className="mt-8 flex items-center gap-3 text-[12px] font-bold text-white/30 uppercase tracking-[0.3em]">
                                  <span>Scroll down for more</span>
                                  <div className="h-[1px] w-12 bg-white/20" />
                                  <ChevronRight className="h-4 w-4 rotate-90" />
                                </div>
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

          {/* Section Label */}
          <div className="absolute left-[5vw] top-[5vh] z-40">
            <span className="text-[10px] font-bold tracking-[0.2em] text-black/20 uppercase">Section 03</span>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative z-10 bg-white py-[20vh] px-[5vw] text-black snap-start snap-always">
        {/* Section Label */}
        <div className="absolute left-[5vw] top-[5vh] z-30">
          <span className="text-[10px] font-bold tracking-[0.2em] text-black/20 uppercase">Section 04</span>
        </div>

        <div className="mx-auto max-w-[1600px]">
          <div className="mb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-brand">Portfolio</span>
              <h2 className="mt-4 text-[48px] font-bold leading-tight tracking-tight text-black lg:text-[64px]">
                자신있기에 눈으로.<br />직접 보여드립니다.
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-md text-[18px] leading-relaxed text-black/40"
            >
              수많은 현장에서 검증된 에코삼성만의 특수 세정 솔루션.<br />
              비포 & 애프터 슬라이더를 통해 직접 확인해보세요.
            </motion.p>
          </div>

          <div className="space-y-32">
            {portfolios.map((item, i) => (
              <div key={i} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className="flex-1 w-full shadow-2xl shadow-black/5">
                  <BeforeAfterSlider before={item.before} after={item.after} />
                </div>
                <div className="flex-1 max-w-xl">
                  <span className="text-[64px] font-black text-black/5 leading-none">{item.id}</span>
                  <h3 className="text-[32px] font-bold mt-[-20px] mb-6 text-black">{item.title}</h3>
                  <p className="text-[18px] text-black/40 leading-relaxed mb-8">{item.desc}</p>
                  <button className="group flex items-center gap-2 text-[14px] font-bold text-brand uppercase tracking-widest">
                    View Details <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-white py-[15vh] px-[5vw] snap-start snap-always">
        {/* Section Label */}
        <div className="absolute left-[5vw] top-[5vh] z-30">
          <span className="text-[10px] font-bold tracking-[0.2em] text-black/20 uppercase">Section 05</span>
        </div>

        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[32px] bg-brand px-8 py-24 text-center lg:py-32 shadow-2xl shadow-brand/20"
          >
            {/* Background Video with Brand Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover opacity-30 grayscale mix-blend-overlay"
              >
                <source src="https://hzhedioacvqzxxlkttah.supabase.co/storage/v1/object/public/herolanding-herolanding/0414-EcoSamsung.webm" type="video/webm" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-brand/80 via-brand/60 to-brand/80" />
            </div>
            
            <div className="relative z-10">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="text-[32px] font-bold leading-tight tracking-tight text-white lg:text-[48px]"
              >
                당신의 공간도 다시 태어날 수 있습니다.
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/90 lg:text-[18px]"
              >
                지금 바로 에코삼성의 프리미엄 특수 세정 솔루션을 경험해보세요.<br className="hidden lg:block" />
                전문 상담사가 친절하게 안내해 드립니다.
              </motion.p>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-12"
              >
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-10 py-5 text-[16px] font-bold text-brand transition-all hover:pr-14 active:scale-95 shadow-xl"
                >
                  <span>무료 견적 상담하기</span>
                  <ArrowUpRight className="absolute right-6 h-5 w-5 translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Subtle Grain Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl overflow-hidden rounded-[32px] shadow-2xl flex flex-col lg:flex-row bg-white/10 backdrop-blur-3xl border border-white/20 text-white"
          >

            <button 
              onClick={onClose}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full transition-all z-50 bg-white/5 text-white hover:bg-white hover:text-black"
            >
              <ArrowUpRight className="h-5 w-5 rotate-45" />
            </button>

            {/* Left Side: Brand Visual */}
            <div className="hidden lg:flex w-[260px] flex-col justify-between p-10 border-r bg-white/5 border-white/10">
              <div>
                <motion.div variants={itemVariants} className="flex flex-col leading-none">
                  <span className="text-[20px] font-black tracking-[0.2em] text-white">ECO</span>
                  <span className="text-[12px] font-light tracking-[0.4em] text-white/40">SAMSUNG</span>
                </motion.div>
                <div className="mt-20">
                  <motion.div variants={itemVariants} className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white/60">
                    Premium Solution
                  </motion.div>
                  <motion.h3 variants={itemVariants} className="text-[28px] font-bold leading-tight">
                    Transparent<br />
                    Excellence.
                  </motion.h3>
                </div>
              </div>
              
              <motion.div variants={itemVariants} className="text-[11px] font-bold uppercase tracking-widest text-white/20">
                © 2024 ECOSAMSUNG<br />Specialized Cleaning
              </motion.div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 p-10 lg:p-14">
              <div className="mb-10">
                <motion.span variants={itemVariants} className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/60">Inquiry</motion.span>
                <motion.h2 variants={itemVariants} className="mt-4 text-[36px] font-bold tracking-tight">무료 견적 상담</motion.h2>
                <motion.p variants={itemVariants} className="mt-2 text-[15px] text-white/40">전문 상담사가 24시간 이내에 안내해 드립니다.</motion.p>
              </div>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('상담 신청이 완료되었습니다.'); onClose(); }}>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">이름</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="성함" 
                      className="w-full rounded-xl border px-5 py-4 text-[15px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">연락처</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="010-0000-0000" 
                      className="w-full rounded-xl border px-5 py-4 text-[15px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                    />
                  </motion.div>
                </div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">지역</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="예: 서울시 강남구" 
                    className="w-full rounded-xl border px-5 py-4 text-[15px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">서비스 유형</label>
                  <div className="relative">
                    <select 
                      required 
                      className="w-full appearance-none rounded-xl border px-5 py-4 text-[15px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                    >
                      <option value="" className="text-black">유형을 선택해주세요</option>
                      <option value="입주청소" className="text-black">입주 청소</option>
                      <option value="이사청소" className="text-black">이사 청소</option>
                      <option value="특수청소" className="text-black">특수 세정 (대리석/외벽 등)</option>
                      <option value="정기관리" className="text-black">정기 관리 서비스</option>
                    </select>
                    <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
                      <ChevronRight className="h-4 w-4 rotate-90 opacity-40" />
                    </div>
                  </div>
                </motion.div>

                <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="mt-6 w-full rounded-2xl py-6 text-[18px] font-bold text-white shadow-xl transition-all bg-brand shadow-brand/20 hover:bg-brand/90"
                >
                  상담 신청하기
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
    { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
    { icon: <Youtube className="h-5 w-5" />, label: "Youtube" },
  ];

  const footerLinks = [
    { title: "Service", links: ["입주 청소", "특수 세정", "상가 청소", "오피스 케어"] },
    { title: "Company", links: ["회사 소개", "인증 현황", "공지사항", "인재 채용"] },
    { title: "Support", links: ["고객 센터", "1:1 문의", "견적 요청", "FAQ"] },
  ];

  return (
    <footer className="relative z-10 snap-start snap-always">
      <div className="bg-black py-20 px-[5vw] text-white border-t border-white/5">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col lg:flex-row justify-between gap-16">
            <div className="flex flex-col gap-8 max-w-sm">
              <div className="flex flex-col leading-none">
                <span className="text-[24px] font-black tracking-[0.2em]">ECO</span>
                <span className="text-[14px] font-light tracking-[0.4em] text-white/40">SAMSUNG</span>
              </div>
              <p className="text-[16px] text-white/40 leading-relaxed">
                에코삼성은 단순한 청소를 넘어 공간의 본질을 회복합니다. 프리미엄 특수 세정 솔루션으로 당신의 공간에 새로운 가치를 더합니다.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((s, i) => (
                  <a key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand transition-colors border border-white/5">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
              {footerLinks.map((group, i) => (
                <div key={i} className="flex flex-col gap-6">
                  <h4 className="text-[14px] font-bold uppercase tracking-widest text-white/20">{group.title}</h4>
                  <ul className="flex flex-col gap-3">
                    {group.links.map((link, j) => (
                      <li key={j}>
                        <a href="#" className="text-[15px] text-white/50 hover:text-brand transition-colors">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-[13px] text-white/20">© 2024 ECO SAMSUNG. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="text-[13px] text-white/20 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[13px] text-white/20 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

