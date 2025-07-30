// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Vite + React için bu şart
    ],
    theme: {
      extend: {
        fontFamily: {
          cormorant: ['Cormorant', 'serif'],
          noto: ['Noto Serif', 'serif'],
        },
      },
    },
    plugins: [],
  };
  