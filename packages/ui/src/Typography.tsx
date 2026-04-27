import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const Heading1 = ({ children, className = "" }: TypographyProps) => (
  <h1 className={`text-[42px] lg:text-[52px] font-bold leading-[1.3] lg:leading-[1.25] tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] break-keep ${className}`}>
    {children}
  </h1>
);

export const Heading2 = ({ children, className = "" }: TypographyProps) => (
  <h2 className={`text-[32px] md:text-[42px] lg:text-[48px] xl:text-[56px] font-bold leading-tight tracking-tight text-white break-keep ${className}`}>
    {children}
  </h2>
);

export const Heading3 = ({ children, className = "" }: TypographyProps) => (
  <h3 className={`text-[20px] lg:text-[24px] font-bold text-white transition-colors leading-tight ${className}`}>
    {children}
  </h3>
);

export const BodyText = ({ children, className = "" }: TypographyProps) => (
  <p className={`text-[15px] lg:text-[18px] leading-relaxed break-keep ${className}`}>
    {children}
  </p>
);

export const SectionLabel = ({ children, className = "" }: TypographyProps) => (
  <span className={`text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.4em] text-brand ${className}`}>
    {children}
  </span>
);
