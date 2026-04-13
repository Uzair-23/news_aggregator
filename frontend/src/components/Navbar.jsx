import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X, Search, Bell, User, LogOut } from 'lucide-react'
import gsap from 'gsap'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, isAuthenticated } = useAuth()
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      gsap.to(navRef.current?.querySelector('[data-nav-menu]'), {
        opacity: 1,
        duration: 0.3
      })
    }
  }, [isOpen])

  const isHomePage = location.pathname === '/'

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-[#111111]/80 backdrop-blur-md border-b border-[#2a2a2a]' : 'bg-transparent'
      }`}
    >
      <div className="container-app h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-bold bg-linear-to-r from-blue-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          NewsAI
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/feed')}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Feed
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/bookmarks')}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Bookmarks
              </button>
            </>
          ) : null}

          {!isHomePage && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search..."
                className="input-base pl-10 pr-4 py-2 w-48"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button className="p-2 hover:bg-[#111111] rounded-lg transition-colors hidden sm:flex">
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-[#111111] rounded-lg transition-colors hidden sm:flex"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={logout}
                className="p-2 hover:bg-[#111111] rounded-lg transition-colors hidden sm:flex"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="btn-secondary px-4 py-2 text-sm hidden sm:block"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn-primary px-4 py-2 text-sm hidden sm:block"
              >
                Sign Up
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            data-nav-menu
            className="absolute top-16 left-0 right-0 bg-[#111111] border-b border-[#2a2a2a] md:hidden"
          >
            <div className="container-app py-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      navigate('/feed')
                      setIsOpen(false)
                    }}
                    className="block w-full text-left py-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    Feed
                  </button>
                  <button
                    onClick={() => {
                      navigate('/dashboard')
                      setIsOpen(false)
                    }}
                    className="block w-full text-left py-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate('/bookmarks')
                      setIsOpen(false)
                    }}
                    className="block w-full text-left py-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    Bookmarks
                  </button>
                  <div className="border-t border-[#2a2a2a] my-3 pt-3">
                    <button
                      onClick={() => {
                        navigate('/profile')
                        setIsOpen(false)
                      }}
                      className="block w-full text-left py-2 text-zinc-400 hover:text-white transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                      className="block w-full text-left py-2 text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate('/login')
                      setIsOpen(false)
                    }}
                    className="btn-secondary block w-full py-2"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      navigate('/register')
                      setIsOpen(false)
                    }}
                    className="btn-primary block w-full py-2"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
