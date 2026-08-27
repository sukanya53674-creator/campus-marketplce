'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

  // หลอดโหลดนับถอยหลังเข้าสู่หน้าหลัก
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 4 : 100));
    }, 100);

    const timer = setTimeout(() => {
      router.push('/home');
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  // คำนวณพิกัดเมาส์ + คำนวณองศาเอียง 3D Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // คำนวณจุดศูนย์กลางเพื่อทำ Tilt 3D
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12; // เอียงแกน X
    const rotateY = ((x - centerX) / centerX) * 12;  // เอียงแกน Y

    setMousePos({ x, y });
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 }); // คืนค่าการเอียงเมื่อเมาส์ออก
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-[#090d16] text-white flex flex-col justify-between items-center p-6 relative overflow-hidden select-none [perspective:1000px]"
    >
      {/* 1. Dynamic Cursor Spotlight & Interactive Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-80 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129, 140, 248, 0.25), transparent 70%)`,
        }}
      />

      {/* 2. Ambient Mesh Orbs background */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header Tag */}
      <div className="w-full flex justify-between items-center pt-4 z-10 max-w-md">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-3 py-1 rounded-full backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          VERIFIED CAMPUS NETWORK
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full bg-slate-900/80 text-purple-300 border border-purple-500/30 backdrop-blur-md shadow-lg shadow-purple-950/40">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
          CampusHub 3D
        </span>
      </div>

      {/* 3. Hero Card with Interactive 3D Tilt & Glassmorphism */}
      <div
        className="relative group/card z-10 my-auto transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(79,70,229,0.2)] max-w-sm relative overflow-hidden transition-all duration-300 group-hover/card:border-indigo-500/50">
          
          {/* 光 (Light Sweep Effect) วิ่งข้ามการ์ด */}
          <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover/card:animate-shine" />

          {/* Glowing Icon Container */}
          <div className="relative mb-6 transform [transform:translateZ(30px)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-60 group-hover/card:opacity-100 transition duration-500 animate-pulse" />
            <div className="relative w-22 h-22 p-5 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 transform transition-transform duration-300 group-hover/card:scale-110">
              <ShoppingBag className="w-10 h-10 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
            </div>
          </div>

          {/* 3D Dynamic Title */}
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl relative transform [transform:translateZ(20px)]">
            <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              Campus{' '}
            </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(129,140,248,0.8)]">
              Marketplace
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-xs leading-relaxed max-w-xs text-slate-300/90 font-normal transform [transform:translateZ(10px)]">
            ศูนย์รวมตลาดนัดออนไลน์ชาววิทยาลัย สัมผัสประสบการณ์ช้อปปิ้งมิติใหม่ในรั้วเดียวกัน
          </p>

          {/* Badge ยืนยันระบบ 3D */}
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-300 font-medium">
            <Zap className="w-3 h-3 text-purple-400 animate-bounce" /> 3D Interactive Supported
          </div>
        </div>
      </div>

      {/* 4. Action Area & Energy Progress Bar */}
      <div className="w-full max-w-xs space-y-4 z-10 mb-6">
        <button
          onClick={() => router.push('/home')}
          className="relative group/btn w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2 tracking-wide text-sm drop-shadow-md">
            เข้าสู่ตลาดเด็กหอ 
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </span>
        </button>

        {/* Progress Bar หลอดโหลดไฟนีออน */}
        <div className="space-y-1.5">
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-400 rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-[11px] text-indigo-300/70 font-light tracking-wider">
            กำลังเชื่อมต่อระบบ {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}