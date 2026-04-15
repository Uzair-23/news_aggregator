import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ArrowLeft, Sparkles, ExternalLink } from 'lucide-react'
import { aiAPI } from '../services/api'
import toast from 'react-hot-toast'
import { formatDate } from '../utils/helpers'

const ArticleDetails = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const article = state?.article

  const [isSummarizing, setIsSummarizing] = useState(false)
  const [summary, setSummary] = useState(null)

  if (!article) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-zinc-100">Article Not Found</h1>
            <p className="text-zinc-400">This article could not be loaded.</p>
            <Link
              to="/feed"
              className="inline-block mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Go back to Feed
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSummarize = async () => {
    try {
      setIsSummarizing(true)
      const response = await aiAPI.summarize(
        article.title,
        article.description || article.content
      )
      setSummary(response.data.summary || response.data.message)
      toast.success('Summary generated!')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to generate summary')
      console.error('Summarize error:', err)
    } finally {
      setIsSummarizing(false)
    }
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navbar />

      <main className="pt-20 md:pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="badge-primary">{article.category}</span>
              <span className="badge text-xs px-2 py-1 bg-[#111111] text-zinc-400">
                {article.source}
              </span>
              <span className="badge text-xs px-2 py-1 bg-[#111111] text-zinc-400">
                {formatDate(article.date)}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {article.title}
            </h1>
          </div>

          {/* Featured Image */}
          <div className="relative w-full rounded-xl overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-96 object-cover"
            />
            {article.sentiment && (
              <div className="absolute top-4 right-4">
                <span className={`badge text-xs px-3 py-1 ${
                  article.sentiment === 'positive' ? 'bg-emerald-500/20 text-emerald-500' :
                  article.sentiment === 'neutral' ? 'bg-blue-500/20 text-blue-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
                </span>
              </div>
            )}
          </div>

          {/* Article Meta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-y border-[#2a2a2a]">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Credibility</p>
              <div className="w-full bg-[#111111] rounded-full h-2">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${article.credibility || 85}%` }}
                />
              </div>
              <p className="text-white font-semibold text-sm mt-2">{article.credibility || 85}%</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Reading Time</p>
              <p className="text-white font-semibold text-sm">{article.readingTime}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Published</p>
              <p className="text-white font-semibold text-sm">{formatDate(article.date)}</p>
            </div>
          </div>

          {/* Article Content */}
          <div className="space-y-6 text-zinc-200 leading-relaxed">
            <p className="text-lg text-zinc-300 italic">{article.description}</p>
            <p>{article.content || article.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 py-6 border-y border-[#2a2a2a]">
            <button
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
              {isSummarizing ? 'Summarizing...' : '✨ Summarize with Gemini AI'}
            </button>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#1f1f1f] text-zinc-200 font-semibold rounded-lg flex items-center gap-2 hover:bg-[#2a2a2a] transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Read Full Article
            </a>
          </div>

          {/* Summary Section */}
          {summary && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">AI Summary</h2>
              <div className="glass-card p-6 space-y-3 rounded-xl border border-[#2a2a2a]">
                <ul className="space-y-2 text-zinc-200">
                  {summary.split('\n').map((point, index) => {
                    if (!point.trim()) return null;
                    return (
                      <li key={index} className="flex gap-2">
                        <span className="text-blue-500 flex-shrink-0">•</span>
                        <span>{point.replace(/^[-*•]\s*/, '')}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default ArticleDetails
