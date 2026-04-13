import { useRef } from 'react'
import { useCounterAnimation } from '../hooks/useGSAPAnimations'

const StatsCard = ({ icon: Icon, label, value, trend }) => {
  const animatedValue = useCounterAnimation(value)

  return (
    <div className="card-base p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-accent-blue/20 rounded-lg">
          <Icon className="w-6 h-6 text-accent-blue" />
        </div>
        {trend && (
          <span className={`text-sm font-semibold ${trend > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-dark-400 text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{animatedValue}</p>
      </div>
    </div>
  )
}

export default StatsCard
