import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { meta } from '../content/meta'

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    links.forEach(({ href }) => {
      const el = document.getElementById(href.replace('#', ''))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: scrolled ? '1px solid #1A2420' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          background: scrolled ? 'rgba(8,12,10,0.9)' : 'transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <nav
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 2rem',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a
            href="#"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '1.25rem',
              color: '#F0FAF6',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            FI<span style={{ color: '#10B981' }}>.</span>
          </a>

          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
            className="desktop-links"
          >
            {links.map(({ label, href }) => {
              const id = href.replace('#', '')
              const isActive = active === id
              const isHovered = hoveredLink === id

              return (
                <li key={href}>
                  <a
                    href={href}
                    onMouseEnter={() => setHoveredLink(id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.8rem',
                      color: isActive || isHovered ? '#10B981' : '#6B7F79',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      position: 'relative',
                      paddingBottom: '4px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {label}
                    <motion.span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '1px',
                        background: '#10B981',
                        width: isActive ? '100%' : '0%',
                        transition: 'width 0.3s ease',
                        display: 'block',
                      }}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <motion.a
            href={meta.links.email}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              padding: '0.5rem 1.25rem',
              border: '1px solid rgba(16,185,129,0.5)',
              color: '#10B981',
              borderRadius: '2px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(16,185,129,0.1)'
              e.currentTarget.style.borderColor = '#10B981'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)'
            }}
            className="hire-btn"
          >
            Hire me
          </motion.a>
        </nav>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderTop: '1px solid #1A2420',
          background: 'rgba(8,12,10,0.95)',
          backdropFilter: 'blur(12px)',
        }}
        className="mobile-nav"
      >
        <ul
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            height: '56px',
            alignItems: 'center',
            listStyle: 'none',
            margin: 0,
            padding: '0 0.5rem',
          }}
        >
          {links.map(({ label, href }) => {
            const isActive = active === href.replace('#', '')
            return (
              <li key={href}>
                <a
                  href={href}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.7rem',
                    color: isActive ? '#10B981' : '#6B7F79',
                    textDecoration: 'none',
                    padding: '0.5rem 0.75rem',
                    display: 'block',
                    transition: 'color 0.2s',
                    letterSpacing: '0.05em',
                  }}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .hire-btn { display: none !important; }
          .mobile-nav { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  )
}

export default Nav