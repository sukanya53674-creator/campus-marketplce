"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  seller: string;
  image: string;
}



gg
const sampleProducts: Product[] = [
  {
    id: 1,
    title: "หนังสือเรียน Calculus 1 (สภาพ 90%)",
    price: 180,
    category: "หนังสือ",
    seller: "ทีมอ 3",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
  },
  {
    id: 2,
    title: "เครื่องคิดเลขวิทยาศาสตร์ Casio FX-991EX",
    price: 450,
    category: "อุปกรณ์การเรียน",
    seller: "บอส วิศวะ",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&q=80",
  },
  {
    id: 3,
    title: "เสื้อโค้ท / แจ็กเก็ต ยูนิโคล่ ไซส์ M",
    price: 320,
    category: "เสื้อผ้า",
    seller: "พลอย บัญชี",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
  },
  {
    id: 4,
    title: "จักรยานปั่นในมหาลัย สภาพดีพร้อมปั่น",
    price: 850,
    category: "ของใช้หอพัก",
    seller: "กอล์ฟ สถาปัตย์",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80",
  },
];

const categories = ["ทั้งหมด", "หนังสือ", "อุปกรณ์การเรียน", "เสื้อผ้า", "ของใช้หอพัก"];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

  const filteredProducts = sampleProducts.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ทั้งหมด" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12 font-sans">
      <div className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-900/80 backdrop-blur p-4 rounded-2xl border border-slate-800 shadow-sm">
          <div>
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Campus Market
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">ตลาดนัดส่งต่อของเด็กวิทยาลัย</p>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-4 rounded-xl border border-slate-700 transition active:scale-95">
            👤 เข้าสู่ระบบ
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 ค้นหาสินค้า เช่น หนังสือ, เครื่องคิดเลข..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner"
          />
        </div>

        {/* Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 shadow-lg shadow-blue-900/20">
          <div className="relative z-10 flex justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">มีของไม่ได้ใช้ไหม?</h2>
              <p className="text-xs text-blue-100 mt-1">นำมาลงขายให้เพื่อนๆ ในวิทยาลัยได้เลยง่ายๆ</p>
            </div>
            <Link
              href="/add-product"
              className="bg-white text-blue-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow hover:bg-blue-50 transition shrink-0 active:scale-95"
            >
              + ลงขายเลย
            </Link>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-200">
              สินค้าล่าสุด <span className="text-xs font-normal text-slate-500">({filteredProducts.length} รายการ)</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition shadow-sm"
              >
                <div>
                  <div className="h-36 w-full bg-slate-800 relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-slate-950/70 backdrop-blur text-slate-300 text-[10px] px-2 py-0.5 rounded-md border border-slate-700/50">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-3">
                    <h4 className="text-xs font-medium text-slate-200 line-clamp-2 min-h-[32px]">
                      {product.title}
                    </h4>
                  </div>
                </div>

                <div className="p-3 pt-0 flex items-center justify-between border-t border-slate-800/50 mt-2">
                  <div>
                    <p className="text-[10px] text-slate-500">{product.seller}</p>
                    <p className="text-sm font-bold text-blue-400">฿{product.price}</p>
                  </div>
                  <button className="bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 text-[11px] font-medium px-2.5 py-1 rounded-lg transition">
                    ดู
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}