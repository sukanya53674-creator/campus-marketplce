"use client";

import React, { useState } from "react";

// ข้อมูลจำลองสินค้า
const PRODUCTS = [
  {
    id: 1,
    title: "หนังสือการเขียนโปรแกรม Next.js & React",
    price: 250,
    category: "หนังสือเรียน",
    location: "ตึกวิศวกรรมศาสตร์",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80",
    condition: "มือสอง (สภาพ 95%)",
  },
  {
    id: 2,
    title: "หูฟังไร้สาย Bluetooth Noise Cancelling",
    price: 590,
    category: "อุปกรณ์ IT",
    location: "หอพักชาย 2",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    condition: "มือสอง (สภาพดี)",
  },
  {
    id: 3,
    title: "เสื้อช็อปคณะวิศวะ ไซส์ L",
    price: 180,
    category: "เสื้อผ้า / ยูนิฟอร์ม",
    location: "ลานเกียร์",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
    condition: "มือสอง",
  },
  {
    id: 4,
    title: "พัดลมตั้งโต๊ะขนาดเล็ก เหมาะติดหอพัก",
    price: 120,
    category: "ของใช้หอพัก",
    location: "หอพักหญิง 1",
    image: "https://images.unsplash.com/photo-1618961734760-466979ce35b0?w=500&q=80",
    condition: "มือสอง (ใช้งานได้ปกติ)",
  },
];

const CATEGORIES = ["ทั้งหมด", "หนังสือเรียน", "อุปกรณ์ IT", "เสื้อผ้า / ยูนิฟอร์ม", "ของใช้หอพัก"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchCategory = selectedCategory === "ทั้งหมด" || item.category === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <h1 className="text-xl font-bold text-blue-600 tracking-tight">Campus Marketplace</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="ค้นหาสินค้า เช่น หนังสือ, พัดลม..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm bg-slate-100 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm">
              + ลงขายสินค้า
            </button>
            <button className="p-2 text-slate-600 hover:text-blue-600">👤 เข้าสู่ระบบ</button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 2. HERO BANNER */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-10 text-white mb-8 shadow-md">
          <div className="max-w-2xl">
            <span className="bg-blue-500/30 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30">
              วิทยาลัยของเรา
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-3 mb-2">
              ตลาดนัดซื้อ-ขาย ของนักศึกษา
            </h2>
            <p className="text-blue-100 text-sm sm:text-base mb-6">
              ส่งต่อหนังสือ อุปกรณ์การเรียน และของใช้หอพักในราคามิตรภาพ นัดรับได้ง่ายๆ ในเขตรั้ววิทยาลัย
            </p>
            <button className="bg-white text-blue-700 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors shadow">
              สำรวจสินค้าทั้งหมด
            </button>
          </div>
        </section>

        {/* 3. CATEGORY FILTERS */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">หมวดหมู่สินค้า</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* 4. PRODUCT GRID */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              รายการสินค้า ({filteredProducts.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative h-48 bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md">
                    {product.condition}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-600">{product.category}</span>
                    <h4 className="font-semibold text-slate-900 line-clamp-2 mt-1 mb-2">
                      {product.title}
                    </h4>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-2">📍 นัดรับ: {product.location}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-lg font-bold text-blue-600">฿{product.price}</span>
                      <button className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-medium px-3 py-1.5 rounded-md transition-colors">
                        ทักแชท
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 5. FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2026 Campus Marketplace — ระบบตลาดนัดนักศึกษาเพื่อชุมชนวิทยาลัย</p>
        </div>
      </footer>
    </div>
  );
}