'use client';

import { useState } from 'react';
import { Sparkles, Box, Flame, Eye, Layers, Compass } from 'lucide-react';

// ตัวอย่างข้อมูลสินค้าพร้อมข้อมูล 3D
const PRODUCTS = [
  {
    id: 1,
    title: 'หนังสือเรียน CALCULUS II',
    price: '250 ฿',
    category: 'หนังสือ',
    is3D: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    id: 2,
    title: 'เครื่องคิดเลขวิทยาศาสตร์ FX-991EX',
    price: '650 ฿',
    category: 'อุปกรณ์การเรียน',
    is3D: true,
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=500&auto=format&fit=crop&q=60',
    color: 'from-purple-500/20 to-pink-500/20',
  },
];

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [tiltMap, setTiltMap] = useState<{ [key: number]: { x: number; y: number } }>({});

  // คำนวณ 3D Perspective Tilt สำหรับการ์ดสินค้าแต่ละใบ
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTiltMap((prev) => ({
      ...prev,
      [id]: { x: (y / rect.height) * -15, y: (x / rect.width) * 15 },
    }));
  };

  const handleCardMouseLeave = (id: number) => {
    setTiltMap((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
    setHoveredCard(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Experimental 3D Floating Category Dock (แถบเลือกหมวดหมู่มิติใหม่) */}
      <div className="relative z-10 py-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 bg-slate-900/80 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> ทั้งหมด
          </button>
          
          <button
            onClick={() => setSelectedCategory('3d')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
              selectedCategory === '3d'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> โมเดล 3D ลอยตัว
          </button>

          <button
            onClick={() => setSelectedCategory('hot')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
              selectedCategory === 'hot'
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" /> สินค้ามาแรง
          </button>
        </div>
      </div>

      {/* Title Header */}
      <div className="flex justify-between items-center px-1">
        <h3 className="flex items-center gap-2 text-base font-bold text-white">
          <Flame className="w-4 h-4 text-amber-500" /> สินค้ามาใหม่ล่าสุด
        </h3>
        <span className="text-xs text-indigo-400 font-medium">2 รายการ</span>
      </div>

      {/* 2. Immersive 3D Interactive Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ perspective: '1000px' }}>
        {PRODUCTS.map((item) => {
          const tilt = tiltMap[item.id] || { x: 0, y: 0 };
          const isHovered = hoveredCard === item.id;

          return (
            <div
              key={item.id}
              onMouseMove={(e) => handleCardMouseMove(e, item.id)}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => handleCardMouseLeave(item.id)}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
              className="group relative rounded-3xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/50 p-4 transition-all duration-200 ease-out backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.25)] overflow-hidden"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              {/* Product Image Container with 3D Depth */}
              <div 
                className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-950 mb-3 border border-white/5"
                style={{ transform: 'translateZ(30px)' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* 3D Holographic Badge */}
                {item.is3D && (
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 border border-cyan-500/50 text-cyan-300 text-[10px] font-bold backdrop-blur-md shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                    <Box className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                    3D VIEW
                  </div>
                )}

                {/* Overlay Action Button */}
                <div className={`absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/40 hover:scale-105 transition-transform">
                    <Eye className="w-3.5 h-3.5" /> สัมผัสโมเดล 3D
                  </button>
                </div>
              </div>

              {/* Product Details Layer */}
              <div style={{ transform: 'translateZ(20px)' }} className="space-y-1.5">
                <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                    {item.price}
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
                    สภาพดี
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