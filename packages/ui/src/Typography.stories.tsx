import type { Meta, StoryObj } from '@storybook/react';
import { Heading1, Heading2, Heading3, BodyText, SectionLabel } from './Typography';

const meta: Meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const AllTypography = {
  render: () => (
    <div className="flex flex-col gap-12 bg-black p-20 min-w-[600px]">
      <div>
        <SectionLabel className="mb-2 block">Heading 1</SectionLabel>
        <Heading1>프리미엄 특수 청소 솔루션 에코삼성</Heading1>
      </div>
      <div>
        <SectionLabel className="mb-2 block">Heading 2</SectionLabel>
        <Heading2>청소가 필요한 모든 공간,<br/>전문가를 만나면 달라집니다.</Heading2>
      </div>
      <div>
        <SectionLabel className="mb-2 block">Heading 3</SectionLabel>
        <Heading3>100% 직영 시스템</Heading3>
      </div>
      <div>
        <SectionLabel className="mb-2 block">Body Text</SectionLabel>
        <BodyText className="text-white/60">
          에코삼성은 하도급 없이 모든 공정을 본사가 직접 관리하는 100% 직영 시스템을 고집합니다.<br/>
          이는 균일한 최상급 품질과 책임 있는 A/S를 보장하는 유일한 길입니다.
        </BodyText>
      </div>
      <div>
        <SectionLabel className="mb-2 block">Section Label</SectionLabel>
        <SectionLabel>PORTFOLIO 2024</SectionLabel>
      </div>
    </div>
  )
};
