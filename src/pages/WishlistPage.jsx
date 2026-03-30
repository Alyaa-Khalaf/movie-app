// import { usePageTitle } from '@/hooks'
// import { useWishlistStore } from '@/store'
// import MovieCard from '@/components/common/MovieCard' 

// export default function WishlistPage() {
//   usePageTitle('Wishlist')
//   const { wishlist } = useWishlistStore()

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-4xl text-primary mb-8 font-bold">My Wishlist</h1>
      
//       {wishlist.length === 0 ? (
//         <p className="text-[var(--color-text-muted)] text-xl">Your wishlist is currently empty.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {wishlist.map((movie) => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
import { usePageTitle } from '@/hooks'
import { useWishlistStore } from '@/store'
import { Link } from 'react-router'
import { HeartOff } from 'lucide-react'
import WishlistCard from '@/components/movie/WishlistCard'

export default function WishlistPage() {
  usePageTitle('Wishlist')
  const { wishlist } = useWishlistStore()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-8">Watch list</h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <HeartOff size={100} className="text-gray-300" />
          <p className="text-[var(--color-text-muted)] text-lg">No Movies in watch list</p>
          <Link to="/" className="btn-primary px-10">
            Back to home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlist.map((movie) => (
            <WishlistCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}