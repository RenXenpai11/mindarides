'use client'

import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onDone: () => void
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onDone, 500)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 300)

    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#1a6b3c]">
      <div className="mb-8 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
          <span className="text-5xl">🚌</span>
        </div>
      </div>
      <h1 className="text-white text-4xl font-bold mb-2">MindaRide</h1>
      <p className="text-white text-opacity-80 text-sm mb-12">Your Mindanao Bus Companion</p>
      <div className="w-32 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300 bg-[#EF9F27]"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="text-white text-opacity-60 text-xs mt-12">v1.0.0</p>
    </div>
  )
}
