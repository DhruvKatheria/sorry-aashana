import React from 'react'
import { motion } from 'framer-motion'

export default function Level1({ onCorrect }) {
  const q = "What is Mayur's favourite part of the day?"
  const opts = ['Spending time with Aashana', 'Teasing and irritating Aashana', "Trying out cafe's and eating good food with Aashana"]
  return (
    <div>
      <div style={{fontWeight:900,fontSize:16, marginBottom:12}}>{q}</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr', gap:12}}>
        {opts.map((o,i)=>(
          <motion.button key={i} className="option-btn" onClick={() => onCorrect()}
            whileTap={{scale:.985}} whileHover={{scale:1.01}} transition={{duration:.14}} style={{color:'#061028'}}>
            {o}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
