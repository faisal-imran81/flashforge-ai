import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { meta } from '../../content/meta'

const Hero = () => {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 60])

  const particle1Y = useTransform(scrollYProgress, [0, 1], [0, -120])
  const particle2Y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const particle3Y = useTransform(scrollYProgress, [0, 1], [0, -160])

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '0 2rem',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '40%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(16,185,129,0.04)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <motion.div style={{ y: particle1Y, position: 'absolute', top: '20%', left: '10%' }} aria-hidden="true">
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(16,185,129,0.25)' }} />
      </motion.div>
      <motion.div style={{ y: particle2Y, position: 'absolute', top: '60%', right: '15%' }} aria-hidden="true">
        <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)' }} />
      </motion.div>
      <motion.div style={{ y: particle3Y, position: 'absolute', top: '75%', left: '60%' }} aria-hidden="true">
        <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)' }} />
      </motion.div>

      <motion.div
        style={{
          opacity,
          y,
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          paddingTop: '80px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem' }}
        >
          <span style={{ width: '32px', height: '1px', background: '#10B981', display: 'block' }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: '#10B981',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Available for opportunities
          </span>
        </motion.div>

        <div style={{ overflow: 'hidden', marginBottom: '0.75rem' }}>
          <motion.p
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.85rem',
              color: '#6B7F79',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Faisal Imran
          </motion.p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                color: '#F0FAF6',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              Software
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                color: '#10B981',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              Engineer.
            </motion.h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            gap: '4rem',
            marginBottom: '3rem',
          }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            color: '#6B7F79',
            lineHeight: 1.8,
            maxWidth: '400px',
            margin: 0,
          }}>
            Final year CS student at FAST NUCES.
            I build and ship AI-powered products — fast,
            with real engineering decisions behind every choice.
          </p>

          <div style={{
            display: 'flex',
            gap: '3rem',
          }}>
            {[
              { value: '3', label: 'Products shipped' },
              { value: '3d', label: 'Avg. to MVP' },
              { value: '2026', label: 'Building' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  color: '#F0FAF6',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}>
                  {value}
                  <span style={{ color: '#10B981' }}>.</span>
                </div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.68rem',
                  color: '#6B7F79',
                  marginTop: '0.35rem',
                  letterSpacing: '0.05em',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              padding: '0.75rem 1.75rem',
              background: '#10B981',
              color: '#080C0A',
              fontWeight: 600,
              borderRadius: '2px',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#059669')}
            onMouseLeave={e => (e.currentTarget.style.background = '#10B981')}
          >
            View projects
          </motion.a>

          <motion.a
            href={meta.links.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              padding: '0.75rem 1.75rem',
              border: '1px solid #1A2420',
              color: '#6B7F79',
              borderRadius: '2px',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'
              e.currentTarget.style.color = '#F0FAF6'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#1A2420'
              e.currentTarget.style.color = '#6B7F79'
            }}
          >
            GitHub ↗
          </motion.a>

          <motion.a
            href={meta.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              padding: '0.75rem 1.75rem',
              border: '1px solid #1A2420',
              color: '#6B7F79',
              borderRadius: '2px',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'
              e.currentTarget.style.color = '#F0FAF6'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#1A2420'
              e.currentTarget.style.color = '#6B7F79'
            }}
          >
            LinkedIn ↗
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            marginTop: '5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '36px',
              background: 'linear-gradient(to bottom, #10B981, transparent)',
            }}
          />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            color: '#6B7F79',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            Scroll to explore
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero