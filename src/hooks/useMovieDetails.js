import { useState, useEffect } from "react";
import {
  getMovieDetails,
  getMovieRecommendations,
} from "../services/movieService";
import tmdbClient from "@/services/tmdbClient";
import { useTranslation } from "react-i18next";

export function useMovieDetails(id) {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const [movieRes, recsRes] = await Promise.all([
          getMovieDetails(id),
          getMovieRecommendations(id),
        ]);

        setMovie(movieRes.data);

        const videosRes = await tmdbClient.get(`/movie/${id}/videos`, {
          params: { language: "en" },
        });
        const mainTrailer = videosRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube",
        );
        setTrailer(mainTrailer ? mainTrailer.key : null);

        setRecommendations(recsRes.data.results.slice(0, 6));
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, i18n.language]);

  return { movie, trailer, recommendations, loading, error };
}
