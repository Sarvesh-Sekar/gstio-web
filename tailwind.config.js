// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["var(--font-lexend),sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        muted: "var(--primary-foreground)",
      },

     animation:
     {
      'spin-slow': 'spin 3s linear infinite',
     }
    },
  },

  plugins: [],
};
