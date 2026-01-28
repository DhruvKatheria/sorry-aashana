// src/components/SweetMomentPanel.jsx
import React, { useEffect, useState } from 'react'
import { SWEET_PHOTOS } from '../constants'

export default function SweetMomentPanel() {
  const photos = Array.isArray(SWEET_PHOTOS) ? SWEET_PHOTOS : []
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (photos.length <= 1) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length)
    }, 5000)
    return () => clearInterval(id)
  }, [photos.length])

  const hasPhotos = photos.length > 0
  const currentSrc = hasPhotos ? photos[index] : null

  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: '#ff6b88',
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '0.2px'
            }}
          >
            Sweet moments
          </div>
        </div>

          {/* Centered, responsive portrait media box (neutral frame) */}
        <div
          aria-hidden={!hasPhotos}
         style={{
          width: 180,
          maxWidth: '36vw',
          aspectRatio: '3 / 4',
          borderRadius: 16,
          overflow: 'hidden',
          position: 'relative',
          padding: 4,
          boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.16)',
          background: 'linear-gradient(180deg,#f7f8fc,#edf1f8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 'auto',
          marginRight: 'auto'
}}

        >
          {hasPhotos && currentSrc ? (
            <img
              src={currentSrc}
              alt="Sweet moment"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 12,
                display: 'block'
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(180deg,#fff6fb,#ffeff8)'
              }}
            >
              <div style={{ textAlign: 'center', color: '#6b2b4d', fontWeight: 800 }}>
                No photos found
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
// (Neutral frame: shimmer animation removed)

