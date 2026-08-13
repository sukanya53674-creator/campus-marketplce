import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Marketplace | ตลาดนัดนักศึกษา",
  description: "แหล่งซื้อขายอุปกรณ์การเรียน และของใช้ในวิทยาลัย",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}