/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useState, useRef, useEffect } from "react";

// Sections
import { HeroSection } from "./components/sections/HeroSection";
import { ProblemSection } from "./components/sections/ProblemSection";
import { PortfolioSection } from "./components/sections/PortfolioSection";
import { UspSection } from "./components/sections/UspSection";
import { CtaSection } from "./components/sections/CtaSection";
import { Footer } from "./components/sections/Footer";

// UI Components
import { 
  ContactModal, 
  PhoneModal, 
  FloatingContactButton, 
  PrivacyPolicyView, 
  TermsOfServiceView, 
  NotFoundView 
} from "@hero/ui";
import { motion } from "motion/react";

// Assets
import publicBefore from "./pictures/ecosamsung-public-before.png";
import publicAfter from "./pictures/ecosamsung-public-after.png";
import kitchenBefore from "./pictures/ecosamsung-kitchen-before.png";
import kitchenAfter from "./pictures/ecosamsung-kitchen-after.png";
import hotelBefore from "./pictures/ecosamsung-hotel-before.png";
import hotelAfter from "./pictures/ecosamsung-hotel-after.png";

// USP Videos
import directVideo from "./videos/ecosamsung-direct.webm";
import teamVideo from "./videos/ecosamsung-team.webm";
import solutionVideo from "./videos/ecosamsung-solution.webm";

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
      text: "광고한 거랑 청소 상태가 너무 달라요",
      desc: "의뢰를 받은 것은 다시 하청으로 내리는 고객과의 '신뢰'를 저버리는 하도급 중심 구조. 청소 품질 편차가 일정할 수 밖에 없습니다."
    },
    {
      id: "02",
      text: "청소해도 며칠 지나면 다시 더러워져요",
      desc: "표면만 닦아내는 청소는 한계가 있습니다. 오염의 근본적인 원인을 해결하지 않으면 오염은 반드시 재발합니다."
    },
    {
      id: "03",
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
      video: directVideo,
      link: "https://blog.naver.com/az0804_/223960876649"
    },
    {
      id: "02",
      title: "섬세한 여전문가 드림팀",
      subtitle: "에코삼성은 먼지 한 톨\n남기지 않습니다.",
      label: "OUR TEAM",
      desc: "섬세함이 필요한 공간에는 여성 전문가들의 손길이 닿습니다. 철두철미한 디테일과 꼼꼼함으로 보이지 않는 곳까지 프리미엄 케어를 제공합니다.",
      video: teamVideo,
      link: "https://blog.naver.com/PostView.naver?blogId=az0804_&logNo=223997039004&categoryNo=0&parentCategoryNo=0&viewDate=&currentPage=3&postListTopCurrentPage=1&from=postList"
    },
    {
      id: "03",
      title: "근본 원인 제거",
      subtitle: "친환경 특수 약품 청소로\n원인 제거. 불안 제거.",
      label: "OUR TECHNOLOGY",
      desc: "단순하게 오염 제거에서 그치지 않습니다. 에코삼성만의 친환경 특수 약품으로 청소 솔루션을 진행해 오염, 악취의 원인을 친환경적으로 완벽히 제거합니다.",
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
    setIsModalOpen(true);
  };

  const handleVideoEnd = () => {
    setVideoKey(prev => prev + 1);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
    
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
        } as any}
        className="fixed top-0 z-[100] flex w-full items-center justify-between px-[5vw] transition-colors border-b border-transparent"
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
          <HeroSection videoKey={videoKey} handleVideoEnd={handleVideoEnd} videoRef={videoRef} />
          <ProblemSection progress={progress} currentProblemIndex={currentProblemIndex} problems={problems} />
          <PortfolioSection portfolios={portfolios} />
          <UspSection section3Ref={section3Ref} usps={usps} expandedUsp={expandedUsp} containerRef={containerRef} />
          <CtaSection onOpenModal={handlePhoneClick} variant="iridescent" />
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
      <FloatingContactButton onOpenModal={() => setIsPhoneModalOpen(true)} />
      
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
