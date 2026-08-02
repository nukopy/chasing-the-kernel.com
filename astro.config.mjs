// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
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
