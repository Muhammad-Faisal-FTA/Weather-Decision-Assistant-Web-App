/**
 * lib/motion.ts
 *
 * Framer Motion tokens — not wired into components yet (that's
 * Sprint 2), but defined now so every card built this sprint and
 * next shares one motion language instead of each component
 * picking its own duration/easing ad hoc.
 *
 * Install: npm install framer-motion
 */
import type { Variants, Transition } from "framer-motion";

// Mirrors --duration-* and --ease-standard in globals.css, so
// CSS transitions (hover states) and Framer animations (mount/
// unmount, layout shifts) feel identical, not like two products.
export const transition: Record<"fast" | "base" | "slow", Transition> = {
  fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  base: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
};

// Standard entrance for cards (current weather, daily, weekly).
// Small Y offset, not a dramatic slide — weather data should feel
// immediate, not like it's performing an entrance.
export const cardEnter: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

// Stagger wrapper for a row/grid of forecast cards (e.g. the 7
// daily tiles in the weekly card) — each tile enters slightly
// after the previous one instead of all at once.
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

// Subtle hover lift, paired with the `shadow-card-hover` Tailwind
// token — used on interactive cards (e.g. tapping a forecast day
// to see details).
export const hoverLift = {
  whileHover: { y: -3, transition: transition.fast },
  whileTap: { y: 0, transition: transition.fast },
};

// Skeleton pulse for loading states (R-WA18 — each widget shows
// its own loading state independently).
export const skeletonPulse: Variants = {
  pulse: {
    opacity: [0.5, 0.9, 0.5],
    transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
  },
};
