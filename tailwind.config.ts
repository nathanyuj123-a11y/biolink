import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sared: "#C8102E",
        sabg: "#0d0d0d",
        ink: "#0f172a",
        "ink-soft": "#334155",
        ash: "#64748b",
        canvas: "#f8fafc",
        hairline: "#e5e7eb",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)"],
        dm: ["var(--font-dm)"],
        mono: ["var(--font-mono)"],
        geist: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        rise: "rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
