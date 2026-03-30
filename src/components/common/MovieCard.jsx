import { Link } from 'react-router'
import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/store'
import { getImageUrl, formatDate } from '@/utils'
import toast from 'react-hot-toast'

export default function MovieCard({ movie }) {
  const { isInWishlist, toggleWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(movie.id)

  const handleWishlist = (e) => {
    e.preventDefault()
    const added = toggleWishlist(movie)
    toast.success(added ? 'Added to wishlist!' : 'Removed from wishlist!')
  }

  return (
    <Link to={`/movie/${movie.id}`} className="block group">
      <div className="relative rounded-xl overflow-hidden bg-[var(--color-card)] shadow-md card-hover">
        
        {/* Poster */}
        <div className="relative aspect-[2/3]">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          {/* Rating badge */}
          <div className="absolute bottom-2 start-2 bg-green-700 text-white text-xs font-bold rounded-full w-9 h-9 flex items-center justify-center">
            {Math.round(movie.vote_average * 10)}°
          </div>

          {/* More options */}
          <div className="absolute top-2 end-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">•••</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-sm text-[var(--color-text)] line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                {formatDate(movie.release_date)}
              </p>
            </div>

            {/* Heart icon */}
            <button onClick={handleWishlist} className="shrink-0 mt-0.5">
              <Heart
                size={18}
                fill={inWishlist ? '#F5C518' : 'none'}
                stroke={inWishlist ? '#F5C518' : 'currentColor'}
                className="text-[var(--color-text-muted)]"
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}