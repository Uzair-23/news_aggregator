import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth endpoints
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data)
}

// News endpoints
export const newsAPI = {
  getLatest: (params) => api.get('/news/latest', { params }),
  search: (query, params) => api.get(`/news/search?q=${query}`, { params }),
  getById: (id) => api.get(`/news/${id}`),
  getTrending: (params) => api.get('/news/trending', { params }),
  getByCategory: (category, params) => api.get(`/news/category/${category}`, { params })
}

// Bookmark endpoints
export const bookmarkAPI = {
  getAll: () => api.get('/bookmarks'),
  add: (article) => {
    // Safely extract source name whether it's a string, an object, or undefined
    let sourceStr = "Unknown Source";
    if (article.source) {
      sourceStr = typeof article.source === 'string' ? article.source : (article.source.name || "Unknown Source");
    }

    // Force pure string types for every field to prevent any backend Mongoose CastErrors or .trim() TypeErrors
    const payload = {
      title: String(article.title || 'Untitled'),
      description: String(article.description || 'No description available'),
      url: String(article.url || `https://example.com/article/${Date.now()}`),
      urlToImage: String(article.image || ''),
      sourceName: String(sourceStr),
      publishedAt: new Date().toISOString()
    };

    return api.post('/bookmarks', payload);
  },
  remove: (bookmarkId) => api.delete(`/bookmarks/${bookmarkId}`)
}

// AI endpoints
export const aiAPI = {
  summarize: (title, content) => api.post('/ai/summarize', { title, content })
}

// Admin endpoints
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getSources: () => api.get('/admin/sources'),
  addSource: (data) => api.post('/admin/sources', data),
  removeSource: (id) => api.delete(`/admin/sources/${id}`),
  getReports: () => api.get('/admin/reports'),
  removeArticle: (id) => api.post(`/admin/articles/${id}/remove`, {})
}

export default api