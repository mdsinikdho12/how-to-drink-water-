import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hind: ["'Hind Siliguri'", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#e6f4ff",
          100: "#b3dbff",
          200: "#80c2ff",
          300: "#4da9ff",
          400: "#1a90ff",
          500: "#0077e6",
          600: "#005eb3",
          700: "#004480",
          800: "#002b4d",
          900: "#00111a",
        },
        water: {
          light: "#e0f7fa",
          DEFAULT: "#00bcd4",
          dark: "#006064",
        },
        gold: {
          light: "#fff8e1",
          DEFAULT: "#ffc107",
          dark: "#ff8f00",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        ripple: "ripple 2s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
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
  plugins: [],
};

export default config;
