'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Box, Flame, Eye, Layers, ArrowUpRight, Tag, Sun, Moon, 
  X, Rotate3d, ZoomIn, ZoomOut, RefreshCw, Search, Heart, ShoppingBag, ShieldCheck
} from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  is3D: boolean;
  isHot: boolean;
  imageDay: string;
  imageNight: string;
  glowColor: string;
  condition: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  life: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'ชีทสรุป Calculus II พร้อมแนวข้อสอบเก่า',
    price: '45 ฿',
    category: 'หนังสือ & ชีทสรุป',
    is3D: true,
    isHot: true,
    imageDay: 'https://picsum.photos/id/24/600/400',
    imageNight: 'https://picsum.photos/id/24/600/400',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    condition: 'ไฟล์ PDF / เล่มปริ้นท์',
  },
  {
    id: 2,
    title: 'เครื่องคิดเลข Casio FX-350MS มือสอง',
    price: '180 ฿',
    category: 'อุปกรณ์การเรียน',
    is3D: true,
    isHot: false,
    imageDay: 'https://picsum.photos/id/160/600/400',
    imageNight: 'https://picsum.photos/id/160/600/400',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    condition: 'สภาพ 85% ใช้งานได้ปกติ',
  },
  {
    id: 3,
    title: 'ปากกา Stylus สำหรับ iPad (วางมือบนจอได้)',
    price: '290 ฿',
    category: 'ไอที & อุปกรณ์เสริม',
    is3D: true,
    isHot: true,
    imageDay: 'https://picsum.photos/id/0/600/400',
    imageNight: 'https://picsum.photos/id/0/600/400',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    condition: 'ของใหม่ มือ 1',
  },
  {
    id: 4,
    title: 'พัดลมพกพาชาร์จ USB สายมินิมอล',
    price: '89 ฿',
    category: 'ของใช้ในหอ',
    is3D: false,
    isHot: true,
    imageDay: 'https://picsum.photos/id/48/600/400',
    imageNight: 'https://picsum.photos/id/48/600/400',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    condition: 'สภาพ 95% แบตยังอึด',
  },
  {
    id: 5,
    title: 'โคมไฟอ่านหนังสือตั้งโต๊ะ LED ถนอมสายตา',
    price: '150 ฿',
    category: 'ของใช้ในหอ',
    is3D: true,
    isHot: false,
    imageDay: 'https://picsum.photos/id/201/600/400',
    imageNight: 'https://picsum.photos/id/201/600/400',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    condition: 'สภาพ 90%',
  },
  {
    id: 6,
    title: 'จอคอมมือสอง 20 นิ้ว สำหรับต่อสองจอเรียน',
    price: '850 ฿',
    category: 'ไอที & อุปกรณ์เสริม',
    is3D: true,
    isHot: false,
    imageDay: 'https://picsum.photos/id/1/600/400',
    imageNight: 'https://picsum.photos/id/1/600/400',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    condition: 'สภาพ 80% มีรอยตามการใช้งาน',
  },
];

const TRAIL_COLORS = ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#34d399'];

