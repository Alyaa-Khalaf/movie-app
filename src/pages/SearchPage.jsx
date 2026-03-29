import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Search, Film } from 'lucide-react'
import { usePageTitle, useDebounce } from '@/hooks'
import { searchMovies, getGenres } from '@/services/movieService'
import MovieCard from '@/components/common/MovieCard'
import Pagination from '@/components/common/Pagination'
import GenreFilter from '@/components/common/GenreFilter'

export default function SearchPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const queryParam = searchParams.get('query') || ''
  const pageParam = Number(searchParams.get('page')) || 1

  const [searchInput, setSearchInput] = useState(queryParam)
  const debouncedQuery = useDebounce(searchInput, 500)

  const [movies, setMovies] = useState([])
  const [genres, setGenresState] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [currentPage, setCurrentPage] = useState(pageParam)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  usePageTitle(debouncedQuery ? `${t('search.results')} "${debouncedQuery}"` : t('nav.search'))

  // Fetch genres once
  useEffect(() => {
    getGenres()
      .then((res) => setGenresState(res.data.genres))
      .catch(() => {})
  }, [])

  // Sync debounced query to URL and reset page
  useEffect(() => {
    if (debouncedQuery !== queryParam) {
      setCurrentPage(1)
      const params = {}
      if (debouncedQuery) params.query = debouncedQuery
      params.page = '1'
      setSearchParams(params, { replace: true })
    }
  }, [debouncedQuery])

  // Fetch search results
  const fetchResults = useCallback(async () => {
    if (!debouncedQuery.trim()) {
      setMovies([])
      setTotalPages(1)
      setTotalResults(0)
      setHasSearched(false)
      return
    }

    setLoading(true)
    setError(null)
    setHasSearched(true)
    try {
      const res = await searchMovies(debouncedQuery, currentPage)
      let results = res.data.results

      // Client-side genre filtering for search results
      if (selectedGenre) {
        results = results.filter((m) => m.genre_ids?.includes(selectedGenre))
      }

      setMovies(results)
      setTotalPages(res.data.total_pages)
      setTotalResults(res.data.total_results)
    } catch (err) {
      setError(err.response?.data?.status_message || err.message)
    } finally {
      setLoading(false)
    }
  }, [debouncedQuery, currentPage, selectedGenre])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSearchParams({ query: debouncedQuery, page: String(page) }, { replace: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <Search
          size={20}
          className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full ps-12 pe-4 py-3.5 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl text-base outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-[var(--color-text-muted)]"
          autoFocus
        />
      </div>

      {/* Genre Filter */}
      {genres.length > 0 && hasSearched && (
        <div className="mb-6">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
          />
        </div>
      )}

      {/* Results header */}
      {hasSearched && debouncedQuery && !loading && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {t('search.results')} <span className="text-primary">"{debouncedQuery}"</span>
            <span className="text-sm text-[var(--color-text-muted)] font-normal ms-2">
              ({totalResults} {totalResults === 1 ? 'result' : 'results'})
            </span>
          </h2>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="skeleton aspect-[2/3] rounded-xl" />
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-20">
          <p className="text-lg text-[var(--color-text-muted)] mb-4">{t('common.error')}</p>
          <button onClick={fetchResults} className="btn-primary">
            {t('common.retry') || 'Retry'}
          </button>
        </div>
      )}

      {/* Empty Initial State */}
      {!loading && !error && !hasSearched && (
        <div className="text-center py-20">
          <Search size={64} className="mx-auto text-[var(--color-text-muted)] mb-4 opacity-50" />
          <p className="text-lg text-[var(--color-text-muted)]">
            {t('search.placeholder')}
          </p>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && hasSearched && movies.length === 0 && (
        <div className="text-center py-20">
          <Film size={64} className="mx-auto text-[var(--color-text-muted)] mb-4 opacity-50" />
          <p className="text-lg text-[var(--color-text-muted)]">
            {t('search.noResults')} <span className="text-primary">"{debouncedQuery}"</span>
          </p>
        </div>
      )}

      {/* Results Grid */}
      {!loading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination (only if no client-side genre filter applied) */}
          {!selectedGenre && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  )
}