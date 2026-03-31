import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@/hooks'
import { getNowPlaying, getGenres, discoverMovies } from '@/services/movieService'
import MovieCard from '@/components/common/MovieCard'
import Pagination from '@/components/common/Pagination'
import GenreFilter from '@/components/common/GenreFilter'
import SortSelect from '@/components/common/SortSelect'
import { Film } from 'lucide-react'
// Search
import { useNavigate } from 'react-router'
import { Search } from 'lucide-react'




export default function HomePage() {
  const { t } = useTranslation()
  usePageTitle(t('home.nowPlaying'))

  const [movies, setMovies] = useState([])
  const [genres, setGenresState] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
const [query, setQuery] = useState('')

const handleSearch = (e) => {
  e.preventDefault()
  if (query.trim()) navigate(`/search?q=${query}`)
}

  // Fetch genres once
  const { i18n } = useTranslation()

  useEffect(() => {
    getGenres()
      .then((res) => setGenresState(res.data.genres))
      .catch(() => {})
  }, [i18n.language]) // Refetch genres if language changes

  // Fetch movies
  const fetchMovies = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let res
      if (selectedGenre || sortBy !== 'popularity.desc') {
        // Use discover API when filtering/sorting
        res = await discoverMovies({
          page: currentPage,
          sort_by: sortBy,
          with_genres: selectedGenre || undefined,
        })
      } else {
        // Default: now playing
        res = await getNowPlaying(currentPage)
      }
      setMovies(res.data.results)
      setTotalPages(res.data.total_pages)
    } catch (err) {
      setError(err.response?.data?.status_message || err.message)
    } finally {
      setLoading(false)
    }
  }, [currentPage, selectedGenre, sortBy])

  useEffect(() => {
    fetchMovies()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [fetchMovies])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId)
    setCurrentPage(1)
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    setCurrentPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
      {/* Hero Search */}
<div className="bg-[var(--color-surface)] rounded-2xl p-8 mb-10">
  <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
    {t('nav.home')}
  </h1>
  <p className="text-[var(--color-text-muted)] mb-6">
    {t('search.placeholder')}
  </p>
  <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={t('search.placeholder')}
      className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] outline-none focus:border-primary"
    />
    <button type="submit" className="btn-primary flex items-center gap-2">
      <Search size={18} />
      {t('nav.search')}
    </button>
  </form>
</div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-4xl font-heading text-primary tracking-wider">
          {t('home.nowPlaying')}
        </h1>
        <SortSelect value={sortBy} onChange={handleSortChange} />
      </div>

      {/* Genre Filter */}
      {genres.length > 0 && (
        <div className="mb-8">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
          />
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="skeleton aspect-[2/3] rounded-xl" />
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-20">
          <p className="text-lg text-[var(--color-text-muted)] mb-4">{t('common.error')}</p>
          <button onClick={fetchMovies} className="btn-primary">
            {t('common.retry') || 'Retry'}
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && movies.length === 0 && (
        <div className="text-center py-20">
          <Film size={64} className="mx-auto text-[var(--color-text-muted)] mb-4" />
          <p className="text-lg text-[var(--color-text-muted)]">No movies found.</p>
        </div>
      )}

      {/* Movie Grid */}
      {!loading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}