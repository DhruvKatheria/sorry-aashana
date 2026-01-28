import React from 'react'
import { motion } from 'framer-motion'

export default function Gift({ onOpen }) {
  return (
    <motion.div className="gift" role="button" tabIndex={0}
      onClick={onOpen} onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' ') onOpen() }}
      initial={{scale:0.96, opacity:0}} animate={{scale:1, opacity:1}} whileHover={{scale:1.02}} transition={{type:'spring', stiffness:260, damping:20}}>
      <div className="gift-inner" aria-hidden>
        <div style={{textAlign:'center', padding:10}}>
          <div style={{fontSize:44, fontWeight:900, filter:'drop-shadow(0 10px 30px rgba(0,0,0,0.32))'}}>🎁</div>
          <div className="hint">Hey Beautiful, can you answer some simple questions ??</div>
        </div>
        <div className="ribbon-vert" />
        <div className="ribbon-h" />
      </div>
    </motion.div>
  )
}
