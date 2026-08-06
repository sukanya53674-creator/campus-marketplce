import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Marketplace",
  description: "ตลาดนัดออนไลน์ภายในวิทยาลัย",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased flex justify-center`}>
        {/* Container จำลองหน้าจอมือถือสำหรับ Desktop แต่ Responsive เต็มจอในมือถือ */}
        <main className="w-full max-w-md min-h-screen bg-white dark:bg-gray-900 shadow-2xl relative flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}