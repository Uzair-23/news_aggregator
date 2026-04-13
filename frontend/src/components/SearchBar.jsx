import { Search, X } from 'lucide-react'
import { useState } from 'react'

const SearchBar = ({ onSearch, onClear, placeholder = 'Search articles...' }) => {
  const [query, setQuery] = useState('')

  const handleSearch = (value) => {
    setQuery(value)
    onSearch?.(value)
  }

  const handleClear = () => {
    setQuery('')
    onClear?.()
  }

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="input-base pl-12 pr-10 w-full"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-surface-hover rounded transition-colors"
        >
          <X className="w-4 h-4 text-dark-500" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
