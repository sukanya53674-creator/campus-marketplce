'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between items-center p-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full flex justify-end pt-4">
        <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-indigo-400 border border-indigo-500/20">
          Campus Market v1.0
        </span>
      </div>
FF
      <div className="flex flex-col items-center text-center z-10 my-auto">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-500/40 mb-6 animate-bounce">
          <ShoppingBag className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Campus <span className="text-indigo-400">Marketplace</span>
        </h1>
        <p className="text-slate-400 mt-2 text-sm max-w-xs">
          ตลาดนัดออนไลน์ชาววิทยาลัย ซื้อง่าย ขายคล่อง ปลอดภัยในรั้วเดียวกัน
        </p>
      </div>

      <div className="w-full max-w-xs space-y-3 z-10 mb-8">
        <button
          onClick={() => router.push('/home')}
          className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-95"
        >
          เข้าสู่ตลาดเด็กหอ <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-center text-xs text-slate-500">กำลังนำคุณเข้าสู่ระบบอัตโนมัติ...</p>
      </div>
    </div>
  );
}