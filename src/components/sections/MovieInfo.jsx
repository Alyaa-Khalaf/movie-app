import { Star, Calendar, Clock } from "lucide-react";

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

      <div className="flex flex-wrap gap-4 items-center text-sm md:text-base">
        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-lg border border-primary/20">
          <Star size={18} className="fill-current" />
          <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-lg border border-border/40">
          <Calendar size={18} />
          <span>{new Date(movie.release_date).getFullYear()}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-lg border border-border/40">
          <Clock size={18} />
          <span>{movie.runtime} min</span>
        </div>
      </div>
    </div>
  );
}
