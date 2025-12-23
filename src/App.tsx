import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const AUTO_RELOAD_INTERVAL_MS = 10 * 60 * 1000 // 10 minutes
    const reloadTimer = setInterval(() => {
      window.location.reload()
    }, AUTO_RELOAD_INTERVAL_MS)

    return () => clearInterval(reloadTimer)
  }, [])

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })

  const formattedDate = time.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="app">
      <div className="cat-container">
        <img
          src="https://cdn2.thecatapi.com/images/CDhOtM-Ig.jpg"
          alt="cat"
          className="cat-image"
        />
        <div className="clock">
          <div className="date">{formattedDate}</div>
          <div className="time">{formattedTime}</div>
        </div>
      </div>
    </div>
  )
}

export default App
