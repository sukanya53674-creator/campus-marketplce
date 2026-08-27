'use client';

import { useState } from 'react';
import { Sparkles, Box, Flame, Eye, Layers, ArrowUpRight, Tag, Sun, Moon, X, Rotate3d } from 'lucide-react';

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
    condition: 'สภาพ 95%+',
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
    condition: 'สภาพ 90%+',
  },
  {
    id: 3,
    title: 'iPad Air 5 M1 64GB Space Gray',
    price: '14,500 ฿',
    category: 'ไอที & ไอแพด',
    is3D: true,
    isHot: true,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60',
    glowColor: 'rgba(59, 130, 246, 0.35)',
    condition: 'สภาพ 98%+',
  },
  {
    id: 4,
    title: 'หูฟังไร้สาย Sony WH-1000XM4',
    price: '5,900 ฿',
    category: 'อุปกรณ์การเรียน',
    is3D: false,
    isHot: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    condition: 'สภาพ 92%+',
  },
  {
    id: 5,
    title: 'โคมไฟอ่านหนังสือ LED ถนอมสายตา',
    price: '390 ฿',
    category: 'ของใช้ในหอ',
    is3D: true,
    isHot: false,
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500&auto=format&fit=crop&q=60',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    condition: 'ของใหม่ มือ 1',
  },
];

