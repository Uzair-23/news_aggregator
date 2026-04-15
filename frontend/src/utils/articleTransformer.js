/**
 * Transform article data from NewsAPI format to frontend format
 * Maps API response fields to expected component structure
 * Includes sentiment analysis when available
 */

export const transformArticle = (apiArticle, index = 0) => {
  // Extract source name if source is an object
  const sourceName = typeof apiArticle.source === 'object' 
    ? apiArticle.source.name 
    : apiArticle.source || 'Unknown'

  // Normalize sentiment to lowercase for component compatibility
  const sentimentLabel = apiArticle.sentimentLabel || 'neutral'
  const normalizedSentiment = sentimentLabel.toLowerCase()

  // Generate a unique ID
  // Priority: _id from API > url > random fallback
  const id = apiArticle._id || apiArticle.url || Math.random().toString(36).substring(2, 9)

  // Create reading time estimate (roughly 200 words per minute)
  const contentLength = (apiArticle.content || apiArticle.description || '').length
  const readingTime = Math.max(1, Math.ceil(contentLength / 1000)) // rough estimate

  // Parse category from URL or provide default
  const extractCategory = () => {
    if (apiArticle.category) return apiArticle.category
    const url = apiArticle.url || ''
    const categories = ['technology', 'business', 'health', 'science', 'sports', 'entertainment']
    for (const cat of categories) {
      if (url.toLowerCase().includes(cat)) return cat.charAt(0).toUpperCase() + cat.slice(1)
    }
    return 'General'
  }

  return {
    id,
    title: apiArticle.title || '',
    description: apiArticle.description || '',
    image: apiArticle.urlToImage || 'https://via.placeholder.com/800x400?text=No+Image',
    source: sourceName,
    category: extractCategory(),
    date: apiArticle.publishedAt || new Date().toISOString(),
    sentiment: normalizedSentiment,
    credibility: 85, // Default credibility (can be enhanced with real scoring logic)
    content: apiArticle.content || apiArticle.description || '',
    summary: apiArticle.description || '',
    readingTime: `${readingTime} min`,
    url: apiArticle.url || '',
    author: apiArticle.author || 'Unknown',
    bookmarked: false
  }
}

/**
 * Transform array of articles from API format
 * @param {Array} articles - Array of articles from API
 * @returns {Array} Transformed articles ready for frontend
 */
export const transformArticles = (articles) => {
  if (!Array.isArray(articles)) {
    console.warn('⚠️ transformArticles received non-array:', articles)
    return []
  }
  return articles.map((article, index) => transformArticle(article, index))
}
