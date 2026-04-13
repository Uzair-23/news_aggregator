import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Bell, Lock, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    preferences: user?.preferences || []
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    updateProfile(formData)
    toast.success('Profile updated successfully!')
    setIsEditing(false)
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Sidebar />

      <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-2xl space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Profile</h1>
            <p className="text-zinc-400">Manage your account settings and preferences</p>
          </div>

          {/* Profile Card */}
          <div className="card-base p-8 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-zinc-400">{user?.email}</p>
                <p className="text-xs text-zinc-500 mt-1 capitalize">Role: {user?.role}</p>
              </div>
            </div>

            {!isEditing ? (
              <>
                {/* Info Display */}
                <div className="border-t border-[#2a2a2a] pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-zinc-500" />
                    <div>
                      <p className="text-zinc-400 text-sm">Full Name</p>
                      <p className="font-medium">{user?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-zinc-500" />
                    <div>
                      <p className="text-zinc-400 text-sm">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-zinc-500" />
                    <div>
                      <p className="text-zinc-400 text-sm">Preferences</p>
                      <div className="flex gap-2 mt-1">
                        {user?.preferences?.map(pref => (
                          <span key={pref} className="badge-primary text-xs">{pref}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary w-full"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                {/* Edit Form */}
                <div className="border-t border-[#2a2a2a] pt-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-base pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="input-base pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6">
                  <button
                    onClick={handleSave}
                    className="btn-primary flex-1"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Notification Settings */}
          <div className="card-base p-6 space-y-4">
            <h3 className="text-lg font-bold">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                { label: 'Email notifications', desc: 'Get updates about new articles' },
                { label: 'Breaking news alerts', desc: 'Notify me of major news stories' },
                { label: 'Weekly digest', desc: 'Receive your weekly reading summary' },
                { label: 'Recommendation digest', desc: 'Get personalized recommendations' }
              ].map((pref, idx) => (
                <label key={idx} className="flex items-center gap-3 p-3 hover:bg-[#1f1f1f] rounded-lg transition-colors cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border border-[#2a2a2a]" />
                  <div>
                    <p className="font-medium">{pref.label}</p>
                    <p className="text-zinc-400 text-sm">{pref.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
