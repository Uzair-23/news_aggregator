import { useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useGSAPAnimations = (triggerElement, animation = 'fade') => {
  useEffect(() => {
    if (!triggerElement?.current) return

    const ctx = gsap.context(() => {
      if (animation === 'fade') {
        gsap.from(triggerElement.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out'
        })
      } else if (animation === 'slideInLeft') {
        gsap.from(triggerElement.current, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
      } else if (animation === 'slideInRight') {
        gsap.from(triggerElement.current, {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
      } else if (animation === 'scaleIn') {
        gsap.from(triggerElement.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out'
        })
      }
    })

    return () => ctx.revert()
  }, [triggerElement, animation])
}

export const useScrollReveal = (triggerElement) => {
  useEffect(() => {
    if (!triggerElement?.current) return

    gsap.registerPlugin(ScrollTrigger)

    gsap.from(triggerElement.current, {
      scrollTrigger: {
        trigger: triggerElement.current,
        start: 'top center+=100',
        end: 'center center',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [triggerElement])
}

export const useHoverGlow = (elementRef) => {
  useEffect(() => {
    const element = elementRef?.current
    if (!element) return

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(element, {
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        duration: 0.3,
        overwrite: 'auto'
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    return () => element.removeEventListener('mousemove', handleMouseMove)
  }, [elementRef])
}

export const useCounterAnimation = (targetValue, duration = 2) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    gsap.to({ count: 0 }, {
      count: targetValue,
      duration,
      onUpdate: function() {
        setValue(Math.floor(this.targets()[0].count))
      },
      ease: 'power2.inOut'
    })
  }, [targetValue, duration])

  return value
}
