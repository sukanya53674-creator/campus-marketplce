'use client';

import { useState } from 'react';
import { Sparkles, Box, Flame, Eye, Layers, Compass, ArrowUpRight, Tag } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    title: 'หนังสือเรียน CALCULUS II',
    price: '250 ฿',
    category: 'หนังสือ',
    is3D: true,
    isHot: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    glowColor: 'rgba(99, 102, 241, 0.25)', // Indigo glow
    accentColor: 'from-indigo-500 to-purple-600',
  },
  {
    id: 2,
    title: 'เครื่องคิดเลขวิทยาศาสตร์ FX-991EX',
    price: '650 ฿',
    category: 'อุปกรณ์การเรียน',
    is3D: true,
    isHot: false,
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=500&auto=format&fit=crop&q=60',
    glowColor: 'rgba(236, 72, 153, 0.25)', // Pink glow
    accentColor: 'from-pink-500 to-rose-600',
  },
];

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | '3d' | 'hot'>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardState, setCardState] = useState<{ [key: number]: { x: number; y: number; mouseX: number; mouseY: number } }>({});

  // กรองสินค้าตามหมวดหมู่จริง
  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedCategory === '3d') return item.is3D;
    if (selectedCategory === 'hot') return item.isHot;
    return true;
  });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setCardState((prev) => ({
      ...prev,
      [id]: { x: rotateX, y: rotateY, mouseX: x, mouseY: y },
    }));
  };

  const handleCardMouseLeave = (id: number) => {
    setCardState((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0, mouseX: 0, mouseY: 0 },
    }));
    setHoveredCard(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Experimental Floating Holographic Navigation Dock */}
      <div className="relative z-10 py-1">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-2 bg-slate-950/70 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden ${
              selectedCategory === 'all'
                ? 'text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            {selectedCategory === 'all' && (
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient-x z-0" />
            )}
            <Layers className="w-4 h-4 relative z-10" />
            <span className="relative z-10">ทั้งหมด ({PRODUCTS.length})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('3d')}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden ${
              selectedCategory === '3d'
                ? 'text-white shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            {selectedCategory === '3d' && (
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 z-0" />
            )}
            <Box className="w-4 h-4 text-cyan-200 animate-spin relative z-10" style={{ animationDuration: '8s' }} />
            <span className="relative z-10">โมเดล 3D Interactive</span>
          </button>

          <button
            onClick={() => setSelectedCategory('hot')}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden ${
              selectedCategory === 'hot'
                ? 'text-white shadow-[0_0_20px_rgba(244,63,94,0.6)] scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            {selectedCategory === 'hot' && (
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 z-0" />
            )}
            <Flame className="w-4 h-4 text-amber-200 relative z-10 animate-bounce" />
            <span className="relative z-10">สินค้ามาแรง</span>
          </button>
        </div>
      </div>

      {/* Title Header */}
      <div className="flex justify-between items-center px-2">
        <h3 className="flex items-center gap-2 text-base font-bold text-white tracking-wide">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          รายการสินค้าไฮไลท์
        </h3>
        <span className="text-xs text-indigo-300/80 bg-indigo-950/60 border border-indigo-500/20 px-2.5 py-1 rounded-full backdrop-blur-md">
          {filteredProducts.length} รายการ
        </span>
      </div>

      {/* 2. Immersive 3D Interactive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ perspective: '1200px' }}>
        {filteredProducts.map((item) => {
          const state = cardState[item.id] || { x: 0, y: 0, mouseX: 0, mouseY: 0 };
          const isHovered = hoveredCard === item.id;

          return (
            <div
              key={item.id}
              onMouseMove={(e) => handleCardMouseMove(e, item.id)}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => handleCardMouseLeave(item.id)}
              style={{
                transform: `rotateX(${state.x}deg) rotateY(${state.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
              className="group relative rounded-3xl bg-slate-900/40 border border-white/10 hover:border-white/30 p-4 transition-all duration-200 ease-out backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer"
            >
              {/* Card Cursor Spotlight Effect */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: `radial-gradient(350px circle at ${state.mouseX}px ${state.mouseY}px, ${item.glowColor}, transparent 80%)`,
                }}
              />

              {/* Product Image Container */}
              <div
                className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-950 mb-4 border border-white/10 shadow-inner group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
                style={{ transform: 'translateZ(35px)' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Holographic 3D Tag */}
                {item.is3D && (
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-400/50 text-cyan-300 text-[10px] font-bold tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    <Box className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                    3D MODEL
                  </div>
                )}

                {/* Hot Deals Badge */}
                {item.isHot && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-[10px] font-bold backdrop-blur-md shadow-[0_0_12px_rgba(244,63,94,0.5)]">
                    <Flame className="w-3 h-3 text-rose-400" /> HOT
                  </div>
                )}

                {/* Hover Quick Action Overlay */}
                <div
                  className={`absolute inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-300 ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-95 transition-transform">
                    <Eye className="w-4 h-4" /> ดูโมเดล 3D แบบเต็มตา
                  </button>
                </div>
              </div>

              {/* Product Details Layer */}
              <div style={{ transform: 'translateZ(25px)' }} className="space-y-2 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center gap-1 text-[10px] text-indigo-300 font-semibold uppercase tracking-widest bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-500/20">
                    <Tag className="w-3 h-3" /> {item.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h4 className="text-sm font-extrabold text-white group-hover:text-indigo-200 transition-colors line-clamp-1">
                  {item.title}
                </h4>

                <div className="flex justify-between items-end pt-1">
                  <div>
                    <p className="text-[10px] text-slate-400 font-light">ราคาเริ่มต้น</p>
                    <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                      {item.price}
                    </span>
                  </div>

                  <span className="text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-lg backdrop-blur-md font-medium">
                    สภาพ 95%+
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}