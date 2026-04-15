import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import NewsCard from '../components/NewsCard'
import Loader from '../components/Loader'
import { Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { bookmarkAPI } from '../services/api'
import toast from 'react-hot-toast'

const Bookmarks = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. Fetch real bookmarks from the database on page load
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await bookmarkAPI.getAll()
        if (res.data.success) {
          // Map the database schema back to the format NewsCard expects
          const formattedBookmarks = res.data.bookmarks.map(b => ({
            id: b._id, // MongoDB ID used for deletion
            title: b.title,
            description: b.description,
            url: b.url,
            image: b.urlToImage,
            source: b.sourceName,
            date: b.publishedAt,
          }))
          setBookmarkedArticles(formattedBookmarks)
        }
      } catch (error) {
        console.error('Failed to fetch bookmarks:', error)
        toast.error('Failed to load your saved articles')
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarks()
  }, [])

  // 2. Allow user to remove bookmarks directly from this page
  const removeBookmark = async (article) => {
    try {
      // article.id is mapped to the MongoDB _id above
      await bookmarkAPI.remove(article.id)
      
      // Update UI instantly
      setBookmarkedArticles(prev => prev.filter(b => b.id !== article.id))
      toast.success('Bookmark removed')
    } catch (error) {
      toast.error('Failed to remove bookmark')
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Sidebar />

      <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8 w-full overflow-x-hidden">
        <div className="w-full space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Saved Articles</h1>
            <p className="text-zinc-400">Your personal collection of bookmarks</p>
          </div>

          {loading ? (
            <Loader />
          ) : bookmarkedArticles.length === 0 ? (
            <div className="text-center py-20 glass-card">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-10 h-10 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
              <p className="text-zinc-400 mb-8">
                Start saving articles you want to read later
              </p>
              <Link to="/feed">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                  Explore Feed
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedArticles.map(article => (
                <NewsCard
                  key={article.id}
                  article={article}
                  isBookmarked={true}
                  onBookmark={removeBookmark} // Re-using the icon to delete
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