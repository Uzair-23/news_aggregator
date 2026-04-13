import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ArrowLeft, Share2, BookmarkPlus, MessageCircle, Clock, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SummaryModal from '../components/SummaryModal'
import { MOCK_ARTICLES } from '../utils/mockData'
import gsap from 'gsap'
import toast from 'react-hot-toast'

const ArticleDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [showSummary, setShowSummary] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    // Mock fetch article
    const found = MOCK_ARTICLES.find(a => a.id === parseInt(id)) || MOCK_ARTICLES[0]
    setArticle(found)

    // Animate content
    gsap.from('[data-article-content]', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out'
    })
  }, [id])

  if (!article) return null

  const handleShare = async () => {
    try {
      await navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href
      })
    } catch (err) {
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <div className="bg-dark-950 min-h-screen">
      <Navbar />

      {/* Hero Image */}
      <div className="h-96 md:h-[500px] overflow-hidden relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 md:left-8 p-2 bg-dark-950/80 backdrop-blur-md rounded-lg hover:bg-dark-950 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div data-article-content className="pt-0 md:pt-8 pb-20">
        <div className="container-app max-w-3xl space-y-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400 pt-6">
            <span className="badge-primary">{article.category}</span>
            <span>{article.source}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readingTime}
            </span>
            <span>{new Date(article.date).toLocaleDateString()}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {article.title}
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-surface-border">
            <div>
              <p className="text-dark-400 text-sm">Credibility</p>
              <div className="w-full bg-surface-dark rounded-full h-2 mt-2">
                <div
                  className="bg-accent-green h-full rounded-full"
                  style={{ width: `${article.credibility}%` }}
                />
              </div>
              <p className="text-white font-semibold text-sm mt-1">{article.credibility}%</p>
            </div>
            <div>
              <p className="text-dark-400 text-sm">Sentiment</p>
              <p className={`text-lg font-bold mt-2 capitalize ${
                article.sentiment === 'positive' ? 'text-accent-green' :
                article.sentiment === 'neutral' ? 'text-accent-blue' :
                'text-accent-red'
              }`}>{article.sentiment}</p>
            </div>
            <div>
              <p className="text-dark-400 text-sm">Views</p>
              <p className="text-lg font-bold mt-2">{article.views.toLocaleString()}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowSummary(true)}
              className="btn-primary flex items-center gap-2"
            >
              ✨ Read AI Summary
            </button>
            <button
              onClick={() => toast.success('Article bookmarked!')}
              className="btn-secondary flex items-center gap-2"
            >
              <BookmarkPlus className="w-5 h-5" />
              Save
            </button>
            <button
              onClick={handleShare}
              className="btn-secondary flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          {/* Article Content */}
          <div
            ref={contentRef}
            className="prose prose-invert max-w-none space-y-6 text-dark-200 leading-relaxed"
          >
            <p className="text-lg text-dark-300 italic">{article.description}</p>

            <p>
              {article.content || `This is a detailed article about ${article.title}. The content would be displayed here with full formatting, including multiple paragraphs discussing the topic in depth.`}
            </p>

            <div className="bg-surface-dark p-6 rounded-2xl border border-surface-border space-y-3">
              <h4 className="font-semibold text-white">About This Article</h4>
              <ul className="space-y-2 text-dark-300">
                <li className="flex gap-2">
                  <span className="text-accent-blue">•</span>
                  Source: {article.source}
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-purple">•</span>
                  Credibility Score: {article.credibility}%
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-cyan">•</span>
                  Category: {article.category}
                </li>
              </ul>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-surface-border pt-8 space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Comments
            </h3>

            {/* Comment Input */}
            <div className="glass-card p-4 space-y-3">
              <textarea
                placeholder="Share your thoughts..."
                rows="4"
                className="input-base w-full"
              />
              <button className="btn-primary">Post Comment</button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="bg-surface-dark p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                      U
                    </div>
                    <div>
                      <p className="font-semibold">User Name</p>
                      <p className="text-dark-400 text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-dark-300">Great article! Very insightful and well-written.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Modal */}
      <SummaryModal article={article} isOpen={showSummary} onClose={() => setShowSummary(false)} />
    </div>
  )
}

export default ArticleDetails
