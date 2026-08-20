import Link from "next/link";

export default function SplashScreen() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-gradient-to-b from-blue-600 to-indigo-900 text-white dark:from-slate-900 dark:to-black">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm">
        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 border border-white/20 shadow-xl">
          <span className="text-5xl">🎓</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Campus Marketplace
        </h1> 
        <p className="text-blue-100 dark:text-gray-300 text-sm mb-8">
          ศูนย์กลางซื้อ-ขายแลกเปลี่ยนสินค้าของนักเรียนนักศึกษา ปลอดภัย สะดวก ในรั้ววิทยาลัย
        </p>
      </div>
ff
      <div className="w-full max-w-sm space-y-3 pb-6">
        <Link
          href="/home"
          className="w-full block text-center py-3.5 px-4 bg-white text-blue-900 font-bold rounded-2xl shadow-lg hover:bg-blue-50 transition active:scale-95"
        >
          เข้าสู่ตลาดสินค้า
        </Link>
        <Link
          href="/product"
          className="w-full block text-center py-3.5 px-4 bg-white/10 border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition active:scale-95"
        >
          ลงประกาศขายสินค้า
        </Link>
      </div>
    </main>
  );
}