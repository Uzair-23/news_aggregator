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
      className="card-base group overflow-hidden cursor-pointer h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1 sm:gap-2 flex-wrap justify-end">
          <span className="badge-primary text-xs px-2 py-1 truncate">
            {article.category}
          </span>
          <span className={`badge text-xs px-2 py-1 ${article.sentiment === 'positive' ? 'bg-emerald-500/20 text-emerald-500' : article.sentiment === 'neutral' ? 'bg-blue-500/20 text-blue-500' : 'bg-red-500/20 text-red-500'}`}>
            {article.sentiment}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-3">
          <p className="text-xs text-zinc-300 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Credibility: {article.credibility}%
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <p className="text-xs text-blue-500 font-semibold truncate">{article.source}</p>
        <h3 className="text-lg font-bold line-clamp-2 group-hover:text-blue-500 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-zinc-400 line-clamp-3 flex-1">
          {article.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Clock className="w-3 h-3" />
            <span>{formatDate(article.date)}</span>
          </div>
          {article.readingTime && (
            <span className="text-xs text-zinc-500">{article.readingTime}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 mt-auto">
          <button
            onClick={() => onBookmark?.(article.id)}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm ${
              isBookmarked
                ? 'bg-blue-500/20 text-blue-500'
                : 'bg-[#1f1f1f] text-zinc-400 hover:bg-blue-500/10'
            }`}
          >
            <BookmarkPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button className="flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm bg-[#1f1f1f] text-zinc-400 hover:bg-violet-500/10">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
