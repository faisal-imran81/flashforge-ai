import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, memo } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

const NAME = 'FAISAL IMRAN'
const COUNT_MS = 1800
const DEAD_HOLD_MS = 400
const HANDOFF_MS = 900

const NameReveal = memo(() => (
  <h1
    style={{
      fontFamily: 'Syne, sans-serif',
      fontWeight: 800,
      fontSize: 'clamp(2.5rem, 8vw, 6rem)',
      letterSpacing: '-0.02em',
      lineHeight: 1,
      textAlign: 'center',
      display: 'block',
      whiteSpace: 'nowrap',
    }}
  >
    {NAME.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.2 + i * 0.055,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          display: 'inline-block',
          color: i < 6 ? '#F0FAF6' : i === 6 ? 'transparent' : '#10B981',
          minWidth: char === ' ' ? '0.35em' : undefined,
          overflow: 'hidden',
        }}
      >
        {char}
      </motion.span>
    ))}
  </h1>
))
NameReveal.displayName = 'NameReveal'

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [show, setShow] = useState(true)
  const barRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLParagraphElement>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let raf = 0
    let exitTimer: ReturnType<typeof setTimeout>
    let handoffTimer: ReturnType<typeof setTimeout>
    const start = performance.now()

    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / COUNT_MS) * 100))
      if (barRef.current) barRef.current.style.width = `${pct}%`
      if (percentRef.current) {
        percentRef.current.textContent = `${String(pct).padStart(3, '0')}%`
      }
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
        return
      }
      exitTimer = setTimeout(() => {
        setShow(false)
        handoffTimer = setTimeout(() => onCompleteRef.current(), HANDOFF_MS)
      }, DEAD_HOLD_MS)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(exitTimer)
      clearTimeout(handoffTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#080C0A',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.04,
              backgroundImage: `
                linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'rgba(16,185,129,0.05)',
              filter: 'blur(120px)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
              padding: '0 1.5rem',
              width: '100%',
              maxWidth: '800px',
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#6B7F79',
              }}
            >
              Portfolio · 2026
            </motion.p>

            <div style={{ overflow: 'hidden' }}>
              <NameReveal />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6B7F79',
                marginTop: '-0.5rem',
              }}
            >
              Frontend & Mobile Engineer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{
                position: 'relative',
                height: '1px',
                width: '260px',
                backgroundColor: '#1A2420',
                overflow: 'hidden',
                borderRadius: '999px',
                transformOrigin: 'left',
              }}
            >
              <div
                ref={barRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: '0%',
                  background: 'linear-gradient(90deg, #10B981, #059669)',
                }}
              />
            </motion.div>

            <motion.p
              ref={percentRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                color: '#6B7F79',
                fontVariantNumeric: 'tabular-nums',
                marginTop: '-1rem',
              }}
            >
              000%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen