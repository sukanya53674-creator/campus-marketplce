import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Campus Marketplace - Group Business Report",
  description: "ตลาดนัดเด็กวิทยาลัย - Corporate Theme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="bg-white text-black font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}