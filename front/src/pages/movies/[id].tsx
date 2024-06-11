import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

interface Movie {
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

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Movie ID is not available.');
      return;
    }
    if (id) {
      const fetchMovie = async () => {
        try {
          console.log('Fetching movie with id:', id); // 追加
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies/${id}`);
          console.log('Response:', response);
          if (!response.ok) {
            throw new Error('Failed to fetch movie');
          }
          const data = await response.json();
          console.log('Response data:', data); // 追加
          setMovie(data);
          console.log('Movie set:', data); // 追加
        } catch (error) {
          console.error('Fetch error:', error.message); // 追加
          setError(error.message);
        } finally {
          setLoading(false);
          console.log('Loading finished'); // 追加
        }
      };
      fetchMovie();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      {movie && (
        <>
          <h1>{movie.original_title}</h1>
          <p>Overview: {movie.overview}</p>
          <img src={movie.poster_path} alt={`${movie.original_title} poster`} />
          <p>Runtime: {movie.runtime} minutes</p>
          <p>Release Date: {movie.release_date}</p>
          {movie.youtube_trailer_id && (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movie.youtube_trailer_id}?autoplay=1&mute=1&loop=1&rel=0&playlist=${movie.youtube_trailer_id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          )}
        </>
      )}
    </div>
  );
};

export default MovieDetail;