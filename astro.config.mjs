import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { getSiteConfig } from './site.config.mjs';

const { site, base } = getSiteConfig();

export default defineConfig({
  site,
  base,
  integrations: [tailwind()],
});
