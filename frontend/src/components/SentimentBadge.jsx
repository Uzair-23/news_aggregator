const SentimentBadge = ({ sentiment }) => {
  const sentiments = {
    positive: { label: 'Positive', color: 'bg-accent-green/20 text-accent-green' },
    neutral: { label: 'Neutral', color: 'bg-accent-blue/20 text-accent-blue' },
    negative: { label: 'Negative', color: 'bg-accent-red/20 text-accent-red' }
  }

  const config = sentiments[sentiment] || sentiments.neutral

  return (
    <span className={`badge text-xs ${config.color}`}>
      {config.label}
    </span>
  )
}

export default SentimentBadge
