{/* 3D Interactive Canvas Area */}
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
    backgroundColor: isDarkMode ? '#020617' : '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1200px', // เพิ่มความลึก Perspective
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none'
  }}
>
  {/* Floor Grid Pattern */}
  <div style={{
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.2) 1px, transparent 1px)',
    backgroundSize: '24px 24px',
    pointerEvents: 'none'
  }} />

  {/* Dynamic Ground Shadow & Pedestal Glow */}
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

  {/* Rotatable 3D Extruded Object Container */}
  <div style={{
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
    transformStyle: 'preserve-3d',
    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }}>
    
    {/* Simulated 3D Volume Thickness (Back Layers) */}
    <div style={{
      position: 'absolute',
      width: '260px',
      height: '260px',
      borderRadius: '16px',
      backgroundColor: isDarkMode ? '#090d16' : '#cbd5e1',
      transform: 'translateZ(-12px)',
      boxShadow: '0 0 20px rgba(0,0,0,0.8)'
    }} />
    <div style={{
      position: 'absolute',
      width: '260px',
      height: '260px',
      borderRadius: '16px',
      backgroundColor: isDarkMode ? '#1e1b4b' : '#94a3b8',
      transform: 'translateZ(-6px)'
    }} />

    {/* Main Image Layer */}
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
        filter: `
          drop-shadow(${-rotation.y * 0.4}px ${rotation.x * 0.4 + 15}px 25px rgba(0,0,0,0.7))
          contrast(1.05)
          brightness(${1 + rotation.x * 0.003})
        `,
      }}
    />

    {/* Holographic Specular Light Reflection Overlay */}
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

  {/* Interactive Hints Overlay */}
  <div style={{
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    backgroundColor: 'rgba(2, 6, 23, 0.85)',
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
    🖱️ คลิกขยับลากเมาส์หมุนมิติภาพ 3D
  </div>

  {/* View Controls */}
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
      style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(2,6,23,0.85)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}
    >
      <ZoomIn style={{ width: '16px', height: '16px' }} />
    </button>
    <button
      onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
      style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(2,6,23,0.85)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}
    >
      <ZoomOut style={{ width: '16px', height: '16px' }} />
    </button>
    <button
      onClick={() => { setRotation({ x: 15, y: -25 }); setZoom(1); }}
      style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(2,6,23,0.85)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}
    >
      <RefreshCw style={{ width: '16px', height: '16px' }} />
    </button>
  </div>
</div>