import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackgroundMusic({ src }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [spellActive, setSpellActive] = useState(false)

  useEffect(() => {
    // Attempt auto-play on mount (often blocked by browsers, but we try)
    if (audioRef.current) {
      audioRef.current.volume = 0.4
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      // Mute logic
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // Unmute logic - CAST SPELL FIRST!
      setSpellActive(true)
      
      // Delay playing slightly to let the spell animation fire
      setTimeout(() => {
        audioRef.current.play().catch(e => console.log(e))
        setIsPlaying(true)
        setSpellActive(false)
      }, 600)
    }
  }

  return (
    <div className="magical-music-container">
      <audio ref={audioRef} src={src} loop />
      
      {/* Sparkles/Spell Effect Overlay */}
      <AnimatePresence>
        {spellActive && (
          <div className="spell-burst-container">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="spell-sparkle"
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: 1.5, 
                  x: Math.cos(i * 45 * (Math.PI / 180)) * 60, 
                  y: Math.sin(i * 45 * (Math.PI / 180)) * 60 
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
            <motion.div 
              className="spell-ring"
              initial={{ opacity: 0.8, scale: 0.5, borderColor: '#fff' }}
              animate={{ opacity: 0, scale: 2.5, borderColor: '#ffd700' }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={togglePlay}
        className={`magic-btn ${isPlaying ? 'active' : 'dormant'}`}
        whileHover={{ scale: 1.1, rotate: isPlaying ? 10 : -10 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        title={isPlaying ? "Mute Music" : "Cast Audio Spell"}
      >
        <div className="btn-content">
          {isPlaying ? (
            // Animated Music Bars Icon
            <div className="music-bars">
              <span className="bar b1"></span>
              <span className="bar b2"></span>
              <span className="bar b3"></span>
            </div>
          ) : (
            // Muted/Wand Icon
            <span style={{fontSize: '20px', filter: 'grayscale(1)'}}>🪄</span>
          )}
        </div>
        
        {/* Glow effect background */}
        <div className="glow-bg"></div>
      </motion.button>

      {/* Internal Styles for self-containment */}
      <style jsx="true">{`
        .magical-music-container {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spell-burst-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          width: 0;
          height: 0;
        }

        .spell-sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px gold;
        }

        .spell-ring {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid white;
          top: -20px;
          left: -20px;
        }

        .magic-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(20, 20, 30, 0.6);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        /* Dormant State (Muted) */
        .magic-btn.dormant {
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        .magic-btn.dormant:hover {
          border-color: rgba(255, 255, 255, 0.6);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }

        /* Active State (Playing) - Magical Gradient */
        .magic-btn.active {
          background: linear-gradient(135deg, #7928CA 0%, #FF0080 100%);
          box-shadow: 0 0 20px rgba(255, 0, 128, 0.6);
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .btn-content {
          position: relative;
          z-index: 2;
        }

        /* Music Bars Animation */
        .music-bars {
          display: flex;
          align-items: flex-end;
          height: 16px;
          gap: 3px;
        }
        .bar {
          width: 3px;
          background: white;
          border-radius: 2px;
          animation: dance 1s infinite ease-in-out;
        }
        .b1 { animation-delay: 0.0s; height: 60%; }
        .b2 { animation-delay: 0.2s; height: 100%; }
        .b3 { animation-delay: 0.4s; height: 50%; }

        @keyframes dance {
          0%, 100% { height: 40%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  )
}