import { MapPin } from "lucide-react";

interface FooterProps {
  navLinks: { label: string, id: string }[];
  scrollToSection: (id: string) => void;
  onOpenModal: () => void;
  onPhoneClick: () => void;
  setView: (v: 'home' | 'privacy' | 'terms') => void;
}

export const Footer = ({ 
  navLinks, 
  scrollToSection, 
  onPhoneClick,
  setView
}: FooterProps) => {
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
