/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1f1f1f",
        fg: "#ededed",
        accent: "#ff6b6b",
        card: "#2a2a2a",
        cardHover: "#383838",
      },
      fontFamily: {
        sans: ["Geist", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
