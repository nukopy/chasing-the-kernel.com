// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import { unified } from '@astrojs/markdown-remark';

import icon from 'astro-icon';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  markdown: {
    processor: unified({
      remarkPlugins: [[remarkMath, { singleDollarTextMath: true }]],
      rehypePlugins: [
        [rehypeKatex, { output: 'htmlAndMathml', strict: 'warn', throwOnError: false }],
      ],
    }),
  },
  integrations: [
    icon({
      include: {
        solar: ['calendar-linear'],
        'akar-icons': ['arrow-back'],
        'griddy-icons': ['copy'],
        'material-symbols': ['check-rounded'],
      },
    }),
  ],
});
