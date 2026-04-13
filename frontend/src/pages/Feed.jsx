import { useState, useRef, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import NewsCard from '../components/NewsCard'
import Loader from '../components/Loader'
import { CATEGORIES, MOOD_OPTIONS, SORT_OPTIONS } from '../utils/constants'
import { useFetchNews } from '../hooks/useFetchNews'
import { Filter, ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'

const Feed = () => {
  const [selectedCategories, setSelectedCategories] = useState(['Technology'])
  const [selectedMood, setSelectedMood] = useState('everything')
  const [sortBy, setSortBy] = useState('latest')
  const [bookmarks, setBookmarks] = useState(new Set())
  const { articles, loading, hasMore, loadMore } = useFetchNews({
    categories: selectedCategories,
    mood: selectedMood,
    sort: sortBy
  })

  const feedRef = useRef(null)

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const sentinel = feedRef.current?.querySelector('[data-sentinel]')
    if (sentinel) observer.observe(sentinel)

    return () => observer.disconnect()
  }, [hasMore, loading, loadMore])

  const toggleBookmark = useCallback((id) => {
    setBookmarks(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
        toast.success('Bookmark removed')
      } else {
        newSet.add(id)
        toast.success('Article bookmarked!')
      }
      return newSet
    })
  }, [])

  const toggleCategory = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category)
      }
      return [...prev, category]
    })
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Navbar />
      <Sidebar />

      <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-6xl space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Feed</h1>
            <p className="text-dark-400">Personalized news just for you</p>
          </div>

          {/* Filters */}
          <div className="glass-card p-4 space-y-4">
            {/* Search */}
            <SearchBar placeholder="Search articles..." />

            {/* Filter Rows */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(0, 4).map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`badge text-xs transition-all ${
                        selectedCategories.includes(cat)
                          ? 'bg-accent-blue/30 text-accent-blue'
                          : 'bg-surface-dark text-dark-400 hover:bg-surface-hover'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300">Mood</label>
                <div className="relative">
                  <select
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                    className="input-base appearance-none pr-10"
                  >
                    {MOOD_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 pointer-events-none" />
                </div>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300">Sort By</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-base appearance-none pr-10"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div
            ref={feedRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.map(article => (
              <NewsCard
                key={article.id}
                article={article}
                onBookmark={toggleBookmark}
                isBookmarked={bookmarks.has(article.id)}
              />
            ))}
          </div>

          {/* Loading Indicator */}
          {loading && <Loader />}

          {/* Sentinel for infinite scroll */}
          <div data-sentinel className="h-4" />

          {/* No more articles */}
          {!hasMore && articles.length > 0 && (
            <div className="text-center py-12">
              <p className="text-dark-400">No more articles to load</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Feed
