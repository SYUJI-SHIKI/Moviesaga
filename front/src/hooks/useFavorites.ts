import { useEffect, useState, useCallback } from "react";
import api from "lib/api";

interface Movie {
  id: number;
  poster_path: string;
  original_title: string;
}

export const useFavorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFavorites = useCallback(async (pageNum: number) => {
    try {
      const response = await api.get(`/favorites?page=${pageNum}`);
      setFavoriteMovies(response.data.movies);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  }, []);

  useEffect(() => {
    fetchFavorites(page);
  }, [fetchFavorites, page]);

  return { favoriteMovies, page, setPage, totalPages };
}