import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sared: "#d30303",
        sared_deep: "#a30202",
        sabg: "#000000",
        sagold: "#d4af37",
        saolive: "#7d7237",
        sagray: "#d3d3d3",
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
        sans: ["var(--font-montserrat)", "ui-sans-serif", "system-ui", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "ui-sans-serif", "system-ui", "sans-serif"],
        impact: ["var(--font-oswald)", "Impact", "Haettenschweiler", "Arial Narrow Bold", "sans-serif"],
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
