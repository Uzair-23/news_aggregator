import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatsCard from '../components/StatsCard'
import { Users, FileText, Globe, AlertCircle, Trash2, Plus } from 'lucide-react'
import { MOCK_ADMIN_DATA } from '../utils/mockData'
import { useState } from 'react'
import toast from 'react-hot-toast'

const Admin = () => {
  const { totalUsers, totalArticles, totalSources, recentReports } = MOCK_ADMIN_DATA
  const [reports, setReports] = useState(recentReports)

  const handleRemoveArticle = (articleId) => {
    toast.success('Article removed')
  }

  const handleResolveReport = (reportId) => {
    setReports(reports.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r))
    toast.success('Report resolved')
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Sidebar />

      <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-6xl space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-zinc-400">Manage platform and content</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard icon={Users} label="Total Users" value={totalUsers} />
            <StatsCard icon={FileText} label="Articles" value={totalArticles} />
            <StatsCard icon={Globe} label="Sources" value={totalSources} />
            <StatsCard icon={AlertCircle} label="Reports" value={reports.length} />
          </div>

          {/* Content Management */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Reports */}
            <div className="card-base p-6 space-y-4">
              <h3 className="text-lg font-bold">Recent Reports</h3>
              <div className="space-y-3">
                {reports.map(report => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-[#1f1f1f] rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{report.type}</p>
                      <p className="text-zinc-400 text-sm">{report.count} reported items</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`badge text-xs ${report.status === 'pending' ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                        {report.status}
                      </span>
                      {report.status === 'pending' && (
                        <button
                          onClick={() => handleResolveReport(report.id)}
                          className="btn-secondary text-xs px-2 py-1"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Source */}
            <div className="card-base p-6 space-y-4">
              <h3 className="text-lg font-bold">Manage Sources</h3>
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); toast.success('Source added') }}>
                <input
                  type="text"
                  placeholder="Source name"
                  className="input-base text-sm"
                />
                <input
                  type="url"
                  placeholder="Source URL"
                  className="input-base text-sm"
                />
                <select className="input-base text-sm">
                  <option>Select Category</option>
                  <option>Technology</option>
                  <option>Business</option>
                  <option>Science</option>
                </select>
                <button type="submit" className="btn-primary w-full text-sm flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Source
                </button>
              </form>
            </div>
          </div>

          {/* Moderation Queue */}
          <div className="card-base p-6 space-y-4">
            <h3 className="text-lg font-bold">Moderation Queue</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="text-left py-3 px-3">Article</th>
                    <th className="text-left py-3 px-3">Reason</th>
                    <th className="text-left py-3 px-3">Source</th>
                    <th className="text-left py-3 px-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, title: 'Misleading headline detected', reason: 'Potential misinformation', source: 'Unknown' },
                    { id: 2, title: 'Duplicate article found', reason: 'Content repost', source: 'Tech News' },
                    { id: 3, title: 'Low credibility source', reason: 'Unreliable source', source: 'Blog Site' }
                  ].map(item => (
                    <tr key={item.id} className="border-b border-[#2a2a2a] hover:bg-[#1f1f1f] transition-colors">
                      <td className="py-3 px-3">{item.title}</td>
                      <td className="py-3 px-3 text-zinc-400">{item.reason}</td>
                      <td className="py-3 px-3 text-zinc-400">{item.source}</td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleRemoveArticle(item.id)}
                          className="text-red-500 hover:text-red-400 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Admin
