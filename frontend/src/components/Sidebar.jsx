import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Home, Zap, Bookmark, BarChart3, Settings, LogOut, Menu, X,
  Globe, Gauge, Users
} from 'lucide-react'
import { useState, useEffect } from 'react'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const isAdmin = user?.role === 'admin'

  const menuItems = [
    { icon: Zap, label: 'Feed', path: '/feed' },
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
    ...(isAdmin ? [
      { icon: Gauge, label: 'Admin', path: '/admin' }
    ] : [])
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-20 left-4 z-30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-surface-card rounded-lg border border-surface-border hover:border-accent-blue/50 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-surface-dark border-r border-surface-border
          transition-transform duration-300 z-20
          md:translate-x-0 md:static md:top-0 md:h-screen
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full p-6 space-y-8 overflow-y-auto">
          {/* Profile */}
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white">{user?.name}</p>
              <p className="text-sm text-dark-400">{user?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {menuItems.map(({ icon: Icon, label, path }) => (
              <button
                key={path}
                onClick={() => {
                  navigate(path)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(path)
                    ? 'bg-accent-blue/20 text-accent-blue shadow-glow-blue'
                    : 'text-dark-400 hover:bg-surface-hover'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="border-t border-surface-border pt-4 space-y-2">
            <button
              onClick={() => navigate('/profile')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-dark-400 hover:bg-surface-hover transition-all"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
            <button
              onClick={() => {
                logout()
                navigate('/')
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-dark-400 hover:bg-accent-red/10 hover:text-accent-red transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
