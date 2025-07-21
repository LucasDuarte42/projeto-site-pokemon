// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  // A SEÇÃO 'content' É CRUCIAL
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // GARANTA QUE ESTA LINHA ESTEJA PRESENTE:
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      // ... suas extensões de tema, como as fontes Geist
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
