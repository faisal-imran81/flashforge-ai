import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Background from './components/Background'

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
        <p style={{
          color: '#10B981',
          fontFamily: 'JetBrains Mono, monospace',
          padding: '2rem',
          fontSize: '0.875rem',
        }}>
          background + loading screen done ✓
        </p>
      </div>
    </>
  )
}

export default App