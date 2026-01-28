import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Gift from './components/Gift'
import Level1 from './components/Level1'
import Level2 from './components/Level2'
import Level3Envelope from './components/Level3Envelope'
import AvatarGuide from './components/AvatarGuide'
import SweetMomentPanel from './components/SweetMomentPanel'
import ConfettiCanvas from './components/ConfettiCanvas'
import FireworksCanvas from './components/FireworksCanvas'
import BackgroundMusic from './components/BackgroundMusic'
import { MUSIC_SRC } from './constants'
import './styles/global.css'

export default function App() {
  const [stage, setStage] = useState('start')
  const [fireworks, setFireworks] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [avatarLeft, setAvatarLeft] = useState(8)
  const [transitioning, setTransitioning] = useState(false)
  const [congrats, setCongrats] = useState({ show:false, text:'' })
  const [finalVisible, setFinalVisible] = useState(false)
  const liveRef = useRef(null)

  useEffect(() => {
    if (liveRef.current) liveRef.current.textContent = `Stage: ${stage}`
  }, [stage])

  function showCongratsAndProceed(next, levelNumber) {
    setCongrats({ show:true, text:`Congrats — Level ${levelNumber} cleared!` })
    setFireworks(true); setConfetti(true)
    setTimeout(()=> {
      setCongrats({ show:false, text:'' })
      setFireworks(false); setConfetti(false)
      // small delay then change stage
      setStage(next)
      const mapping = { start:8,popup:28,level1:44,level2:62,level3:80,final:92 }
      setAvatarLeft(mapping[next] || 8)
    }, 1600)
  }

  function handleLevel1Correct(){
    showCongratsAndProceed('level2', 1)
  }

  function handleLevel2Yes(){
    showCongratsAndProceed('level3', 2)
  }

  // Called by Level3Envelope when user reads Marathi message and clicks "I've read this"
  function handleMarathiRead(){
    // show final thanks overlay
    setFinalVisible(true)
    setFireworks(true); setConfetti(true)
    // also set stage to final for consistency
    setStage('final')
    setTimeout(()=> {
      setFireworks(false); setConfetti(false)
    }, 2500)
  }

  function dodgeNo() {
    const el = document.querySelector('.no')
    if (!el) return
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    const padding = 18
    const x = Math.floor(Math.random() * (vw - 160 - padding)) + padding
    const y = Math.floor(Math.random() * (vh - 100 - padding)) + padding
    el.style.position = 'fixed'
    el.style.left = x + 'px'
    el.style.top = y + 'px'
    el.style.transition = 'left .22s ease, top .22s ease'
  }

  const levelLabel = stage === 'start' ? 'Start' : stage === 'popup' ? 'Intro' : stage === 'level1' ? 'Level 1' : stage === 'level2' ? 'Level 2' : stage === 'level3' ? 'Level 3' : stage === 'final' ? 'Final' : ''

  return (
    <div className="page" aria-live="polite">
      {/* Background Music Component Added Here */}
      <BackgroundMusic src={MUSIC_SRC} />

      {confetti && <ConfettiCanvas trigger={confetti} />}
      {fireworks && <FireworksCanvas trigger={fireworks} />}
      <div ref={liveRef} style={{position:'absolute', left:-9999, top:'auto', width:1, height:1, overflow:'hidden'}} aria-hidden />

      <AvatarGuide leftPct={avatarLeft} bubble={stage === 'start' ? 'Tap the gift' : stage === 'level1' ? 'Choose one ❤️' : ''} />

      <div className="hero">
        <div className="left">
          <div className="glass-card">
            <div className="level-badge">{levelLabel}</div>
            <h1 className="title">Sorryyy AASHANA</h1>
            <p className="subtitle">A little sorry surprise, made just for you ✨</p>

            <AnimatePresence mode="wait" initial={false}>
              {stage === 'start' && (
                <motion.div key="start" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} transition={{duration:.4}}>
                  <Gift onOpen={() => { setFireworks(true); setConfetti(true); setTimeout(()=>{ setFireworks(false); setConfetti(false); setStage('popup'); setAvatarLeft(28) },700) }} />
                </motion.div>
              )}

              {stage === 'popup' && (
                <motion.div key="popup" initial={{opacity:0, scale:.98}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:.98}} transition={{duration:.36}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                      <h2 style={{margin:0, fontSize:20}}>Open your surprise</h2>
                      <p style={{margin:0, color:'var(--muted)'}}>A short and sweet journey ✨</p>
                    </div>
                    <div>
                      <button className="btn cta" onClick={() => setStage('level1')}>Proceed</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {stage === 'level1' && (
                <motion.div key="level1" initial={{opacity:0, x:10}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-10}} transition={{duration:.36}}>
                  <Level1 onCorrect={handleLevel1Correct} />
                </motion.div>
              )}

              {stage === 'level2' && (
                <motion.div key="level2" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}} transition={{duration:.36}}>
                  <Level2 onYes={handleLevel2Yes} onNoDodge={dodgeNo} />
                </motion.div>
              )}

              {stage === 'level3' && (
                <motion.div key="level3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.36}}>
                  <Level3Envelope onReadComplete={handleMarathiRead} />
                </motion.div>
              )}

              {stage === 'final' && !finalVisible && (
                <motion.div key="final" initial={{opacity:0, scale:.98}} animate={{opacity:1, scale:1}} exit={{opacity:0}} transition={{duration:.5}}>
                  <div style={{textAlign:'center', marginTop:12}}>
                    <div style={{fontSize:24, fontWeight:900}}>Thank You Aashana ❤️</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {congrats.show && (
              <div className="congrats-overlay" role="status" aria-live="polite">
                <div className="congrats-title">{congrats.text}</div>
                <div className="congrats-sub">You did it — lovely!</div>
              </div>
            )}
          </div>
        </div>

        <div className="right">
          <div style={{width:'100%', maxWidth:380}}>
            <div className="glass-card" style={{padding:12}}>
              <SweetMomentPanel />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {finalVisible && (
          <motion.div className="final-thanks" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.5}}>
            <div className="final-card">
              <div className="final-title">Again sorry, Aashana</div>
              <div className="final-text">Thank you for being my best friend and someone I trust and can always rely on — I cherish every moment with you.</div>
              <div style={{marginTop:10}}>
                <button className="btn cta" onClick={() => { setFinalVisible(false); }}>Close</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}