'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Plus, Search, Sun, Moon, ShoppingBag, X } from 'lucide-react';
import { Product, INITIAL_PRODUCTS } from './product';

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form States
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('อุปกรณ์การเรียน');
  const [newSeller, setNewSeller] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newSeller) return;

    const newProd: Product = {
      id: Date.now(),
      title: newTitle,
      price: Number(newPrice),
      category: newCategory,
      seller: newSeller,
      condition: newCondition || 'สภาพดี',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=400'
    };

    setProducts([newProd, ...products]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewPrice('');
    setNewSeller('');
    setNewCondition('');
  };

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Campus Market</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">ตลาดนัดเด็กวิทยาลัย</p>
            </div>
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาสินค้า เช่น หนังสือ, พัดลม..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base">มีของไม่ได้ใช้ใช่ไหม?</h2>
            <p className="text-xs text-indigo-100 mt-0.5">ลงขายให้เพื่อนร่วมวิทยาลัยได้เลยง่ายๆ</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 bg-white text-indigo-600 font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1 active:scale-95 transition"
          >
            <Plus className="w-4 h-4" /> ลงขายเลย
          </button>
        </div>

        {/* Product List */}
        <div className="flex items-center justify-between pt-2">
          <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">
            สินค้าล่าสุด ({filteredProducts.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-3 flex gap-3 shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 rounded-xl object-cover flex-shrink-0 bg-slate-100 dark:bg-slate-800"
              />
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <span className="inline-block px-2 py-0.5 text-[10px] font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-md mb-1">
                    {product.category}
                  </span>
                  <h4 className="font-semibold text-sm line-clamp-1">{product.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{product.condition}</p>
                </div>

                <div className="flex items-end justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                  <span className="font-extrabold text-base text-indigo-600 dark:text-indigo-400">
                    ฿{product.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                    {product.seller}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-600/40 flex items-center justify-center hover:bg-indigo-500 active:scale-95 transition z-20"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg">ลงประกาศขายสินค้า</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">ชื่อสินค้า *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น หนังสือเรียน, เสื้อช็อป"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">ราคา (บาท) *</label>
                  <input
                    type="number"
                    required
                    placeholder="0"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">หมวดหมู่</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
                  >
                    <option value="หนังสือ">หนังสือ</option>
                    <option value="อุปกรณ์การเรียน">อุปกรณ์การเรียน</option>
                    <option value="เครื่องแต่งกาย">เครื่องแต่งกาย</option>
                    <option value="ไอที & ไอที">ไอที & ไอที</option>
                    <option value="ของใช้เด็กหอ">ของใช้เด็กหอ</option>
                  </select>
                </div>
              </div>


              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">ผู้ขาย (ชื่อ + แผนก/ชั้นปี) *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น สมชาย (คอมพิวเตอร์ ปี 2)"
                  value={newSeller}
                  onChange={(e) => setNewSeller(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">รายละเอียดสภาพสินค้า</label>
                <input
                  type="text"
                  placeholder="เช่น สภาพ 90%, ใช้งานปกติ"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-500 transition active:scale-95 mt-2"
              >
                บันทึกประกาศ
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}