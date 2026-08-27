'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight, Sparkles, Compass, Box, Flame, ShieldCheck, Orbit } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [activePortal, setActivePortal] = useState<string | null>(null);

  // หลอดโหลดนับถอยหลัง Interactive
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 4 : 100));
    }, 120);

    const timer = setTimeout(() => {
      router.push('/home');
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  // คำนวณพิกัดเมาส์สำหรับ 3D Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;

    setMousePos({ x, y });
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // ปุ่ม Experimental 3D Navigation Nodes
  const experimentalNodes = [
    { id: '3d-orbit', label: '3D Orbit', icon: Box, path: '/home?view=3d', color: 'from-cyan-500 to-blue-600' },
    { id: 'hot-deals', label: 'Hot Deals', icon: Flame, path: '/home?view=hot', color: 'from-amber-500 to-rose-600' },
    { id: 'explore', label: 'Explore', icon: Compass, path: '/home', color: 'from-indigo-500 to-purple-600' },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-[#070a12] text-white flex flex-col justify-between items-center p-6 relative overflow-hidden select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 1. Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.22), transparent 80%)`,
        }}
      />

      {/* Background Mesh Glowing Orbs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-purple-600/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-indigo-600/25 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Badges */}
      <div className="w-full flex justify-between items-center pt-2 z-20 max-w-md">
        <span className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider text-indigo-300 bg-slate-900/80 border border-indigo-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          VERIFIED CAMPUS NETWORK
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1 rounded-full bg-slate-900/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
          CampusHub 3D
        </span>
      </div>

      {/* 2. Main Interactive Card with Perspective 3D Tilt */}
      <div
        className="relative z-20 my-auto transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-sm relative overflow-hidden">
          
          {/* Icon Box Depth Layer */}
          <div 
            className="relative mb-6 transition-transform duration-300"
            style={{ transform: 'translateZ(45px)' }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 blur-xl opacity-60 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20">
              <ShoppingBag className="w-10 h-10 text-white drop-shadow-md" />
            </div>
          </div>

          {/* Title Depth Layer */}
          <h1 
            className="text-3xl font-black tracking-tight sm:text-4xl relative"
            style={{ transform: 'translateZ(35px)' }}
          >
            <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-md">
              Campus{' '}
            </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(129,140,248,0.8)]">
              Marketplace
            </span>
          </h1>

          <p 
            className="mt-3 text-xs leading-relaxed max-w-xs text-slate-300/90 font-normal"
            style={{ transform: 'translateZ(20px)' }}
          >
            ศูนย์รวมตลาดนัดออนไลน์ชาววิทยาลัย สัมผัสประสบการณ์ช้อปปิ้งมิติใหม่ในรั้วเดียวกัน
          </p>

          {/* 3. Experimental Immersive Navigation Nodes */}
          <div 
            className="mt-6 w-full pt-4 border-t border-slate-800/80"
            style={{ transform: 'translateZ(40px)' }}
          >
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-indigo-300 uppercase tracking-widest font-semibold mb-3">
              <Orbit className="w-3 h-3 text-indigo-400 animate-spin" />
              Experimental Navigation
            </div>
            
            <div className="flex justify-center items-center gap-2.5">
              {experimentalNodes.map((node) => {
                const Icon = node.icon;
                const isSelected = activePortal === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      setActivePortal(node.id);
                      setTimeout(() => router.push(node.path), 300);
                    }}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-indigo-600/40 border-indigo-400 scale-105 shadow-[0_0_20px_rgba(99,102,241,0.6)]'
                        : 'bg-slate-800/40 border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className={`p-2 rounded-xl bg-gradient-to-tr ${node.color} text-white shadow-md`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-300 font-medium">{node.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Action Button & Progress Bar */}
      <div className="w-full max-w-xs space-y-3.5 z-20 mb-4">
        <button
          onClick={() => router.push('/home')}
          className="relative group w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] active:scale-95 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2 tracking-wide text-sm">
            เข้าสู่ตลาดเด็กหอ 
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </button>

        {/* Energy Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-400 rounded-full transition-all duration-150 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-[11px] text-indigo-300/70 font-light tracking-wider">
            กำลังเชื่อมต่อมิติระบบ {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}