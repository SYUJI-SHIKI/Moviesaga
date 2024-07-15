/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      Anton: ['Anton', 'sans-serif'],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        'mobile': {'max': '450px'},
        'md': '768px',
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        "scale-out-center": {
          "0%": {
              transform: "scale(1)",
              opacity: "1"
          },
          to: {
              transform: "scale(0)",
              opacity: "1"
          }
        },
        wave: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'gradient-flow': 'gradient-flow 10s ease infinite',
        spin: 'spin 10s linear infinite',
        'spin-slow': 'spin 15s linear infinite',
        radialShine: 'radialShine 1s linear infinite',
        'slide-out-left': 'slide-out-left 0.5s forwards',
        'slide-out-right': 'slide-out-right 0.5s forwards',
        scroll: 'scroll 20s linear infinite',
        "scale-out-center": "scale-out-center 30s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        wave: 'wave 2s linear infinite',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@xpd/tailwind-3dtransforms")
  ],
};