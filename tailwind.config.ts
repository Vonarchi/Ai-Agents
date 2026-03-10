import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        slate: "#4c5b73",
        cream: "#f6f2e8",
        sand: "#dfcfb8",
        ember: "#bf5b3d",
        moss: "#5f7a65",
        tide: "#8db9b5"
      },
      boxShadow: {
        panel: "0 20px 45px rgba(8, 17, 31, 0.08)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      }
    }
  },
  plugins: []
};

export default config;
