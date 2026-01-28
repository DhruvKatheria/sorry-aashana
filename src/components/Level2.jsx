import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Level2({ onYes, onNoDodge }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div>
      <div style={{fontWeight:900,fontSize:16}}>You are the most wonderful person I've ever met who has the tendency to say yes at everything I say or everything I want you to do. The thing I wanna say from the start of our friendship from the depth of my heart I really want you to answer this question </div>
      {!revealed && (
        <div style={{marginTop:12}}>
          <motion.button
            className="btn cta"
            onClick={() => setRevealed(true)}
            whileTap={{ scale: .98 }}
            whileHover={{ y: -4 }}
          >
            Reveal the question
          </motion.button>
        </div>
      )}

      {revealed && (
        <>
          <div style={{marginTop:12, fontSize:18, fontWeight:800, color:'#ff6b88'}}>
            BADDAK KA LENDA KHAYEGI...KAALA NAMAK LAGAKE??
          </div>
          <div style={{display:'flex', gap:12, marginTop:12, alignItems:'center', flexWrap:'wrap'}}>
            <motion.button className="btn secondary" onClick={onYes} whileTap={{scale:.98}} whileHover={{y:-4}}>Yes, absolutely!</motion.button>
            <div style={{width:140, height:48, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <button className="btn no" onMouseEnter={onNoDodge} onTouchStart={(e)=>{ e.preventDefault(); onNoDodge() }} onClick={(e)=>{ e.preventDefault(); onNoDodge() }} aria-hidden tabIndex={-1}>No</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
