import { useRef, useEffect } from 'react'
import { BookmarkPlus, Share2, Clock, TrendingUp } from 'lucide-react'
import { formatDate, truncateText } from '../utils/helpers'
import { useScrollReveal } from '../hooks/useGSAPAnimations'

const NewsCard = ({ article, onBookmark, isBookmarked }) => {
  const cardRef = useRef(null)
  useScrollReveal(cardRef)

  return (
    <div
      ref={cardRef}
      className="card-base group overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className="badge-primary text-xs">
            {article.category}
          </span>
          <span className={`badge text-xs ${article.sentiment === 'positive' ? 'bg-accent-green/20 text-accent-green' : article.sentiment === 'neutral' ? 'bg-accent-blue/20 text-accent-blue' : 'bg-accent-red/20 text-accent-red'}`}>
            {article.sentiment}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <p className="text-xs text-dark-300 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Credibility: {article.credibility}%
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <p className="text-xs text-accent-blue font-semibold">{article.source}</p>
        <h3 className="text-lg font-bold line-clamp-2 group-hover:text-accent-blue transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-dark-400 line-clamp-2">
          {truncateText(article.description, 80)}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-border">
          <div className="flex items-center gap-1 text-xs text-dark-500">
            <Clock className="w-3 h-3" />
            <span>{formatDate(article.date)}</span>
          </div>
          {article.readingTime && (
            <span className="text-xs text-dark-500">{article.readingTime}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onBookmark?.(article.id)}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm ${
              isBookmarked
                ? 'bg-accent-blue/20 text-accent-blue'
                : 'bg-surface-hover text-dark-400 hover:bg-accent-blue/10'
            }`}
          >
            <BookmarkPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button className="flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm bg-surface-hover text-dark-400 hover:bg-accent-purple/10">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
