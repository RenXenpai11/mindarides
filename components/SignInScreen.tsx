'use client'

interface SignInScreenProps {
  onSignIn: () => void
  onGuest: () => void
}

export default function SignInScreen({ onSignIn, onGuest }: SignInScreenProps) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <div className="w-full px-6 py-8 text-white bg-[#1a6b3c]">
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl">🚌</span>
        </div>
        <h1 className="text-2xl font-bold text-center">MindaRide</h1>
        <p className="text-center text-sm text-opacity-90 text-white mt-2">
          Plan your Mindanao bus trips with ease
        </p>
      </div>

      <div className="flex-1 px-4 py-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-3xl mb-2">🗺️</div>
            <p className="text-sm font-semibold text-gray-800">Route Maps</p>
            <p className="text-xs text-gray-600 mt-1">See all bus routes</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-3xl mb-2">📋</div>
            <p className="text-sm font-semibold text-gray-800">Schedules</p>
            <p className="text-xs text-gray-600 mt-1">Check departure times</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-3xl mb-2">❤️</div>
            <p className="text-sm font-semibold text-gray-800">Save Trips</p>
            <p className="text-xs text-gray-600 mt-1">For quick access</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-3xl mb-2">🔔</div>
            <p className="text-sm font-semibold text-gray-800">Reminders</p>
            <p className="text-xs text-gray-600 mt-1">Never miss a bus</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8">
        <button
          onClick={onSignIn}
          className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 mb-3 bg-[#1a6b3c]"
        >
          <span>🔐</span> Continue with Google
        </button>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          onClick={onGuest}
          className="w-full py-3 rounded-lg font-semibold border-2 border-gray-400 text-gray-400"
        >
          Continue as Guest
        </button>

        <p className="text-xs text-center text-gray-500 mt-4">
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  )
}
