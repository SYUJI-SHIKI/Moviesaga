import { useState, useEffect } from 'react';
import api from 'lib/api';

interface Movie {
  id: number;
  tmdb_id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  runtime: number;
  original_language: string;
  status: string;
  release_date: string;
  genres: { id: number; name: string }[];
  youtube_trailer_id: string;
}

interface MovieResponse {
  movie: Movie;
  favorited: boolean;
}

export const useMovieData = (movieId: string | undefined) => {
  const [movieData, setMovieData] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      setError("Movie ID is not available.");
      return;
    }

    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const response = await api.get<MovieResponse>(`/movies/${movieId}`);
        setMovieData(response.data);
      } catch (error: any) {
        console.error("Fetch error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [movieId]);

  const handleFavoriteToggle = async () => {
    if (!movieData) return;

    try {
      const newFavoriteStatus = !movieData.favorited;
      if (newFavoriteStatus) {
        await api.post(`/favorites`, { movie_id: movieData.movie.id });
      } else {
        await api.delete(`/favorites/${movieData.movie.id}`);
      }
      setMovieData(prevData => prevData ? {...prevData, favorited: newFavoriteStatus} : null);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return { movieData, loading, error, handleFavoriteToggle };
};