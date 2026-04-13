import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { Home } from 'lucide-react'

const NotFound = () => {
  const titleRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'back.out'
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="text-center relative z-10 space-y-8">
        {/* 404 */}
        <div ref={titleRef} className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold bg-linear-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-3xl md:text-4xl font-bold text-white">Page Not Found</p>
        </div>

        {/* Description */}
        <p className="text-lg text-zinc-400 max-w-md mx-auto">
          Oops! This page doesn't exist. It might have been moved or deleted.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/')}
          className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold mx-auto"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 text-zinc-500 text-sm pt-8">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <span>•</span>
          <button onClick={() => navigate('/feed')} className="hover:text-white transition-colors">Feed</button>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>
      </div>
    </div>
  )
}

export default NotFound
