import { useEffect, useState, useCallback } from "react";
import api from "lib/api";

interface Movie {
  id: number;
  poster_path: string;
  original_title: string;
}

export const useFavorites = () => { // useFavoritesに変更
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await api.get('/favorites');
      setFavoriteMovies(response.data.movies); // ここでresponse.data.moviesを設定
      console.log(`wwwwwwwww,${JSON.stringify(response.data.movies, null, 2)}`);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favoriteMovies };
}