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
  integrations: [sitemap()],
  vite: {
    resolve: {
      alias: {
        '$components': '/src/components',
        '$data': '/src/data',
        '$layouts': '/src/layouts',
        '$pages': '/src/pages',
        '$styles': '/src/styles'
      }
    },
		build: {
      // Отключаем встраивание CSS в HTML
      cssCodeSplit: true,
      // Минимизируем CSS
      minify: true,
      // Настройки для долгосрочных имён файлов
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    css: {
      // Включаем оптимизацию CSS
      postcss: {},
    },
  }
});