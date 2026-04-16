import { useState, useEffect, useCallback, useRef } from 'react'
import { newsAPI } from '../services/api'
import { MOCK_ARTICLES } from '../utils/mockData'
import { transformArticles } from '../utils/articleTransformer'

export const useFetchNews = (options = {}) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(1)
  const optionsRef = useRef(options)
  const prevOptionsRef = useRef(null)

  const fetchNews = useCallback(async (resetPage = false) => {
    try {
      setLoading(true)
      setError(null)

      // Reset page ref if requested, otherwise use current value
      if (resetPage) {
        pageRef.current = 1
      }

      const currentPage = pageRef.current
      const currentOptions = optionsRef.current || {}

      // Try to fetch from API
      try {
        console.log('📰 Fetching news with options:', currentOptions)
        let response

        if (currentOptions.query && currentOptions.query.trim()) {
          response = await newsAPI.search(currentOptions.query.trim(), {
            page: currentPage,
            limit: 12,
            sortBy: currentOptions.sort
          })
        } else if (currentOptions.mood && currentOptions.mood !== 'everything') {
          response = await newsAPI.search(currentOptions.mood, {
            page: currentPage,
            limit: 12,
            sortBy: currentOptions.sort
          })
        } else if (currentOptions.category && currentOptions.category !== 'General') {
          response = await newsAPI.getByCategory(currentOptions.category.toLowerCase(), {
            page: currentPage,
            limit: 12
          })
        } else {
          response = await newsAPI.getLatest({
            page: currentPage,
            limit: 12
          })
        }

        console.log('✅ API Response received:', response.data)
        
        // Transform articles from API format to frontend format
        const transformedArticles = transformArticles(response.data.articles || [])
        console.log('🔄 Transformed articles:', transformedArticles.length)

        if (resetPage) {
          setArticles(transformedArticles)
        } else {
          setArticles(prev => [...prev, ...transformedArticles])
        }

        setHasMore(response.data.hasMore !== false)
        pageRef.current += 1
      } catch (apiError) {
        console.error('❌ API Error Details:', {
          status: apiError.response?.status,
          statusText: apiError.response?.statusText,
          data: apiError.response?.data,
          message: apiError.message,
          config: apiError.config?.url
        })
        console.warn('⚠️ Using mock data as fallback...')
        
        // Use mock data as fallback
        if (resetPage) {
          setArticles(MOCK_ARTICLES)
        } else {
          setArticles(prev => [...prev, ...MOCK_ARTICLES])
        }
        setHasMore(false)
        setError(apiError.response?.data?.message || apiError.message || 'Failed to fetch from API')
      }
    } catch (err) {
      console.error('🔴 Unexpected Error:', err)
      setError(err.message || 'Failed to fetch news')
      // Still use mock data on error
      setArticles(MOCK_ARTICLES)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchNews(false)
    }
  }, [loading, hasMore, fetchNews])

  const refresh = useCallback(async () => {
    pageRef.current = 1
    setArticles([])
    await fetchNews(true)
  }, [fetchNews])

  // Initial fetch on component mount
  useEffect(() => {
    fetchNews(true)
  }, [fetchNews])

  // Refetch when options change (category, mood, sort, etc.)
  useEffect(() => {
    const prev = prevOptionsRef.current
    const next = options || {}

    const hasChanged = !prev ||
      prev.category !== next.category ||
      prev.mood !== next.mood ||
      prev.sort !== next.sort ||
      prev.query !== next.query

    optionsRef.current = next
    prevOptionsRef.current = next

    if (hasChanged) {
      console.log('🔄 Options changed, refreshing feed:', next)
      pageRef.current = 1
      setArticles([])
    }
  }, [options])

  // Trigger fetch when articles are reset by options change
  useEffect(() => {
    if (articles.length === 0 && pageRef.current === 1) {
      fetchNews(true)
    }
  }, [articles.length, fetchNews])

  return {
    articles,
    loading,
    error,
    hasMore,
    loadMore,
    refresh
  }
}

export default useFetchNews
