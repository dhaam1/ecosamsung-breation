import { motion, AnimatePresence } from "motion/react";
import { InteractiveProblemCard, Heading2, BodyText } from "@hero/ui";

interface ProblemSectionProps {
  progress: number;
  currentProblemIndex: number;
  problems: any[];
}

export const ProblemSection = ({ progress, currentProblemIndex, problems }: ProblemSectionProps) => {
  return (
    <section id="problem-section" className="relative z-10 bg-brand py-[20vh] px-[5vw] snap-start snap-always">
      <div className="mx-auto max-w-[1472px] w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 w-full">
          <div className="w-full lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="w-full"
            >
              <Heading2>
                청소 업체에 맡겼는데<br />왜 모두가<br />실망하는 걸까요?
              </Heading2>
              <BodyText className="mt-6 lg:mt-8 text-white/90">
                청소 업체들의 구조적인 문제,<br />결국 피해는 모두<br />고객의 몫이 되고 있습니다.
              </BodyText>
              <div className="mt-12 flex items-center gap-4">
                <div className="h-[2px] w-32 bg-white/20 overflow-hidden">
                  <motion.div 
                    className="h-full bg-white" 
                    animate={{ width: `${progress}%` }} 
                    transition={{ duration: 0.05, ease: "linear" }} 
                  />
                </div>
                <span className="text-[12px] font-mono text-white/60 tracking-widest">
                  0{currentProblemIndex + 1} / 0{problems.length}
                </span>
              </div>
            </motion.div>
          </div>
          <div className="w-full lg:col-span-8 overflow-hidden relative">
            <div className="relative h-[360px] sm:h-[500px] md:h-[550px] w-full overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div 
                  key={currentProblemIndex} 
                  initial={{ x: "100%", opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  exit={{ x: "-100%", opacity: 0 }} 
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] as any }} 
                  className="absolute inset-0 w-full left-0 right-0"
                >
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
};
