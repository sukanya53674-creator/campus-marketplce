"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  seller: string;
  image: string;
}

const sampleProducts: Product[] = [
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
  const [activeTab, setActiveTab] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredProducts = sampleProducts.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ทั้งหมด" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const theme = {
    bg: isDarkMode ? "#05070e" : "#f1f5f9",
    text: isDarkMode ? "#f1f5f9" : "#0f172a",
    subText: isDarkMode ? "#94a3b8" : "#64748b",
    cardBg: isDarkMode ? "rgba(15, 23, 42, 0.75)" : "rgba(255, 255, 255, 0.8)",
    border: isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)",
    dockBg: isDarkMode ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.85)",
    shadow: isDarkMode ? "rgba(0, 0, 0, 0.6)" : "rgba(148, 163, 184, 0.3)",
    inputBg: isDarkMode ? "rgba(15, 23, 42, 0.75)" : "#ffffff",
  };

  return (
    <div style={{
      backgroundColor: theme.bg,
      color: theme.text,
      minHeight: "100vh",
      fontFamily: "system-ui, -apple-system, sans-serif",
      paddingBottom: "110px",
      position: "relative",
      overflowX: "hidden",
      transition: "background-color 0.3s ease, color 0.3s ease"
    }}>
      
      {/* Container */}
      <main style={{ maxWidth: "640px", margin: "0 auto", padding: "20px 16px", position: "relative", zIndex: 2 }}>
        
        {/* Header */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.cardBg,
          backdropFilter: "blur(16px)",
          border: `1px solid ${theme.border}`,
          padding: "14px 20px",
          borderRadius: "24px",
          marginBottom: "24px",
          boxShadow: `0 20px 40px ${theme.shadow}`
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
              color: "#ffffff",
              fontWeight: "900",
              fontSize: "18px"
            }}>
              C
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "900", background: "linear-gradient(to right, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                CampusHub 3D
              </h1>
              <p style={{ margin: 0, fontSize: "11px", color: theme.subText }}>3D Immersive Marketplace</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0",
                color: isDarkMode ? "#f8fafc" : "#0f172a",
                border: `1px solid ${theme.border}`,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            <button style={{
              background: "linear-gradient(to right, #6366f1, #a855f7)",
              color: "#ffffff",
              border: "none",
              padding: "9px 18px",
              borderRadius: "50px",
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer"
            }}>
              เข้าสู่ระบบ
            </button>
          </div>
        </header>

        {/* 3D Glass Hero Banner */}
        <section style={{ marginBottom: "24px" }}>
          <div style={{
            background: isDarkMode 
              ? "linear-gradient(135deg, rgba(30, 27, 75, 0.85) 0%, rgba(88, 28, 135, 0.85) 100%)"
              : "linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)",
            backdropFilter: "blur(16px)",
            borderRadius: "28px",
            padding: "28px 24px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.3)",
            position: "relative",
            overflow: "hidden"
          }}>
            <span style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: "bold",
              padding: "5px 14px",
              borderRadius: "20px",
              display: "inline-block",
              marginBottom: "14px"
            }}>
              ✨ {isDarkMode ? "DARK MODE ACTIVE" : "LIGHT MODE ACTIVE"}
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: "900", margin: "0 0 10px 0", color: "#ffffff", lineHeight: "1.2" }}>
              ส่งต่อของไม่ได้ใช้ <br />
              <span style={{ background: "linear-gradient(to right, #a5b4fc, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                เปลี่ยนเป็นเงินไวในรั้วมหาลัย
              </span>
            </h2>
            <p style={{ fontSize: "13px", color: "#e0e7ff", margin: "0 0 20px 0" }}>
              ซื้อง่าย ขายคล่อง ปลอดภัย นัดรับในมอได้ทันที
            </p>
            
            <a href="/add-product" style={{
              background: "#ffffff",
              color: "#4338ca",
              padding: "12px 24px",
              borderRadius: "16px",
              fontWeight: "900",
              fontSize: "13px",
              textDecoration: "none",
              display: "inline-block",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)"
            }}>
              🚀 + ลงประกาศขายเลย
            </a>
          </div>
        </section>

        {/* Search Field */}
        <div style={{ marginBottom: "24px" }}>
          <input
            type="text"
            placeholder="🔍 ค้นหาหนังสือ, เครื่องคิดเลข, เสื้อผ้า..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: theme.inputBg,
              border: `1px solid ${theme.border}`,
              color: theme.text,
              padding: "16px 20px",
              borderRadius: "20px",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Categories Bar */}
        <div style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "12px",
          marginBottom: "24px"
        }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                style={{
                  backgroundColor: isActive ? "#6366f1" : theme.cardBg,
                  color: isActive ? "#ffffff" : theme.subText,
                  border: isActive ? "1px solid #818cf8" : `1px solid ${theme.border}`,
                  padding: "10px 18px",
                  borderRadius: "18px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* 3D FLOATING IMAGE PRODUCT GRID */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "900", color: theme.text }}>🔥 สินค้ามาใหม่ล่าสุด</h3>
          <span style={{ fontSize: "12px", color: theme.subText, fontWeight: "bold" }}>{filteredProducts.length} รายการ</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px"
        }}>
          {filteredProducts.map((product) => {
            const isHovered = hoveredCard === product.id;
            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: theme.cardBg,
                  backdropFilter: "blur(12px)",
                  borderRadius: "24px",
                  border: isHovered ? "1px solid #818cf8" : `1px solid ${theme.border}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: isHovered 
                    ? "0 20px 30px rgba(99, 102, 241, 0.3)" 
                    : `0 10px 20px ${theme.shadow}`,
                  transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
              >
                {/* 3D FLOATING IMAGE CONTAINER */}
                <div style={{
                  position: "relative",
                  height: "140px",
                  borderRadius: "24px 24px 0 0",
                  padding: "8px"
                }}>
                  <div style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "18px",
                    overflow: "hidden",
                    position: "relative"
                  }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                        transition: "transform 0.3s ease"
                      }}
                    />
                  </div>

                  <span style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    backgroundColor: "rgba(15, 23, 42, 0.85)",
                    color: "#818cf8",
                    fontSize: "10px",
                    fontWeight: "800",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    border: "1px solid rgba(129, 140, 248, 0.3)"
                  }}>
                    {product.category}
                  </span>
                </div>

                <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h4 style={{ margin: "0 0 6px 0", fontSize: "13px", fontWeight: "700", color: theme.text, lineHeight: "1.4" }}>
                      {product.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: "11px", color: theme.subText }}>👤 {product.seller}</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: `1px solid ${theme.border}` }}>
                    <div>
                      <span style={{ fontSize: "10px", color: theme.subText, display: "block" }}>ราคา</span>
                      <span style={{ fontSize: "16px", fontWeight: "900", background: "linear-gradient(to right, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        ฿{product.price.toLocaleString()}
                      </span>
                    </div>
                    <button style={{
                      backgroundColor: isHovered ? "#6366f1" : "rgba(99, 102, 241, 0.15)",
                      border: "none",
                      color: isHovered ? "#ffffff" : "#6366f1",
                      borderRadius: "10px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}>
                      ➔
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* Floating Bottom Dock Navigation */}
      <nav style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 32px)",
        maxWidth: "480px",
        backgroundColor: theme.dockBg,
        backdropFilter: "blur(20px)",
        border: `1px solid ${theme.border}`,
        borderRadius: "30px",
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow: `0 20px 40px ${theme.shadow}`,
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
                color: isActive ? "#ffffff" : theme.subText,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer"
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