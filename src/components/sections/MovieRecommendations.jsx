import { useRef, useState, useEffect } from "react";
import {
  Film,
  PlayCircle,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function MovieRecommendations({ recommendations, onCardClick }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeftArrow(el.scrollLeft > 10);
    setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.85;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateArrows();
  }, [recommendations]);

  if (!recommendations.length) return null;

  return (
    <section className="pt-20 mt-20 border-t border-white/20 space-y-8 relative group/section">
      {/* Header */}
      <div className="px-2 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
          Recommendations
        </div>

        <h3 className="text-4xl md:text-5xl font-black tracking-tighter flex items-center gap-4 italic">
          <Film className="text-primary fill-primary/20" size={36} />
          More Like This
        </h3>
      </div>

      <div className="relative px-2">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-primary text-white p-3 rounded-full backdrop-blur-xl border border-white/10 transition-all duration-300 hidden md:flex shadow-xl hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-primary text-white p-3 rounded-full backdrop-blur-xl border border-white/10 transition-all duration-300 hidden md:flex shadow-xl hover:scale-110 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Scroll Area */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex gap-6 overflow-x-auto pb-12 pt-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onCardClick(rec.id)}
              className="flex-none w-[180px] sm:w-[220px] md:w-[250px] snap-start group/card cursor-pointer outline-none"
              onClick={() => onCardClick(rec.id)}
            >
              <div className="relative space-y-4 transition-all duration-500 hover:-translate-y-3">
                {/* Poster */}
                <div className="relative aspect-[2/3] rounded-[2rem] overflow-hidden border border-white/5 bg-muted shadow-xl group-hover/card:shadow-primary/40 transition-all duration-500">
                  <img
                    src={`https://image.tmdb.org/t/p/w342${rec.poster_path}`}
                    alt={rec.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    loading="lazy"
                  />

                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex flex-col justify-end p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-md border border-yellow-500/30 text-[10px] font-bold flex items-center gap-1">
                        <Star size={10} className="fill-current" />
                        {rec.vote_average?.toFixed(1)}
                      </div>
                    </div>

                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center self-center shadow-2xl border border-white/20 group-hover/card:scale-110 transition">
                      <PlayCircle size={26} />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="px-2">
                  <h4 className="font-black text-sm truncate group-hover/card:text-primary transition uppercase">
                    {rec.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                    {rec.release_date?.split("-")[0]} • Movie
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `,
        }}
      />
    </section>
  );
}
