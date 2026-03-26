import { Star, Calendar, Clock, Globe, Users } from "lucide-react";

export default function MovieInfo({ movie, onlyPoster }) {
  if (onlyPoster) {
    return (
      <div className="col-span-1">
        <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-border/50">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title & Tagline */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-card-foreground">
          {movie.title}
        </h1>
        {movie.tagline && (
          <p className="text-xl md:text-2xl font-light italic text-muted-foreground">
            "{movie.tagline}"
          </p>
        )}
      </div>

      {/* Genres Chips */}
      <div className="flex flex-wrap gap-2">
        {movie.genres?.map((genre) => (
          <span
            key={genre.id}
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30"
          >
            {genre.name}
          </span>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="flex flex-wrap gap-4 items-center text-sm md:text-base">
        {/* Rating */}
        <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-lg border border-yellow-500/20">
          <Star size={18} className="fill-current" />
          <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
          <span className="text-xs opacity-70">({movie.vote_count})</span>
        </div>

        {/* Year */}
        <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-lg border border-border/40">
          <Calendar size={18} />
          <span>
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </span>
        </div>

        {/* Runtime */}
        <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-lg border border-border/40">
          <Clock size={18} />
          <span>{movie.runtime} min</span>
        </div>

        {/* Language */}
        <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-lg border border-border/40">
          <Globe size={18} />
          <span className="uppercase">{movie.original_language}</span>
        </div>
      </div>

      {/* Quick Status Info */}
      <div className="pt-4 border-t border-border/50 flex gap-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Status
          </p>
          <p className="font-medium">{movie.status}</p>
        </div>
        {movie.budget > 0 && (
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Budget
            </p>
            <p className="font-medium">${movie.budget.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
