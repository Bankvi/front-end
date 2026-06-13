import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D59C7C",
        "gold-light": "#E8B99A",
        "gold-dark": "#B8805F",
        "dark-bg": "#0D0D0D",
        "dark-card": "#111118",
        "dark-surface": "#16161E",
        "light-bg": "#F7F5F2",
        "light-card": "#FFFFFF",
        "light-surface": "#EDE9E3",
        "text-dark": "#1A1A1A",
        "text-muted": "#8A8A8A",
        success: "#22C55E",
        error: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        glass: "24px",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D59C7C 0%, #E8B99A 50%, #B8805F 100%)",
        "dark-gradient": "linear-gradient(180deg, #0D0D0D 0%, #111118 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "orb-1": "orb1 12s ease-in-out infinite",
        "orb-2": "orb2 15s ease-in-out infinite",
        "orb-3": "orb3 18s ease-in-out infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        orb1: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(60px, -40px) scale(1.1)" },
          "66%": { transform: "translate(-30px, 60px) scale(0.9)" },
        },
        orb2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-80px, 50px) scale(1.15)" },
          "66%": { transform: "translate(40px, -70px) scale(0.85)" },
        },
        orb3: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(50px, 30px) scale(1.05)" },
        },
        pulseGold: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(213,156,124,0.3)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(213,156,124,0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
