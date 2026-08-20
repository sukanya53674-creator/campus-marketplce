"use client";

import { useState, useEffect } from "react";
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

const categories = [
  { name: "ทั้งหมด", icon: "🌌" },
  { name: "หนังสือ", icon: "📚" },
  { name: "อุปกรณ์การเรียน", icon: "📐" },
  { name: "เสื้อผ้า", icon: "👕" },
  { name: "ของใช้หอพัก", icon: "🏠" },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("home");

  // Track Mouse Movement for 3D Perspective Tilt Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredProducts = sampleProducts.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ทั้งหมด" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{
      backgroundColor: "#05070e",
      color: "#f1f5f9",
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      paddingBottom: "110px",
      position: "relative",
      overflowX: "hidden"
    }}>
      
      {/* 3D Ambient Glowing Orbs Background */}
      <div style={{
        position: "fixed",
        top: "-10%",
        left: "-10%",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(0,0,0,0) 70%)",
        filter: "blur(80px)",
        pointerEvents: "none",
        transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`,
        transition: "transform 0.2s ease-out"
      }} />

      <div style={{
        position: "fixed",
        top: "40%",
        right: "-10%",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(217, 70, 239, 0.2) 0%, rgba(0,0,0,0) 70%)",
        filter: "blur(90px)",
        pointerEvents: "none",
        transform: `translate(${-mousePos.x * 1.2}px, ${-mousePos.y * 1.2}px)`,
        transition: "transform 0.2s ease-out"
      }} />

      {/* Main Container */}
      <main style={{ maxWidth: "640px", margin: "0 auto", padding: "20px 16px", position: "relative", zIndex: 2 }}>
        
        {/* Futuristic Glass Header */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "14px 20px",
          borderRadius: "24px",
          marginBottom: "24px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "900",
              fontSize: "18px",
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)"
            }}>
              C
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "900", background: "linear-gradient(to right, #818cf8, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                CampusHub 3D
              </h1>
              <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>Marketplace for College Life</p>
            </div>
          </div>

          <button style={{
            background: "rgba(255, 255, 255, 0.08)",
            color: "#f8fafc",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "8px 16px",
            borderRadius: "50px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            backdropFilter: "blur(10px)"
          }}>
            ⚡ เข้าสู่ระบบ
          </button>
        </header>

        {/* 3D Interactive Hero Card */}
        <section style={{
          perspective: "1000px",
          marginBottom: "24px"
        }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(88, 28, 135, 0.8) 100%)",
            backdropFilter: "blur(16px)",
            borderRadius: "28px",
            padding: "28px 24px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.2)",
            transform: `rotateX(${-mousePos.y * 0.2}deg) rotateY(${mousePos.x * 0.2}deg)`,
            transition: "transform 0.1s ease-out",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "180px",
              height: "180px",
              background: "linear-gradient(135deg, #818cf8, #ec4899)",
              borderRadius: "50%",
              filter: "blur(50px)",
              opacity: 0.5
            }} />

            <div style={{ position: "relative", zIndex: 2 }}>
              <span style={{
                backgroundColor: "rgba(99, 102, 241, 0.3)",
                border: "1px solid rgba(129, 140, 248, 0.5)",
                color: "#c7d2fe",
                fontSize: "11px",
                fontWeight: "bold",
                padding: "5px 14px",
                borderRadius: "20px",
                display: "inline-block",
                marginBottom: "14px"
              }}>
                ✨ 3D IMMERSIVE MARKET
              </span>
              <h2 style={{ fontSize: "24px", fontWeight: "900", margin: "0 0 10px 0", color: "#ffffff", lineHeight: "1.2" }}>
                ส่งต่อไอเทมไม่ได้ใช้ <br />
                <span style={{ background: "linear-gradient(to right, #a5b4fc, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  เปลี่ยนเป็นรายได้ในรั้วมหาลัย
                </span>
              </h2>
              <p style={{ fontSize: "13px", color: "#cbd5e1", margin: "0 0 20px 0" }}>
                ซื้อง่าย ขายคล่อง ปลอดภัย นัดรับในมอได้ทันที
              </p>
              
              <Link href="/add-product" style={{
                background: "linear-gradient(to right, #6366f1, #a855f7)",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "16px",
                fontWeight: "bold",
                fontSize: "13px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.5)"
              }}>
                🚀 + ลงประกาศขายเลย
              </Link>
            </div>
          </div>
        </section>

        {/* Floating Futuristic Search Field */}
        <div style={{ marginBottom: "24px", position: "relative" }}>
          <input
            type="text"
            placeholder="🔍 ค้นหาหนังสือ, เครื่องคิดเลข, เสื้อผ้า..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "rgba(15, 23, 42, 0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              padding: "16px 20px",
              borderRadius: "20px",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
            }}
          />
        </div>

        {/* Experimental Categories Scrollbar */}
        <div style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "12px",
          marginBottom: "24px",
          scrollbarWidth: "none"
        }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                style={{
                  backgroundColor: isActive ? "#6366f1" : "rgba(30, 41, 59, 0.6)",
                  backdropFilter: "blur(10px)",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  border: isActive ? "1px solid #818cf8" : "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "10px 18px",
                  borderRadius: "18px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: isActive ? "0 0 20px rgba(99, 102, 241, 0.5)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Interactive Product Cards Grid */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "900", color: "#f8fafc" }}>🔥 สินค้ามาใหม่ล่าสุด</h3>
          <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "bold" }}>{filteredProducts.length} รายการ</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px"
        }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.7)",
                backdropFilter: "blur(12px)",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
                transition: "transform 0.3s ease, border-color 0.3s ease"
              }}
            >
              <div style={{ position: "relative", height: "150px", backgroundColor: "#090d16" }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "rgba(15, 23, 42, 0.85)",
                  backdropFilter: "blur(8px)",
                  color: "#818cf8",
                  fontSize: "10px",
                  fontWeight: "800",
                  padding: "4px 10px",
                  borderRadius: "10px",
                  border: "1px solid rgba(129, 140, 248, 0.3)"
                }}>
                  {product.category}
                </span>
              </div>

              <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "13px", fontWeight: "700", color: "#f1f5f9", lineHeight: "1.4" }}>
                    {product.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: "11px", color: "#64748b" }}>👤 {product.seller}</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                  <div>
                    <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>ราคา</span>
                    <span style={{ fontSize: "16px", fontWeight: "900", background: "linear-gradient(to right, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      ฿{product.price.toLocaleString()}
                    </span>
                  </div>
                  <button style={{
                    backgroundColor: "rgba(99, 102, 241, 0.2)",
                    border: "1px solid rgba(99, 102, 241, 0.4)",
                    color: "#a5b4fc",
                    borderRadius: "12px",
                    padding: "6px 10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}>
                    ➔
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Experimental Floating Dock Navigation (Bottom Glass Bar) */}
      <nav style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 32px)",
        maxWidth: "480px",
        backgroundColor: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        borderRadius: "30px",
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(99, 102, 241, 0.3)",
        zIndex: 100
      }}>
        {[
          { id: "home", label: "หน้าแรก", icon: "🏠" },
          { id: "search", label: "ค้นหา", icon: "🔍" },
          { id: "add", label: "ลงขาย", icon: "➕" },
          { id: "profile", label: "โปรไฟล์", icon: "👤" },
        ].map((nav) => {
          const isActive = activeTab === nav.id;
          return (
            <button
              key={nav.id}
              onClick={() => setActiveTab(nav.id)}
              style={{
                background: isActive ? "linear-gradient(135deg, #6366f1, #a855f7)" : "transparent",
                border: "none",
                borderRadius: "20px",
                padding: isActive ? "8px 16px" : "8px 12px",
                color: isActive ? "#ffffff" : "#64748b",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: isActive ? "0 0 15px rgba(99, 102, 241, 0.6)" : "none",
                transition: "all 0.3s ease"
              }}
            >
              <span style={{ fontSize: "16px" }}>{nav.icon}</span>
              {isActive && <span>{nav.label}</span>}
            </button>
          );
        })}
      </nav>

    </div>
  );
}