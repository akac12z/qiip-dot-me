import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap(), partytown()],
  site: 'https://buildutm.app',
  webAnalytics: {
    enabled: true,
  },
});