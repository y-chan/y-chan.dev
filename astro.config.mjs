import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import rehypePrism from "@mapbox/rehype-prism";
import { defineConfig } from 'astro/config';
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkEmoji from "remark-emoji";
import remarkCodeTitles from "remark-flexible-code-titles";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";

// eslint-disable-next-line no-restricted-imports
import { SITE_URL } from './src/consts';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap(), tailwind(), react()],
  markdown: {
    gfm: true,
    rehypePlugins: [rehypeKatex, rehypePrism, rehypeSlug, [remarkToc, {
      heading: "目次",
      maxDepth: 3
    }]],
    remarkPlugins: [remarkEmoji, remarkMath, remarkCodeTitles]
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    }
  },
  site: SITE_URL
});