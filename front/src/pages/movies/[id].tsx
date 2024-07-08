import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FavoriteButton from "@/components/elements/Favorite/FavoriteButton";
import Image from "next/image";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "lib/api";

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

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const movieId = Array.isArray(id) ? id[0] : id;
  const [movieData, setMovieData] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!router.isReady) return;

    if (!movieId) {
      setLoading(false);
      setError("Movie ID is not available.");
      return;
    }

    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const response = await api.get<MovieResponse>(`/movies/${movieId}`);
        console.log("Response:", response);

        setMovieData(response.data);
      } catch (error: any) {
        console.error("Fetch error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
        console.log("Loading finished");
      }
    };
    fetchMovieData();
  }, [movieId, router.isReady]);

  const handleFavoriteToggle = async () => {
    if (!movieData || !isAuthenticated) return;

    try {
      const newFavoriteStatus = !movieData.favorited;
      if (newFavoriteStatus) {
        await api.post(`/favorites`, { movie_id: movieData.movie.id });
      } else {
        await api.delete(`/favorites/${movieData.movie.id}`);
      }
      setMovieData(prevData => prevData ? {...prevData, favorited: newFavoriteStatus} : null) ;
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (loading || authLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movieData) return <div>Movie not found</div>;

  return (
    <div className="relative flex flex-col p-3 min-h-screen text-gray-300 bg-cover bg-center"
      style={{backgroundImage: `url(${movieData.movie.poster_path})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <div className="relative z-10 max-w-screen-md mx-auto mt-20">
          <div className="w-full h-0 pb-[56.25%] relative">
            <div className="">
              {movieData.movie.youtube_trailer_id ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${movieData.movie.youtube_trailer_id}?autoplay=1&mute=1&loop=1&rel=0&playlist=${movieData.movie.youtube_trailer_id}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex flex-col mt-20 items-center ">
                  <Image
                    src="/video_loading_error.png"
                    alt={movieData.movie.original_title}
                    height={300}
                    width={300}
                  />
                </div>
              )}
            </div>
          </div>
        <div className="relative z-10 flex flex-row justify-center p-2 my-5 items-end backdrop-blur-md ">
          <div className="mr-4 shadow-2xl">
            {movieData.movie.poster_path ? (
              <Image
                src={movieData.movie.poster_path}
                alt={`${movieData.movie.original_title} poster`}
                width={250}
                height={350}
                className="object-cover  rounded-lg"
              />
            ) : (
              <div>Poster not available</div>
            )}
          </div>
          <div className="p-5">
            <div className="text-4xl mb-5">
              {movieData.movie.original_title || "Title not available"}
            </div>
            <div>
              {isAuthenticated && (
                <FavoriteButton 
                  isFavorited={movieData.favorited}
                  onToggle={handleFavoriteToggle}
                />
              )}
            </div>
            <div className="mb-2">
              上映時間:{" "}
              {movieData.movie.runtime
                ? `${movieData.movie.runtime}分`
                : "Runtime not available"}
            </div>
            <div className="mb-5">
              上映日: {movieData.movie.release_date || "Release date not available"}
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 w-full max-w-screen-md mx-auto bg-gradient-to-r from-indigo-900 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-4 mt-7">
        <div>{movieData.movie.overview}</div>
      </div>
    </div>
  );
};

export default MovieDetail;
