const SentimentBadge = ({ sentiment }) => {
  const sentiments = {
    positive: { label: 'Positive', color: 'bg-emerald-500/20 text-emerald-500' },
    neutral: { label: 'Neutral', color: 'bg-blue-500/20 text-blue-500' },
    negative: { label: 'Negative', color: 'bg-red-500/20 text-red-500' }
  }

  const config = sentiments[sentiment] || sentiments.neutral

  return (
    <span className={`badge text-xs ${config.color}`}>
      {config.label}
    </span>
  )
}

export default SentimentBadge
