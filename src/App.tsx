/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionValueEvent } from "motion/react";
import { ArrowUpRight, MoreHorizontal, ChevronRight, AlertCircle, Wind, Search, MapPin, CheckCircle2, Sparkles, Building2, LayoutPanelLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import publicBefore from "./pictures/ecosamsung-공공기관 청소-before.png";
import publicAfter from "./pictures/ecosamsung-공공기관 청소-after.png";
import kitchenBefore from "./pictures/ecosamsung-주방 청소-before.png";
import kitchenAfter from "./pictures/ecosamsung-주방 청소-after.png";
import hotelBefore from "./pictures/ecosamsung-호텔 외벽 청소-before.png";
import hotelAfter from "./pictures/ecosamsung-호텔 외벽 청소-after.png";

// USP Videos
import directVideo from "./videos/ecosamsung-대구 청소 업체-직영 운영.webm";
import teamVideo from "./videos/ecosamsung-대구 입주 청소-전문여성드림팀.webm";
import solutionVideo from "./videos/ecosamsung-대구 사무실 청소-원인 제거 청소.webm";

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
      className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-[4px] select-none bg-gray-100 shadow-2xl shadow-black/5 touch-none"
    >
      {/* After Image (Base) */}
      <div className="relative h-full w-full">
        <img src={after} alt={`에코삼성 프리미엄 청소 시공 후 - 깨끗해진${after.includes('public') ? ' 공공기관' : after.includes('kitchen') ? ' 주방' : ' 건물'} 환경`} className="absolute inset-0 h-full w-full object-cover" referrerPolicy="no-referrer" />
      </div>
      
      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden border-r-2 border-brand"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="relative h-full" style={{ width: `${10000 / Math.max(0.1, sliderPos)}%` }}>
          <img src={before} alt={`에코삼성 프리미엄 청소 시공 전 - 오염된${before.includes('public') ? ' 공공기관' : before.includes('kitchen') ? ' 주방' : ' 건물'} 환경`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
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

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins if needed (Core is enough for now)

// Unique GSAP-driven Visual Component for each Problem
const GsapVisual = ({ type }: { type: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      if (type === "01") {
        // Problem 01: Ad vs Reality (Greener to Greyer + X) - FASTER
        const tl = gsap.timeline({ repeat: -1 });
        tl.fromTo(".ad-box", 
          { x: -80, backgroundColor: "#10b981", scale: 1 }, 
          { x: 0, duration: 0.4, ease: "power2.out" }
        )
        .to(".ad-box", { 
          x: 80, 
          backgroundColor: "#444", 
          duration: 0.6, 
          ease: "expo.inOut",
          delay: 0.3 
        })
        .fromTo(".fail-x", 
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }
        )
        .to(".ad-box, .fail-x", { opacity: 0, duration: 0.3, delay: 0.8, y: 30 });
      } else if (type === "02") {
        // Problem 02: Relapsing Red Mold
        const tl = gsap.timeline({ repeat: -1 });
        tl.fromTo(".mold-dot", 
          { y: 50, opacity: 0, scale: 0 },
          { 
            y: "random(-40, 0)", 
            opacity: "random(0.4, 0.8)", 
            scale: "random(1, 2)", 
            duration: 1.5, 
            stagger: { each: 0.1, from: "random" },
            ease: "power2.out"
          }
        )
        .to(".mold-dot", { 
          opacity: 0, 
          scale: 0.5, 
          y: "-=20", 
          duration: 1, 
          delay: 0.5,
          stagger: 0.05 
        });
      } else {
        // Problem 03: Smelly Office (Red Vapor rising) - VERY STRONG RED
        gsap.fromTo(".smell-wave", 
          { y: 50, opacity: 0, scale: 0.5 },
          {
            y: -200,
            opacity: 0.8,
            scale: 2,
            duration: "random(1, 2.5)",
            repeat: -1,
            ease: "power1.out",
            stagger: {
              each: 0.2,
              from: "random"
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [type]);

  return (
    <div ref={containerRef} className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {type === "01" && (
        <div className="relative flex items-center justify-center w-full h-full">
           <div className="ad-box relative h-20 w-20 rounded-md shadow-2xl flex items-center justify-center">
              <div className="fail-x absolute inset-0 flex items-center justify-center">
                 <div className="absolute h-1 w-14 bg-red-500 rotate-45" />
                 <div className="absolute h-1 w-14 bg-red-500 -rotate-45" />
              </div>
           </div>
           {/* Visual Path */}
           <div className="absolute w-40 h-[1px] bg-white/5 -z-10" />
        </div>
      )}
      {type === "02" && (
        <div className="relative flex flex-col items-center justify-center w-full h-full">
           <div className="relative h-3 w-48 bg-white/10 rounded-full mb-4 overflow-hidden">
              <div className="absolute inset-0 bg-brand/20" />
           </div>
           <div className="relative flex flex-wrap justify-center gap-4 w-40 h-20">
             {[...Array(12)].map((_, i) => (
               <div key={i} className="mold-dot h-3 w-3 rounded-full bg-red-500" />
             ))}
           </div>
        </div>
      )}
      {type === "03" && (
        <div className="relative w-full h-full flex flex-col items-center justify-end pb-10">
           {/* Office Silhouette */}
           <div className="relative w-48 h-32 border-b-2 border-white/10 flex items-end justify-center gap-4">
              <div className="w-16 h-12 bg-white/5 border border-white/10 rounded-t-sm" />
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-t-sm" />
              <div className="w-14 h-16 bg-white/5 border border-white/10 rounded-t-sm" />
           </div>
           {/* Smell Waves - RED */}
           <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
             {[...Array(10)].map((_, i) => (
               <div key={i} className="smell-wave w-12 h-32 bg-red-500/50 blur-3xl rounded-full" />
             ))}
           </div>
        </div>
      )}
    </div>
  );
};

// New Reconstructed Interactive 3D Card Component (Universal GSAP version)
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
        rotateX: isPreview ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : rotateX),
        rotateY: isPreview ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : rotateY),
        transformStyle: "preserve-3d",
      }}
      className={`group relative h-full w-full overflow-hidden rounded-[16px] bg-[#0d0d0d] border border-white/5 p-4 sm:p-6 lg:p-10 transition-all hover:bg-[#111] ${isPreview ? "opacity-30 grayscale blur-[2px]" : ""} touch-none md:touch-auto`}
    >
      <div 
        style={{ transform: "translateZ(60px)" }}
        className="relative mb-4 sm:mb-6 lg:mb-8 h-[140px] sm:h-[220px] lg:h-[260px] w-full flex items-center justify-center rounded-[8px] bg-black/40 border border-white/5 overflow-hidden"
      >
        <GsapVisual type={item.id} />
      </div>

      <div style={{ transform: "translateZ(40px)" }} className="mt-auto relative z-10">
        <div className="flex items-center gap-4 mb-4">
           <span className="text-[11px] font-bold text-brand tracking-[0.4em] uppercase">Issue 0{item.id}</span>
           <div className="h-[1px] w-10 bg-brand/20" />
        </div>
        <h3 className="text-[20px] lg:text-[24px] font-bold text-white group-hover:text-brand transition-colors leading-tight">
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
              background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(77,120,224,0.1) 0%, transparent 70%)`,
          }}
      />
    </motion.div>
  );
};


export default function App() {
  const [view, setView] = useState<'home' | 'privacy' | 'terms' | '404'>('home');
  const navLinks = [
    { label: "문제의식", id: "problem-section" },
    { label: "시공 사례", id: "portfolio-section" },
    { label: "서비스 소개", id: "service-section" },
    { label: "견적 문의", id: "cta-section" }
  ];

  const [videoKey, setVideoKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const problems = [
    {
      id: "01",
      icon: <AlertCircle className="h-6 w-6" />,
      text: "광고한 거랑 청소 상태가 너무 달라요",
      desc: "의뢰를 받은 것은 다시 하청으로 내리는 고객과의 '신뢰'를 저버리는 하도급 중심 구조. 청소 품질 편차가 일정할 수 밖에 없습니다."
    },
    {
      id: "02",
      icon: <Search className="h-6 w-6" />,
      text: "청소해도 며칠 지나면 다시 더러워져요",
      desc: "표면만 닦아내는 청소는 한계가 있습니다. 오염의 근본적인 원인을 해결하지 않으면 오염은 반드시 재발합니다."
    },
    {
      id: "03",
      icon: <Wind className="h-6 w-6" />,
      text: "업체 이용 후에도 냄새는 똑같이 나는 것 같아요",
      desc: "냄새는 보이지 않는 틈새와 깊숙한 곳에 박힌 오염원에서 시작됩니다. 그저 겉만 청소하는 것은 아무 소용 없습니다."
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

  const scrollToSection = (id: string) => {
    if (view !== 'home') {
      setView('home');
      // Wait for re-render before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element && containerRef.current) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }
    const element = document.getElementById(id);
    if (element && containerRef.current) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const section3Ref = useRef<HTMLElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: section3Progress } = useScroll({
    container: containerRef,
    target: section3Ref,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(section3Progress, "change", (v) => {
    if (v < 0.25) setExpandedUsp(null);
    else if (v < 0.5) setExpandedUsp(0);
    else if (v < 0.75) setExpandedUsp(1);
    else setExpandedUsp(2);
  });

  const { scrollYProgress: globalScroll } = useScroll({
    container: containerRef
  });

  const navBg = useTransform(globalScroll, [0, 0.05], ["rgba(0,0,0,0)", "rgba(10,10,10,0.85)"]);
  const navBorder = useTransform(globalScroll, [0, 0.05], ["rgba(255,255,255,0)", "rgba(255,255,255,0.1)"]);
  const navHeight = useTransform(globalScroll, [0, 0.05], ["90px", "64px"]);
  const navBlur = useTransform(globalScroll, [0, 0.05], ["blur(0px)", "blur(16px)"]);


  const usps = [
    {
      id: "01",
      title: "100% 직영 시스템",
      subtitle: "에코삼성은\n모두 직접합니다.",
      label: "OUR PRINCIPLE",
      desc: "에코삼성은 하도급 없이 모든 공정을 본사가 직접 관리하는 100% 직영 시스템을 고집합니다. 이는 균일한 최상급 품질과 책임 있는 A/S를 보장하는 유일한 길입니다.",
      detail: "Reliable",
      value: "100%",
      video: directVideo,
      link: "https://blog.naver.com/az0804_/223960876649"
    },
    {
      id: "02",
      title: "섬세한 여전문가 드림팀",
      subtitle: "에코삼성은 먼지 한 톨\n남기지 않습니다.",
      label: "OUR TEAM",
      desc: "섬세함이 필요한 공간에는 여성 전문가들의 손길이 닿습니다. 철두철미한 디테일과 꼼꼼함으로 보이지 않는 곳까지 프리미엄 케어를 제공합니다.",
      detail: "Meticulous",
      value: "Premium",
      video: teamVideo,
      link: "https://blog.naver.com/PostView.naver?blogId=az0804_&logNo=223997039004&categoryNo=0&parentCategoryNo=0&viewDate=&currentPage=3&postListTopCurrentPage=1&from=postList"
    },
    {
      id: "03",
      title: "근본 원인 제거",
      subtitle: "친환경 특수 약품 청소로\n원인 제거. 불안 제거.",
      label: "OUR TECHNOLOGY",
      desc: "단순하게 오염 제거에서 그치지 않습니다. 에코삼성만의 친환경 특수 약품으로 청소 솔루션을 진행해 오염, 악취의 원인을 친환경적으로 완벽히 제거합니다.",
      detail: "Solution",
      value: "Advanced",
      video: solutionVideo,
      link: "https://blog.naver.com/az0804_/224000346113"
    }
  ];

  const portfolios = [
    {
      id: "01",
      title: "공공기관 정기청소 관리",
      location: "서울특별시",
      before: publicBefore,
      after: publicAfter,
      desc: "공공기관의 엄격한 위생 기준에 맞춰 보이지 않는 세균과 오염원까지 완벽하게 제거하여 쾌적한 업무 환경을 조성했습니다.",
      tags: ["정밀위생", "공공기관", "살균소독"]
    },
    {
      id: "02",
      title: "대형 호텔 외벽 정밀 청소",
      location: "인천광역시 중구",
      before: hotelBefore,
      after: hotelAfter,
      desc: "에코삼성의 직영 전문 청소 작업 전문가들이 대거 투입된 작업. 외부 오염으로 인해 불투명해진 호텔 외벽과 통유리를 친환경 특수 약품으로 청소하여 프리미엄 호텔 본연의 가치를 되찾아드렸습니다.",
      tags: ["외벽청소", "호텔케어", "정밀청소"]
    },
    {
      id: "03",
      title: "업소 찌든때, 기름때 특수 청소",
      location: "서울특별시 강남구",
      before: kitchenBefore,
      after: kitchenAfter,
      desc: "오랜 기간 축적된 기름때와 찌든때를 에코삼성만의 특수 분해 솔루션으로 완벽하게 제거하여 화재 위험을 방지하고 위생적인 환경을 복원했습니다.",
      tags: ["주방청소", "기름때제거", "위생복원"]
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const handlePhoneClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 1024;
    if (isMobile) {
      window.location.href = "tel:010-6273-7511";
    } else {
      setIsPhoneModalOpen(true);
    }
  };

  const handleVideoEnd = () => {
    setVideoKey(prev => prev + 1);
  };


  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
    
    // Update document title based on view
    const baseTitle = "에코삼성 | 프리미엄 특수 청소 솔루션";
    if (view === 'privacy') {
      document.title = `개인정보 처리방침 | ${baseTitle}`;
    } else if (view === 'terms') {
      document.title = `서비스 이용약관 | ${baseTitle}`;
    } else if (view === '404') {
      document.title = `페이지를 찾을 수 없습니다 | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [view]);

  return (
    <div ref={containerRef} className="relative h-[100svh] w-full bg-black font-sans text-white selection:bg-brand/30 overflow-y-auto overscroll-none snap-y snap-proximity scroll-smooth">
      {/* Navigation Bar */}
      <motion.nav 
        style={{ 
          backgroundColor: navBg,
          borderBottomColor: navBorder,
          height: navHeight,
          backdropFilter: navBlur
        }}
        className="sticky top-0 z-[100] flex w-full items-center justify-between px-[5vw] transition-colors border-b border-transparent"
      >
        <div className="flex items-center gap-[8vw]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col leading-none cursor-pointer"
            onClick={() => {
              if (view === 'home') {
                containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setView('home');
              }
            }}
          >
            <span className="text-[18px] lg:text-[22px] font-black tracking-[0.2em] text-white">ECO</span>
            <span className="text-[11px] lg:text-[14px] font-light tracking-[0.4em] text-white/80">SAMSUNG</span>
          </motion.div>
          
          <div className="hidden items-center gap-[2.5vw] lg:flex">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-[14px] font-semibold tracking-tight text-white/80 transition-colors hover:text-brand"
              >
                {link.label}
              </motion.button>
            ))}

          </div>
        </div>

        <div className="flex items-center gap-[3vw]">

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#4D78E0" }}
            onClick={handlePhoneClick}
            className="flex items-center gap-2 rounded-[6px] bg-brand px-4 py-3 lg:px-[24px] lg:py-[14px] text-[12px] lg:text-[14px] font-bold shadow-lg shadow-brand/20 transition-all"
          >
            무료 견적 받기
          </motion.button>
        </div>
      </motion.nav>


      {view === 'home' ? (
        <>
          {/* Main Content Sections */}
          <HeroSection videoKey={videoKey} handleVideoEnd={handleVideoEnd} videoRef={videoRef} />
          <ProblemSection progress={progress} currentProblemIndex={currentProblemIndex} problems={problems} />
          <PortfolioSection portfolios={portfolios} />
          <UspSection section3Ref={section3Ref} usps={usps} expandedUsp={expandedUsp} containerRef={containerRef} />
          <CtaSection onOpenModal={handlePhoneClick} />
        </>
      ) : view === 'privacy' ? (
        <PrivacyPolicyView setView={setView} />
      ) : view === 'terms' ? (
        <TermsOfServiceView setView={setView} />
      ) : (
        <NotFoundView setView={setView} />
      )}

      <Footer 
        navLinks={navLinks} 
        scrollToSection={scrollToSection} 
          onOpenModal={handlePhoneClick} 
          onPhoneClick={handlePhoneClick}
        setView={setView}
      />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setView={setView} />
      <PhoneModal isOpen={isPhoneModalOpen} onClose={() => setIsPhoneModalOpen(false)} />
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

