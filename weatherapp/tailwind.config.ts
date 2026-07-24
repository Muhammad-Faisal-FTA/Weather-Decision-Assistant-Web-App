import type { Config } from "tailwindcss";

/**
 * WeatherMind AI — Tailwind Design Tokens
 *
 * These map 1:1 to the CSS variables defined in globals.css.
 * Never hardcode a hex value in a component — always reference
 * these token names (e.g. bg-surface, text-text-secondary) so
 * a future palette change is a one-file edit, not a find-replace
 * across every component.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./shared/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#31255a",
        accent: "#8fe0ff",
        secondary: "#75b4e3",
        surface: "#54416d",
        "surface-alt": "#3b2d68",
        background: "#2b235a",

        warning: "#f2b84b",
        danger: "#e2585f",
        success: "#5fd4a0",

        "text-primary": "#f5f7fb",
        "text-secondary": "#c9c3e0",
        "text-muted": "#9c93bd",

        border: "rgba(143, 224, 255, 0.14)",
      },

      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },

      // Intentional type scale — not Tailwind's default. Each step
      // has a purpose-built line-height so headings never rely on
      // browser default leading.
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.4" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.5" }],
        xl: ["1.375rem", { lineHeight: "1.4" }],
        "2xl": ["1.75rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "3xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        // Reserved for the hero temperature readout — big, mono, tight.
        display: ["4rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
      },

      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "22px",
        pill: "999px",
      },

      spacing: {
        // Semantic spacing for card/section rhythm, on top of
        // Tailwind's default 4px scale — use these for consistency
        // across every card component.
        "card-padding": "20px",
        "card-padding-lg": "28px",
        "section-gap": "40px",
      },

      boxShadow: {
        // Accent-tinted glow instead of flat black — reads as
        // premium against a purple palette, not muddy.
        card: "0 4px 20px -4px rgba(43, 35, 90, 0.5)",
        "card-hover": "0 8px 28px -6px rgba(143, 224, 255, 0.18)",
      },

      transitionDuration: {
        fast: "150ms",
        base: "220ms",
        slow: "380ms",
      },

      transitionTimingFunction: {
        // Matches the easing used in lib/motion.ts for Framer Motion,
        // so CSS transitions and Framer animations feel identical.
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
