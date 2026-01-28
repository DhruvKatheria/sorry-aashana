// src/components/Level3Envelope.jsx
import React, { useState, useRef, useEffect } from 'react'
import { MARATHI_MESSAGE } from '../constants'

export default function Level3Envelope({ onReadComplete }) {
  const [opened, setOpened] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const envelopeRef = useRef(null)
  const contentRef = useRef(null)

  function open() {
    if (opened) return
    setOpened(true)
    envelopeRef.current?.classList.add('open')
    setTimeout(()=> {
      contentRef.current?.focus()
    }, 420)
  }

  function handleConfirm() {
    setConfirmed(true)
    setTimeout(()=> {
      onReadComplete && onReadComplete()
    }, 500)
  }

  useEffect(()=> {
    const el = envelopeRef.current
    if (el) el.style.transform = 'translateY(0)'
  }, [])

  return (
    <div>
      <div style={{ fontWeight: 900, fontSize: 16, color: 'var(--option-text)', marginBottom: 8 }}>Final letter</div>
      <div style={{ marginTop: 12 }}>
        <div className={`envelope ${opened ? 'open' : ''}`} ref={envelopeRef} onClick={open} role="button" aria-expanded={opened}>
          <div className="flap" />
          <div className="letter" tabIndex={-1}>
            {!opened ? (
              <div style={{ textAlign: 'center', fontWeight: 900, color: 'var(--option-text)' }}>Tap to open the envelope</div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div
                  ref={contentRef}
                  tabIndex={0}
                  style={{
                    outline: 'none',
                    textAlign: 'center',
                    fontWeight: 900,
                    marginBottom: 10,
                    color: 'var(--option-text)',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {'Aashana, i didn’t want you hurt at any cost i really tu mere liya ek kid ki tarah i have to teach you everything and make you strong and independent at every point of life i want you to grow your personality not jusy but skills or mind also by your health me tere saath khana bhi esliye khane jata hu because you are bad at diet you i care for you i was worried jab tu kal ladai ke baad switch off karke nikal gyi thi me dar gya tha please algli baar aise maat karna. I said ki mujhe nhi karni baat ya end karna hai but from inside i never wanted to do bus mera ego itna fragile hai ki me na chahu phir bhi khatam kardeta hu chize and i love the most that you save me everytime doing this all i wanted to say this is ki sorry i hurt you everytime and still make youu regret for it and what i did……. Btw i knew tu badak ka lenda khaygi kala namak laga ke!!!'}
                </div>

                <div style={{ marginTop: 8, color: 'var(--muted)' }}>
                  Please read the message. When you are done, click the button below to continue.
                </div>

                <div style={{ marginTop: 12 }}>
                  <button
                    className="btn cta"
                    onClick={handleConfirm}
                    disabled={confirmed}
                    aria-disabled={confirmed}
                    style={{ opacity: confirmed ? 0.6 : 1 }}
                  >
                    {confirmed ? 'Thanks — continuing...' : 'I have read this'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
