import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "392e7da67e8860f48faaf7ea3b1d1599";
const BASE_URL = "https://api.themoviedb.org/3";

export function useMovieDetails(id) {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const [movieRes, videoRes, recsRes] = await Promise.all([
          axios.get(`${BASE_URL}/movie/${id}`, {
            params: { api_key: API_KEY },
          }),
          axios.get(`${BASE_URL}/movie/${id}/videos`, {
            params: { api_key: API_KEY },
          }),
          axios.get(`${BASE_URL}/movie/${id}/recommendations`, {
            params: { api_key: API_KEY },
          }),
        ]);

        setMovie(movieRes.data);

        const mainTrailer = videoRes.data.results.find(
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
  }, [id]);

  return { movie, trailer, recommendations, loading, error };
}
