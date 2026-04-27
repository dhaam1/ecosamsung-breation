import { motion } from "motion/react";

interface SubPageLayoutProps {
  title: string;
  children: React.ReactNode;
  setView: (v: 'home') => void;
}

export const SubPageLayout = ({ title, children, setView }: SubPageLayoutProps) => (
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
