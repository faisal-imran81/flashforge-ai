import { useEffect, useRef } from 'react'

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 12 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 0.8 + 1,
      opacity: Math.random() * 0.12 + 0.06,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = '#10B981'
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationId = requestAnimationFrame(draw)
    }

    if (!prefersReduced) {
      draw()
    }

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundColor: '#080C0A',
        }}
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

export default Background