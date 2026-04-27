import type { Meta, StoryObj } from '@storybook/react';
import { ProblemSection } from './ProblemSection';

const meta: Meta<typeof ProblemSection> = {
  title: 'Sections/ProblemSection',
  component: ProblemSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ProblemSection>;

export const Default: Story = {
  args: {
    progress: 30,
    currentProblemIndex: 0,
    problems: [
      {
        id: "01",
        text: "광고한 거랑 청소 상태가 너무 달라요",
        desc: "의뢰를 받은 것은 다시 하청으로 내리는 고객과의 '신뢰'를 저버리는 하도급 중심 구조. 청소 품질 편차가 일정할 수 밖에 없습니다."
      },
      {
        id: "02",
        text: "청소해도 며칠 지나면 다시 더러워져요",
        desc: "표면만 닦아내는 청소는 한계가 있습니다. 오염의 근본적인 원인을 해결하지 않으면 오염은 반드시 재발합니다."
      },
      {
        id: "03",
        text: "업체 이용 후에도 냄새는 똑같이 나는 것 같아요",
        desc: "냄새는 보이지 않는 틈새와 깊숙한 곳에 박힌 오염원에서 시작됩니다. 그저 겉만 청소하는 것은 아무 소용 없습니다."
      }
    ]
  }
};
