import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import FloatingParticles from './FloatingParticles'
import Navbar from './Navbar'
import { ArrowRight, Sparkles } from 'lucide-react'

const HeroSection = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      })

      // CTA animation
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      <FloatingParticles count={30} />
      <Navbar />

      {/* Gradient Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="container-app max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-500 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Powered by AI
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-gradient-animated text-6xl md:text-7xl font-bold leading-tight"
          >
            Read Smarter. <br />
            Think Clearer.
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl text-zinc-400 leading-relaxed"
          >
            Personalized AI-powered news from trusted sources. Get curated content that matches your interests and reading style.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <button
              onClick={() => navigate('/register')}
              className="btn-primary px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2 group"
            >
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/feed')}
              className="btn-secondary px-8 py-4 text-lg font-semibold"
            >
              Explore Feed
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-[#2a2a2a]/50">
            <div>
              <p className="text-3xl font-bold text-blue-500">50K+</p>
              <p className="text-zinc-400 text-sm">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-violet-500">500+</p>
              <p className="text-zinc-400 text-sm">News Sources</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400">1M+</p>
              <p className="text-zinc-400 text-sm">Articles Daily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
