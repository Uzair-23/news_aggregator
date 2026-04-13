import { useRef } from 'react'
import { useCounterAnimation } from '../hooks/useGSAPAnimations'

const StatsCard = ({ icon: Icon, label, value, trend }) => {
  const animatedValue = useCounterAnimation(value)

  return (
    <div className="card-base p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        {trend && (
          <span className={`text-sm font-semibold ${trend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-zinc-400 text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{animatedValue}</p>
      </div>
    </div>
  )
}

export default StatsCard
