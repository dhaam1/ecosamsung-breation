import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface GsapVisualProps {
  type: string;
}

export const GsapVisual = ({ type }: GsapVisualProps) => {
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
              <div className="absolute inset-0 bg-white/20" />
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