export default function ProductSection() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | '3d' | 'hot'>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [active3DModal, setActive3DModal] = useState<typeof PRODUCTS[0] | null>(null);
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
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

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

  // Theme Styles
  const theme = {
    bg: isDarkMode ? '#070a12' : '#f8fafc',
    cardBg: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
    textPrimary: isDarkMode ? '#ffffff' : '#0f172a',
    textSecondary: isDarkMode ? '#94a3b8' : '#64748b',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
    borderHover: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(99, 102, 241, 0.4)',
    dockBg: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    shadow: isDarkMode ? '0 15px 30px rgba(0,0,0,0.6)' : '0 10px 25px rgba(0,0,0,0.05)',
  };

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', padding: '24px', color: theme.textPrimary, fontFamily: 'sans-serif', transition: 'background-color 0.3s' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Navigation & Theme Toggle Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Floating Category Dock */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            padding: '6px 8px',
            backgroundColor: theme.dockBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '16px',
            backdropFilter: 'blur(16px)',
            boxShadow: theme.shadow
          }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: selectedCategory === 'all' ? 'linear-gradient(to right, #4f46e5, #9333ea)' : 'transparent',
                color: selectedCategory === 'all' ? '#ffffff' : theme.textSecondary,
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
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: selectedCategory === '3d' ? 'linear-gradient(to right, #06b6d4, #2563eb)' : 'transparent',
                color: selectedCategory === '3d' ? '#ffffff' : theme.textSecondary,
              }}
            >
              <Box style={{ width: '16px', height: '16px' }} />
              โมเดล 3D
            </button>

            <button
              onClick={() => setSelectedCategory('hot')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: selectedCategory === 'hot' ? 'linear-gradient(to right, #f59e0b, #e11d48)' : 'transparent',
                color: selectedCategory === 'hot' ? '#ffffff' : theme.textSecondary,
              }}
            >
              <Flame style={{ width: '16px', height: '16px' }} />
              สินค้ามาแรง
            </button>
          </div>

          {/* Day / Night Mode Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '14px',
              backgroundColor: theme.dockBg,
              border: `1px solid ${theme.border}`,
              color: theme.textPrimary,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '12px',
              boxShadow: theme.shadow,
              transition: 'all 0.3s'
            }}
          >
            {isDarkMode ? <Sun style={{ width: '16px', height: '16px', color: '#fbbf24' }} /> : <Moon style={{ width: '16px', height: '16px', color: '#6366f1' }} />}
            {isDarkMode ? 'โหมดกลางวัน' : 'โหมดกลางคืน'}
          </button>
        </div>

        {/* Section Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 700, margin: 0 }}>
            <Sparkles style={{ width: '18px', height: '18px', color: '#818cf8' }} />
            รายการสินค้าไฮไลท์
          </h3>
          <span style={{ fontSize: '12px', color: isDarkMode ? '#a5b4fc' : '#4f46e5', backgroundColor: isDarkMode ? 'rgba(30, 27, 75, 0.6)' : 'rgba(238, 242, 255, 1)', border: `1px solid ${theme.border}`, padding: '4px 12px', borderRadius: '20px' }}>
            {filteredProducts.length} รายการ
          </span>
        </div>

        {/* 3D Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', perspective: '1200px' }}>
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
                  backgroundColor: theme.cardBg,
                  border: isHovered ? `1px solid ${theme.borderHover}` : `1px solid ${theme.border}`,
                  padding: '16px',
                  transition: 'all 0.2s ease-out',
                  backdropFilter: 'blur(20px)',
                  boxShadow: theme.shadow,
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                {/* Spotlight Glow */}
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

                {/* Product Image Frame */}
                <div style={{
                  transform: 'translateZ(25px)',
                  position: 'relative',
                  width: '100%',
                  height: '190px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: isDarkMode ? '#020617' : '#e2e8f0',
                  marginBottom: '14px',
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
                      top: '10px',
                      left: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(2, 6, 23, 0.85)',
                      border: '1px solid rgba(6, 182, 212, 0.5)',
                      color: '#67e8f9',
                      fontSize: '10px',
                      fontWeight: 700,
                    }}>
                      <Box style={{ width: '12px', height: '12px' }} /> 3D MODEL
                    </div>
                  )}

                  {/* Hot Tag */}
                  {item.isHot && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
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
                    }}>
                      <Flame style={{ width: '12px', height: '12px', color: '#f43f5e' }} /> HOT
                    </div>
                  )}

                  {/* Quick Action Button */}
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
                    <button
                      onClick={() => setActive3DModal(item)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        background: 'linear-gradient(to right, #6366f1, #a855f7)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 0 20px rgba(99,102,241,0.6)'
                      }}
                    >
                      <Eye style={{ width: '16px', height: '16px' }} /> ดูโมเดล 3D แบบเต็มตา
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div style={{ transform: 'translateZ(20px)', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '10px',
                      color: isDarkMode ? '#a5b4fc' : '#4f46e5',
                      fontWeight: 600,
                      backgroundColor: isDarkMode ? 'rgba(30, 27, 75, 0.6)' : 'rgba(238, 242, 255, 1)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                    }}>
                      <Tag style={{ width: '12px', height: '12px' }} /> {item.category}
                    </span>
                    <ArrowUpRight style={{ width: '16px', height: '16px', color: theme.textSecondary }} />
                  </div>

                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: theme.textPrimary, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '4px' }}>
                    <div>
                      <p style={{ fontSize: '10px', color: theme.textSecondary, margin: 0 }}>ราคาเริ่มต้น</p>
                      <span style={{ fontSize: '18px', fontWeight: 900, color: isDarkMode ? '#c084fc' : '#7c3aed' }}>
                        {item.price}
                      </span>
                    </div>

                    <span style={{ fontSize: '10px', color: '#10b981', backgroundColor: isDarkMode ? 'rgba(6, 78, 59, 0.5)' : '#d1fae5', padding: '4px 8px', borderRadius: '8px', fontWeight: 600 }}>
                      {item.condition}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D Interactive Modal Viewer */}
      {active3DModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '650px',
            backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
            borderRadius: '24px',
            border: `1px solid ${theme.border}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Rotate3d style={{ width: '20px', height: '20px', color: '#06b6d4' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: theme.textPrimary }}>
                  3D Interactive Viewer: {active3DModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActive3DModal(null)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.textSecondary,
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Simulated 3D View Screen */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '320px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: isDarkMode ? '#020617' : '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={active3DModal.image}
                alt={active3DModal.title}
                style={{
                  width: '80%',
                  height: '80%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#ffffff',
                fontSize: '11px',
                padding: '6px 14px',
                borderRadius: '20px',
                backdropFilter: 'blur(4px)'
              }}>
                🖱️ หมุนมุมมองและขยายภาพได้แบบ 360°
              </div>
            </div>

            {/* Modal Bottom Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: theme.textSecondary }}>ราคา</span>
                <p style={{ fontSize: '20px', fontWeight: 900, color: '#8b5cf6', margin: 0 }}>{active3DModal.price}</p>
              </div>
              <button style={{
                padding: '10px 24px',
                backgroundColor: '#4f46e5',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                ติดต่อซื้อสินค้า
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}