// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://imsocreative.ru',
  output: 'static',
  trailingSlash: "ignore",
  compressHTML: false,
  scopedStyleStrategy: 'class',
  build: {
    inlineStylesheets: `never`,
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13'],
  },
  integrations: [sitemap()]
});