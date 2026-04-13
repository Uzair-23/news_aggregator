import { useEffect } from 'react'

export const useLenis = () => {
  useEffect(() => {
    // Lenis is loaded globally in HTML if needed
    // For now, Tailwind's smooth scroll handles it
    document.documentElement.style.scrollBehavior = 'smooth'

    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])
}

export default useLenis
