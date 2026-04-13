'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SplashScreen from '@/components/SplashScreen'
import SignInScreen from '@/components/SignInScreen'

type Screen = 'splash' | 'signin' | 'home'

export default function Home() {
  const router = useRouter()
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const userStatus = localStorage.getItem('mindaride_user_status')
      if (userStatus === 'authenticated' || userStatus === 'guest') {
        setIsLoading(false)
        router.push('/') // Route to main shell page
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSplashDone = () => {
    setCurrentScreen('signin')
  }

  const handleSignIn = () => {
    localStorage.setItem('mindaride_user_status', 'authenticated')
    router.push('/') // Route to main shell page
  }

  const handleGuest = () => {
    localStorage.setItem('mindaride_user_status', 'guest')
    router.push('/') // Route to main shell page
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: '#1a6b3c' }}>
        <span className="text-5xl">🚌</span>
      </div>
    )
  }

  return (
    <main className="w-full">
      {currentScreen === 'splash' && <SplashScreen onDone={handleSplashDone} />}
      {currentScreen === 'signin' && (
        <SignInScreen onSignIn={handleSignIn} onGuest={handleGuest} />
      )}
    </main>
  )
}
