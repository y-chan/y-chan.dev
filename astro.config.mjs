import icon from "astro-icon";
import mdx from '@astrojs/mdx';
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import rehypePrism from "@mapbox/rehype-prism";
import rehypeMermaid from 'rehype-mermaid';
import { defineConfig, passthroughImageService } from 'astro/config';
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkEmoji from "remark-emoji";
import remarkCodeTitles from "remark-flexible-code-titles";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// eslint-disable-next-line no-restricted-imports
import { SITE_URL } from './src/consts';
import partytown from "@astrojs/partytown";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(), sitemap(), tailwind(), react(), icon(), partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
],
  markdown: {
    gfm: true,
    rehypePlugins: [rehypeKatex, rehypePrism, rehypeSlug, [remarkToc, {
      heading: "目次",
      maxDepth: 3
    }], rehypeMermaid],
    remarkPlugins: [remarkEmoji, remarkMath, remarkCodeTitles],
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'js'],
    },
  },
  image: {
    service: passthroughImageService()
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    },
    resolve: {
      alias: {
        "@/": `${path.resolve(__dirname)}/src/`
      }
    }
  },
  site: SITE_URL
});