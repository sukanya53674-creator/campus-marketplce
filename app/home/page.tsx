"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  seller: string;
  image: string;
  condition: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    title: "หนังสือเรียน Calculus 1 (สภาพ 90%)",
    price: 180,
    category: "หนังสือ",
    seller: "ทีมอ 3",
    condition: "สภาพดีมาก",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
  },
  {
    id: 2,
    title: "เครื่องคิดเลขวิทยาศาสตร์ Casio FX-991EX",
    price: 450,
    category: "อุปกรณ์การเรียน",
    seller: "บอส วิศวะ",
    condition: "ใช้งานปกติ",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&q=80",
  },
  {
    id: 3,
    title: "เสื้อโค้ท / แจ็กเก็ต ยูนิโคล่ ไซส์ M",
    price: 320,
    category: "เสื้อผ้า",
    seller: "พลอย บัญชี",
    condition: "มือสองสภาพนางฟ้า",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
  },
  {
    id: 4,
    title: "จักรยานปั่นในมหาลัย สภาพดีพร้อมปั่น",
    price: 850,
    category: "ของใช้หอพัก",
    seller: "กอล์ฟ สถาปัตย์",
    condition: "พร้อมใช้งาน",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80",
  },
];

const categories = ["ทั้งหมด", "หนังสือ", "อุปกรณ์การเรียน", "เสื้อผ้า", "ของใช้หอพัก"];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  const filteredProducts = sampleProducts.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ทั้งหมด" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#070913] text-slate-100 pb-20 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden relative"
    >
      {/* Dynamic Ambient Background Glows */}
      <div 
        className="fixed -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
      />
      <div 
        className="fixed top-1/2 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${-mousePos.x * 2}px, ${-mousePos.y * 2}px)` }}
      />

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-8 relative z-10">
        
        {/* Experimental Futuristic Header */}
        <header className="flex justify-between items-center bg-white/[0.03] backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-[#0b0e1b] rounded-[15px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-pink-400">
                CM
              </div>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hub</span>
              </h1>
              <p className="text-[11px] text-slate-400">3D Immersive Marketplace</p>
            </div>
          </div>
          
          <button className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none">
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full group-hover:opacity-100 transition duration-300"></span>
            <span className="relative px-4 py-2 rounded-full bg-[#0b0e1b] text-xs font-semibold text-slate-200 transition-all duration-300 group-hover:bg-transparent group-hover:text-white flex items-center gap-1.5">
              <span>✨</span> เข้าสู่ระบบ
            </span>
          </button>
        </header>

        {/* 3D Glass Hero Banner */}
        <section 
          className="relative rounded-3xl p-7 overflow-hidden border border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.01] backdrop-blur-2xl shadow-2xl group transition-all duration-500 hover:border-indigo-500/40"
          style={{
            transform: `perspective(1000px) rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/30 to-pink-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>

          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              นิสิต-นักศึกษา Marketplace
            </span>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white leading-tight">
                ส่งต่อของไม่ได้ใช้ <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                  รับเงินไว ปลอดภัยในรั้วมหาลัย
                </span>
              </h2>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/add-product"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
              >
                <span>🚀</span> ลงประกาศขายฟรี
              </Link>
            </div>
          </div>
        </section>

        {/* Floating Futuristic Search Bar */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-[#0d1226]/90 border border-white/10 rounded-2xl px-4 py-3 shadow-xl backdrop-blur-xl">
            <span className="text-indigo-400 text-lg mr-3">🔍</span>
            <input
              type="text"
              placeholder="ค้นหาสินค้ามือสอง เช่น หนังสือ, เครื่องคิดเลข..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Experimental Floating Category Pills */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 active:scale-95 ${
                  isActive
                    ? "text-white shadow-lg shadow-indigo-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-white/5"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl -z-10 animate-fade-in"></span>
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Interactive 3D Product Grid */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <span>🔥</span> สินค้ามาใหม่ล่าสุด
            </h3>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
              {filteredProducts.length} รายการ
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 overflow-hidden backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-80"></div>
                  
                  <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-indigo-300 text-[10px] font-bold px-2.5 py-1 rounded-xl border border-white/10">
                    {product.category}
                  </span>
                </div>

                <div className="p-4 relative z-10 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 line-clamp-2 leading-relaxed group-hover:text-indigo-300 transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
                      <span>👤</span> {product.seller}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">ราคา</p>
                      <p className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                        ฿{product.price.toLocaleString()}
                      </p>
                    </div>

                    <button className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-md">
                      ➔
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 rounded-3xl border border-dashed border-white/10 bg-white/[0.01]">
              <p className="text-slate-400 text-sm">ไม่พบรายการสินค้าที่คุณกำลังตามหา 🚀</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}