import { useState, useRef, useEffect, useMemo } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import NewsCard from '../components/NewsCard'
import Loader from '../components/Loader'
import { CATEGORIES, MOOD_OPTIONS, SORT_OPTIONS } from '../utils/constants'
import { useFetchNews } from '../hooks/useFetchNews'
import { bookmarkAPI } from '../services/api'
import { ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'

const Feed = () => {
  const [selectedCategories, setSelectedCategories] = useState(['Technology'])
  const [selectedMood, setSelectedMood] = useState('everything')
  const [sortBy, setSortBy] = useState('latest')

  // Real Bookmark State connected to Backend
  const [bookmarks, setBookmarks] = useState(new Set()) // Stores URLs for fast frontend UI toggle
  const [savedBookmarks, setSavedBookmarks] = useState([]) // Stores actual DB objects with _id

  // Memoize fetch options to prevent infinite loop
  const fetchOptions = useMemo(() => ({
    categories: selectedCategories,
    mood: selectedMood,
    sort: sortBy
  }), [selectedCategories, selectedMood, sortBy])

  const { articles, loading, hasMore, loadMore } = useFetchNews(fetchOptions)
  const feedRef = useRef(null)

  // 1. Fetch user's real bookmarks from MongoDB on mount
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await bookmarkAPI.getAll();
        if (res.data.success) {
          setSavedBookmarks(res.data.bookmarks);
          // Store URLs in a Set so the UI knows which ones to highlight
          setBookmarks(new Set(res.data.bookmarks.map(b => b.url)));
        }
      } catch (err) {
        console.error("Failed to load bookmarks:", err);
      }
    };
    fetchBookmarks();
  }, []);

  // Infinite scroll logic
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

  // 2. Real backend toggle logic
  const toggleBookmark = async (article) => {
    const isBookmarked = bookmarks.has(article.url);

    // Optimistic UI Update (Update screen instantly)
    setBookmarks(prev => {
      const newSet = new Set(prev);
      if (isBookmarked) {
        newSet.delete(article.url);
      } else {
        newSet.add(article.url);
      }
      return newSet;
    });

    try {
      if (isBookmarked) {
        // Find MongoDB _id and Delete
        const bookmarkToDelete = savedBookmarks.find(b => b.url === article.url);
        if (bookmarkToDelete) {
          await bookmarkAPI.remove(bookmarkToDelete._id);
          setSavedBookmarks(prev => prev.filter(b => b._id !== bookmarkToDelete._id));
          toast.success('Bookmark removed');
        }
      } else {
        // Add to MongoDB
        const res = await bookmarkAPI.add(article);
        setSavedBookmarks(prev => [...prev, res.data.bookmark]);
        toast.success('Article bookmarked!');
      }
    } catch (err) {
      // Revert UI on backend failure
      setBookmarks(prev => {
        const newSet = new Set(prev);
        if (isBookmarked) {
          newSet.add(article.url); // Re-add if delete failed
        } else {
          newSet.delete(article.url); // Remove if add failed
        }
        return newSet;
      });
      toast.error(err.response?.data?.message || 'Failed to update bookmark');
    }
  }

  const toggleCategory = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category)
      }
      return [...prev, category]
    })
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Sidebar />

      <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8 w-full overflow-x-hidden">
        <div className="w-full space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Feed</h1>
            <p className="text-zinc-400">Personalized news just for you</p>
          </div>

          {/* Filters */}
          <div className="glass-card p-4 space-y-4">
            <SearchBar placeholder="Search articles..." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Categories */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(0, 4).map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`badge text-xs transition-all ${
                        selectedCategories.includes(cat)
                          ? 'bg-blue-500/30 text-blue-500'
                          : 'bg-[#111111] text-zinc-400 hover:bg-[#1f1f1f]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Mood</label>
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
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Sort By</label>
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
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div ref={feedRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard
                key={`${article.url}-${index}`} // Bulletproof React Key to stop duplicate key crashes
                article={article}
                onBookmark={toggleBookmark}
                isBookmarked={bookmarks.has(article.url)} // Uses URL instead of ID
              />
            ))}
          </div>

          {loading && <Loader />}
          <div data-sentinel className="h-4" />
          {!hasMore && articles.length > 0 && (
            <div className="text-center py-12">
              <p className="text-zinc-400">No more articles to load</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Feed