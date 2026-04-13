import clsx from 'clsx'

export const cn = (...classes) => clsx(classes)

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)
  
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const truncateText = (text, length = 100) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

export const generateReadingTime = (text) => {
  const wordsPerMinute = 200
  const words = text?.split(/\s+/).length || 0
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export const getInitials = (name) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const getSentimentColor = (sentiment) => {
  const sentiments = {
    positive: 'text-accent-green',
    neutral: 'text-accent-blue',
    negative: 'text-accent-red'
  }
  return sentiments[sentiment] || 'text-accent-blue'
}

export const getSentimentBg = (sentiment) => {
  const sentiments = {
    positive: 'bg-accent-green/20',
    neutral: 'bg-accent-blue/20',
    negative: 'bg-accent-red/20'
  }
  return sentiments[sentiment] || 'bg-accent-blue/20'
}

export const formatLargeNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}
