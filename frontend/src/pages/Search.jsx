import { useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import NewsCard from '../components/NewsCard'
import { Search } from 'lucide-react'
import { MOCK_ARTICLES } from '../utils/mockData'

const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [bookmarks, setBookmarks] = useState(new Set())
  const [filters, setFilters] = useState({
    source: '',
    category: '',
    sentiment: '',
    dateRange: ''
  })

  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery)

    if (searchQuery.trim()) {
      // Mock search
      const filtered = MOCK_ARTICLES.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setResults(filtered)
      setSearched(true)
    }
  }, [])

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const toggleBookmark = useCallback((id) => {
    setBookmarks(prev => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }, [])

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Navbar />
      <Sidebar />

      <main className="flex-1 pt-20 md:pt-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-6xl space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Advanced Search</h1>
            <p className="text-dark-400">Find exactly what you're looking for</p>
          </div>

          {/* Search Bar */}
          <div className="glass-card p-6 space-y-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search articles, topics, people..."
            />

            {/* Advanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300">Source</label>
                <select
                  value={filters.source}
                  onChange={(e) => handleFilterChange('source', e.target.value)}
                  className="input-base text-sm"
                >
                  <option value="">All Sources</option>
                  <option value="techcrunch">TechCrunch</option>
                  <option value="bbc">BBC</option>
                  <option value="reuters">Reuters</option>
                  <option value="bloomberg">Bloomberg</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="input-base text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="tech">Technology</option>
                  <option value="business">Business</option>
                  <option value="health">Health</option>
                  <option value="science">Science</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300">Sentiment</label>
                <select
                  value={filters.sentiment}
                  onChange={(e) => handleFilterChange('sentiment', e.target.value)}
                  className="input-base text-sm"
                >
                  <option value="">All Sentiments</option>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300">Date</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="input-base text-sm"
                >
                  <option value="">Any Time</option>
                  <option value="day">Last 24 Hours</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          {searched ? (
            <>
              <div className="space-y-2">
                <p className="text-dark-400">
                  Found <span className="text-accent-blue font-bold">{results.length}</span> results for "{query}"
                </p>
              </div>

              {results.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map(article => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      onBookmark={toggleBookmark}
                      isBookmarked={bookmarks.has(article.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-dark-700 mx-auto mb-4 opacity-50" />
                  <p className="text-dark-400 text-lg">No articles found</p>
                  <p className="text-dark-500 text-sm">Try different keywords or filters</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <Search className="w-20 h-20 text-dark-700 mx-auto mb-4 opacity-30" />
              <p className="text-dark-400 text-lg">Ready to search?</p>
              <p className="text-dark-500 text-sm">Enter a query above to get started</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default SearchPage
