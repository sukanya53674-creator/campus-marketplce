'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, Box, Flame, Compass, ArrowRight, Activity, Zap, Layers } from 'lucide-react';
import ProductSection from './home/page';

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(52);
  const [showMainStore, setShowMainStore] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30; // องศาการหมุน 3D
      const y = (e.clientY / innerHeight - 0.5) * -30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // จำลอง Progress เพิ่มขึ้นทีละนิดเพิ่มความสมจริง
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 99 ? prev + 1 : 100));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  if (showMainStore) {
    return <ProductSection />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030712',
      color: '#f9fafb',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      perspective: '1000px',
      padding: '20px'
    }}>
      {/* 3D Cyber Background Grid */}
      <div style={{
        position: 'absolute',
        inset: '-200px',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%),
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        transform: `rotateX(60deg) translateY(-100px) translateZ(-200px)`,
        transformStyle: 'preserve-3d',
        pointerEvents: 'none'
      }} />

      {/* Glow Orbs background */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />

      {/* Main 3D Interactive Card Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '850px',
        width: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 30px 100px -20px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(99, 102, 241, 0.15)',
        padding: '48px',
        transform: `rotateX(${mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>

        {/* Header Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', transform: 'translateZ(30px)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34d399',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.5px'
          }}>
            <ShieldCheck style={{ width: '14px', height: '14px' }} />
            VERIFIED CAMPUS NETWORK
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            color: '#a5b4fc',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
          }}>
            <Sparkles style={{ width: '14px', height: '14px', color: '#c084fc' }} />
            CampusHub 3D
          </div>
        </div>

        {/* Title & Description */}
        <div style={{ transform: 'translateZ(40px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            margin: 0,
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #ffffff 30%, #a5b4fc 70%, #67e8f9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            Campus Marketplace
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#94a3b8',
            margin: 0,
            maxWidth: '560px',
            lineHeight: 1.6
          }}>
            ศูนย์รวมตลาดนัดออนไลน์ชาววิทยาศาสตร์ มิติใหม่ของการช้อปปิ้งในรั้วมหาวิทยาลัย สัมผัสประสบการณ์ซื้อขายแบบ 3D แบบเรียลไทม์
          </p>
        </div>

        {/* Experimental 3D Navigation Control Deck */}
        <div style={{ transform: 'translateZ(35px)' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Zap style={{ width: '12px', height: '12px', color: '#f59e0b' }} />
            Experimental 3D Navigation
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px' }}>
            {[
              { label: '3D Orbit', icon: Box, color: '#06b6d4' },
              { label: 'Hot Deals', icon: Flame, color: '#f43f5e' },
              { label: 'Explore', icon: Compass, color: '#a855f7' },
            ].map((node, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) translateZ(15px)';
                  e.currentTarget.style.borderColor = node.color;
                  e.currentTarget.style.boxShadow = `0 12px 25px -5px ${node.color}55`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) translateZ(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                }}
              >
                <node.icon style={{ width: '22px', height: '22px', color: node.color }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0' }}>{node.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button & Progress */}
        <div style={{
          transform: 'translateZ(50px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          paddingTop: '8px'
        }}>
          <button
            onClick={() => setShowMainStore(true)}
            style={{
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 36px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #d946ef 100%)',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateZ(10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(168, 85, 247, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateZ(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.5)';
            }}
          >
            เข้าสู่ตลาดเด็กหอ
            <ArrowRight style={{ width: '20px', height: '20px' }} />
          </button>

          {/* System Sync Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Activity style={{ width: '12px', height: '12px', color: '#38bdf8' }} />
                กำลังเชื่อมต่อมิติระบบ
              </span>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>{progress}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(to right, #38bdf8, #818cf8, #c084fc)',
                borderRadius: '10px',
                transition: 'width 0.5s ease-out',
                boxShadow: '0 0 10px #38bdf8'
              }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}