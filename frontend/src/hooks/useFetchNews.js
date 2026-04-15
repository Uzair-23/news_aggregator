import { useState, useEffect, useCallback, useRef } from 'react'
import { newsAPI } from '../services/api'
import { MOCK_ARTICLES } from '../utils/mockData'
import { transformArticles } from '../utils/articleTransformer'

export const useFetchNews = (options = {}) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const optionsRef = useRef(options)
  const prevOptionsRef = useRef(null)

  const fetchNews = useCallback(async (resetPage = false) => {
    try {
      setLoading(true)
      setError(null)

      const currentPage = resetPage ? 1 : page

      // Try to fetch from API
      try {
        console.log('📰 Fetching news with options:', optionsRef.current)
        const response = await newsAPI.getLatest({
          page: currentPage,
          limit: optionsRef.current.limit || 12,
          ...optionsRef.current
        })

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
        setPage(currentPage + 1)
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
  }, [page])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchNews(false)
    }
  }, [loading, hasMore, fetchNews])

  const refresh = useCallback(() => {
    setPage(1)
    setArticles([])
    fetchNews(true)
  }, [fetchNews])

  // Initial fetch on component mount
  useEffect(() => {
    fetchNews(true)
  }, [fetchNews])

  // Refetch when options change (category, mood, sort, etc.)
  // Compare options by value, not reference, to avoid unnecessary refetches
  useEffect(() => {
    const optionsString = JSON.stringify(options)
    const prevOptionsString = JSON.stringify(prevOptionsRef.current)
    
    // Only refresh if actual option values changed
    if (prevOptionsRef.current !== null && optionsString !== prevOptionsString) {
      console.log('🔄 Options changed, refreshing feed:', options)
      setPage(1)
      setArticles([])
    }
    
    optionsRef.current = options
    prevOptionsRef.current = options
  }, [options])

  // Trigger fetch when page or articles are reset by options change
  useEffect(() => {
    if (articles.length === 0 && page === 1) {
      fetchNews(true)
    }
  }, [page, articles.length, fetchNews])

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
