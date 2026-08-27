{/* 3D INTERACTIVE MODAL (ปรับแต่งแบบลึกมีมิติตามแสงและเงา) */}
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

            {/* 3D Viewport Box */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                position: 'relative',
                width: '100%',
                height: '420px',
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: isDarkMode ? '#020617' : '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1000px',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none'
              }}
            >
              {/* ตารางกริดย่อยแบบ Depth Grid */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: `radial-gradient(circle, ${theme.gridColor} 1.5px, transparent 1.5px)`,
                backgroundSize: '30px 30px',
                pointerEvents: 'none'
              }} />

              {/* วัตถุหลัก 3D + แสงและเงาตามองศาหมุน */}
              <div style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                transformStyle: 'preserve-3d',
                transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                
                {/* ฐานรองกระจก 3D ด้านล่าง (Pedestal) */}
                <div style={{
                  position: 'absolute',
                  bottom: '-40px',
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  background: isDarkMode 
                    ? 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(15, 23, 42, 0) 70%)'
                    : 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
                  transform: 'rotateX(80deg) translateZ(-60px)',
                  border: isDarkMode ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid rgba(99, 102, 241, 0.1)',
                  pointerEvents: 'none'
                }} />

                {/* เงาสกปรกตกกระทบพื้นแบบไดนามิก (Dynamic Floor Shadow) */}
                <div style={{
                  position: 'absolute',
                  bottom: '-30px',
                  width: '220px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  filter: 'blur(12px)',
                  transform: `rotateX(75deg) translateZ(-40px) translateX(${-rotation.y * 0.8}px)`,
                  opacity: Math.max(0.3, 1 - Math.abs(rotation.x) / 90),
                  pointerEvents: 'none'
                }} />

                {/* ภาพวัตถุที่มี Layer ความหนาและมุมเงาสมจริง */}
                <img
                  src={isDarkMode ? active3DModal.imageNight : active3DModal.imageDay}
                  alt={active3DModal.title}
                  draggable={false}
                  style={{
                    maxWidth: '280px',
                    maxHeight: '280px',
                    objectFit: 'cover',
                    borderRadius: '22px',
                    transform: 'translateZ(20px)',
                    border: isDarkMode ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: `
                      ${-rotation.y * 0.6}px ${rotation.x * 0.6 + 20}px 35px rgba(0, 0, 0, 0.6),
                      0 0 20px ${active3DModal.glowColor}
                    `,
                  }}
                />
              </div>

              {/* ข้อความและเครื่องมือควบคุม */}
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