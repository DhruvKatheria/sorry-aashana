import React, { useEffect, useRef, useState } from 'react'

export default function AvatarGuide({ leftPct = 8, bubble = '' }) {
  const left = typeof leftPct === 'number' ? `${leftPct}%` : leftPct
  const [wink, setWink] = useState(false)
  const [wave, setWave] = useState(false)
  const winkTimer = useRef(null)
  const waveTimer = useRef(null)

  useEffect(() => {
    function scheduleWink() {
      const delay = 3500 + Math.floor(Math.random() * 4000)
      winkTimer.current = setTimeout(() => {
        setWink(true)
        setTimeout(() => setWink(false), 240)
        scheduleWink()
      }, delay)
    }
    scheduleWink()
    return () => {
      clearTimeout(winkTimer.current)
      clearTimeout(waveTimer.current)
    }
  }, [])

  function triggerWave() {
    if (wave) return
    setWave(true)
    waveTimer.current = setTimeout(() => setWave(false), 1800)
  }

  const imgUrl = 'https://i.pinimg.com/736x/61/66/49/6166494835b8cfdb6e7c4c2a7761a5f2.jpg'

  return (
    <>
      <style>{`
        .avatar { position:fixed; bottom:18px; left:${left}; width:76px; height:76px; border-radius:20px; z-index:70; transform-origin:center bottom; transition:left .72s cubic-bezier(.2,.9,.3,1), transform .3s; display:flex; align-items:center; justify-content:center; }
        .avatar-frame { width:100%; height:100%; border-radius:14px; overflow:hidden; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg,#fff,#ffeef6); box-shadow:0 12px 40px rgba(0,0,0,0.16); position:relative; cursor:pointer; }
        .avatar-frame.animate-breath { animation: breath 4200ms ease-in-out infinite; }
        .avatar-frame.animate-bob { animation: bob 3600ms ease-in-out infinite; }
        @keyframes breath { 0%{ transform: scale(1) } 50%{ transform: scale(1.035) } 100%{ transform: scale(1) } }
        @keyframes bob { 0%{ transform: translateY(0) } 50%{ transform: translateY(-3px) } 100%{ transform: translateY(0) } }

        .avatar-bg {
          width:100%;
          height:100%;
          background-image: url("${imgUrl}");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 12px;
          display:block;
        }

        .avatar-glow { position:absolute; inset:-6px; border-radius:18px; pointer-events:none; transition: box-shadow .3s ease; }
        .avatar-frame.glow { box-shadow: 0 22px 60px rgba(255,140,170,0.18), inset 0 1px 0 rgba(255,255,255,0.35); }
        .avatar-frame.glow .avatar-glow { box-shadow:0 24px 80px rgba(255,110,150,0.18) }

        .eye-veil { position:absolute; left:0; right:0; top:0; height:0; background:linear-gradient(180deg, rgba(5,6,10,0.0) 0%, rgba(5,6,10,0.06) 60%); pointer-events:none; transform-origin:center top; }
        .blink { animation: blinkAnim 250ms steps(2, end) 1 forwards; }
        @keyframes blinkAnim { 0%{ height:0 } 50%{ height:100% } 100%{ height:0 } }

        .hand-wave { position:absolute; right:-6px; top:-6px; width:30px; height:30px; transform-origin:center bottom; transition:transform .18s ease; }
        .hand-wave svg { width:100%; height:100%; display:block }
        .hand-wave.wave-it { animation: waveKey 700ms ease-in-out 0s 3; transform-origin:center bottom; }
        @keyframes waveKey { 0%{ transform: rotate(0deg) } 25%{ transform: rotate(-18deg) } 50%{ transform: rotate(10deg) } 75%{ transform: rotate(-10deg) } 100%{ transform: rotate(0deg) } }

        .pulse-outline { position:absolute; left:-8px; top:-8px; right:-8px; bottom:-8px; border-radius:18px; pointer-events:none; opacity:0; transition:opacity .28s ease; box-shadow:0 24px 80px rgba(255,120,150,0.14); }
        .pulse-show { animation: pulse 900ms ease-out 0s 1; opacity:1; }
        @keyframes pulse { 0%{ transform:scale(.92); opacity:0.6 } 100%{ transform:scale(1.08); opacity:0 } }

        .avatar-bubble { position:absolute; top:-18px; left:50%; transform:translateX(-50%); background:linear-gradient(90deg,#fff,#fff); color:#222; border-radius:12px; padding:6px 10px; font-weight:700; font-size:13px; box-shadow:0 8px 20px rgba(0,0,0,0.12); white-space:nowrap; }

      `}</style>

      <div className="avatar" style={{ left }}>
        <div
          className={`avatar-frame animate-breath animate-bob ${wave ? 'glow' : ''}`}
          onClick={() => { triggerClickHandlers(); }}
          role="button"
          tabIndex={0}
          aria-label="Guide avatar"
        >
          <div className={`pulse-outline ${wave ? 'pulse-show' : ''}`} />
          <div className="avatar-bg" aria-hidden />
          <div className={`avatar-glow`} />
          <div className={`eye-veil ${wink ? 'blink' : ''}`} />
          <div className={`hand-wave ${wave ? 'wave-it' : ''}`} aria-hidden>
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M14 44c4-8 12-18 22-20" stroke="#ffd6e0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="48" cy="18" r="6" fill="#ffd6e0"/>
              <path d="M46 22c0 3-2 6-5 8" stroke="#ff9fb8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {bubble ? <div className="avatar-bubble">{bubble}</div> : null}
      </div>
    </>
  )

  function triggerClickHandlers() {
    triggerWave()
    setTimeout(() => {
      setWave(false)
    }, 1800)
  }
}
