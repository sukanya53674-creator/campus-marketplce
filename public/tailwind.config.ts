import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <-- สำคัญมาก! บรรทัดนี้บอก Tailwind ให้สลับสีตาม class="dark" บนแท็ก <html>
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;