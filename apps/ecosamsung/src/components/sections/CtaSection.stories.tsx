import type { Meta, StoryObj } from '@storybook/react';
import { CtaSection } from './CtaSection';

const meta: Meta<typeof CtaSection> = {
  title: 'Sections/CtaSection',
  component: CtaSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CtaSection>;

export const Default: Story = {
  args: {
    onOpenModal: () => alert('Modal opened'),
    variant: 'default'
  }
};

export const LiquidGlass: Story = {
  args: {
    onOpenModal: () => alert('Modal opened'),
    variant: 'liquid-glass'
  }
};

export const DeepOcean: Story = {
  args: {
    onOpenModal: () => alert('Modal opened'),
    variant: 'deep-ocean'
  }
};

export const Iridescent: Story = {
  args: {
    onOpenModal: () => alert('Modal opened'),
    variant: 'iridescent'
  }
};
