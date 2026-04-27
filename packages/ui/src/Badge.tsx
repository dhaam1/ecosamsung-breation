import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: 'brand' | 'glass' | 'after';
  className?: string;
}

export const Badge = ({ children, variant = 'brand', className = "" }: BadgeProps) => {
  const baseStyles = "rounded-full px-3 py-1 text-[10px] font-bold backdrop-blur-md uppercase tracking-widest";
  
  const variants = {
    brand: "bg-brand/5 border border-brand/20 text-brand",
    glass: "bg-black/50 text-white",
    after: "bg-brand/80 text-white"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Tag = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <span className={`px-3 py-1 text-[10px] lg:text-[11px] font-bold text-brand border border-brand/20 bg-brand/5 rounded-full uppercase tracking-wider ${className}`}>
    #{children}
  </span>
);
