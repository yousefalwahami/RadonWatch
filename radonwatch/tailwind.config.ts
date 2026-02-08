import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dark: {
          bg: "#0f1419",
          card: "#1a2332",
          "card-hover": "#222d3f",
        },
        accent: {
          gold: "#d4a574",
          blue: "#4a9eff",
        },
        text: {
          primary: "#e8edf4",
          secondary: "#8b95a8",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      borderColor: {
        subtle: "rgba(255, 255, 255, 0.08)",
      },
      boxShadow: {
        "glow-gold": "0 10px 30px rgba(212, 165, 116, 0.15)",
        "glow-blue": "0 10px 30px rgba(74, 158, 255, 0.15)",
      },
    },
  },
  plugins: [],
} satisfies Config;
