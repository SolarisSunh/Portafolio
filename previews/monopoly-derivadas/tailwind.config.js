/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
      },
      keyframes: {
        cardIn: {
          "0%": {
            transform: "perspective(1000px) translate3d(0,60vh,0) rotate(-12deg) scale(0.6)",
            opacity: "0",
          },
          "60%": {
            transform: "perspective(1000px) translate3d(0,-6vh,0) rotate(3deg) scale(1.03)",
            opacity: "1",
          },
          "100%": {
            transform: "perspective(1000px) translate3d(0,0,0) rotate(0deg) scale(1)",
            opacity: "1",
          },
        },
        shine: {
          "0%": { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(150%)" },
        },
      },
      animation: {
        cardIn: "cardIn 1s cubic-bezier(0.22, 1, 0.36, 1) both",
        shine: "shine 1.2s linear infinite",
      },
    },
  },
  plugins: [],
}

