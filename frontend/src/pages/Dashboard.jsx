import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatsCard from '../components/StatsCard'
import Loader from '../components/Loader'
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { TrendingUp, BookOpen, Zap, BarChart3, BookmarkX } from 'lucide-react'
import { useDashboardData } from '../hooks/useDashboardData'

const Dashboard = () => {
  const { stats, loading, error } = useDashboardData()

  const weeklyReading = stats?.weeklyReading || []
  const sentimentData = stats?.sentimentData || []
  const categoryData = stats?.categoryData || []
  const articlesRead = stats?.articlesRead || 0
  const bookmarks = stats?.bookmarks || 0
  const readingStreak = stats?.readingStreak || 0
  const mostReadCategory = stats?.mostReadCategory || 'N/A'
  const mostReadPercentage = stats?.mostReadPercentage || 0
  const averageSentiment = stats?.averageSentiment || 'N/A'
  const sentimentPercentage = stats?.sentimentPercentage || 0

  const COLORS = ['#3b82f6', '#8b5cf6', '#ef4444']

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <Sidebar />
        <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8">
          <div className="max-w-6xl">
            <Loader />
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <Sidebar />
        <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8">
          <div className="max-w-6xl">
            <div className="card-base p-8 text-center space-y-4">
              <BookmarkX className="w-12 h-12 text-red-500 mx-auto" />
              <h2 className="text-xl font-bold">Error Loading Dashboard</h2>
              <p className="text-zinc-400">{error}</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Empty state - no bookmarks yet
  if (articlesRead === 0) {
    return (
      <div className="flex min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <Sidebar />
        <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8">
          <div className="max-w-6xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
              <p className="text-zinc-400">Track your reading analytics and insights</p>
            </div>

            <div className="card-base p-12 text-center space-y-4">
              <BookmarkX className="w-16 h-16 text-zinc-600 mx-auto" />
              <h2 className="text-2xl font-bold">No Reading Activity Yet</h2>
              <p className="text-zinc-400 text-lg">Start bookmarking articles to see your reading analytics!</p>
              <a
                href="/feed"
                className="inline-block mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Explore Articles
              </a>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Sidebar />

      <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8 w-full overflow-x-hidden">
        <div className="w-full space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
            <p className="text-zinc-400">Track your reading analytics and insights</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={BookOpen}
              label="Articles Read"
              value={articlesRead}
              trend={12}
            />
            <StatsCard
              icon={Zap}
              label="Reading Streak"
              value={readingStreak}
              trend={8}
            />
            <StatsCard
              icon={TrendingUp}
              label="Bookmarks"
              value={bookmarks}
              trend={5}
            />
            <StatsCard
              icon={BarChart3}
              label="Reading Time"
              value={342}
              trend={15}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Reading */}
            <div className="card-base p-6">
              <h3 className="text-lg font-bold mb-6">Weekly Reading</h3>
              <div className="w-full min-h-[300px] h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyReading}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sentiment Distribution */}
            <div className="card-base p-6">
              <h3 className="text-lg font-bold mb-6">Sentiment Distribution</h3>
              <div className="w-full min-h-[300px] h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Reading */}
            <div className="card-base p-6 lg:col-span-2">
              <h3 className="text-lg font-bold mb-6">Top Categories</h3>
              <div className="w-full min-h-[300px] h-80">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a' }}
                  />
                  <Legend />
                  <Bar dataKey="value" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-base p-6 space-y-2">
              <h4 className="font-semibold text-blue-500">Most Read Category</h4>
              <p className="text-2xl font-bold">{mostReadCategory}</p>
              <p className="text-zinc-400 text-sm">{mostReadPercentage}% of your articles</p>
            </div>
            <div className="card-base p-6 space-y-2">
              <h4 className="font-semibold text-violet-500">Average Sentiment</h4>
              <p className="text-2xl font-bold">{averageSentiment}</p>
              <p className="text-zinc-400 text-sm">{sentimentPercentage}% of content</p>
            </div>
            <div className="card-base p-6 space-y-2">
              <h4 className="font-semibold text-cyan-400">Reading Consistency</h4>
              <p className="text-2xl font-bold">{readingStreak > 7 ? 'Excellent' : readingStreak > 3 ? 'Good' : 'Getting Started'}</p>
              <p className="text-zinc-400 text-sm">{readingStreak}-day streak</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
