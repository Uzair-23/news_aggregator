import { useState, useEffect, useCallback } from 'react'
import { newsAPI } from '../services/api'
import { MOCK_ARTICLES } from '../utils/mockData'
import { transformArticles } from '../utils/articleTransformer'

export const useFetchNews = (options = {}) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const fetchNews = useCallback(async (resetPage = false) => {
    try {
      setLoading(true)
      setError(null)

      const currentPage = resetPage ? 1 : page

      // Try to fetch from API
      try {
        const response = await newsAPI.getLatest({
          page: currentPage,
          limit: options.limit || 12,
          ...options
        })

        // Transform articles from API format to frontend format
        const transformedArticles = transformArticles(response.data.articles || [])

        if (resetPage) {
          setArticles(transformedArticles)
        } else {
          setArticles(prev => [...prev, ...transformedArticles])
        }

        setHasMore(response.data.hasMore !== false)
        setPage(currentPage + 1)
      } catch (apiError) {
        console.warn('API Error, using mock data:', apiError)
        // Use mock data as fallback
        if (resetPage) {
          setArticles(MOCK_ARTICLES)
        } else {
          setArticles(prev => [...prev, ...MOCK_ARTICLES])
        }
        setHasMore(false)
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch news')
      // Still use mock data on error
      setArticles(MOCK_ARTICLES)
    } finally {
      setLoading(false)
    }
  }, [page, options])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchNews(false)
    }
  }, [loading, hasMore, fetchNews])

  const refresh = useCallback(() => {
    setPage(1)
    fetchNews(true)
  }, [fetchNews])

  useEffect(() => {
    fetchNews(true)
  }, [])

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
