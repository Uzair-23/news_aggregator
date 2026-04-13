import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Loader = () => {
  const loaderRef = useRef(null)

  useEffect(() => {
    gsap.to(loaderRef.current, {
      opacity: 1,
      duration: 0.3
    })
  }, [])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-surface-border animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent-blue border-r-accent-purple animate-spin" style={{animationDirection: 'reverse'}} />
        </div>
        <p className="text-dark-400 text-sm font-medium">Loading...</p>
      </div>
    </div>
  )
}

export default Loader
