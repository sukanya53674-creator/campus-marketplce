"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  seller: string;
  image: string;
  condition: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    title: "หนังสือเรียน Calculus 1 (สภาพ 90%)",
    price: 180,
    category: "หนังสือ",
    seller: "ทีมอ 3",
    condition: "สภาพดีมาก",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
  },
  {
    id: 2,
    title: "เครื่องคิดเลขวิทยาศาสตร์ Casio FX-991EX",
    price: 450,
    category: "อุปกรณ์การเรียน",
    seller: "บอส วิศวะ",
    condition: "ใช้งานปกติ",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&q=80",
  },
  {
    id: 3,
    title: "เสื้อโค้ท / แจ็กเก็ต ยูนิโคล่ ไซส์ M",
    price: 320,
    category: "เสื้อผ้า",
    seller: "พลอย บัญชี",
    condition: "มือสองสภาพนางฟ้า",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
  },
  {
    id: 4,
    title: "จักรยานปั่นในมหาลัย สภาพดีพร้อมปั่น",
    price: 850,
    category: "ของใช้หอพัก",
    seller: "กอล์ฟ สถาปัตย์",
    condition: "พร้อมใช้งาน",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80",
  },
];

const categories = ["ทั้งหมด", "หนังสือ", "อุปกรณ์การเรียน", "เสื้อผ้า", "ของใช้หอพัก"];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

  const filteredProducts = sampleProducts.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ทั้งหมด" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: "#090d16", color: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif", paddingBottom: "60px" }}>
      
      {/* Container */}
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px 16px" }}>
        
        {/* Header */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(30, 41, 59, 0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "12px 18px",
          borderRadius: "20px",
          marginBottom: "24px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "900", background: "linear-gradient(to right, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              CampusMarket
            </h1>
            <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#94a3b8" }}>3D Immersive Marketplace</p>
          </div>
          <button style={{
            backgroundColor: "#6366f1",
            color: "#ffffff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "14px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)"
          }}>
            👤 เข้าสู่ระบบ
          </button>
        </header>

        {/* 3D Glass Hero Banner */}
        <div style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)",
          borderRadius: "24px",
          padding: "24px",
          marginBottom: "24px",
          boxShadow: "0 20px 30px -10px rgba(79, 70, 229, 0.4)",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          <span style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: "bold",
            padding: "4px 12px",
            borderRadius: "20px",
            display: "inline-block",
            marginBottom: "12px"
          }}>
            ✨ นิสิต-นักศึกษา Marketplace
          </span>
          <h2 style={{ fontSize: "22px", fontWeight: "800", margin: "0 0 8px 0", color: "#ffffff", lineHeight: "1.3" }}>
            ส่งต่อของไม่ได้ใช้<br />รับเงินไว ปลอดภัยในรั้วมหาลัย
          </h2>
          <p style={{ fontSize: "13px", color: "#e0e7ff", margin: "0 0 16px 0" }}>
            เปลี่ยนของสะสม ของไม่ได้ใช้ เป็นรายได้ง่ายๆ
          </p>
          <Link href="/add-product" style={{
            backgroundColor: "#ffffff",
            color: "#4338ca",
            padding: "10px 20px",
            borderRadius: "14px",
            fontWeight: "bold",
            fontSize: "13px",
            textDecoration: "none",
            display: "inline-block",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}>
            🚀 ลงประกาศขายฟรี
          </Link>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="🔍 ค้นหาสินค้า เช่น หนังสือ, เครื่องคิดเลข..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              color: "#ffffff",
              padding: "14px 18px",
              borderRadius: "16px",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)"
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "20px" }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  backgroundColor: isActive ? "#6366f1" : "#1e293b",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  border: isActive ? "1px solid #818cf8" : "1px solid #334155",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 4px 12px rgba(99, 102, 241, 0.3)" : "none"
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>🔥 สินค้าแนะนำล่าสุด</h3>
          <span style={{ fontSize: "12px", color: "#64748b" }}>{filteredProducts.length} รายการ</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid #334155",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
              }}
            >
              <div style={{ position: "relative", height: "140px", backgroundColor: "#0f172a" }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  backgroundColor: "rgba(15, 23, 42, 0.8)",
                  backdropFilter: "blur(4px)",
                  color: "#cbd5e1",
                  fontSize: "10px",
                  fontWeight: "bold",
                  padding: "3px 8px",
                  borderRadius: "8px"
                }}>
                  {product.category}
                </span>
              </div>

              <div style={{ padding: "12px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "13px", fontWeight: "600", color: "#f1f5f9", lineHeight: "1.4" }}>
                    {product.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: "11px", color: "#64748b" }}>👤 {product.seller}</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "8px", borderTop: "1px solid #334155" }}>
                  <span style={{ fontSize: "15px", fontWeight: "800", color: "#818cf8" }}>
                    ฿{product.price.toLocaleString()}
                  </span>
                  <button style={{
                    backgroundColor: "#334155",
                    color: "#f8fafc",
                    border: "none",
                    borderRadius: "8px",
                    padding: "4px 8px",
                    fontSize: "11px",
                    cursor: "pointer"
                  }}>
                    ดู ➔
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}