// Sub-components to keep App cleaner
const HeroSection = ({ videoKey, handleVideoEnd, videoRef }: any) => (
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
          <video ref={videoRef} autoPlay muted playsInline onEnded={handleVideoEnd} className="h-full w-full object-cover">
            <source src="https://hzhedioacvqzxxlkttah.supabase.co/storage/v1/object/public/herolanding-herolanding/0414-EcoSamsung.webm" type="video/webm" />
          </video>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-[1]" />
    </div>
    <main className="relative z-10 grid h-full grid-cols-12 px-[5vw] pb-[8vh] lg:pb-[12vh]">
        <div className="col-span-12 flex flex-col justify-end lg:col-span-7 pt-[10svh] lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] as any }}>
          {/* Mobile Title */}
          <h1 className="block md:hidden max-w-[850px] text-[24px] sm:text-[28px] font-bold leading-[1.3] tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            겉만 청소하면 다시 더러워집니다.<br />
            원인마저 제거하려면<br />
            <span className="text-brand">에코삼성</span>입니다.
          </h1>
          {/* PC Title */}
          <h1 className="hidden md:block max-w-[850px] md:text-[42px] lg:text-[52px] font-bold leading-[1.3] lg:leading-[1.25] tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] break-keep">
            겉만 청소하면 다시 더러워집니다.<br />
            원인마저 제거하려면 <span className="text-brand">에코삼성</span>입니다.
          </h1>
          <p className="hidden md:block mt-[20px] lg:mt-[28px] max-w-[600px] text-[15px] md:text-[18px] lg:text-[20px] font-semibold text-white/90 drop-shadow-md leading-relaxed">
            프리미엄 특수 청소 솔루션. 에코삼성입니다.
          </p>
        </motion.div>
      </div>
      <div className="col-span-12 flex flex-col justify-end lg:col-start-10 lg:col-end-13 mt-8 lg:mt-0">
        <div className="flex flex-col gap-[2vh] lg:gap-[4vh]">
          {["하도급없는 100% 직영 시공", "철두철미 섬세한 여전문가 드림팀", "원인부터 완벽히 제거하는 청소 시공"].map((feature, i) => (
            <motion.div key={feature} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className="group relative border-t border-white/10 pt-[1.5vh] lg:border-t-2 lg:pt-[2vh] transition-colors hover:border-brand">
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

const ProblemSection = ({ progress, currentProblemIndex, problems }: any) => (
  <section id="problem-section" className="relative z-10 bg-black py-[20vh] px-[5vw] snap-start snap-always">

    <div className="mx-auto max-w-[1472px] w-full">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 w-full">
        <div className="w-full lg:col-span-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full">
            <h2 className="text-[32px] md:text-[42px] lg:text-[48px] xl:text-[56px] font-bold leading-tight tracking-tight text-white break-keep">
              청소 업체에 맡겼는데<br />왜 모두가<br />실망하는 걸까요?
            </h2>
            <p className="mt-6 lg:mt-8 text-[15px] lg:text-[18px] leading-relaxed text-white/40 break-keep">
              청소 업체들의 구조적인 문제,<br />결국 피해는 모두<br />고객의 몫이 되고 있습니다.
            </p>
            <div className="mt-12 flex items-center gap-4">
              <div className="h-[2px] w-32 bg-white/10 overflow-hidden">
                <motion.div className="h-full bg-brand" animate={{ width: `${progress}%` }} transition={{ duration: 0.05, ease: "linear" }} />
              </div>
              <span className="text-[12px] font-mono text-white/40 tracking-widest">0{currentProblemIndex + 1} / 0{problems.length}</span>
            </div>
          </motion.div>
        </div>
        <div className="w-full lg:col-span-8 overflow-hidden relative">
          <div className="relative h-[360px] sm:h-[500px] md:h-[550px] w-full overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div key={currentProblemIndex} initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-100%", opacity: 0 }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] as any }} className="absolute inset-0 w-full left-0 right-0">
                <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
                  <InteractiveProblemCard item={problems[currentProblemIndex]} />
                  <div className="hidden lg:block h-full">
                    <InteractiveProblemCard item={problems[(currentProblemIndex + 1) % problems.length]} isPreview />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PortfolioSection = ({ portfolios }: any) => (
  <section id="portfolio-section" className="relative z-10 bg-white py-[20vh] px-[5vw] text-black">

    <div className="mx-auto max-w-[1472px]">
      <div className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.4em] text-brand">Portfolio</span>
          <h2 className="mt-4 text-[32px] md:text-[42px] lg:text-[48px] xl:text-[56px] font-bold leading-tight tracking-tight text-black break-keep">에코삼성이 다녀가면<br />어디든 신축이 됩니다</h2>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-md text-[15px] lg:text-[18px] leading-relaxed text-black/40 break-keep">
          수많은 현장에서 검증된 에코삼성만의 특수 청소 솔루션.<br />비포 & 애프터 슬라이더를 통해 직접 확인해보세요.
        </motion.p>
      </div>
      <div className="space-y-20 lg:space-y-32">
        {portfolios.map((item: any, i: number) => (
          <div key={i} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
            <div className="flex-1 w-full shadow-2xl shadow-black/5"><BeforeAfterSlider before={item.before} after={item.after} /></div>
            <div className="flex-1 max-w-xl w-full">
              <span className="text-[48px] lg:text-[64px] font-black text-black/5 leading-none">{item.id}</span>
              <h3 className="text-[22px] sm:text-[24px] lg:text-[32px] font-bold mt-[-10px] lg:mt-[-20px] mb-4 lg:mb-6 text-black break-keep">{item.title}</h3>
              <p className="text-[15px] lg:text-[18px] text-black/40 leading-relaxed mb-6 lg:mb-8 break-keep">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags?.map((tag: any) => (
                  <span key={tag} className="px-3 py-1 text-[10px] lg:text-[11px] font-bold text-brand border border-brand/20 bg-brand/5 rounded-full uppercase tracking-wider">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const UspSection = ({ section3Ref, usps, expandedUsp, containerRef }: any) => (
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


const CtaSection = ({ onOpenModal }: any) => (
  <section id="cta-section" className="relative z-10 bg-white py-[15vh] px-[5vw]">

    <div className="mx-auto max-w-[1472px]">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[24px] lg:rounded-[32px] bg-brand px-6 py-16 text-center lg:py-32 shadow-2xl shadow-brand/20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-30 grayscale mix-blend-overlay">
            <source src="https://hzhedioacvqzxxlkttah.supabase.co/storage/v1/object/public/herolanding-herolanding/0414-EcoSamsung.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand/80 via-brand/60 to-brand/80" />
        </div>
        <div className="relative z-10">
          {/* Mobile Title */}
          <h2 className="block md:hidden text-[24px] sm:text-[32px] font-bold leading-tight tracking-tight text-white mb-4">
            청소가 필요한 모든 순간,<br />
            전문가를 만나면<br />
            1년이 넘도록 깨끗합니다.
          </h2>
          {/* PC Title */}
          <h2 className="hidden md:block md:text-[42px] lg:text-[56px] font-bold leading-tight tracking-tight text-white break-keep">
            청소가 필요한 모든 공간,<br />전문가를 만나면 1년 넘도록 깨끗합니다.
          </h2>
          <p className="mx-auto mt-4 lg:mt-6 max-w-xl text-[14px] leading-relaxed text-white/90 lg:text-[18px]">
            지금 바로 에코삼성의 프리미엄 특수 청소 솔루션을 경험해보세요.<br className="hidden lg:block" />전문 상담사가 친절하게 안내해 드립니다.
          </p>
          <div className="mt-12">
            <button onClick={onOpenModal} className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 lg:px-10 lg:py-5 text-[14px] lg:text-[16px] font-bold text-brand shadow-xl">
              <span>무료 견적 상담하기</span>
              <ArrowUpRight className="absolute right-6 h-5 w-5 translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SubPageLayout = ({ title, children, setView }: { title: string, children: React.ReactNode, setView: (v: 'home') => void }) => (
  <section className="relative min-h-screen w-full bg-[#050505] pt-[150px] pb-[15vh] px-[5vw]">
    <div className="mx-auto max-w-[1000px]">
      <motion.button 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setView('home')}
        className="flex items-center gap-3 text-[12px] font-bold text-white/40 hover:text-brand transition-all mb-16 group"
      >
        <div className="w-8 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-brand transition-all duration-500" />
        <span className="tracking-[0.3em] uppercase">Return to Main</span>
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
      >
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-brand/30" />
            <span className="text-[11px] font-bold text-brand tracking-[0.5em] uppercase">Legal Document</span>
          </div>
          <h1 className="text-[48px] lg:text-[80px] font-bold tracking-tight text-white mb-6 leading-[1.1]">{title}</h1>
          <p className="text-white/30 text-[14px] lg:text-[16px] font-medium tracking-wide">Last updated: April 18, 2024</p>
        </header>

        <div className="space-y-16 text-[15px] lg:text-[17px] leading-[2] text-white/60 font-medium">
          {children}
        </div>
        
        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-white/20">
          <p>© ECO SAMSUNG. ALL RIGHTS RESERVED.</p>
          <motion.button 
            whileHover={{ scale: 1.05, color: '#4D78E0' }}
            onClick={() => setView('home')}
            className="font-bold tracking-widest uppercase"
          >
            Back to top
          </motion.button>
        </footer>
      </motion.div>
    </div>
  </section>
);

const PrivacyPolicyView = ({ setView }: { setView: (v: 'home') => void }) => (
  <SubPageLayout title="Privacy Policy" setView={setView}>
    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">01.</span>
        개인정보의 수집 및 이용 목적
      </h2>
      <p>에코삼성(이하 "회사")은 이용자의 문의사항에 대한 정확한 답변 및 최적의 서비스 제공을 위해 최소한의 필수 개인정보를 수집하고 있습니다. 수집된 정보는 다음의 목적 이외의 용도로는 절대 사용되지 않습니다.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "본인 확인", text: "서비스 상담 및 견적 제공을 위한 의뢰인 식별" },
          { title: "서비스 이행", text: "원활한 청소 시공 및 계약 조건의 충실한 이행" },
          { title: "고객 관리", text: "사후 관리(A/S) 및 서비스 만족도 조사, 분쟁 해결" }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand" />
              {item.title}
            </h3>
            <p className="text-[14px] leading-relaxed opacity-70">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
    
    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">02.</span>
        수집하는 개인정보 항목
      </h2>
      <p className="mb-6">회사는 서비스 이용을 위해 다음과 같은 정보를 필수적 또는 선택적으로 수집합니다.</p>
      <div className="space-y-4">
        <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold mb-1">인적 사항 (필수)</h3>
            <p className="text-[14px] opacity-50">상담 및 본인 확인을 위한 최소 세부 정보</p>
          </div>
          <p className="text-[16px] text-brand/80 font-semibold italic">성함(또는 업체명), 연락처, 서비스 대상 지역</p>
        </div>
        <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold mb-1">부가 정보 (선택)</h3>
            <p className="text-[14px] opacity-50">수준 높은 맞춤형 솔루션 제공을 위한 정보</p>
          </div>
          <p className="text-[16px] text-white/80 font-semibold italic">이메일, 상세 요청 내역, 시공 희망 일시</p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">03.</span>
        개인정보의 보유 및 이용 기간
      </h2>
      <p>회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 일정 기간 보관합니다.</p>
      <div className="mt-8 border-l-2 border-brand/20 pl-8 space-y-6">
        <div>
          <h3 className="text-white/80 font-bold mb-2">상담 관련 기록</h3>
          <p className="text-[14px] opacity-60">보존 사유: 소비자 상담 및 사후 관리 / 보존 기간: 1년</p>
        </div>
        <div>
          <h3 className="text-white/80 font-bold mb-2">계약 또는 청약철회 등에 관한 기록</h3>
          <p className="text-[14px] opacity-60">보존 사유: 전자상거래법 / 보존 기간: 5년</p>
        </div>
        <div>
          <h3 className="text-white/80 font-bold mb-2">대금결제 및 재화 등의 공급에 관한 기록</h3>
          <p className="text-[14px] opacity-60">보존 사유: 전자상거래법 / 보존 기간: 5년</p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">04.</span>
        개인정보의 파기절차 및 방법
      </h2>
      <p>회사는 개인정보 파기 시 재생이 불가능한 방법으로 안전하게 파기합니다.</p>
      <ul className="mt-6 list-none space-y-4">
        <li className="flex gap-4 p-5 bg-white/[0.01] border border-white/5 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0">
            <span className="font-bold text-[14px]">P1</span>
          </div>
          <p className="text-[14.5px] leading-relaxed"><strong className="text-white">절차:</strong> 목적이 달성된 후 별도의 DB로 옮겨져 관련 법령에 따라 일정 기간 저장된 후 즉시 파기됩니다.</p>
        </li>
        <li className="flex gap-4 p-5 bg-white/[0.01] border border-white/5 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0">
            <span className="font-bold text-[14px]">P2</span>
          </div>
          <p className="text-[14.5px] leading-relaxed"><strong className="text-white">방법:</strong> 전자적 파일은 기록을 재생할 수 없는 기술적 방법을 사용하며, 종이 문서는 분쇄하거나 소각합니다.</p>
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">05.</span>
        정보주체의 권리와 그 행사방법
      </h2>
      <p>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 수집/이용 동의 철회를 요청할 수 있습니다. 개인정보 보호책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</p>
    </section>

    <div className="p-10 bg-brand/5 border border-brand/20 rounded-[32px] mt-20">
      <h3 className="text-brand font-bold mb-6 tracking-widest uppercase text-[12px]">Contact Point</h3>
      <p className="text-white text-[18px] lg:text-[22px] font-bold mb-2">개인정보 보호 전담 부서</p>
      <p className="text-white/60 mb-8">에코삼성 운영 지원팀 (010-6273-7511)</p>
      <div className="h-[1px] w-full bg-brand/10 mb-8" />
      <p className="text-[14px] opacity-40">이용자는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보보호책임자 혹은 담당부서로 신고하실 수 있습니다.</p>
    </div>
  </SubPageLayout>
);

const TermsOfServiceView = ({ setView }: { setView: (v: 'home') => void }) => (
  <SubPageLayout title="Terms of Service" setView={setView}>
    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">01.</span>
        목적
      </h2>
      <p>본 약관은 에코삼성(이하 "회사")이 제공하는 프리미엄 특수 청소 및 유지 관리 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.</p>
    </section>

    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">02.</span>
        약관의 효력 및 변경
      </h2>
      <p>본 약관은 서비스 신청 시 이용자가 동의함으로써 효력이 발생합니다. 회사는 합리적인 사유가 발생할 경우 관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있으며, 변경된 약관은 웹사이트 공지 혹은 개별 알림을 통해 공시합니다.</p>
    </section>

    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">03.</span>
        서비스 범위 및 전문가 배치
      </h2>
      <p>회사는 이용자에게 다음과 같은 전문 청소 솔루션을 제공합니다.</p>
      <div className="mt-8 space-y-4">
        {[
          { t: "특수 시공 시스템", d: "외벽, 대리석, 카페트 등 고난도 기술이 필요한 전문 특수 시공 서비스" },
          { t: "100% 직영 운영", d: "하도급 없는 투명한 시공을 위해 전 인원 본사 직영 전문가 투입" },
          { t: "맞춤형 위생 솔루션", d: "오염 원인 분석을 통한 근본적 청소 및 친환경 특수 약품 처리" }
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-6 p-6 bg-white/[0.02] rounded-[20px] border border-white/5 group hover:bg-white/[0.04] transition-all">
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
               <span className="text-brand font-black text-[18px]">0{i+1}</span>
            </div>
            <div>
              <p className="text-white text-[18px] font-bold mb-1">{item.t}</p>
              <p className="text-[14.5px] opacity-60 leading-relaxed font-medium">{item.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">04.</span>
        계약의 성립 및 결제 조건
      </h2>
      <p>1. 서비스 계약은 이용자의 상담 신청 후, 회사가 제공한 견적에 대하여 이용자가 확정 의사를 밝히거나 예약금을 입금함과 동시에 성립됩니다.</p>
      <p className="mt-4">2. 결제는 현금, 계좌이체, 신용카드 등 회사와 협의된 수단을 통해 가능하며, 별도의 계약이 없는 경우 시공 완료 직후 잔금을 정산하는 것을 원칙으로 합니다.</p>
    </section>

    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">05.</span>
        회사의 의무와 책임 한계
      </h2>
      <p>1. 회사는 계약된 일시에 최상의 장비와 전문 인력을 투입하여 성실히 서비스를 수행할 의무가 있습니다.</p>
      <p className="mt-4">2. 시공 중 발생하는 회사의 과실에 의한 파손에 대해서는 즉각적인 보수 또는 보험 처리를 원칙으로 합니다.</p>
      <p className="mt-4">3. 단, 제품의 노후화, 시공 전 미고지된 특이사항, 천재지변 등으로 인한 불가항력적 피해에 대해서는 책임이 제한될 수 있습니다.</p>
    </section>

    <div className="mt-24 p-8 border border-white/5 rounded-2xl bg-white/[0.01] flex items-center justify-between">
      <div className="flex items-center gap-4 text-white/40">
        <AlertCircle className="w-5 h-5 text-brand" />
        <p className="text-[13.5px] font-medium leading-relaxed">본 약관에 명시되지 않은 사항은 관계 법령 및 상관례에 따릅니다.</p>
      </div>
    </div>
  </SubPageLayout>
);

const NotFoundView = ({ setView }: { setView: (v: 'home') => void }) => {
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

const ContactModal = ({ isOpen, onClose, setView }: { isOpen: boolean, onClose: () => void, setView: (v: 'privacy' | 'terms') => void }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setAgreed(false);
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
        ease: [0.19, 1, 0.22, 1] as any as any,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 lg:p-8">
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
            className="relative flex w-full max-w-5xl overflow-hidden rounded-[24px] lg:rounded-[32px] bg-[#0A0A0A] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
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
            <div className="flex-1 p-6 sm:p-10 lg:p-14 relative min-h-[500px] sm:min-h-[550px] flex flex-col justify-center">
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
                            type="text" 
                            required 
                            placeholder="성함" 
                            className="w-full rounded-xl border px-5 py-3.5 text-[15px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                          />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">연락처</label>
                          <input 
                            type="tel" 
                            required 
                            placeholder="010-0000-0000" 
                            className="w-full rounded-xl border px-5 py-3.5 text-[15px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                          />
                        </motion.div>
                      </div>
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">지역</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="예: 서울시 강남구" 
                          className="w-full rounded-xl border px-5 py-3.5 text-[15px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                        />
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-white/80">서비스 유형</label>
                        <div className="relative">
                          <select 
                            required 
                            className="w-full appearance-none rounded-xl border px-5 py-3.5 text-[15px] outline-none transition-all focus:border-brand bg-white/5 border-white/10 text-white focus:bg-white/10"
                          >
                            <option value="" className="text-black">유형을 선택해주세요</option>
                            <option value="입주청소" className="text-black">입주 청소</option>
                            <option value="이사청소" className="text-black">이사 청소</option>
                            <option value="특수청소" className="text-black">특수 청소 (대리석/외벽 등)</option>
                            <option value="정기관리" className="text-black">정기 관리 서비스</option>
                          </select>
                          <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
                            <ChevronRight className="h-4 w-4 rotate-90 opacity-40" />
                          </div>
                        </div>
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
                        whileHover={agreed ? { scale: 1.02 } : {}}
                        whileTap={agreed ? { scale: 0.98 } : {}}
                        type="submit" 
                        className={`mt-4 w-full rounded-2xl py-5 text-[17.5px] font-bold text-white shadow-xl transition-all ${agreed ? 'bg-brand shadow-brand/20 hover:bg-brand/90 opacity-100' : 'bg-white/5 border border-white/5 opacity-40 cursor-not-allowed'}`}
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

const PhoneModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.19, 1, 0.22, 1] as any,
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

const Footer = ({ 
  navLinks, 
  scrollToSection, 
  onOpenModal,
  onPhoneClick,
  setView
}: { 
  navLinks: { label: string, id: string }[], 
  scrollToSection: (id: string) => void,
  onOpenModal: () => void,
  onPhoneClick: () => void,
  setView: (v: 'home' | 'privacy' | 'terms') => void
}) => {
  const socialLinks = [
    { 
      icon: <span className="text-[16px] font-black tracking-tighter">N</span>, 
      label: "네이버 블로그",
      href: "https://blog.naver.com/PostList.naver?blogId=az0804_"
    },
    { 
      icon: <MapPin className="h-5 w-5" />, 
      label: "네이버 지도",
      href: "https://map.naver.com/p/search/%EC%97%90%EC%BD%94%EC%82%BC%EC%84%B1%20%EC%B2%AD%EC%86%8C%EC%97%85%EC%B2%B4/place/2033123276"
    },
  ];

  const footerGroups: { title: string, links: { label: string, onClick?: () => void, href?: string }[] }[] = [
    { 
      title: "Menu", 
      links: navLinks.map(link => ({ label: link.label, onClick: () => scrollToSection(link.id) })) 
    },
    { 
      title: "Contact", 
      links: [
        { label: "무료 견적 받기", onClick: onPhoneClick }
      ] 
    },
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
                겉만 청소하면 다시 더러워집니다.<br />
                원인마저 제거하려면 에코삼성입니다.<br />
                프리미엄 특수 청소 솔루션. 에코삼성입니다.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((s, i) => (
                  <a 
                    key={i} 
                    href={s.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand transition-colors border border-white/5"
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 lg:gap-24">
              {footerGroups.map((group, i) => (
                <div key={i} className="flex flex-col gap-6">
                  <h4 className="text-[14px] font-bold uppercase tracking-widest text-white/20">{group.title}</h4>
                  <ul className="flex flex-col gap-3">
                    {group.links.map((link, j) => (
                      <li key={j}>
                        {link.href ? (
                          <a 
                            href={link.href}
                            className="text-[15px] text-white/50 hover:text-brand transition-colors"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <button 
                            onClick={link.onClick}
                            className="text-left text-[15px] text-white/50 hover:text-brand transition-colors"
                          >
                            {link.label}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-[13px] text-white/20">© 2026 ECO SAMSUNG. All rights reserved.</p>
            <div className="flex gap-8">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setView('privacy'); }} 
                className="text-[13px] text-white/20 hover:text-white hover:underline underline-offset-4 transition-all"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setView('terms'); }} 
                className="text-[13px] text-white/20 hover:text-white hover:underline underline-offset-4 transition-all"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
