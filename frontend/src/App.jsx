import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Search from './pages/Search'
import Bookmarks from './pages/Bookmarks'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import ArticleDetails from './pages/ArticleDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="bg-dark-950 min-h-screen text-dark-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
              <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/article/:id" element={<ProtectedRoute><ArticleDetails /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-right" toastOptions={{
              style: {
                background: '#171717',
                color: '#ffffff',
                border: '1px solid #2a2a2a',
              }
            }} />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
