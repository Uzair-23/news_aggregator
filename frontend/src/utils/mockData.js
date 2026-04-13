// Mock news data for when backend is unavailable
export const MOCK_ARTICLES = [
  {
    id: 1,
    title: 'Breakthrough in Quantum Computing: New Processor Achieves 1000 Qubits',
    description: 'Researchers announce a major leap forward in quantum computing technology with unprecedented qubit count and stability.',
    image: 'https://images.unsplash.com/photo-1635321593342-beb150c3ef1d?w=800&h=400&fit=crop',
    source: 'TechCrunch',
    category: 'Technology',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    sentiment: 'positive',
    credibility: 95,
    content: 'A major breakthrough in quantum computing has been announced today. Researchers at leading tech institutions have developed a new processor that achieves 1000 qubits, marking a significant milestone in the field. This advancement promises to accelerate the development of practical quantum computers...',
    summary: 'New quantum processor reaches 1000 qubits milestone, promising faster development of practical quantum computers.',
    readingTime: '5 min',
    views: 15420,
    bookmarked: false
  },
  {
    id: 2,
    title: 'Global Markets Rally as Tech Stocks Lead Recovery',
    description: 'Stock markets around the world show strong gains driven by optimism in the technology sector.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    source: 'Bloomberg',
    category: 'Business',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    sentiment: 'positive',
    credibility: 92,
    content: 'Stock markets worldwide are experiencing a robust rally today, with technology stocks leading the charge. Investors show renewed confidence in growth prospects as earnings beat expectations...',
    summary: 'Tech stocks drive global market rally with strong earnings reports.',
    readingTime: '4 min',
    views: 23881,
    bookmarked: false
  },
  {
    id: 3,
    title: 'New Study Shows Mental Health Benefits of Regular Exercise',
    description: 'Comprehensive research demonstrates significant improvements in mental wellbeing through consistent physical activity.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
    source: 'BBC',
    category: 'Health',
    date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    sentiment: 'positive',
    credibility: 88,
    content: 'A new comprehensive study has found compelling evidence that regular exercise has significant mental health benefits...',
    summary: 'Regular exercise proven to dramatically improve mental health outcomes.',
    readingTime: '6 min',
    views: 18765,
    bookmarked: false
  },
  {
    id: 4,
    title: 'Climate Summit Shows Progress on Carbon Reduction Goals',
    description: 'International delegates reach new agreements on carbon emissions with commitment to net-zero targets.',
    image: 'https://images.unsplash.com/photo-1611080626862-fd10d4e9a70c?w=800&h=400&fit=crop',
    source: 'Reuters',
    category: 'Science',
    date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    sentiment: 'neutral',
    credibility: 91,
    content: 'The international climate summit has produced concrete agreements on carbon reduction with nations committing to ambitious net-zero targets...',
    summary: 'Nations agree on new carbon reduction targets at climate summit.',
    readingTime: '7 min',
    views: 12543,
    bookmarked: false
  },
  {
    id: 5,
    title: 'Championship Team Celebrates Historic Victory',
    description: 'In a thrilling match, the team clinches championship title with record-breaking performance.',
    image: 'https://images.unsplash.com/photo-1506521295726-ab657491f5ab?w=800&h=400&fit=crop',
    source: 'ESPN',
    category: 'Sports',
    date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    sentiment: 'positive',
    credibility: 85,
    content: 'In one of the most exciting matches of the season, the championship team has secured victory with a record-breaking performance...',
    summary: 'Championship team wins with record-breaking game performance.',
    readingTime: '3 min',
    views: 45230,
    bookmarked: false
  },
  {
    id: 6,
    title: 'AI Models Pass Major Language Understanding Benchmark',
    description: 'Latest generation AI systems demonstrate unprecedented understanding of natural language and context.',
    image: 'https://images.unsplash.com/photo-1677442d019cecf8d789410b2b231a25?w=800&h=400&fit=crop',
    source: 'TechCrunch',
    category: 'Technology',
    date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    sentiment: 'positive',
    credibility: 93,
    content: 'New AI language models have passed a major understanding benchmark, showing significant advances in natural language comprehension...',
    summary: 'AI achieves breakthrough in language understanding tests.',
    readingTime: '5 min',
    views: 34120,
    bookmarked: false
  }
]

export const MOCK_USER = {
  id: 1,
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://i.pravatar.cc/150?img=1',
  preferences: ['Technology', 'Business', 'Science'],
  mood: 'neutral',
  readingStreak: 15,
  totalRead: 234,
  bookmarks: 42,
  role: 'user'
}

export const MOCK_DASHBOARD_DATA = {
  articlesRead: 234,
  bookmarks: 42,
  readingStreak: 15,
  favoriteCategory: 'Technology',
  weeklyReading: [
    { day: 'Mon', value: 12 },
    { day: 'Tue', value: 19 },
    { day: 'Wed', value: 14 },
    { day: 'Thu', value: 22 },
    { day: 'Fri', value: 18 },
    { day: 'Sat', value: 24 },
    { day: 'Sun', value: 20 }
  ],
  sentimentData: [
    { name: 'Positive', value: 45 },
    { name: 'Neutral', value: 40 },
    { name: 'Negative', value: 15 }
  ],
  categoryData: [
    { name: 'Technology', value: 45 },
    { name: 'Business', value: 32 },
    { name: 'Science', value: 28 },
    { name: 'Health', value: 25 },
    { name: 'Sports', value: 20 }
  ]
}

export const MOCK_ADMIN_DATA = {
  totalUsers: 8542,
  totalArticles: 45821,
  totalSources: 128,
  activeUsers: 3452,
  userStats: [
    { date: '2024-01-01', users: 1200 },
    { date: '2024-01-02', users: 1900 },
    { date: '2024-01-03', users: 1400 },
    { date: '2024-01-04', users: 2200 },
    { date: '2024-01-05', users: 1800 }
  ],
  recentReports: [
    { id: 1, type: 'Misinformation', count: 12, status: 'pending' },
    { id: 2, type: 'Spam', count: 8, status: 'resolved' },
    { id: 3, type: 'Duplicate', count: 15, status: 'pending' }
  ]
}
