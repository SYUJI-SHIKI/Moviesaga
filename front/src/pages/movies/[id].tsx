import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FavoriteButton from 'components/FavoriteButton';
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
  const movieId = Array.isArray(id) ? id[0] : id;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () =>{
    setIsNavOpen(!isNavOpen);
  };

  console.log('Router is ready:', router.isReady);
  console.log('Movie ID:', movieId);
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  useEffect(() => {
    if (!router.isReady) return;

    if (!movieId) {
      setLoading(false);
      setError('Movie ID is not available.');
      return;
    }

    const fetchMovie = async () => {
      try {
        console.log('Fetching movie with id:', movieId); // 追加
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies/${movieId}`);
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }
        const data = await response.json();
        console.log('Response data:', data); // 追加
        setMovie(data.movie);
        console.log('Movie set:', data.movie); // 追加
      } catch (error: any) {
        console.error('Fetch error:', error.message); // 追加
        setError(error.message);
      } finally {
        setLoading(false);
        console.log('Loading finished'); // 追加
      }
    };
    fetchMovie();
  }, [movieId, router.isReady]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {movie && (
        <div className='flex flex-col p-3 min-h-screen bg-gray-950 text-gray-300'>
          <div className='flex flex-row'>
            <div>
              {movie.youtube_trailer_id ? (
              <iframe
                width="400"
                height="315"
                src={`https://www.youtube.com/embed/${movie.youtube_trailer_id}?autoplay=1&mute=1&loop=1&rel=0&playlist=${movie.youtube_trailer_id}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              ) : (
                <div>
                  <img src="/video_loading_error.png"
                  width="400"
                  height="315"
                  className='' />
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-row'>
            <div>
              {movie.poster_path ? (
              <img src={movie.poster_path} 
              alt={`${movie.original_title} poster`}
              width={180}
              height={200}
              className='' />
              ) : (
                <div>Poster not available</div>
              )}
            </div>
            <div className='p-5'>
              <h1>{movie.original_title || 'Title not available'}</h1>
              <FavoriteButton itemId={movie.tmdb_id} />
              <div>Runtime: {movie.runtime ? `${movie.runtime} minutes` : 'Runtime not available'}</div>
              <div>Release Date: {movie.release_date || 'Release date not available'}</div>
              <button onClick={toggleNav} className='absolute hidden sm:block bottom-3 z-40'>
                {isNavOpen ? <span>あらすじ</span> : <span> close </span> }
              </button>
              {isNavOpen && (
                <div>
                  <div>あらすじ</div>
                  <div>`${movie.overview}`</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}  
    </>
  );
};

export default MovieDetail;