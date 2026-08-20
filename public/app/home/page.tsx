"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { sampleProducts } from "@/data/products";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  // Sync state กับ class 'dark' บนแท็ก <html> ของ Document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  
  const filteredProducts = sampleProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      
      {/* Header Navigation */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-lg text-blue-600 dark:text-blue-400">
          🎓 CampusMarket
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="ค้นหาสินค้า, หนังสือ, อุปกรณ์..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Banner / CTA */}
        <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-2xl shadow-md">
          <div>
            <p className="font-bold text-base">มีของไม่ได้ใช้ไหม?</p>
            <p className="text-xs text-blue-100">นำมาลงขายให้เพื่อนๆ ในวิทยาลัยได้เลย</p>
          </div>
          <Link
            href="/product"
            className="px-3 py-2 bg-white text-blue-600 font-bold text-xs rounded-xl shadow hover:bg-blue-50"
          >
            + ลงขาย
          </Link>
        </div>

        {/* Feed Title */}
        <h2 className="font-bold text-base pt-2">รายการสินค้าล่าสุด</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col justify-between"
            >
              <div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-300 rounded-md">
                    {product.category}
                  </span>
                  <h3 className="font-medium text-xs mt-1.5 line-clamp-2">
                    {product.title}
                  </h3>
                </div>
              </div>
              <div className="p-3 pt-0 flex items-center justify-between">
                <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                  ฿{product.price.toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-400">
                  {product.seller}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

