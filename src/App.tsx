/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, MoreHorizontal, ChevronRight, AlertCircle, Wind, Search, Instagram, Facebook, Youtube, CheckCircle2, Sparkles, Building2, LayoutPanelLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import publicBefore from "./pictures/ecosamsung-공공기관 청소-before.png";
import publicAfter from "./pictures/ecosamsung-공공기관 청소-after.png";
import kitchenBefore from "./pictures/ecosamsung-주방 청소-before.png";
import kitchenAfter from "./pictures/ecosamsung-주방 청소-after.png";
import hotelBefore from "./pictures/ecosamsung-호텔 외벽 청소-before.png";
import hotelAfter from "./pictures/ecosamsung-호텔 외벽 청소-after.png";

// AI Generated Assets (Internalized)
import problemSubcontracting from "./assets/images/problem-subcontracting.png";
import problemSurface from "./assets/images/problem-surface.png";
import problemMold from "./assets/images/problem-mold.png";
import uspDirect from "./assets/images/usp-direct.png";
import uspTeam from "./assets/images/usp-team.png";
import uspSolution from "./assets/images/usp-solution.png";
import serviceRegular from "./assets/images/service-regular.png";
import serviceSanitary from "./assets/images/service-sanitary.png";
import serviceMovein from "./assets/images/service-movein.png";
import serviceSpecial from "./assets/images/service-special.png";

// USP Videos
import directVideo from "./videos/ecosamsung-대구 청소 업체-직영 운영.webm";

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
      </div>
      
      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden border-r-2 border-brand"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="relative h-full" style={{ width: `${10000 / Math.max(0.1, sliderPos)}%` }}>
          <img src={before} alt="Before" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
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

