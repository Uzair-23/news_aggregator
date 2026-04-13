export const CATEGORIES = [
  'Technology',
  'Business',
  'Health',
  'Science',
  'Sports',
  'Entertainment',
  'Politics',
  'World'
]

export const SENTIMENTS = {
  positive: { label: 'Positive', color: 'emerald-500', bg: 'bg-emerald-500/20' },
  neutral: { label: 'Neutral', color: 'blue-500', bg: 'bg-blue-500/20' },
  negative: { label: 'Negative', color: 'red-500', bg: 'bg-red-500/20' }
}

export const NEWS_SOURCES = [
  { id: 1, name: 'TechCrunch', icon: '🚀' },
  { id: 2, name: 'Reuters', icon: '📰' },
  { id: 3, name: 'BBC', icon: '🎙️' },
  { id: 4, name: 'CNN', icon: '📹' },
  { id: 5, name: 'The Guardian', icon: '📄' },
  { id: 6, name: 'Forbes', icon: '💼' },
  { id: 7, name: 'Bloomberg', icon: '📊' },
  { id: 8, name: 'CNBC', icon: '💹' }
]

export const API_BASE_URL = 'http://localhost:5000/api'

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'trending', label: 'Trending' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'relevant', label: 'Most Relevant' }
]

export const MOOD_OPTIONS = [
  { value: 'everything', label: '📰 Everything' },
  { value: 'positive', label: '😊 Positive News' },
  { value: 'neutral', label: '😐 Neutral News' },
  { value: 'negative', label: '😟 Negative News' }
]

export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Welcome back.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  BOOKMARK_ADDED: 'Article bookmarked!',
  BOOKMARK_REMOVED: 'Bookmark removed.',
  COPY_SUCCESS: 'Link copied to clipboard!',
  ERROR: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.'
}
