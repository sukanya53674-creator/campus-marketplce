"use client";

import React, { useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  seller: string;
  image: string;
}

const PRODUCTS: Product[] = [
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

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = PRODUCTS.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#0b1329", minHeight: "100vh", color: "#ffffff", paddingBottom: "40px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "20px 16px" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#ffffff" }}>Campus Market</h1>
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: "4px 0 0 0" }}>ตลาดนัดเด็กวิทยาลัย</p>
          </div>
          <button style={{ backgroundColor: "#1e293b", border: "1px solid #334155", color: "#fff", padding: "8px 16px", borderRadius: "20px", fontSize: "14px", cursor: "pointer" }}>
            👤 เข้าสู่ระบบ
          </button>
        </div>



        {/* Search */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="🔍 ค้นหาสินค้า เช่น หนังสือ, เครื่องคิดเลข..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #334155",
              backgroundColor: "#1e293b",
              color: "#ffffff",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Banner - ถอด whitespace ออกอย่างสมบูรณ์ */}
        <div style={{ backgroundColor: "#1d4ed8", borderRadius: "16px", padding: "20px", marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 4px 0", color: "#ffffff" }}>มีของไม่ได้ใช้ไหม?</h2>
            <p style={{ fontSize: "13px", color: "#dbeafe", margin: 0 }}>นำมาลงขายให้เพื่อนๆ ในวิทยาลัยได้เลยง่ายๆ</p>
          </div>
          <button style={{ backgroundColor: "#ffffff", color: "#0f172a", border: "none", padding: "8px 16px", borderRadius: "20px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" }}>
            + ลงขายเลย
          </button>
        </div>

        {/* Product Grid */}
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "#ffffff" }}>
          สินค้าล่าสุด ({filteredProducts.length})
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #334155",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div style={{ height: "180px", width: "100%", backgroundColor: "#334155" }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ backgroundColor: "#334155", color: "#cbd5e1", fontSize: "11px", padding: "4px 8px", borderRadius: "6px", fontWeight: "500" }}>
                    {product.category}
                  </span>
                  <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#f8fafc", margin: "8px 0 12px 0", lineHeight: "1.4" }}>
                    {product.title}
                  </h4>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid #334155" }}>
                  <span style={{ color: "#60a5fa", fontWeight: "bold", fontSize: "16px" }}>
                    ฿{product.price}
                  </span>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>
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