// New Interactive 3D Card Component
const InteractiveProblemCard = ({ item, isPreview = false }: { item: any, isPreview?: boolean }) => {
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
        rotateX: isPreview ? 0 : rotateX,
        rotateY: isPreview ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative h-full w-full overflow-hidden rounded-[4px] bg-[#111] p-6 lg:p-8 transition-all hover:bg-[#161616] ${isPreview ? "opacity-30 grayscale" : ""}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative mb-8 lg:mb-12 flex h-[50%] lg:h-[60%] items-center justify-center overflow-hidden rounded-[2px]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10" />
        <motion.img
          src={item.image}
          alt={item.text}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ transform: "translateZ(20px)" }}
        />
        <div className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          {item.icon}
        </div>
        {/* Glass Glare Effect */}
        <motion.div
            className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
                background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08) 0%, transparent 80%)`,
            }}
        />
      </div>

      <div style={{ transform: "translateZ(30px)" }} className="mt-auto">
        <h3 className="text-[18px] lg:text-[22px] font-bold text-white/90 group-hover:text-brand transition-colors">
          {item.text}
        </h3>
        {!isPreview && (
          <p className="mt-3 lg:mt-4 text-[14px] lg:text-[16px] leading-relaxed text-white/60 group-hover:text-white/80 transition-colors line-clamp-3 lg:line-clamp-none">
            {item.desc}
          </p>
        )}
      </div>
    </motion.div>
  );
};


export default function App() {
  const navLinks = ["시공 사례", "서비스 소개", "이용 후기", "견적 문의", "FAQ"];
  const [videoKey, setVideoKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const problems = [
    {
      id: "01",
      icon: <AlertCircle className="h-6 w-6 text-brand" />,
      text: "광고한 거랑 청소 상태가 너무 달라요",
      desc: "의뢰를 받은 것은 다시 하청으로 내리는 고객과의 '신뢰'를 저버리는 하도급 중심 구조. 청소 품질 편차가 일정할 수 밖에 없습니다.",
      image: problemSubcontracting
    },
    {
      id: "02",
      icon: <Search className="h-6 w-6 text-brand" />,
      text: "청소해도 며칠 지나면 다시 더러워져요",
      desc: "표면만 닦아내는 청소는 한계가 있습니다. 오염의 근본적인 원인을 해결하지 않으면 오염은 반드시 재발합니다.",
      image: problemSurface
    },
    {
      id: "03",
      icon: <Wind className="h-6 w-6 text-brand" />,
      text: "업체 이용 후에도 냄새는 똑같이 나는 것 같아요",
      desc: "냄새는 보이지 않는 틈새와 깊숙한 곳에 박힌 오염원에서 시작됩니다. 그저 겉만 청소하는 것은 아무 소용 없습니다.",
      image: problemMold
    }
  ];

  useEffect(() => {
    const interval = 50;
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
      title: "100% 직영 시스템",
      subtitle: "Direct Management",
      label: "OUR PRINCIPLE",
      desc: "에코삼성은 하도급 없이 모든 공정을 본사가 직접 관리하는 100% 직영 시스템을 고집합니다. 이는 균일한 최상급 품질과 책임 있는 A/S를 보장하는 유일한 길입니다.",
      detail: "Reliable",
      value: "100%",
      image: uspDirect,
      video: directVideo
    },
    {
      id: "02",
      title: "여성 전문 드림팀",
      subtitle: "Expert Female Team",
      label: "OUR TEAM",
      desc: "섬세함이 필요한 공간에는 여성 전문가들의 손길이 닿습니다. 철두철미한 디테일과 꼼꼼함으로 보이지 않는 곳까지 프리미엄 케어를 제공합니다.",
      detail: "Meticulous",
      value: "Premium",
      image: uspTeam
    },
    {
      id: "03",
      title: "근본 원인 제거",
      subtitle: "Root Cause Solution",
      label: "OUR TECHNOLOGY",
      desc: "단순한 오염 제거를 넘어, 오염과 악취의 근본 원인을 분석하고 해결합니다. 에코삼성만의 특수 세정 솔루션으로 깨끗함의 기준을 다시 정의합니다.",
      detail: "Solution",
      value: "Advanced",
      image: uspSolution
    }
  ];

  const portfolios = [
    {
      id: "01",
      title: "대형 공공기관 정밀 위생 관리",
      location: "서울특별시",
      before: publicBefore,
      after: publicAfter,
      desc: "공공기관의 엄격한 위생 기준에 맞춰 보이지 않는 세균과 오염원까지 완벽하게 제거하여 쾌적한 업무 환경을 조성했습니다.",
      tags: ["정밀위생", "공공기관", "살균소독"]
    },
    {
      id: "02",
      title: "대형 호텔 외벽 정밀 세정",
      location: "인천광역시 중구",
      before: hotelBefore,
      after: hotelAfter,
      desc: "에코삼성의 직영 전문 청소 작업 전문가들이 대거 투입된 작업. 외부 오염으로인해 불투명해진 호텔 외벽과 통유리를 친환경 특수 약품으로 세정하여 프리미엄 호텔 본연의 가치를 되찾아드렸습니다.",
      tags: ["외벽청소", "호텔케어", "정밀세정"]
    },
    {
      id: "03",
      title: "업소 주방 기름때 특수 세정 청소",
      location: "서울특별시 강남구",
      before: kitchenBefore,
      after: kitchenAfter,
      desc: "오랜 기간 축적된 기름때와 찌든때를 에코삼성만의 특수 분해 솔루션으로 완벽하게 제거하여 화재 위험을 방지하고 위생적인 조리 환경을 복원했습니다.",
      tags: ["주방청소", "기름때제거", "위생복원"]
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoEnd = () => {
    setVideoKey(prev => prev + 1);
  };


  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black font-sans text-white selection:bg-brand/30 overflow-y-auto snap-y snap-proximity">
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
              <span className="text-[18px] lg:text-[22px] font-black tracking-[0.2em] text-white">ECO</span>
              <span className="text-[11px] lg:text-[14px] font-light tracking-[0.4em] text-white/80">SAMSUNG</span>
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
              className="flex items-center gap-2 rounded-[6px] bg-brand px-4 py-3 lg:px-[24px] lg:py-[14px] text-[12px] lg:text-[14px] font-bold shadow-lg shadow-brand/20 transition-all"
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
              <h1 className="max-w-[850px] text-[28px] md:text-[42px] lg:text-[52px] font-bold leading-[1.3] lg:leading-[1.25] tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                겉만 청소하면 다시 더러워집니다.<br />
                원인마저 제거하려면 <span className="text-brand">에코삼성</span>입니다.
              </h1>
              <p className="mt-[20px] lg:mt-[28px] max-w-[600px] text-[15px] md:text-[18px] lg:text-[20px] font-semibold text-white/90 drop-shadow-md leading-relaxed">
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
                "원인부터 완벽히 제거하는 청소 시공"
              ].map((feature, i) => (
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
                      <h2 className="text-[16px] lg:text-[20px] font-bold leading-tight text-white/90 drop-shadow-lg group-hover:text-white transition-colors">
                        {feature}
                      </h2>
                    </div>
                    <div className="mt-1 h-1 w-1 lg:h-1.5 lg:w-1.5 rounded-full bg-brand opacity-0 transition-all group-hover:opacity-100 group-hover:scale-125" />
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
            {/* Left: Title & Desc */}
            <div className="col-span-12 lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-[32px] md:text-[42px] lg:text-[56px] font-bold leading-tight tracking-tight text-white">
                  청소 업체에 맡겼는데<br />왜 모두가<br />실망하는 걸까요?
                </h2>
                <p className="mt-6 lg:mt-8 text-[15px] lg:text-[18px] leading-relaxed text-white/40">
                  청소 업체들의 구조적인 문제,<br />
                  결국 피해는 모두<br />
                  고객의 몫이 되고 있습니다.
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

            {/* Right: Interactive 3D Cards */}
            <div className="col-span-12 lg:col-span-8 overflow-hidden">
              <div className="relative h-[500px] md:h-[550px] w-full">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentProblemIndex}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute inset-0"
                  >
                    <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
                       {/* Current Interactive Card */}
                      <InteractiveProblemCard item={problems[currentProblemIndex]} />

                      {/* Next Preview Card (Desktop) */}
                      <div className="hidden lg:block h-full">
                        <InteractiveProblemCard 
                          item={problems[(currentProblemIndex + 1) % problems.length]} 
                          isPreview 
                        />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Portfolio Section */}
      <section className="relative z-10 bg-white py-[20vh] px-[5vw] text-black">
        {/* Section Label */}
        <div className="absolute left-[5vw] top-[5vh] z-30">
          <span className="text-[10px] font-bold tracking-[0.2em] text-black/20 uppercase">Section 03</span>
        </div>

        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.4em] text-brand">Portfolio</span>
              <h2 className="mt-4 text-[32px] md:text-[42px] lg:text-[56px] font-bold leading-tight tracking-tight text-black">
                에코삼성이 다녀가면<br />어디든 신축이 됩니다
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-md text-[15px] lg:text-[18px] leading-relaxed text-black/40"
            >
              수많은 현장에서 검증된 에코삼성만의 특수 세정 솔루션.<br />
              비포 & 애프터 슬라이더를 통해 직접 확인해보세요.
            </motion.p>
          </div>

          <div className="space-y-20 lg:space-y-32">
            {portfolios.map((item, i) => (
              <div key={i} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className="flex-1 w-full shadow-2xl shadow-black/5">
                  <BeforeAfterSlider before={item.before} after={item.after} />
                </div>
                <div className="flex-1 max-w-xl w-full">
                  <span className="text-[48px] lg:text-[64px] font-black text-black/5 leading-none">{item.id}</span>
                  <h3 className="text-[24px] lg:text-[32px] font-bold mt-[-10px] lg:mt-[-20px] mb-4 lg:mb-6 text-black">{item.title}</h3>
                  <p className="text-[16px] lg:text-[18px] text-black/40 leading-relaxed mb-6 lg:mb-8">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-[10px] lg:text-[11px] font-bold text-brand border border-brand/20 bg-brand/5 rounded-full uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section ref={section3Ref} className="relative z-10 h-[400vh] w-full bg-white text-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-screen snap-start snap-always" />
          <div className="h-screen snap-start snap-always" />
          <div className="h-screen snap-start snap-always" />
          <div className="h-screen snap-start snap-always" />
        </div>

        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
             <div className="flex flex-col lg:flex-row h-full w-full">
              {usps.map((usp, i) => {
                const isExpanded = expandedUsp === i;
                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{ 
                      width: typeof window !== 'undefined' && window.innerWidth >= 1024 
                        ? (isExpanded ? "100%" : (expandedUsp === null ? "33.33%" : "0%"))
                        : "100%",
                      height: typeof window !== 'undefined' && window.innerWidth < 1024
                        ? (isExpanded ? "100%" : (expandedUsp === null ? "33.33%" : "0%"))
                        : "100%",
                      zIndex: isExpanded ? 10 : 1,
                      opacity: expandedUsp !== null && !isExpanded ? 0 : 1
                    }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    onClick={() => {
                      if (!isExpanded && containerRef.current && section3Ref.current) {
                        const sectionTop = section3Ref.current.offsetTop;
                        const viewportHeight = window.innerHeight;
                        containerRef.current.scrollTo({
                          top: sectionTop + (i + 1) * viewportHeight,
                          behavior: "smooth"
                        });
                      }
                    }}
                    className={`relative overflow-hidden border-b lg:border-r border-black/5 group cursor-pointer ${isExpanded ? "flex-grow" : ""}`}
                  >
                    <div className="absolute inset-0 z-0">
                      {usp.video ? (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className={`h-full w-full object-cover transition-all duration-1500 ${isExpanded ? "scale-105 opacity-100" : "scale-110 opacity-40 grayscale"}`}
                        >
                          <source src={usp.video} type="video/webm" />
                        </video>
                      ) : (
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
                      )}
                    <div className={`absolute inset-0 transition-opacity duration-1000 ${isExpanded ? "bg-black/20" : "bg-brand/90 group-hover:bg-brand/80"}`} />
                  </div>

                  <div className="relative z-20 h-full w-full">
                    <motion.div
                      animate={{ 
                        opacity: (expandedUsp === null || isExpanded) ? 1 : 0,
                        y: isExpanded ? -20 : 0
                      }}
                      className="absolute bottom-[6vh] lg:bottom-[8vh] left-[6vw] lg:left-[5vw] z-30"
                    >
                      <div className="flex flex-col gap-1 lg:gap-2">
                         <span className="text-[10px] lg:text-[14px] font-bold tracking-[0.4em] text-white/50 uppercase">
                          {usp.label}
                        </span>
                        <h3 className={`font-bold tracking-tight text-white transition-all duration-1000 ${isExpanded ? "text-[32px] md:text-[48px] lg:text-[64px]" : "text-[24px] md:text-[32px] lg:text-[42px]"}`}>
                          {usp.title}
                        </h3>
                      </div>
                    </motion.div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative h-full w-full z-20"
                        >
                          <motion.div
                            initial={{ y: -40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            className="absolute top-[12vh] lg:top-[12vh] right-[6vw] lg:right-[5vw] text-right max-w-[85%] lg:max-w-3xl"
                          >
                            <h2 className="text-[32px] md:text-[56px] lg:text-[84px] font-bold leading-[1.1] tracking-tighter text-white uppercase">
                              {usp.subtitle}
                            </h2>
                            <div className="mt-8 flex justify-end">
                              <a 
                                href="https://blog.naver.com/az0804_/223960876649"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-white/20 bg-white/10 px-8 py-3 lg:px-12 lg:py-5 text-[12px] lg:text-[15px] font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
                              >
                                에코삼성 자세히 알아보기
                              </a>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            className="absolute bottom-[12vh] lg:bottom-[8vh] right-[6vw] lg:right-[5vw] text-right"
                          >
                            <p className="max-w-md text-[14px] lg:text-[20px] leading-relaxed text-white/70 font-medium ml-auto">
                              {usp.desc}
                            </p>
                            <div className="mt-8 lg:mt-12 flex items-center justify-end gap-3 text-[10px] lg:text-[12px] font-bold text-white/30 uppercase tracking-[0.3em]">
                              <span>Scroll down for more</span>
                              <div className="h-[1px] w-8 lg:w-12 bg-white/20" />
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
          <div className="absolute left-[5vw] top-[5vh] z-40">
            <span className="text-[10px] font-bold tracking-[0.2em] text-black/20 uppercase">Section 04</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-white py-[15vh] px-[5vw]">
        <div className="absolute left-[5vw] top-[5vh] z-30">
          <span className="text-[10px] font-bold tracking-[0.2em] text-black/20 uppercase">Section 06</span>
        </div>
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[24px] lg:rounded-[32px] bg-brand px-6 py-16 text-center lg:py-32 shadow-2xl shadow-brand/20"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-30 grayscale mix-blend-overlay">
                <source src="https://hzhedioacvqzxxlkttah.supabase.co/storage/v1/object/public/herolanding-herolanding/0414-EcoSamsung.webm" type="video/webm" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-brand/80 via-brand/60 to-brand/80" />
            </div>
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[42px] lg:text-[56px] font-bold leading-tight tracking-tight text-white">
                청소가 필요한 모든 공간,<br />전문가를 만나면 1년 넘도록 깨끗합니다.
              </h2>
              <p className="mx-auto mt-4 lg:mt-6 max-w-xl text-[14px] leading-relaxed text-white/90 lg:text-[18px]">
                지금 바로 에코삼성의 프리미엄 특수 세정 솔루션을 경험해보세요.<br className="hidden lg:block" />
                전문 상담사가 친절하게 안내해 드립니다.
              </p>
              <div className="mt-12">
                <button onClick={() => setIsModalOpen(true)} className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 lg:px-10 lg:py-5 text-[14px] lg:text-[16px] font-bold text-brand shadow-xl">
                  <span>무료 견적 상담하기</span>
                  <ArrowUpRight className="absolute right-6 h-5 w-5 translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset submit state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.19, 1, 0.22, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.4 }
    }
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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex w-full max-w-5xl overflow-hidden rounded-[32px] bg-[#0A0A0A] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
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
            <div className="flex-1 p-10 lg:p-14 relative min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <div className="mb-10">
                      <motion.span variants={itemVariants} className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/60">Inquiry</motion.span>
                      <motion.h2 variants={itemVariants} className="mt-4 text-[36px] font-bold tracking-tight">무료 견적 상담</motion.h2>
                      <motion.p variants={itemVariants} className="mt-2 text-[15px] text-white/40">전문 상담사가 24시간 이내에 안내해 드립니다.</motion.p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
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
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex h-full w-full flex-col items-center justify-center text-center overflow-hidden"
                  >
                    {/* Interior Background Effects for Success State */}
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
                        className="text-[28px] lg:text-[36px] font-bold tracking-tight text-white mb-4"
                      >
                        당신의 공간이 곧<br />
                        <span className="text-brand">새로운 가치</span>를 찾게 됩니다
                      </motion.h2>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-[14px] lg:text-[16px] text-white/40 leading-relaxed max-w-[280px] lg:max-w-md mb-12"
                      >
                        에코삼성의 정밀 진단 시스템으로 확인 후<br />
                        전문 상담사가 24시간 이내에 직접 안내해 드리겠습니다.
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
            <div className="flex flex-col gap-6 lg:gap-8 max-w-sm">
              <div className="flex flex-col leading-none">
                <span className="text-[20px] lg:text-[24px] font-black tracking-[0.2em]">ECO</span>
                <span className="text-[12px] lg:text-[14px] font-light tracking-[0.4em] text-white/40">SAMSUNG</span>
              </div>
              <p className="text-[14px] lg:text-[16px] text-white/40 leading-relaxed font-medium">
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
