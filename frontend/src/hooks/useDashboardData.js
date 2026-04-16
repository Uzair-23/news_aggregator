import { useState, useEffect } from 'react'
import { bookmarkAPI } from '../services/api'

/**
 * Custom hook to fetch and process user dashboard data from bookmarks
 * Calculates statistics for charts and cards
 */
export const useDashboardData = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log('📊 Fetching bookmarks for dashboard...')
        const response = await bookmarkAPI.getAll()
        const bookmarks = response.data?.bookmarks || response.data || []

        console.log('✅ Bookmarks received:', bookmarks.length)

        // Process bookmarks data
        const processedStats = processBookmarkData(bookmarks)
        setStats(processedStats)
      } catch (err) {
        console.error('❌ Error fetching dashboard data:', {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message
        })
        setError(err.response?.data?.message || err.message || 'Failed to fetch dashboard data')
        setStats(null)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return { stats, loading, error }
}

/**
 * Process bookmark data to calculate dashboard statistics
 * @param {Array} bookmarks - Array of bookmark objects
 * @returns {Object} Processed statistics
 */
function processBookmarkData(bookmarks) {
  if (!Array.isArray(bookmarks) || bookmarks.length === 0) {
    return {
      articlesRead: 0,
      bookmarks: 0,
      readingStreak: 0,
      mostReadCategory: 'N/A',
      averageSentiment: 'N/A',
      weeklyReading: generateEmptyWeeklyData(),
      sentimentData: [],
      categoryData: []
    }
  }

  const articlesRead = bookmarks.length

  // Calculate sentiment distribution
  const sentimentCounts = {
    positive: 0,
    neutral: 0,
    negative: 0
  }

  // Calculate category distribution
  const categoryCounts = {}

  bookmarks.forEach(bookmark => {
    const rawSentiment = (bookmark.sentimentLabel || bookmark.sentiment || 'Neutral').toString()
    const sentiment = rawSentiment.toLowerCase()
    if (sentiment in sentimentCounts) {
      sentimentCounts[sentiment]++
    }

    const category = bookmark.category || 'General'
    categoryCounts[category] = (categoryCounts[category] || 0) + 1
  })

  // Calculate total for percentages
  const totalArticles = articlesRead

  // Format sentiment data for pie chart
  const sentimentData = [
    { name: 'Positive', value: sentimentCounts.positive },
    { name: 'Neutral', value: sentimentCounts.neutral },
    { name: 'Negative', value: sentimentCounts.negative }
  ]

  // Format category data for bar chart (top 5)
  const categoryData = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({
      name,
      value
    }))

  // Find most read category
  const mostReadCategory = categoryData.length > 0 ? categoryData[0].name : 'N/A'
  const mostReadPercentage = categoryData.length > 0 ? Math.round((categoryData[0].value / totalArticles) * 100) : 0

  // Determine average sentiment (most common sentiment)
  const sentimentEntries = Object.entries(sentimentCounts)
  const averageSentiment = sentimentEntries.length > 0
    ? sentimentEntries.reduce((max, current) => (current[1] > max[1] ? current : max))[0]
    : 'Neutral'

  // Get sentiment percentage
  const sentimentPercentage = sentimentCounts[averageSentiment.toLowerCase()] 
    ? Math.round((sentimentCounts[averageSentiment.toLowerCase()] / totalArticles) * 100)
    : 0

  // Generate weekly reading data (simplified - distribute current bookmarks across week)
  const weeklyReading = generateWeeklyReadingData(bookmarks)

  return {
    articlesRead,
    bookmarks: articlesRead,
    readingStreak: calculateReadingStreak(bookmarks),
    mostReadCategory,
    mostReadPercentage,
    averageSentiment: averageSentiment.charAt(0).toUpperCase() + averageSentiment.slice(1),
    sentimentPercentage,
    weeklyReading,
    sentimentData,
    categoryData
  }
}

/**
 * Generate weekly reading data based on article publication dates
 * @param {Array} bookmarks - Bookmark articles
 * @returns {Array} Weekly data for line chart
 */
function generateWeeklyReadingData(bookmarks) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weekData = days.map((day, index) => {
    const dayIndex = index
    const articlesOnDay = bookmarks.filter(bookmark => {
      const date = new Date(bookmark.date || bookmark.publishedAt)
      return date.getDay() === dayIndex
    }).length
    return { day, value: articlesOnDay }
  })

  // If all values are 0, distribute bookmarks evenly across week
  if (weekData.every(d => d.value === 0)) {
    const articlesPerDay = Math.ceil(bookmarks.length / 7)
    return days.map((day, index) => ({
      day,
      value: index < (bookmarks.length % 7) ? articlesPerDay : Math.floor(articlesPerDay)
    }))
  }

  return weekData
}

/**
 * Calculate reading streak (days in a row with bookmarks)
 * For now, returns a simplified value based on date range
 * @param {Array} bookmarks - Bookmark articles
 * @returns {number} Reading streak in days
 */
function calculateReadingStreak(bookmarks) {
  if (bookmarks.length === 0) return 0

  const dates = bookmarks
    .map(b => new Date(b.date || b.publishedAt).toDateString())
    .filter((v, i, a) => a.indexOf(v) === i) // unique dates
    .sort()

  if (dates.length === 0) return 0

  // Simple calculation: count consecutive days
  let streak = 1
  for (let i = 1; i < Math.min(dates.length, 7); i++) {
    const prevDate = new Date(dates[i - 1])
    const currDate = new Date(dates[i])
    const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24))
    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }

  return Math.min(streak, 30) // Cap at 30 days for display
}

/**
 * Generate empty weekly data when no bookmarks exist
 * @returns {Array} Empty weekly data
 */
function generateEmptyWeeklyData() {
  return [
    { day: 'Mon', value: 0 },
    { day: 'Tue', value: 0 },
    { day: 'Wed', value: 0 },
    { day: 'Thu', value: 0 },
    { day: 'Fri', value: 0 },
    { day: 'Sat', value: 0 },
    { day: 'Sun', value: 0 }
  ]
}

export default useDashboardData
