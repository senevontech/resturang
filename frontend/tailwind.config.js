// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      translate: {
        101: "101%",
      },

      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 20px 70px rgba(0,0,0,.35)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-50%)" },
        },


        pulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.18" },
          "50%": { transform: "scale(1.08)", opacity: "0.28" },
        },
      },
      animation: {
        pulse: "pulse 3.2s ease-in-out infinite",
        marquee: "marquee 15s linear infinite",
      },
    },
  },
  plugins: [],
};
