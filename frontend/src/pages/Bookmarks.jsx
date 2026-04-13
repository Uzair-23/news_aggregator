import { useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import NewsCard from '../components/NewsCard'
import { Bookmark } from 'lucide-react'

const Bookmarks = () => {
  const [bookmarkedArticles] = useState([
    // Mock bookmarked articles
  ])

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Sidebar />

      <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-6xl space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Saved Articles</h1>
            <p className="text-zinc-400">Your personal collection of bookmarks</p>
          </div>

          {/* Empty State */}
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-10 h-10 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
              <p className="text-zinc-400 mb-8">
                Start saving articles you want to read later
              </p>
              <button className="btn-primary">
                Explore Feed
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedArticles.map(article => (
                <NewsCard
                  key={article.id}
                  article={article}
                  isBookmarked={true}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Bookmarks
