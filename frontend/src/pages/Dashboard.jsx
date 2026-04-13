import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatsCard from '../components/StatsCard'
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { TrendingUp, BookOpen, Zap, BarChart3 } from 'lucide-react'
import { MOCK_DASHBOARD_DATA } from '../utils/mockData'

const Dashboard = () => {
  const { weeklyReading, sentimentData, categoryData, articlesRead, bookmarks, readingStreak } = MOCK_DASHBOARD_DATA

  const COLORS = ['#3b82f6', '#8b5cf6', '#ef4444']

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Navbar />
      <Sidebar />

      <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-6xl space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
            <p className="text-dark-400">Track your reading analytics and insights</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Reading */}
            <div className="card-base p-6">
              <h3 className="text-lg font-bold mb-6">Weekly Reading</h3>
              <ResponsiveContainer width="100%" height={300}>
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

            {/* Sentiment Distribution */}
            <div className="card-base p-6">
              <h3 className="text-lg font-bold mb-6">Sentiment Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
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

            {/* Category Reading */}
            <div className="card-base p-6 lg:col-span-2">
              <h3 className="text-lg font-bold mb-6">Top Categories</h3>
              <ResponsiveContainer width="100%" height={300}>
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

          {/* Insights */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-base p-6 space-y-2">
              <h4 className="font-semibold text-accent-blue">Most Read Category</h4>
              <p className="text-2xl font-bold">Technology</p>
              <p className="text-dark-400 text-sm">45% of your articles</p>
            </div>
            <div className="card-base p-6 space-y-2">
              <h4 className="font-semibold text-accent-purple">Average Sentiment</h4>
              <p className="text-2xl font-bold">Positive</p>
              <p className="text-dark-400 text-sm">45% of content</p>
            </div>
            <div className="card-base p-6 space-y-2">
              <h4 className="font-semibold text-accent-cyan">Reading Consistency</h4>
              <p className="text-2xl font-bold">Excellent</p>
              <p className="text-dark-400 text-sm">15-day streak</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
