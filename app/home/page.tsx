"use client";

import React, { useState } from "react";

// ข้อมูลจำลองสินค้า
const PRODUCTS = [
  {
    id: 1,
    title: "หนังสือเรียน Calculus 1 (สภาพ 90%)",
    price: 180,
    category: "หนังสือ",
    seller: "ทีมอ 3",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
  },
  {
    id: 2,
    title: "เครื่องคิดเลขวิทยาศาสตร์ Casio FX-991EX",
    price: 450,
    category: "อุปกรณ์การเรียน",
    seller: "บอส วิศวะ",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&q=80",
  },
  {
    id: 3,
    title: "เสื้อโค้ท / แจ็กเก็ต ยูนิโคล่ ไซส์ M",
    price: 320,
    category: "เสื้อผ้า",
    seller: "พลอย บัญชี",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
  },
  {
    id: 4,
    title: "จักรยานปั่นในมหาลัย สภาพดีพร้อมปั่น",
    price: 850,
    category: "ของใช้หอพัก",
    seller: "กอล์ฟ สถาปัตย์",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b1329] text-white font-sans pb-16">
      {/* Container หลัก: จำกัดความกว้างตรงกลาง ไม่ให้เต็มจอเกะกะ */}
      <div className="max-w-3xl mx-auto px-4 pt-8">
        
        {/* Banner สีน้ำเงินสด */}
        <div className="bg-[#1d4ed8] rounded-2xl p-6 mb-8 flex items-center justify-between shadow-lg">
          <div>
            <h2 className="text-xl font-bold mb-1">มีของไม่ได้ใช้ไหม?</h2>
            <p className="text-blue-100 text-sm">นำมาลงขายให้เพื่อนๆ ในวิทยาลัยได้เลย</p>
          </div>
          <button className="bg-white text-slate-900 font-semibold text-sm px-4 py-2 rounded-full hover:bg-slate-100 transition-colors shadow">
            + ลงขาย
          </button>
        </div>

        {/* หัวข้อรายการสินค้า */}
        <h3 className="text-lg font-bold text-white mb-4">รายการสินค้าล่าสุด</h3>

        {/* ตารางสินค้า Grid 2 คอลัมน์ แบบเดียวกับในรูป */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-[#1e293b] rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all flex flex-col justify-between"
            >
              {/* รูปภาพสินค้า */}
              <div className="h-44 w-full bg-slate-800 relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* รายละเอียดสินค้า */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-slate-700/60 text-slate-300 text-xs px-2.5 py-1 rounded-md mb-2 font-medium">
                    {product.category}
                  </span>
                  <h4 className="font-medium text-sm text-slate-100 line-clamp-2 mb-3">
                    {product.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-blue-400 font-bold text-base">
                    ฿{product.price}
                  </span>
                  <span className="text-xs text-slate-400">
                    {product.seller}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}