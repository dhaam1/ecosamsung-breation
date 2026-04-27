import { SubPageLayout } from "./SubPageLayout";

interface PrivacyPolicyViewProps {
  setView: (v: 'home') => void;
}

export const PrivacyPolicyView = ({ setView }: PrivacyPolicyViewProps) => (
  <SubPageLayout title="Privacy Policy" setView={setView}>
    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">01.</span>
        개인정보의 수집 및 이용 목적
      </h2>
      <p>에코삼성(이하 "회사")은 이용자의 문의사항에 대한 정확한 답변 및 최적의 서비스 제공을 위해 최소한의 필수 개인정보를 수집하고 있습니다. 수집된 정보는 다음의 목적 이외의 용도로는 절대 사용되지 않습니다.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "본인 확인", text: "서비스 상담 및 견적 제공을 위한 의뢰인 식별" },
          { title: "서비스 이행", text: "원활한 청소 시공 및 계약 조건의 충실한 이행" },
          { title: "고객 관리", text: "사후 관리(A/S) 및 서비스 만족도 조사, 분쟁 해결" }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand" />
              {item.title}
            </h3>
            <p className="text-[14px] leading-relaxed opacity-70">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
    
    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">02.</span>
        수집하는 개인정보 항목
      </h2>
      <p className="mb-6">회사는 서비스 이용을 위해 다음과 같은 정보를 필수적 또는 선택적으로 수집합니다.</p>
      <div className="space-y-4">
        <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold mb-1">인적 사항 (필수)</h3>
            <p className="text-[14px] opacity-50">상담 및 본인 확인을 위한 최소 세부 정보</p>
          </div>
          <p className="text-[16px] text-brand/80 font-semibold italic">성함(또는 업체명), 연락처, 서비스 대상 지역</p>
        </div>
        <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold mb-1">부가 정보 (선택)</h3>
            <p className="text-[14px] opacity-50">수준 높은 맞춤형 솔루션 제공을 위한 정보</p>
          </div>
          <p className="text-[16px] text-white/80 font-semibold italic">이메일, 상세 요청 내역, 시공 희망 일시</p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">03.</span>
        개인정보의 보유 및 이용 기간
      </h2>
      <p>회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 일정 기간 보관합니다.</p>
      <div className="mt-8 border-l-2 border-brand/20 pl-8 space-y-6">
        <div>
          <h3 className="text-white/80 font-bold mb-2">상담 관련 기록</h3>
          <p className="text-[14px] opacity-60">보존 사유: 소비자 상담 및 사후 관리 / 보존 기간: 1년</p>
        </div>
        <div>
          <h3 className="text-white/80 font-bold mb-2">계약 또는 청약철회 등에 관한 기록</h3>
          <p className="text-[14px] opacity-60">보존 사유: 전자상거래법 / 보존 기간: 5년</p>
        </div>
        <div>
          <h3 className="text-white/80 font-bold mb-2">대금결제 및 재화 등의 공급에 관한 기록</h3>
          <p className="text-[14px] opacity-60">보존 사유: 전자상거래법 / 보존 기간: 5년</p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">04.</span>
        개인정보의 파기절차 및 방법
      </h2>
      <p>회사는 개인정보 파기 시 재생이 불가능한 방법으로 안전하게 파기합니다.</p>
      <ul className="mt-6 list-none space-y-4">
        <li className="flex gap-4 p-5 bg-white/[0.01] border border-white/5 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0">
            <span className="font-bold text-[14px]">P1</span>
          </div>
          <p className="text-[14.5px] leading-relaxed"><strong className="text-white">절차:</strong> 목적이 달성된 후 별도의 DB로 옮겨져 관련 법령에 따라 일정 기간 저장된 후 즉시 파기됩니다.</p>
        </li>
        <li className="flex gap-4 p-5 bg-white/[0.01] border border-white/5 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0">
            <span className="font-bold text-[14px]">P2</span>
          </div>
          <p className="text-[14.5px] leading-relaxed"><strong className="text-white">방법:</strong> 전자적 파일은 기록을 재생할 수 없는 기술적 방법을 사용하며, 종이 문서는 분쇄하거나 소각합니다.</p>
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-[22px] lg:text-[26px] font-bold text-white mb-6 flex items-center gap-4">
        <span className="text-brand/40 font-mono text-[16px]">05.</span>
        정보주체의 권리와 그 행사방법
      </h2>
      <p>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 수집/이용 동의 철회를 요청할 수 있습니다. 개인정보 보호책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</p>
    </section>

    <div className="p-10 bg-brand/5 border border-brand/20 rounded-[32px] mt-20">
      <h3 className="text-brand font-bold mb-6 tracking-widest uppercase text-[12px]">Contact Point</h3>
      <p className="text-white text-[18px] lg:text-[22px] font-bold mb-2">개인정보 보호 전담 부서</p>
      <p className="text-white/60 mb-8">에코삼성 운영 지원팀 (010-6273-7511)</p>
      <div className="h-[1px] w-full bg-brand/10 mb-8" />
      <p className="text-[14px] opacity-40">이용자는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보보호책임자 혹은 담당부서로 신고하실 수 있습니다.</p>
    </div>
  </SubPageLayout>
);
