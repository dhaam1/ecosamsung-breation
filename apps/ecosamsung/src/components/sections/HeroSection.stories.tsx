import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';
import { useRef } from 'react';

const MetaHero: Meta<typeof HeroSection> = {
  title: 'Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default MetaHero;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  render: () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    return (
      <HeroSection 
        videoKey={0} 
        handleVideoEnd={() => {}} 
        videoRef={videoRef} 
      />
    );
  }
};
