import { motion } from "motion/react";
import { BeforeAfterSlider, Heading2, SectionLabel, BodyText, Tag } from "@hero/ui";

interface PortfolioSectionProps {
  portfolios: any[];
}

export const PortfolioSection = ({ portfolios }: PortfolioSectionProps) => {
  return (
    <section id="portfolio-section" className="relative z-10 bg-white py-[20vh] px-[5vw] text-black">
      <div className="mx-auto max-w-[1472px]">
        <div className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Portfolio</SectionLabel>
            <Heading2 className="mt-4 text-black">
              에코삼성이 다녀가면<br />어디든 신축이 됩니다
            </Heading2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="max-w-md"
          >
            <BodyText className="text-black/40">
              수많은 현장에서 검증된 에코삼성만의 특수 청소 솔루션.<br />비포 & 애프터 슬라이더를 통해 직접 확인해보세요.
            </BodyText>
          </motion.div>
        </div>
        <div className="space-y-20 lg:space-y-32">
          {portfolios.map((item: any, i: number) => (
            <div key={i} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className="flex-1 w-full shadow-2xl shadow-black/5">
                <BeforeAfterSlider before={item.before} after={item.after} />
              </div>
              <div className="flex-1 max-w-xl w-full">
                <span className="text-[48px] lg:text-[64px] font-black text-black/5 leading-none">{item.id}</span>
                <h3 className="text-[22px] sm:text-[24px] lg:text-[32px] font-bold mt-[-10px] lg:mt-[-20px] mb-4 lg:mb-6 text-black break-keep">
                  {item.title}
                </h3>
                <BodyText className="text-black/40 mb-6 lg:mb-8">
                  {item.desc}
                </BodyText>
                <div className="flex flex-wrap gap-2">
                  {item.tags?.map((tag: any) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
