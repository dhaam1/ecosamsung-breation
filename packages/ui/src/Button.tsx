import { ReactNode, ButtonHTMLAttributes } from "react";
import { motion } from "motion/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
}

export const Button = ({ children, variant = 'primary', className = "", ...props }: ButtonProps) => {
  const baseStyles = "flex items-center justify-center gap-2 rounded-[6px] font-bold transition-all shadow-lg";
  
  const variants = {
    primary: "bg-brand px-4 py-3 lg:px-[24px] lg:py-[14px] text-[12px] lg:text-[14px] shadow-brand/20 text-white",
    outline: "border border-white/20 bg-white/10 px-8 py-4 lg:px-12 lg:py-5 text-[14px] lg:text-[15px] backdrop-blur-md text-white hover:bg-white/20",
    ghost: "text-[14px] font-semibold tracking-tight text-white/80 hover:text-brand bg-transparent shadow-none"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props as any}
    >
      {children}
    </motion.button>
  );
};
