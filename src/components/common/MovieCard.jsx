import { Link } from 'react-router'
import { Heart, Star } from 'lucide-react'
import { useWishlistStore } from '@/store'
import { getImageUrl, getYear, formatRating, getRatingColor, truncate } from '@/utils'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

export default function MovieCard({ movie }) {
  const { t } = useTranslation()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const wishlisted = isInWishlist(movie.id)

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const added = toggleWishlist({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
    })
    toast.success(added ? t('movie.addWishlist') : t('movie.removeWishlist'))
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-[var(--color-card)] border border-[var(--color-border)] card-hover"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        <div className="absolute top-2 start-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star size={14} className="fill-current" style={{ color: getRatingColor(movie.vote_average) }} />
          <span className="text-xs font-bold text-white">{formatRating(movie.vote_average)}</span>
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 end-2 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-200 active:scale-90"
          aria-label={wishlisted ? t('movie.removeWishlist') : t('movie.addWishlist')}
        >
          <Heart
            size={18}
            className={wishlisted ? 'fill-primary text-primary' : 'text-white'}
          />
        </button>

        {/* Year badge */}
        <div className="absolute bottom-2 start-2 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
          {getYear(movie.release_date)}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-sm line-clamp-1 mb-1">{movie.title}</h3>
        <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">{truncate(movie.overview, 80)}</p>
      </div>
    </Link>
  )
}
