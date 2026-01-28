import React, { useEffect, useRef } from 'react'

function rand(min, max){ return Math.random()*(max-min)+min }

export default function FireworksCanvas({ trigger }) {
  const ref = useRef(null)
  useEffect(()=> {
    if (!trigger) return
    const canvas = ref.current; if(!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    let raf = null
    const particles = []

    function makeBurst(x,y,colorPalette){
      const count = 36 + Math.floor(Math.random()*36)
      const speed = rand(2.6,6.6)
      for(let i=0;i<count;i++){
        const ang = Math.random()*Math.PI*2
        particles.push({
          x,y,
          vx: Math.cos(ang)* (speed * (0.4 + Math.random()*1.2)),
          vy: Math.sin(ang)* (speed * (0.4 + Math.random()*1.2)),
          life: 60 + Math.random()*60,
          r: 1 + Math.random()*3,
          color: colorPalette[Math.floor(Math.random()*colorPalette.length)],
          glow: 6 + Math.random()*12
        })
      }
    }

    makeBurst(w/2, h/3, ['#ffd166','#ff9fb8','#ffd7f0'])
    makeBurst(w/2 - 140, h/3 + 30, ['#7fe6c9','#ffd166','#caa6ff'])
    makeBurst(w/2 + 160, h/3 + 6, ['#ffb6d3','#9ad3bc','#ffd166'])

    function frame(){
      ctx.clearRect(0,0,w,h)
      // subtle sky glow
      ctx.globalCompositeOperation = 'lighter'
      for(let i=particles.length-1;i>=0;i--){
        const p = particles[i]
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.life/90)
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fill()
        // trail
        ctx.beginPath()
        ctx.strokeStyle = p.color
        ctx.globalAlpha = Math.max(0, (p.life/90)*0.18)
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p.x - p.vx*1.6, p.y - p.vy*1.6)
        ctx.stroke()
        p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.vx *= 0.997; p.vy *= 0.998
        p.life -= 1
        if(p.life <= 0 || p.y > h + 50) particles.splice(i,1)
      }
      ctx.globalCompositeOperation = 'source-over'
      if(particles.length>0) raf = requestAnimationFrame(frame)
    }
    frame()
    const t = setTimeout(()=>{ if(raf) cancelAnimationFrame(raf); ctx.clearRect(0,0,w,h) }, 2000)
    function onResize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return ()=>{ clearTimeout(t); if(raf) cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); if(ctx) ctx.clearRect(0,0,w,h) }
  }, [trigger])

  return <canvas ref={ref} style={{position:'fixed', left:0, top:0, pointerEvents:'none', zIndex:62}} />
}
