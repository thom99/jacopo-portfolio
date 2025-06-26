import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}", // Se usi Next.js App Router nella cartella app/
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  // theme: {
  //   extend: {},
  // },
  // theme: {
  //   extend: {
  //     colors: {
  //       // qui puoi aggiungere i colori custom
  //       primary: '#1DA1F2',
  //       secondary: '#14171A',
  //     },
  //     fontFamily: {
  //       sans: ['Inter', 'sans-serif'],
  //     },
  //   },
  // },
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyan: {
          300: "#67e8f9",
          400: "#22d3ee",
        },
      },
      backgroundColor: {
        black: "#000000",
      },
    },
  },
  plugins: [],
};

export default config;
