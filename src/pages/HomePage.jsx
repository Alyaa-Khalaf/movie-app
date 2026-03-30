import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { usePageTitle, useFetch } from '@/hooks'
import { getNowPlaying } from '@/services/movieService'
import MovieCard from '@/components/common/MovieCard'
import PageSkeleton from '@/components/common/PageSkeleton'

export default function HomePage() {
  usePageTitle('Home')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const { data, loading, error } = useFetch(
    () => getNowPlaying(page),
    [page]
  )

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${query}`)
    }
  }

  if (loading) return <PageSkeleton />

  if (error) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Hero */}
      <div className="bg-[var(--color-surface)] rounded-2xl p-8 mb-10">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
          Welcome to our movie app
        </h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search and explore..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] outline-none focus:border-primary"
          />
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Search size={18} />
            Search
          </button>
        </form>
      </div>

      {/* Now Playing */}
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">
        {t('home.nowPlaying')}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      {data?.total_pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-[var(--color-border)] disabled:opacity-50"
          >
            ‹
          </button>

          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-lg border ${page === p ? 'bg-primary text-black border-primary font-bold' : 'border-[var(--color-border)]'}`}
            >
              {p}
            </button>
          ))}

          <span className="px-2">...</span>

          <button
            onClick={() => setPage((p) => Math.min(data.total_pages, p + 1))}
            disabled={page === data?.total_pages}
            className="px-4 py-2 rounded-lg border border-[var(--color-border)] disabled:opacity-50"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}