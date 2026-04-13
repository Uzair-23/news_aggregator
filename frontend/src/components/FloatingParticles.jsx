import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const FloatingParticles = ({ count = 20 }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const particles = containerRef.current?.querySelectorAll('[data-particle]')
    if (!particles) return

    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: Math.random() * -200 - 100,
        x: Math.random() * 100 - 50,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        ease: 'power1.inOut',
        delay: Math.random() * 0.5
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          data-particle
          className="absolute w-1 h-1 bg-accent-blue rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  )
}

export default FloatingParticles
