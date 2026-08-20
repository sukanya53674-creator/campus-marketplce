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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans selection:bg-indigo-100">
      <div className="max-w-xl mx-auto px-4 pt-6 space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Campus<span className="text-indigo-600">Market</span>
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">ตลาดนัดส่งต่อของเด็กวิทยาลัย</p>
          </div>
          <button className="bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold py-2 px-4 rounded-full border border-slate-200 shadow-sm transition-all active:scale-95 flex items-center gap-2">
            <span className="text-lg">👋</span> เข้าสู่ระบบ
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-slate-400 group-focus-within:text-indigo-500 transition-colors">🔍</span>
          </div>
          <input
            type="text"
            placeholder="ค้นหาสินค้า เช่น หนังสือ, เครื่องคิดเลข..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm transition-all"
          />
        </div>

        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 shadow-lg shadow-indigo-200">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">มีของไม่ได้ใช้ไหม?</h2>
              <p className="text-sm text-indigo-100">เปลี่ยนของเก่าเป็นเงิน ส่งต่อให้เพื่อนๆ</p>
            </div>
            <Link
              href="/add-product"
              className="bg-white text-indigo-600 font-bold text-sm px-5 py-3 rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all shrink-0 active:scale-95"
            >
              + ลงขายเลย
            </Link>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div>
          <div className="flex justify-between items-end mb-5">
            <h3 className="text-lg font-bold text-slate-900">
              แนะนำสำหรับคุณ
            </h3>
            <span className="text-sm font-medium text-slate-500">{filteredProducts.length} รายการ</span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <Link 
                href={`#`} 
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="relative">
                  <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug mb-1">
                      {product.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-3">{product.seller}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-base font-extrabold text-indigo-600">
                      ฿{product.price.toLocaleString()}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <span className="text-sm">➔</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">ไม่พบสินค้าที่คุณค้นหา 🥲</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}