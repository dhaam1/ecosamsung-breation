import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: '무료 견적 받기',
    variant: 'primary',
  },
};

export const Outline: Story = {
  args: {
    children: '에코삼성 자세히 알아보기',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: '문제의식',
    variant: 'ghost',
  },
};
