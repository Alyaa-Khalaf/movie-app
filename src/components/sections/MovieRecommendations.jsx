import { Film, PlayCircle } from "lucide-react";

export default function MovieRecommendations({ recommendations, onCardClick }) {
  if (recommendations.length === 0) return null;

  return (
    <section className="pt-10 border-t border-border">
      <h3 className="text-3xl font-black flex items-center gap-3 text-foreground mb-8">
        <Film className="text-primary" />
        Similar Movies
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="group cursor-pointer space-y-3 transition-all active:scale-95"
            onClick={() => onCardClick(rec.id)}
          >
            <div className="relative overflow-hidden rounded-xl aspect-[2/3] shadow-md border border-border/50">
              <img
                src={`https://image.tmdb.org/t/p/w342${rec.poster_path}`}
                alt={rec.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                  <PlayCircle size={24} />
                </div>
              </div>
            </div>
            <p className="text-sm font-bold truncate text-card-foreground group-hover:text-primary transition-colors">
              {rec.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
