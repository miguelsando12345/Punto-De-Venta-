import type { Config } from "tailwindcss";
import { DEFAULT_CIPHERS } from "tls";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          foreground: "hsl(var(--background-foreground))",
        },
        text: {
          DEFAULT: "hsl(var(--text))",
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transformOrigin: {
        DEFAULT: "150ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
