'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Skip splash/signin, go straight to main page
    router.push('/')
  }, [router])

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#1a6b3c]">
      <span className="text-5xl">🚌</span>
    </div>
  )
}
