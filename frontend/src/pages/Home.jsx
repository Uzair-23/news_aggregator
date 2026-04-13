import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'
import { Users, Zap, Shield, Globe } from 'lucide-react'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const featuresRef = useRef(null)

  useEffect(() => {
    const cards = featuresRef.current?.querySelectorAll('[data-feature-card]')
    if (!cards) return

    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out'
      })
    })
  }, [])

  return (
    <div className="bg-[#0a0a0a]">
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-[#111111]">
        <div className="container-app">
          <h2 className="section-title text-center mb-12">
            Powerful Features
          </h2>

          <div
            ref={featuresRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Zap,
                title: 'AI-Powered',
                desc: 'Machine learning algorithms personalize your feed'
              },
              {
                icon: Shield,
                title: 'Verified Sources',
                desc: 'Only top-tier trusted news sources included'
              },
              {
                icon: Globe,
                title: 'Global Coverage',
                desc: 'News from around the world in seconds'
              },
              {
                icon: Users,
                title: 'Community Driven',
                desc: 'Discover what other readers are sharing'
              }
            ].map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={idx}
                data-feature-card
                className="card-base p-6 space-y-4 text-center"
              >
                <div className="flex justify-center">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Icon className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-zinc-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container-app">
          <h2 className="section-title text-center mb-12">
            Explore Categories
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {['Technology', 'Business', 'Health', 'Science', 'Sports', 'Entertainment'].map((cat) => (
              <button
                key={cat}
                className="card-base p-8 text-center group hover:scale-105 transition-transform"
              >
                <h3 className="text-2xl font-bold group-hover:text-blue-500 transition-colors">
                  {cat}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#111111]">
        <div className="container-app">
          <h2 className="section-title text-center mb-12">
            What Users Say
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Chen', role: 'Tech Enthusiast', text: 'NewsAI changed how I stay informed. Highly personalized!' },
              { name: 'Alex Rodriguez', role: 'Journalist', text: 'Love the credibility scores. Helps me verify sources quickly.' },
              { name: 'Maria Johnson', role: 'Student', text: 'Perfect for research. The summaries save me so much time!' }
            ].map((testimonial, idx) => (
              <div key={idx} className="card-base p-6 space-y-4">
                <p className="text-zinc-300">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-blue-500">{testimonial.name}</p>
                  <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
        </div>

        <div className="container-app text-center relative z-10 space-y-8">
          <h2 className="section-title">Ready to Change How You Read News?</h2>
          <button className="btn-primary px-12 py-4 text-lg font-semibold mx-auto">
            Start Reading Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