export default function ProductPage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | '3d' | 'hot'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cardState, setCardState] = useState<{ [key: number]: { x: number; y: number; mouseX: number; mouseY: number } }>({});

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [trailPos, setTrailPos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const [active3DModal, setActive3DModal] = useState<Product | null>(null);
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 15, y: -25 });
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    let colorIdx = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          color: TRAIL_COLORS[colorIdx % TRAIL_COLORS.length],
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          alpha: 1,
          life: 1,
        });
        colorIdx++;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const updateTrail = () => {
      setTrailPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.18,
        y: prev.y + (mousePos.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        p.alpha = Math.max(0, p.life);

        if (p.life <= 0) {
          particlesRef.current.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const toggleFavorite = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
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
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    setRotation((prev) => ({
      x: Math.max(-75, Math.min(75, prev.x - deltaY * 0.6)),
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

  const theme = {
    bg: isDarkMode ? '#030712' : '#f8fafc',
    cardBg: isDarkMode ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.85)',
    textPrimary: isDarkMode ? '#ffffff' : '#0f172a',
    textSecondary: isDarkMode ? '#94a3b8' : '#64748b',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    borderHover: isDarkMode ? '#38bdf8' : '#6366f1',
    dockBg: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    shadow: isDarkMode ? '0 20px 50px rgba(0,0,0,0.8)' : '0 10px 30px rgba(0,0,0,0.05)',
    modalOverlay: isDarkMode ? 'rgba(2, 6, 23, 0.92)' : 'rgba(255, 255, 255, 0.92)',
  };

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', padding: '32px 24px', color: theme.textPrimary, fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden' }}>
      
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      <div style={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${isDarkMode ? 'rgba(56, 189, 248, 0.15)' : 'rgba(99, 102, 241, 0.1)'}, rgba(168, 85, 247, 0.05) 50%, transparent 80%)`,
      }} />

      <div style={{
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: '2px solid transparent',
        backgroundImage: 'linear-gradient(#030712, #030712), linear-gradient(135deg, #38bdf8, #c084fc, #f472b6)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        transform: `translate(${trailPos.x - 18}px, ${trailPos.y - 18}px)`,
        zIndex: 9999,
        boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
      }} />

      <div style={{
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #38bdf8, #f472b6)',
        transform: `translate(${mousePos.x - 4}px, ${mousePos.y - 4}px)`,
        zIndex: 10000,
        boxShadow: '0 0 10px #38bdf8',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative', zIndex: 2 }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px',
            backgroundColor: theme.dockBg,
            backdropFilter: 'blur(16px)',
            border: `1px solid ${theme.border}`,
            borderRadius: '20px',
            boxShadow: theme.shadow
          }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: selectedCategory === 'all' ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'transparent',
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
                padding: '10px 20px',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: selectedCategory === '3d' ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'transparent',
                color: selectedCategory === '3d' ? '#ffffff' : theme.textSecondary,
              }}
            >
              <Box style={{ width: '16px', height: '16px' }} />
              โหมด 3D
            </button>

            <button
              onClick={() => setSelectedCategory('hot')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: selectedCategory === 'hot' ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : 'transparent',
                color: selectedCategory === 'hot' ? '#ffffff' : theme.textSecondary,
              }}
            >
              <Flame style={{ width: '16px', height: '16px' }} />
              มาแรง
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: theme.dockBg,
              backdropFilter: 'blur(16px)',
              border: `1px solid ${theme.border}`,
              borderRadius: '18px',
              padding: '4px 14px',
              minWidth: '240px'
            }}>
              <Search style={{ width: '16px', height: '16px', color: theme.textSecondary, marginRight: '8px' }} />
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: theme.textPrimary,
                  fontSize: '13px',
                  width: '100%',
                  fontWeight: 500
                }}
              />
              {searchQuery && (
                <X 
                  onClick={() => setSearchQuery('')}
                  style={{ width: '14px', height: '14px', color: theme.textSecondary, cursor: 'pointer' }} 
                />
              )}
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '46px',
                height: '46px',
                borderRadius: '16px',
                backgroundColor: theme.dockBg,
                backdropFilter: 'blur(16px)',
                border: `1px solid ${theme.border}`,
                color: theme.textPrimary,
                cursor: 'pointer',
              }}
            >
              {isDarkMode ? <Sun style={{ width: '20px', height: '20px', color: '#38bdf8' }} /> : <Moon style={{ width: '20px', height: '20px', color: '#4f46e5' }} />}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: 800, margin: 0 }}>
            <Sparkles style={{ width: '20px', height: '20px', color: '#38bdf8' }} />
            รายการสินค้า
          </h3>
          <span style={{ fontSize: '12px', color: isDarkMode ? '#38bdf8' : '#2563eb', backgroundColor: theme.dockBg, border: `1px solid ${theme.border}`, padding: '4px 14px', borderRadius: '20px', fontWeight: 600 }}>
            {filteredProducts.length} สินค้า
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '24px', perspective: '1200px' }}>
          {filteredProducts.map((item) => {
            const state = cardState[item.id] || { x: 0, y: 0, mouseX: 0, mouseY: 0 };
            const isHovered = hoveredCard === item.id;
            const isFav = favorites.includes(item.id);
            const currentImage = isDarkMode ? item.imageNight : item.imageDay;

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
                  borderRadius: '28px',
                  backgroundColor: theme.cardBg,
                  backdropFilter: 'blur(16px)',
                  border: isHovered ? `1px solid ${theme.borderHover}` : `1px solid ${theme.border}`,
                  padding: '18px',
                  transition: isHovered ? 'transform 0.05s linear' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isHovered ? `0 25px 50px -12px ${item.glowColor}` : theme.shadow,
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={(e) => toggleFavorite(item.id, e)}
                  style={{
                    position: 'absolute',
                    top: '26px',
                    right: '26px',
                    zIndex: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Heart style={{ width: '16px', height: '16px', color: isFav ? '#ec4899' : '#ffffff', fill: isFav ? '#ec4899' : 'none' }} />
                </button>

                <div style={{
                  transform: 'translateZ(30px)',
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: isDarkMode ? '#0f172a' : '#e2e8f0',
                  marginBottom: '16px',
                }}>
                  <img
                    src={currentImage}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.5s ease-out'
                    }}
                  />

                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(3, 7, 18, 0.75)',
                    backdropFilter: 'blur(6px)',
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
                        padding: '12px 22px',
                        background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '14px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 8px 25px rgba(6, 182, 212, 0.5)',
                      }}
                    >
                      <Eye style={{ width: '18px', height: '18px' }} /> เปิด 3D Interactive
                    </button>
                  </div>
                </div>

                <div style={{ transform: 'translateZ(25px)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px',
                      color: isDarkMode ? '#38bdf8' : '#0284c7',
                      fontWeight: 600,
                      backgroundColor: isDarkMode ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                    }}>
                      <Tag style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px' }} />
                      {item.category}
                    </span>
                    <ArrowUpRight style={{ width: '18px', height: '18px', color: theme.textSecondary }} />
                  </div>

                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: theme.textPrimary, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: theme.textSecondary, margin: 0 }}>ราคา</p>
                      <span style={{ fontSize: '20px', fontWeight: 900, color: isDarkMode ? '#38bdf8' : '#2563eb' }}>
                        {item.price}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#10b981', backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.15)' : '#d1fae5', padding: '4px 10px', borderRadius: '10px', fontWeight: 700 }}>
                      {item.condition}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {active3DModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          backgroundColor: theme.modalOverlay,
          backdropFilter: 'blur(24px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '820px',
            backgroundColor: isDarkMode ? '#0a0f1d' : '#ffffff',
            borderRadius: '36px',
            border: isDarkMode ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(0, 0, 0, 0.1)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: isDarkMode ? '0 0 80px rgba(6, 182, 212, 0.25)' : '0 30px 60px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Rotate3d style={{ width: '20px', height: '20px' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: theme.textPrimary }}>
                    {active3DModal.title}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#06b6d4', fontWeight: 600 }}>Holographic 3D Interactive Model</span>
                </div>
              </div>
              <button
                onClick={() => setActive3DModal(null)}
                style={{
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
                  border: 'none',
                  color: theme.textPrimary,
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X style={{ width: '20px', height: '20px' }} />
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
                height: '460px',
                borderRadius: '28px',
                overflow: 'hidden',
                backgroundColor: isDarkMode ? '#020617' : '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1000px',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: isDarkMode 
                  ? 'linear-gradient(to right, rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.08) 1px, transparent 1px)'
                  : 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                pointerEvents: 'none'
              }} />

              <div style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                transformStyle: 'preserve-3d',
                transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.1, 0, 0.1, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                width: '300px',
                height: '240px'
              }}>

                <div style={{
                  position: 'absolute',
                  bottom: '-80px',
                  width: '360px',
                  height: '360px',
                  borderRadius: '50%',
                  border: '2px dashed rgba(6, 182, 212, 0.6)',
                  transform: 'rotateX(90deg) translateZ(-80px)',
                  boxShadow: '0 0 25px rgba(6, 182, 212, 0.4)',
                  pointerEvents: 'none'
                }} />

                <div style={{
                  position: 'absolute',
                  bottom: '-80px',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  border: '3px solid rgba(59, 130, 246, 0.8)',
                  background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
                  transform: 'rotateX(90deg) translateZ(-80px)',
                  boxShadow: 'inset 0 0 20px rgba(6, 182, 212, 0.6)',
                  pointerEvents: 'none'
                }} />

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '24px',
                  backgroundColor: isDarkMode ? '#030712' : '#cbd5e1',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  transform: 'translateZ(-20px)',
                  boxShadow: '0 0 30px rgba(0, 0, 0, 0.9)'
                }} />

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '22px',
                  overflow: 'hidden',
                  transform: 'translateZ(15px)',
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: `${-rotation.y * 0.8}px ${rotation.x * 0.8 + 20}px 35px rgba(0, 0, 0, 0.8), 0 0 30px ${active3DModal.glowColor}`,
                }}>
                  <img
                    src={isDarkMode ? active3DModal.imageNight : active3DModal.imageDay}
                    alt={active3DModal.title}
                    draggable={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                <div style={{
                  position: 'absolute',
                  top: '-18px',
                  left: '-18px',
                  backgroundColor: 'rgba(3, 7, 18, 0.85)',
                  border: '1px solid #06b6d4',
                  color: '#38bdf8',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 800,
                  transform: 'translateZ(50px)',
                  boxShadow: '0 10px 25px rgba(6, 182, 212, 0.4)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <ShieldCheck style={{ width: '14px', height: '14px', color: '#10b981' }} />
                  {active3DModal.condition}
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-15px',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1.5px solid #38bdf8',
                  color: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: 900,
                  transform: 'translateZ(75px)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.4)',
                  backdropFilter: 'blur(12px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>PRICE</span>
                  <span style={{ color: '#38bdf8' }}>{active3DModal.price}</span>
                </div>

              </div>

              <div style={{ position: 'absolute', bottom: '18px', right: '18px', display: 'flex', gap: '8px', zIndex: 10 }}>
                <button
                  onClick={() => setZoom((z) => Math.min(z + 0.2, 1.8))}
                  style={{ padding: '10px', borderRadius: '12px', backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255,255,255,0.9)', border: `1px solid ${theme.border}`, color: theme.textPrimary, cursor: 'pointer' }}
                >
                  <ZoomIn style={{ width: '18px', height: '18px' }} />
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
                  style={{ padding: '10px', borderRadius: '12px', backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255,255,255,0.9)', border: `1px solid ${theme.border}`, color: theme.textPrimary, cursor: 'pointer' }}
                >
                  <ZoomOut style={{ width: '18px', height: '18px' }} />
                </button>
                <button
                  onClick={() => { setRotation({ x: 15, y: -25 }); setZoom(1); }}
                  style={{ padding: '10px', borderRadius: '12px', backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255,255,255,0.9)', border: `1px solid ${theme.border}`, color: theme.textPrimary, cursor: 'pointer' }}
                >
                  <RefreshCw style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px' }}>
              <div>
                <p style={{ fontSize: '12px', color: theme.textSecondary, margin: 0 }}>ยอดรวมสุทธิ</p>
                <span style={{ fontSize: '26px', fontWeight: 900, color: isDarkMode ? '#38bdf8' : '#2563eb' }}>{active3DModal.price}</span>
              </div>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 36px',
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '18px',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(6, 182, 212, 0.4)'
              }}>
                <ShoppingBag style={{ width: '18px', height: '18px' }} />
                ติดต่อสั่งซื้อทันที
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}