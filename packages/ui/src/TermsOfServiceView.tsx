import { AlertCircle } from "lucide-react";
import { SubPageLayout } from "./SubPageLayout";

interface TermsOfServiceViewProps {
  setView: (v: 'home') => void;
}

export const TermsOfServiceView = ({ setView }: TermsOfServiceViewProps) => (
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
