import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F2E1C1",
        foreground: "#333333",
        color_two: "#A8D5BA",
        color_three: "#3D405B",
        color_four: "#F7C8D5",
        color_five: "#D1C4E9", 
      },
    },
  },
  plugins: [],
} satisfies Config;
