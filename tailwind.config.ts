import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // แบรนด์และสีเน้นย้ำ 4 สีหลักตามข้อกำหนด
        brand: {
          blue: "#002693",   // 主品牌蓝 (สีน้ำเงินหลัก)
          cyan: "#00C0E6",   // 青蓝 (สีฟ้าอมเขียว)
          orange: "#FA770F", // 活力橙 (สีส้มสด)
          sky: "#0A7CFF",    // 天蓝 (สีฟ้าสด)
          neutral: "#7F7F7F",// 中性灰 (สีเทาช่วย)
          dark: "#16213F",   // 深藏青 (สีน้ำเงินเข้มพื้นหลัง)
        },
      },
      fontFamily: {
        // บังคับใช้ฟอนต์ MiSans ตามข้อกำหนด
        sans: ["MiSans", "sans-serif"],
      },
      fontSize: {
        // ขนาดตัวอักษรแบบ Fixed
        "cover-title": ["54pt", { lineHeight: "1.2", fontWeight: "600" }],
        "section-num": ["44pt", { lineHeight: "1.1", fontWeight: "600" }],
        "section-title": ["40pt", { lineHeight: "1.2", fontWeight: "600" }],
        "content-title": ["32pt", { lineHeight: "1.3", fontWeight: "600" }],
        "body-main": ["18pt", { lineHeight: "1.5", fontWeight: "400" }],
        "badge-tag": ["14pt", { lineHeight: "1.4", fontWeight: "700" }],
        "data-tag": ["12pt", { lineHeight: "1.4", fontWeight: "700" }],
        "footer-text": ["12pt", { lineHeight: "1.4", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};

export default config;