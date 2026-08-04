import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
          minHeight: '100vh',
          backgroundColor: '#080C0A',
        }}
      >
        <p style={{
          color: '#10B981',
          fontFamily: 'JetBrains Mono, monospace',
          padding: '2rem',
          fontSize: '0.875rem',
        }}>
          loading screen done ✓
        </p>
      </div>
    </>
  )
}

export default App