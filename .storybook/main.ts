import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../packages/*/src/**/*.mdx",
    "../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../apps/*/src/**/*.mdx",
    "../apps/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    const { resolve } = await import('path');
    const tailwindcss = (await import('@tailwindcss/vite')).default;
    
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
        tailwindcss(),
      ],
      esbuild: {
        ...config.esbuild,
        jsxInject: `import React from 'react'`,
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "@hero/ui": resolve(process.cwd(), "packages/ui/src"),
        },
      },
    };
  },
};
export default config;
