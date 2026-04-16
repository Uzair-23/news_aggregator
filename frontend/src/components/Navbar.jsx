import { useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X, Search, User, LogOut } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, isAuthenticated } = useAuth()

  const isHomePage = location.pathname === '/'

  const userInitials = useMemo(() => {
    const base = user?.name || user?.email || ''
    if (!base) return ''
    return base
      .trim()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0].toUpperCase())
      .join('')
  }, [user])

  return (
    <nav className="fixed top-0 w-full h-16 z-50 backdrop-blur-md bg-zinc-900/80 border-b border-zinc-800/70">
      <div className="container-app h-16 grid grid-cols-3 items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#1f1f1f] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold bg-linear-to-r from-blue-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            NewsAI
          </button>
        </div>

        <div className="hidden md:flex items-center justify-center gap-6">
          {isAuthenticated && (
            <div className="flex items-center gap-6 text-sm">
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
            </div>
          )}
          {!isHomePage && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search..."
                className="input-base pl-10 pr-4 py-2 w-56"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#111111] px-2 py-1 rounded-full">
                <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="User avatar" className="w-full h-full object-cover" />
                  ) : userInitials ? (
                    <span className="text-sm font-semibold">{userInitials}</span>
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                <span className="text-sm text-zinc-200 hidden lg:block">
                  {user?.name || user?.email || 'User'}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-[#1f1f1f] transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn-primary px-4 py-2 text-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#111111] border-b border-[#2a2a2a] md:hidden">
          <div className="container-app py-4 space-y-3">
            {!isHomePage && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-base pl-10 pr-4 py-2 w-full"
                />
              </div>
            )}
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate('/feed')
                    setIsOpen(false)
                  }}
                  className="block w-full text-left py-2 text-zinc-300 hover:text-white transition-colors"
                >
                  Feed
                </button>
                <button
                  onClick={() => {
                    navigate('/dashboard')
                    setIsOpen(false)
                  }}
                  className="block w-full text-left py-2 text-zinc-300 hover:text-white transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate('/bookmarks')
                    setIsOpen(false)
                  }}
                  className="block w-full text-left py-2 text-zinc-300 hover:text-white transition-colors"
                >
                  Bookmarks
                </button>
                <div className="border-t border-[#2a2a2a] my-3 pt-3">
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left py-2 text-zinc-300 hover:text-red-400 transition-colors"
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
    </nav>
  )
}

export default Navbar
