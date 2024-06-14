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
          <div className=''>
            <div className='w-full max-w-screen-md mx-auto mb-4 mt-5'>
              <div className='relative'> 
                {movie.youtube_trailer_id ? (
                <iframe
                  className='w-full h-auto'
                  src={`https://www.youtube.com/embed/${movie.youtube_trailer_id}?autoplay=1&mute=1&loop=1&rel=0&playlist=${movie.youtube_trailer_id}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                ) : (
                  <div>
                    <img src="/video_loading_error.png"
                    className='w-full h-auto' />
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-row justify-center mb-4 items-end '>
              <div className='mr-4'>
                {movie.poster_path ? (
                <img src={movie.poster_path} 
                alt={`${movie.original_title} poster`}
                width={300}
                height={200}
                className='' />
                ) : (
                  <div>Poster not available</div>
                )}
              </div>
              <div className='p-5'>
                <div className='text-4xl mb-5'>{movie.original_title || 'Title not available'}</div>
                <FavoriteButton itemId={movie.tmdb_id} />
                <div className='mb-2'>上映時間: {movie.runtime ? `${movie.runtime}分` : 'Runtime not available'}</div>
                <div className='mb-5'>上映日: {movie.release_date || 'Release date not available'}</div>
              </div>
            </div>
          </div>
          <div className='relative'>
            <div className='w-full max-w-screen-md mx-auto bg-gray-900 p-4 mt-7'>
              <div>{movie.overview}</div>
            </div>
          </div>
        </div>
      )}  
    </>
  );
};

export default MovieDetail;