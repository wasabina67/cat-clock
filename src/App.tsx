import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())
  const [catImageUrl, setCatImageUrl] = useState('https://cdn2.thecatapi.com/images/MTk3NDc4MQ.jpg')

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchCatImageUrl = async () => {
      try {
        const response = await fetch('/cat-clock/metadata.json?t=' + Date.now()) // Cache busting
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        if (data.imageUrl) setCatImageUrl(data.imageUrl)
      } catch (error) {
        console.error('Failed to fetch cat image metadata: ', error)
      }
    }

    fetchCatImageUrl() // Initial fetch
    const CHECK_INTERVAL_MS = 10 * 60 * 1000 // 10 minutes
    const fetchTimer = setInterval(fetchCatImageUrl, CHECK_INTERVAL_MS)

    return () => clearInterval(fetchTimer)
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
          src={catImageUrl}
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
