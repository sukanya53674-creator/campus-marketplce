'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Box, Flame, Eye, Layers, ArrowUpRight, Tag, Sun, Moon, X, Rotate3d, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  is3D: boolean;
  isHot: boolean;
  image: string;
  glowColor: string;
  condition: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'หนังสือเรียน CALCULUS II',
    price: '250 ฿',
    category: 'หนังสือ',
    is3D: true,
    isHot: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60',
    glowColor: 'rgba(99, 102, 241, 0.45)',
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
    glowColor: 'rgba(236, 72, 153, 0.45)',
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
    glowColor: 'rgba(59, 130, 246, 0.45)',
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
    glowColor: 'rgba(245, 158, 11, 0.45)',
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
    glowColor: 'rgba(16, 185, 129, 0.45)',
    condition: 'ของใหม่ มือ 1',
  },
];

export default function ProductSection() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | '3d' | 'hot'>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardState, setCardState] = useState<{ [key: number]: { x: number; y: number; mouseX: number; mouseY: number } }>({});

  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const [active3DModal, setActive3DModal] = useState<Product | null>(null);
  const [rotation, setRotation] = useState({ x: 15, y: -25 });
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    setRotation((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.8,
    }));

    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  const open3DModal = (product: Product) => {
    setActive3DModal(product);
    setRotation({ x: 15, y: -25 });
    setZoom(1);
  };

  // ⚪ กลางวัน = ขาว (#ffffff) | ⬛ กลางคืน = ดำ (#000000)
  const theme = {
    bg: isDarkMode ? '#000000' : '#ffffff',
    cardBg: isDarkMode ? '#0d0d0d' : '#f8f9fa',
    textPrimary: isDarkMode ? '#ffffff' : '#000000',
    textSecondary: isDarkMode ? '#a1a1aa' : '#52525b',
    border: isDarkMode ? '#27272a' : '#e4e4e7',
    borderHover: isDarkMode ? '#71717a' : '#6366f1',
    dockBg: isDarkMode ? '#121212' : '#f4f4f5',
    shadow: isDarkMode ? '0 10px 30px rgba(0,0,0,1)' : '0 8px 20px rgba(0,0,0,0.06)',
  };

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', padding: '24px', color: theme.textPrimary, fontFamily: 'sans-serif', transition: 'background-color 0.3s ease', position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Cursor Light Spotlight */}
      <div
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${isDarkMode ? 'rgba(99, 102, 241, 0.18)' : 'rgba(99, 102, 241, 0.08)'}, transparent 80%)`,
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 2 }}>
        
        {/* Navigation & Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            padding: '6px 8px',
            backgroundColor: theme.dockBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '16px',
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

          {/* ปุ่มไอคอนสลับโหมด */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'สลับเป็นโหมดกลางวัน (สีขาว)' : 'สลับเป็นโหมดกลางคืน (สีดำ)'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              backgroundColor: theme.dockBg,
              border: `1px solid ${theme.border}`,
              color: theme.textPrimary,
              cursor: 'pointer',
              boxShadow: theme.shadow,
              transition: 'all 0.3s ease',
            }}
          >
            {isDarkMode ? (
              <Sun style={{ width: '20px', height: '20px', color: '#fbbf24', filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.6))' }} />
            ) : (
              <Moon style={{ width: '20px', height: '20px', color: '#4f46e5', filter: 'drop-shadow(0 0 6px rgba(79, 70, 229, 0.6))' }} />
            )}
          </button>
        </div>

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 700, margin: 0 }}>
            <Sparkles style={{ width: '18px', height: '18px', color: '#6366f1' }} />
            รายการสินค้าไฮไลท์
          </h3>
          <span style={{ fontSize: '12px', color: isDarkMode ? '#a5b4fc' : '#4f46e5', backgroundColor: isDarkMode ? '#18181b' : '#f4f4f5', border: `1px solid ${theme.border}`, padding: '4px 12px', borderRadius: '20px' }}>
            {filteredProducts.length} รายการ
          </span>
        </div>

        {/* Product Grid */}
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
                  transition: isHovered ? 'transform 0.05s linear' : 'all 0.3s ease-out',
                  boxShadow: isHovered ? `0 20px 40px -10px ${item.glowColor}` : theme.shadow,
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    inset: 0,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.2s',
                    background: `radial-gradient(280px circle at ${state.mouseX}px ${state.mouseY}px, ${item.glowColor}, transparent 80%)`,
                    zIndex: 0
                  }}
                />

                <div style={{
                  transform: 'translateZ(25px)',
                  position: 'relative',
                  width: '100%',
                  height: '190px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: isDarkMode ? '#18181b' : '#e4e4e7',
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
                      backgroundColor: 'rgba(0, 0, 0, 0.85)',
                      border: '1px solid rgba(6, 182, 212, 0.5)',
                      color: '#67e8f9',
                      fontSize: '10px',
                      fontWeight: 700,
                    }}>
                      <Box style={{ width: '12px', height: '12px' }} /> 3D MODEL
                    </div>
                  )}

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
                      backgroundColor: 'rgba(0, 0, 0, 0.85)',
                      border: '1px solid rgba(244, 63, 94, 0.5)',
                      color: '#fda4af',
                      fontSize: '10px',
                      fontWeight: 700,
                    }}>
                      <Flame style={{ width: '12px', height: '12px', color: '#f43f5e' }} /> HOT
                    </div>
                  )}

                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isHovered ? 1 : 0,
                    transition: 'all 0.3s'
                  }}>
                    <button
                      onClick={() => open3DModal(item)}
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
                      <Eye style={{ width: '16px', height: '16px' }} /> กดดูภาพ 3D
                    </button>
                  </div>
                </div>

                <div style={{ transform: 'translateZ(20px)', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '10px',
                      color: isDarkMode ? '#a5b4fc' : '#4f46e5',
                      fontWeight: 600,
                      backgroundColor: isDarkMode ? '#18181b' : '#eeef4',
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

                    <span style={{ fontSize: '10px', color: '#10b981', backgroundColor: isDarkMode ? '#064e3b' : '#d1fae5', padding: '4px 8px', borderRadius: '8px', fontWeight: 600 }}>
                      {item.condition}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D INTERACTIVE MODAL */}
      {active3DModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '700px',
            backgroundColor: isDarkMode ? '#0d0d0d' : '#ffffff',
            borderRadius: '28px',
            border: `1px solid ${theme.border}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Rotate3d style={{ width: '22px', height: '22px', color: '#06b6d4' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: theme.textPrimary }}>
                  3D Interactive Viewer: {active3DModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActive3DModal(null)}
                style={{
                  backgroundColor: isDarkMode ? '#27272a' : '#f4f4f5',
                  border: 'none',
                  color: theme.textPrimary,
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: isDarkMode ? '#121212' : '#f4f4f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1200px',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none'
              }}
            >
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.2) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none'
              }} />

              <div style={{
                position: 'absolute',
                width: '260px',
                height: '80px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.4) 0%, rgba(0,0,0,0.8) 70%, transparent 100%)',
                transform: `translateY(120px) rotateX(75deg) scale(${zoom})`,
                filter: 'blur(12px)',
                pointerEvents: 'none',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }} />

              <div style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                transformStyle: 'preserve-3d',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '260px',
                  height: '260px',
                  borderRadius: '16px',
                  backgroundColor: isDarkMode ? '#18181b' : '#cbd5e1',
                  transform: 'translateZ(-12px)',
                  boxShadow: '0 0 20px rgba(0,0,0,0.8)'
                }} />

                <div style={{
                  position: 'absolute',
                  width: '260px',
                  height: '260px',
                  borderRadius: '16px',
                  backgroundColor: isDarkMode ? '#27272a' : '#94a3b8',
                  transform: 'translateZ(-6px)'
                }} />

                <img
                  src={active3DModal.image}
                  alt={active3DModal.title}
                  draggable={false}
                  style={{
                    maxWidth: '260px',
                    maxHeight: '260px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    transform: 'translateZ(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.25)',
                    filter: `drop-shadow(${-rotation.y * 0.4}px ${rotation.x * 0.4 + 15}px 25px rgba(0,0,0,0.7)) contrast(1.05) brightness(${1 + rotation.x * 0.003})`,
                  }}
                />

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  width: '260px',
                  height: '260px',
                  borderRadius: '16px',
                  transform: 'translateZ(12px)',
                  background: `linear-gradient(${135 + rotation.y}deg, rgba(255,255,255,0.25) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)`,
                  pointerEvents: 'none',
                }} />
              </div>

              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                color: '#67e8f9',
                fontSize: '11px',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: '20px',
                backdropFilter: 'blur(8px)',
                pointerEvents: 'none',
                border: '1px solid rgba(6,182,212,0.4)',
                boxShadow: '0 0 15px rgba(6,182,212,0.2)'
              }}>
                🖱️ คลิกแล้วลากเมาส์เพื่อหมุนภาพ 360°
              </div>

              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                display: 'flex',
                gap: '8px',
                zIndex: 10
              }}>
                <button
                  onClick={() => setZoom((z) => Math.min(z + 0.2, 1.8))}
                  style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}
                >
                  <ZoomIn style={{ width: '16px', height: '16px' }} />
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
                  style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}
                >
                  <ZoomOut style={{ width: '16px', height: '16px' }} />
                </button>
                <button
                  onClick={() => { setRotation({ x: 15, y: -25 }); setZoom(1); }}
                  style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}
                >
                  <RefreshCw style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
              <div>
                <p style={{ fontSize: '11px', color: theme.textSecondary, margin: 0 }}>ราคาสินค้า</p>
                <span style={{ fontSize: '22px', fontWeight: 900, color: isDarkMode ? '#c084fc' : '#7c3aed' }}>{active3DModal.price}</span>
              </div>
              <button style={{
                padding: '12px 28px',
                background: 'linear-gradient(to right, #4f46e5, #9333ea)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(99,102,241,0.5)'
              }}>
                ติดต่อสั่งซื้อทันที
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}