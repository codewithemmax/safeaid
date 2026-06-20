import type { Config } from "tailwindcss";

/**
 * SafeAid design system.
 *
 * Brand is teal — the colour language of crisis & anti-trafficking support
 * (Polaris, the UN Blue Heart campaign). It signals calm + safety and, just
 * as importantly, it clears the entire warm end of the spectrum so that RISK
 * (red / amber / green) is the only loud signal on the screen. That directly
 * serves the brief's first rule: risk level must be the loudest thing on
 * every page.
 *
 * A warm amber accent carries the "human in the loop / hope" notes and is
 * used sparingly — never near a risk indicator.
 */
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Deep teal-tinted charcoal — sidebar, landing footer, hero ground.
        ink: {
          DEFAULT: "#0B1A20",
          800: "#10242C",
          700: "#173842",
          600: "#1F4A56",
        },
        // Brand — trust, primary actions, links, focus, active nav.
        brand: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          DEFAULT: "#0D9488",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
        // Warm accent — hope / humanity. Used sparingly, never beside risk.
        accent: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          400: "#FBBF24",
          DEFAULT: "#F59E0B",
          500: "#F59E0B",
          600: "#D97706",
        },
        surface: {
          DEFAULT: "#F6F8F9", // main background, faint cool warmth
          card: "#FFFFFF",
          sunken: "#EEF2F4", // input / hover wells
        },
        border: {
          DEFAULT: "#E3E9EC",
          strong: "#CBD5DC",
        },
        text: {
          primary: "#0B1A20",
          secondary: "#5A6B72",
          muted: "#8A9AA1",
          onDark: "#EAF2F4",
          onDarkMuted: "#9DB2BA",
        },
        // Risk — the loudest signal. Semantic only.
        risk: {
          high: "#DC2626",
          highText: "#991B1B",
          highBg: "#FEF2F2",
          highBorder: "#FECACA",
          medium: "#D97706",
          mediumText: "#92400E",
          mediumBg: "#FFFBEB",
          mediumBorder: "#FDE68A",
          low: "#16A34A",
          lowText: "#166534",
          lowBg: "#F0FDF4",
          lowBorder: "#BBF7D0",
        },
        // AI-generated content — light blue block, per the brief.
        ai: {
          bg: "#EFF6FF",
          border: "#BFDBFE",
          text: "#1D4ED8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(11, 26, 32, 0.04), 0 1px 3px 0 rgba(11, 26, 32, 0.06)",
        "card-hover":
          "0 4px 12px -2px rgba(11, 26, 32, 0.10), 0 2px 6px -2px rgba(11, 26, 32, 0.06)",
        lift: "0 18px 40px -12px rgba(11, 26, 32, 0.28)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
