'use client';

import { useState } from 'react';
import { Sparkles, Rocket, Search, Flame } from 'lucide-react';

export default function HomePage() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // คำนวณเอียง 3D บน Hero Banner
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: (y / rect.height) * -12, y: (x / rect.width) * 12 });
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-white p-4 sm:p-6 space-y-6 pb-24">
      {/* 1. Header Bar ลอยมิติ */}
      <header className="flex justify-between items-center p-4 bg-slate-900/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30">
            C
          </div>
          <div>
            <h1 className="font-bold text-base bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              CampusHub 3D
            </h1>
            <p className="text-[10px] text-slate-400">3D Interactive Model Showcase</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all">
          เข้าสู่ระบบ
        </button>
      </header>

      {/* 2. Hero Section 3D Interactive Perspective */}
      <div style={{ perspective: '1000px' }}>
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
          className="relative rounded-3xl bg-gradient-to-br from-indigo-950/80 via-purple-900/40 to-slate-900/90 border border-indigo-500/30 p-8 text-center transition-transform duration-200 ease-out shadow-[0_20px_50px_rgba(79,70,229,0.25)] overflow-hidden"
        >
          {/* Neon Light Background Blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div style={{ transform: 'translateZ(20px)' }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Interactive 3D Orbit Experience
          </div>

          {/* Title ลอยมิติ */}
          <h2 style={{ transform: 'translateZ(35px)' }} className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
            กดเลือกสินค้าเพื่อเข้าดู<br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              โมเดล 3D ลอยตัวและลากหมุนดูได้เอง
            </span>
          </h2>

          <p style={{ transform: 'translateZ(20px)' }} className="text-xs text-slate-300/80 mb-6">
            โชว์เฉพาะตัวสินค้าแบบไร้ขอบบดบัง สัมผัสเสมือนจริง 360°
          </p>

          {/* Button ลอยเด่นสุด */}
          <div style={{ transform: 'translateZ(50px)' }}>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold rounded-2xl shadow-[0_10px_25px_rgba(255,255,255,0.3)] hover:scale-105 transition-all text-xs">
              <Rocket className="w-4 h-4 text-indigo-600" />
              ลงประกาศขายเลย
            </button>
          </div>
        </div>
      </div>

      {/* 3. Search Bar แบบนีออนลอย */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="ค้นหาหนังสือ, เครื่องคิดเลข, เสื้อผ้า..."
          className="w-full pl-11 pr-4 py-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-indigo-500 shadow-inner"
        />
      </div>
    </div>
  );
}