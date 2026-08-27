'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Box, Flame, Eye, Layers, ArrowUpRight, Tag, Sun, Moon, 
  X, Rotate3d, ZoomIn, ZoomOut, RefreshCw, Search, Heart, ShoppingBag
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

// ใช้ CDN รูปภาพ Picsum ที่มีความเสถียรและโหลดได้แน่นอน 100%
const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'หนังสือเรียน CALCULUS II',
    price: '250 ฿',
    category: 'หนังสือ',
    is3D: true,
    isHot: true,
    imageDay: 'https://picsum.photos/id/24/600/400',
    imageNight: 'https://picsum.photos/id/24/600/400',
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
    imageDay: 'https://picsum.photos/id/160/600/400',
    imageNight: 'https://picsum.photos/id/160/600/400',
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
    imageDay: 'https://picsum.photos/id/0/600/400',
    imageNight: 'https://picsum.photos/id/0/600/400',
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
    imageDay: 'https://picsum.photos/id/48/600/400',
    imageNight: 'https://picsum.photos/id/48/600/400',
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
    imageDay: 'https://picsum.photos/id/201/600/400',
    imageNight: 'https://picsum.photos/id/201/600/400',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    condition: 'ของใหม่ มือ 1',
  },
];

export default function ProductSection() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | '3d' | 'hot'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
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

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
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

  const theme = {
    bg: isDarkMode ? '#05070f' : '#f8fafc',
    cardBg: isDarkMode ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
    textPrimary: isDarkMode ? '#ffffff' : '#0f172a',
    textSecondary: isDarkMode ? '#94a3b8' : '#64748b',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
    borderHover: isDarkMode ? '#818cf8' : '#6366f1',
    dockBg: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    shadow: isDarkMode ? '0 20px 50px rgba(0,0,0,0.8)' : '0 10px 30px rgba(0,0,0,0.05)',
    modalOverlay: isDarkMode ? 'rgba(3, 7, 18, 0.85)' : 'rgba(255, 255, 255, 0.85)',
    gridColor: isDarkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
  };

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', padding: '32px 24px', color: theme.textPrimary, fontFamily: "'Inter', sans-serif", transition: 'background-color 0.4s ease', position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Cursor Light Spotlight */}
      <div
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, ${isDarkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.07)'}, transparent 80%)`,
        }}
      />

      {/* Floating Cyber Particles Effect */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '4px', height: '4px', backgroundColor: '#818cf8', borderRadius: '50%', boxShadow: '0 0 12px #818cf8' }} />
        <div style={{ position: 'absolute', top: '60%', right: '15%', width: '6px', height: '6px', backgroundColor: '#38bdf8', borderRadius: '50%', boxShadow: '0 0 15px #38bdf8' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '30%', width: '5px', height: '5px', backgroundColor: '#c084fc', borderRadius: '50%', boxShadow: '0 0 14px #c084fc' }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative', zIndex: 2 }}>
        
        {/* Top Control Bar with Search & Theme Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Navigation Category Chips */}
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
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: selectedCategory === 'all' ? 'linear-gradient(135deg, #4f46e5, #9333ea)' : 'transparent',
                color: selectedCategory === 'all' ? '#ffffff' : theme.textSecondary,
                boxShadow: selectedCategory === 'all' ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none'
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
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: selectedCategory === '3d' ? 'linear-gradient(135deg, #06b6d4, #2563eb)' : 'transparent',
                color: selectedCategory === '3d' ? '#ffffff' : theme.textSecondary,
                boxShadow: selectedCategory === '3d' ? '0 4px 15px rgba(6, 182, 212, 0.4)' : 'none'
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
                padding: '10px 20px',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: selectedCategory === 'hot' ? 'linear-gradient(135deg, #f59e0b, #e11d48)' : 'transparent',
                color: selectedCategory === 'hot' ? '#ffffff' : theme.textSecondary,
                boxShadow: selectedCategory === 'hot' ? '0 4px 15px rgba(245, 158, 11, 0.4)' : 'none'
              }}
            >
              <Flame style={{ width: '16px', height: '16px' }} />
              สินค้ามาแรง
            </button>
          </div>

          {/* Right Action Tools: Search & Theme Toggle */}
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
              boxShadow: theme.shadow,
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
              title={isDarkMode ? 'สลับเป็นโหมดกลางวัน' : 'สลับเป็นโหมดกลางคืน'}
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
                boxShadow: theme.shadow,
                transition: 'all 0.3s ease',
              }}
            >
              {isDarkMode ? (
                <Sun style={{ width: '20px', height: '20px', color: '#fbbf24' }} />
              ) : (
                <Moon style={{ width: '20px', height: '20px', color: '#4f46e5' }} />
              )}
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: 800, margin: 0 }}>
            <Sparkles style={{ width: '20px', height: '20px', color: '#6366f1' }} />
            รายการสินค้าไฮไลท์
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {favorites.length > 0 && (
              <span style={{ fontSize: '12px', color: '#ec4899', backgroundColor: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', padding: '4px 12px', borderRadius: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Heart style={{ width: '12px', height: '12px', fill: '#ec4899' }} /> ถูกใจ {favorites.length}
              </span>
            )}
            <span style={{ fontSize: '12px', color: isDarkMode ? '#a5b4fc' : '#4f46e5', backgroundColor: theme.dockBg, border: `1px solid ${theme.border}`, padding: '4px 14px', borderRadius: '20px', fontWeight: 600 }}>
              พบ {filteredProducts.length} รายการ
            </span>
          </div>
        </div>

        {/* 3D Interactive Product Grid */}
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
                {/* Dynamic Mouse Hologram Gradient Spot */}
                <div
                  style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    inset: 0,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.2s',
                    background: `radial-gradient(300px circle at ${state.mouseX}px ${state.mouseY}px, ${item.glowColor}, transparent 80%)`,
                    zIndex: 0
                  }}
                />

                {/* Favorite Heart Button */}
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
                    transition: 'transform 0.2s ease',
                    transform: isFav ? 'scale(1.15)' : 'scale(1)'
                  }}
                >
                  <Heart style={{ width: '16px', height: '16px', color: isFav ? '#ec4899' : '#ffffff', fill: isFav ? '#ec4899' : 'none' }} />
                </button>

                {/* 3D Lifted Image Container */}
                <div style={{
                  transform: 'translateZ(30px)',
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                  marginBottom: '16px',
                }}>
                  <img
                    src={currentImage}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.5s ease-out'
                    }}
                  />

                  {/* Badges */}
                  {item.is3D && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(6, 182, 212, 0.5)',
                      color: '#67e8f9',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}>
                      <Box style={{ width: '13px', height: '13px' }} /> 3D MODEL
                    </div>
                  )}

                  {item.isHot && !item.is3D && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(244, 63, 94, 0.5)',
                      color: '#fda4af',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}>
                      <Flame style={{ width: '13px', height: '13px', color: '#f43f5e' }} /> HOT
                    </div>
                  )}

                  {/* Interactive Quick View Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
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
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '14px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 8px 25px rgba(99,102,241,0.6)',
                        transform: isHovered ? 'translateZ(15px)' : 'translateZ(0)',
                        transition: 'transform 0.2s'
                      }}
                    >
                      <Eye style={{ width: '18px', height: '18px' }} /> กดดูภาพ 3D
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div style={{ transform: 'translateZ(25px)', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '11px',
                      color: isDarkMode ? '#a5b4fc' : '#4f46e5',
                      fontWeight: 600,
                      backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                    }}>
                      <Tag style={{ width: '12px', height: '12px' }} /> {item.category}
                    </span>
                    <ArrowUpRight style={{ width: '18px', height: '18px', color: theme.textSecondary }} />
                  </div>

                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: theme.textPrimary, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '4px' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: theme.textSecondary, margin: 0 }}>ราคาเริ่มต้น</p>
                      <span style={{ fontSize: '20px', fontWeight: 900, color: isDarkMode ? '#c084fc' : '#7c3aed' }}>
                        {item.price}
                      </span>
                    </div>

                    <span style={{ fontSize: '11px', color: '#10b981', backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.15)' : '#d1fae5', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 10px', borderRadius: '10px', fontWeight: 700 }}>
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
          backgroundColor: theme.modalOverlay,
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '720px',
            backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
            borderRadius: '32px',
            border: `1px solid ${theme.border}`,
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: theme.shadow
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Rotate3d style={{ width: '24px', height: '24px', color: '#06b6d4' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: theme.textPrimary }}>
                  3D Interactive Viewer: {active3DModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActive3DModal(null)}
                style={{
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
                  border: 'none',
                  color: theme.textPrimary,
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
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
                height: '400px',
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: isDarkMode ? '#020617' : '#f8fafc',
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
                backgroundImage: `radial-gradient(circle, ${theme.gridColor} 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
                pointerEvents: 'none'
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
                <img
                  src={isDarkMode ? active3DModal.imageNight : active3DModal.imageDay}
                  alt={active3DModal.title}
                  draggable={false}
                  style={{
                    maxWidth: '270px',
                    maxHeight: '270px',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    transform: 'translateZ(12px)',
                    border: isDarkMode ? '2px solid rgba(255, 255, 255, 0.25)' : '2px solid rgba(0, 0, 0, 0.1)',
                    filter: `drop-shadow(${-rotation.y * 0.4}px ${rotation.x * 0.4 + 15}px 25px rgba(0,0,0,0.5))`,
                  }}
                />
              </div>

              <div style={{
                position: 'absolute',
                bottom: '18px',
                left: '18px',
                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                color: isDarkMode ? '#67e8f9' : '#0284c7',
                fontSize: '12px',
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                pointerEvents: 'none',
                border: isDarkMode ? '1px solid rgba(6,182,212,0.4)' : '1px solid rgba(2,132,199,0.3)',
              }}>
                🖱️ หมุนวัตถุ 3D อิสระ 360°
              </div>

              <div style={{ position: 'absolute', bottom: '18px', right: '18px', display: 'flex', gap: '8px', zIndex: 10 }}>
                <button
                  onClick={() => setZoom((z) => Math.min(z + 0.2, 1.8))}
                  style={{ padding: '10px', borderRadius: '12px', backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255,255,255,0.9)', border: `1px solid ${theme.border}`, color: theme.textPrimary, cursor: 'pointer' }}
                >
                  <ZoomIn style={{ width: '18px', height: '18px' }} />
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
                  style={{ padding: '10px', borderRadius: '12px', backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255,255,255,0.9)', border: `1px solid ${theme.border}`, color: theme.textPrimary, cursor: 'pointer' }}
                >
                  <ZoomOut style={{ width: '18px', height: '18px' }} />
                </button>
                <button
                  onClick={() => { setRotation({ x: 15, y: -25 }); setZoom(1); }}
                  style={{ padding: '10px', borderRadius: '12px', backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255,255,255,0.9)', border: `1px solid ${theme.border}`, color: theme.textPrimary, cursor: 'pointer' }}
                >
                  <RefreshCw style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
              <div>
                <p style={{ fontSize: '12px', color: theme.textSecondary, margin: 0 }}>ราคาสินค้า</p>
                <span style={{ fontSize: '24px', fontWeight: 900, color: isDarkMode ? '#c084fc' : '#7c3aed' }}>{active3DModal.price}</span>
              </div>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(99,102,241,0.5)'
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