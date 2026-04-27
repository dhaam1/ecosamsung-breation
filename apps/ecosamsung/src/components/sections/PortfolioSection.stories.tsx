import type { Meta, StoryObj } from '@storybook/react';
import { PortfolioSection } from './PortfolioSection';
import publicBefore from "../../pictures/ecosamsung-public-before.png";
import publicAfter from "../../pictures/ecosamsung-public-after.png";

const meta: Meta<typeof PortfolioSection> = {
  title: 'Sections/PortfolioSection',
  component: PortfolioSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PortfolioSection>;

export const Default: Story = {
  args: {
    portfolios: [
      {
        id: "01",
        title: "공공기관 정기청소 관리",
        location: "서울특별시",
        before: publicBefore,
        after: publicAfter,
        desc: "공공기관의 엄격한 위생 기준에 맞춰 보이지 않는 세균과 오염원까지 완벽하게 제거하여 쾌적한 업무 환경을 조성했습니다.",
        tags: ["정밀위생", "공공기관", "살균소독"]
      }
    ]
  }
};
