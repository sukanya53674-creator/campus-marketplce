'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="min-h-screen bg-slate-950 text-white flex flex-col justify-between items-center p-6 relative overflow-hidden select-none"
    >
      {/* 1. Dynamic Interactive Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.22), transparent 70%)`,
        }}
      />

      {/* 2. Ambient Mesh Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse delay-1000" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header Tag */}
      <div className="w-full flex justify-end pt-4 z-10">
        <span className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full bg-slate-900/60 text-indigo-300 border border-indigo-500/30 backdrop-blur-md shadow-inner shadow-indigo-500/10 hover:border-indigo-400/60 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="bg-gradient-to-r from-indigo-200 via-white to-purple-300 bg-clip-text text-transparent font-medium">
            Campus Market v1.0
          </span>
        </span>
      </div>

      {/* 3. Hero Card (กระจก 3D Glassmorphism + 3D Text Dynamics) */}
      <div className="relative group/card z-10 my-auto">
        <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-950/50 max-w-sm transition-all duration-300 hover:border-indigo-500/40 hover:shadow-indigo-500/20">
          
          {/* Glowing Icon Container */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-3xl bg-indigo-500 blur-xl opacity-50 group-hover/card:opacity-80 transition duration-500 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-3xl flex items-center justify-center shadow-2xl transform transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-3">
              <ShoppingBag className="w-10 h-10 text-white drop-shadow-md" />
            </div>
          </div>

          {/* 3D Dynamic Title: ตัวหนังสือลอยมีมิติเรืองแสง */}
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl relative">
            <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(255,255,255,0.2)]">
              Campus{' '}
            </span>
            <span className="relative inline-block bg-gradient-to-r from-indigo-400 via-purple-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.6)] [text-shadow:_0_2px_10px_rgba(168,85,247,0.4)]">
              Marketplace
            </span>
          </h1>

          {/* Subtitle พร้อม Metallic Glow และมิติความลึก */}
          <p className="mt-3 text-sm leading-relaxed max-w-xs bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 bg-clip-text text-transparent font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            ตลาดนัดออนไลน์ชาววิทยาลัย ซื้อง่าย ขายคล่อง ปลอดภัยในรั้วเดียวกัน
          </p>
        </div>
      </div>

      {/* 4. Action Area */}
      <div className="w-full max-w-xs space-y-3 z-10 mb-8">
        <button
          onClick={() => router.push('/home')}
          className="relative group/btn w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden"
        >
          {/* Light sweep effect บนปุ่ม */}
          <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000 ease-out" />
          
          <span className="relative z-10 flex items-center gap-2 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            เข้าสู่ตลาดเด็กหอ 
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </span>
        </button>

        <p className="text-center text-xs text-indigo-200/60 font-light tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
          กำลังนำคุณเข้าสู่ระบบอัตโนมัติ...
        </p>
      </div>
    </div>
  );
}