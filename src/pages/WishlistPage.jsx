import { usePageTitle } from '@/hooks'
import { useWishlistStore } from '@/store'
import MovieCard from '@/components/common/MovieCard' 

export default function WishlistPage() {
  usePageTitle('Wishlist')
  const { wishlist } = useWishlistStore()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl text-primary mb-8 font-bold">My Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <p className="text-[var(--color-text-muted)] text-xl">Your wishlist is currently empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}