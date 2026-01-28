import React, { useEffect, useRef } from 'react'

function rand(min,max){ return Math.random()*(max-min)+min }

export default function ConfettiCanvas({ trigger }) {
  const ref = useRef(null)
  useEffect(()=> {
    if(!trigger) return
    const canvas = ref.current; if(!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const pieces = []
    const shapes = ['rect','circle','triangle']
    const count = Math.min(220, Math.floor((w*h)/3000))
    for(let i=0;i<count;i++){
      pieces.push({
        x: w/2 + rand(-40,40),
        y: h/2 + rand(-10,40),
        vx: rand(-8,8),
        vy: rand(-6,-1),
        ang: rand(0, Math.PI*2),
        spin: rand(-0.12,0.12),
        size: rand(6,14),
        color: ['#ffd7a8','#f6b8d6','#9ad3bc','#d6b8ff'][Math.floor(Math.random()*4)],
        shape: shapes[Math.floor(Math.random()*shapes.length)],
        life: 120 + Math.floor(Math.random()*80)
      })
    }
    let raf = null
    function frame(){
      ctx.clearRect(0,0,w,h)
      for(let i=pieces.length-1;i>=0;i--){
        const p = pieces[i]
        p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.ang += p.spin; p.life -= 1
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.ang)
        ctx.globalAlpha = Math.max(0, p.life/180)
        ctx.fillStyle = p.color
        if(p.shape === 'rect'){
          ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6)
        } else if(p.shape === 'circle'){
          ctx.beginPath(); ctx.arc(0,0,p.size/2,0,Math.PI*2); ctx.fill()
        } else {
          ctx.beginPath(); ctx.moveTo(-p.size/2, p.size/2); ctx.lineTo(p.size/2, p.size/2); ctx.lineTo(0, -p.size/2); ctx.closePath(); ctx.fill()
        }
        ctx.restore()
        if(p.y > h + 40 || p.life <= 0) pieces.splice(i,1)
      }
      if(pieces.length>0) raf = requestAnimationFrame(frame)
    }
    frame()
    const t = setTimeout(()=>{ if(raf) cancelAnimationFrame(raf); ctx.clearRect(0,0,w,h) }, 2600)
    function onResize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return ()=>{ clearTimeout(t); if(raf) cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); if(ctx) ctx.clearRect(0,0,w,h) }
  }, [trigger])
  return <canvas ref={ref} style={{position:'fixed', left:0, top:0, pointerEvents:'none', zIndex:61}} />
}
