const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#faf5fe',
          '100': '#f5ebfc',
          '200': '#ebd6f8',
          '300': '#e5c5f4',
          '400': '#cb8ae8',
          '500': '#b35dd8',
          '600': '#983dbc',
          '700': '#80309b',
          '800': '#6a297f',
          '900': '#5a2669',
          '950': '#380e44',
        },
      },
      fontFamily: {
        sans: ["LINE Seed JP", ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
