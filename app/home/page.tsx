'use client';

import { useState } from 'react';
import { Sparkles, Box, Flame, Eye, Layers, ArrowUpRight, Tag } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    title: 'หนังสือเรียน CALCULUS II',
    price: '250 ฿',
    category: 'หนังสือ',
    is3D: true,
    isHot: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    glowColor: 'rgba(99, 102, 241, 0.35)',
  },
  {
    id: 2,
    title: 'เครื่องคิดเลขวิทยาศาสตร์ FX-991EX',
    price: '650 ฿',
    category: 'อุปกรณ์การเรียน',
    is3D: true,
    isHot: false,
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=500&auto=format&fit=crop&q=60',
    glowColor: 'rgba(236, 72, 153, 0.35)',
  },
];

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | '3d' | 'hot'>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardState, setCardState] = useState<{ [key: number]: { x: number; y: number; mouseX: number; mouseY: number } }>({});

  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedCategory === '3d') return item.is3D;
    if (selectedCategory === 'hot') return item.isHot;
    return true;
  });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setCardState((prev) => ({
      ...prev,
      [id]: { x: rotateX, y: rotateY, mouseX: x, mouseY: y },
    }));
  };

  const handleCardMouseLeave = (id: number) => {
    setCardState((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0, mouseX: 0, mouseY: 0 },
    }));
    setHoveredCard(null);
  };

  return (
    <div style={{ backgroundColor: '#070a12', minHeight: '100vh', padding: '24px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* 1. Floating Category Dock */}
        <div style={{ zIndex: 10 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            padding: '8px',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: selectedCategory === 'all' ? 'linear-gradient(to right, #4f46e5, #9333ea)' : 'transparent',
                color: selectedCategory === 'all' ? '#ffffff' : '#94a3b8',
                boxShadow: selectedCategory === 'all' ? '0 0 15px rgba(99,102,241,0.5)' : 'none'
              }}
            >
              <Layers style={{ width: '16px', height: '16px' }} />
              ทั้งหมด ({PRODUCTS.length})
            </button>

            <button
              onClick={() => setSelectedCategory('3d')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: selectedCategory === '3d' ? 'linear-gradient(to right, #06b6d4, #2563eb)' : 'transparent',
                color: selectedCategory === '3d' ? '#ffffff' : '#94a3b8',
                boxShadow: selectedCategory === '3d' ? '0 0 15px rgba(6,182,212,0.5)' : 'none'
              }}
            >
              <Box style={{ width: '16px', height: '16px', color: '#67e8f9' }} />
              โมเดล 3D Interactive
            </button>

            <button
              onClick={() => setSelectedCategory('hot')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: selectedCategory === 'hot' ? 'linear-gradient(to right, #f59e0b, #e11d48)' : 'transparent',
                color: selectedCategory === 'hot' ? '#ffffff' : '#94a3b8',
                boxShadow: selectedCategory === 'hot' ? '0 0 15px rgba(244,63,94,0.5)' : 'none'
              }}
            >
              <Flame style={{ width: '16px', height: '16px', color: '#fcd34d' }} />
              สินค้ามาแรง
            </button>
          </div>
        </div>

        {/* Header Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 700, margin: 0 }}>
            <Sparkles style={{ width: '18px', height: '18px', color: '#818cf8' }} />
            รายการสินค้าไฮไลท์
          </h3>
          <span style={{ fontSize: '12px', color: '#a5b4fc', backgroundColor: 'rgba(30, 27, 75, 0.6)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '4px 12px', borderRadius: '20px' }}>
            {filteredProducts.length} รายการ
          </span>
        </div>

        {/* 2. Immersive 3D Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', perspective: '1200px' }}>
          {filteredProducts.map((item) => {
            const state = cardState[item.id] || { x: 0, y: 0, mouseX: 0, mouseY: 0 };
            const isHovered = hoveredCard === item.id;

            return (
              <div
                key={item.id}
                onMouseMove={(e) => handleCardMouseMove(e, item.id)}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => handleCardMouseLeave(item.id)}
                style={{
                  transform: `rotateX(${state.x}deg) rotateY(${state.y}deg)`,
                  transformStyle: 'preserve-3d',
                  position: 'relative',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: isHovered ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '16px',
                  transition: 'all 0.2s ease-out',
                  backdropFilter: 'blur(20px)',
                  boxShadow: isHovered ? '0 25px 50px rgba(0, 0, 0, 0.9)' : '0 15px 30px rgba(0, 0, 0, 0.6)',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                {/* Spotlight Cursor Dynamic Glow */}
                <div
                  style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    inset: 0,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s',
                    background: `radial-gradient(300px circle at ${state.mouseX}px ${state.mouseY}px, ${item.glowColor}, transparent 80%)`,
                    zIndex: 0
                  }}
                />

                {/* Image Frame */}
                <div style={{
                  transform: 'translateZ(30px)',
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#020617',
                  marginBottom: '16px',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.5s ease-out'
                    }}
                  />

                  {/* 3D Tag */}
                  {item.is3D && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(2, 6, 23, 0.85)',
                      border: '1px solid rgba(6, 182, 212, 0.5)',
                      color: '#67e8f9',
                      fontSize: '10px',
                      fontWeight: 700,
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 0 12px rgba(6,182,212,0.4)'
                    }}>
                      <Box style={{ width: '12px', height: '12px' }} />
                      3D MODEL
                    </div>
                  )}

                  {/* Hot Tag */}
                  {item.isHot && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(69, 10, 10, 0.85)',
                      border: '1px solid rgba(244, 63, 94, 0.5)',
                      color: '#fda4af',
                      fontSize: '10px',
                      fontWeight: 700,
                      backdropFilter: 'blur(8px)'
                    }}>
                      <Flame style={{ width: '12px', height: '12px', color: '#f43f5e' }} /> HOT
                    </div>
                  )}

                  {/* Hover Overlay Button */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(2, 6, 23, 0.75)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isHovered ? 1 : 0,
                    transition: 'all 0.3s'
                  }}>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      background: 'linear-gradient(to right, #6366f1, #a855f7)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 0 20px rgba(99,102,241,0.6)'
                    }}>
                      <Eye style={{ width: '16px', height: '16px' }} /> ดูโมเดล 3D แบบเต็มตา
                    </button>
                  </div>
                </div>

                {/* Details Container */}
                <div style={{ transform: 'translateZ(20px)', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '10px',
                      color: '#a5b4fc',
                      fontWeight: 600,
                      backgroundColor: 'rgba(30, 27, 75, 0.6)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      border: '1px solid rgba(99,102,241,0.2)'
                    }}>
                      <Tag style={{ width: '12px', height: '12px' }} /> {item.category}
                    </span>
                    <ArrowUpRight style={{ width: '16px', height: '16px', color: isHovered ? '#ffffff' : '#64748b' }} />
                  </div>

                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '4px' }}>
                    <div>
                      <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>ราคาเริ่มต้น</p>
                      <span style={{ fontSize: '18px', fontWeight: 900, color: '#c084fc' }}>
                        {item.price}
                      </span>
                    </div>

                    <span style={{ fontSize: '10px', color: '#34d399', backgroundColor: 'rgba(6, 78, 59, 0.5)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 8px', borderRadius: '8px' }}>
                      สภาพ 95%+
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}