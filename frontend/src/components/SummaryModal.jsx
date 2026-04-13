import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import gsap from 'gsap'

const SummaryModal = ({ article, isOpen, onClose }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      gsap.to(modalRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out'
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="glass-card max-w-2xl w-full max-h-96 overflow-y-auto opacity-0 scale-95"
      >
        <div className="sticky top-0 bg-[#171717]/95 p-4 border-b border-[#2a2a2a] flex items-center justify-between">
          <h2 className="text-xl font-bold">AI Summary</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#1f1f1f] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">{article?.title}</h3>
            <p className="text-zinc-400 text-sm">{article?.source} - {article?.date}</p>
          </div>

          <div className="bg-[#111111]/50 p-4 rounded-xl border border-[#2a2a2a]">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              AI-Generated Summary
            </h4>
            <p className="text-zinc-300 leading-relaxed">
              {article?.summary || article?.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
              <p className="text-xs text-zinc-400 mb-1">Credibility Score</p>
              <p className="text-lg font-bold text-blue-500">{article?.credibility}%</p>
            </div>
            <div className="bg-violet-500/10 p-3 rounded-lg border border-violet-500/20">
              <p className="text-xs text-zinc-400 mb-1">Sentiment</p>
              <p className="text-lg font-bold text-violet-500 capitalize">{article?.sentiment}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#2a2a2a]">
            <h4 className="font-semibold mb-2 text-sm">Key Points</h4>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li className="flex gap-2">
                <span className="text-blue-500">•</span>
                <span>Main storyline and context</span>
              </li>
              <li className="flex gap-2">
                <span className="text-violet-500">•</span>
                <span>Important facts and figures</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">•</span>
                <span>Impact and implications</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="btn-primary w-full"
          >
            Read Full Article
          </button>
        </div>
      </div>
    </div>
  )
}

export default SummaryModal
