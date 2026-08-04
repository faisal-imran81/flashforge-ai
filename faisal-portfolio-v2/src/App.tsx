import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Background from './components/Background'
import Nav from './components/Nav'
import Hero from './components/sections/Hero'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Background />
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Nav />
        <main>
          <Hero />
          <section id="projects" style={{ minHeight: '100vh', padding: '8rem 2rem' }} />
          <section id="stack" style={{ minHeight: '60vh', padding: '8rem 2rem' }} />
          <section id="experience" style={{ minHeight: '60vh', padding: '8rem 2rem' }} />
          <section id="contact" style={{ minHeight: '60vh', padding: '8rem 2rem' }} />
        </main>
      </div>
    </>
  )
}

export default App