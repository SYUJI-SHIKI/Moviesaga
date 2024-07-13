import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CustomNextPage } from "@/types/next-page";
import { useAuth } from "@/hooks/useAuth";
import { useMovieData } from "@/hooks/useMovieData";
import { motion } from "framer-motion";
import Trailer from "@/components/elements/Movie/MovieTrailer";
import MovieInfo from "@/components/elements/Movie/MovieInfo";
import Link from "next/link";
import api from "lib/api";

const MovieDetail: CustomNextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const movieId = Array.isArray(id) ? id[0] : id;
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { movieData, loading, error, handleFavoriteToggle } = useMovieData(movieId);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false)
  const [postError, setPostError] = useState(false)

  useEffect(() => {
    setPostError(false);
    if (movieData?.movie.poster_path) {
      const img = new window.Image();
      img.src = movieData.movie.poster_path;
      img.onload = () => {
        setBgLoaded(true);
      };
      img.onerror = () => {
        setPostError(true);
      };
    } else {
      console.log("No poster path found");
      setPostError(true);
    }
  }, [movieData]);

  useEffect(() => {
    if (bgLoaded) {
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 1200);
  
      return () => clearTimeout(timer);
    }
  }, [bgLoaded]);

  if (loading || authLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movieData) return <div>Movie not found</div>;
  if (postError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-2 text-white">
        <p>
          絞り込み条件にあう映画がないか
        </p>
        <p>
          詳細情報が不十分な映画が選ばれた可能性があります
        </p>
        <p>
          再度試してみてください
        </p>
        <div className="mt-7 text-xl">
          <Link href="/movies/random">
            ＜＜ランダム機能に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-300 bg-cover bg-center overflow-hidden"
      style={{backgroundImage: `url(${movieData.movie.poster_path})` }}>
      <div className="absolute inset-0  bg-opacity-70 backdrop-blur-sm z-0"></div>
      {!bgLoaded ? (
        <div>Loading</div>
      ) : (
        <>
          <motion.div
            className="relative md:flex md:items-center md:justify-center z-10 md:mx-auto mt-16 md:px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: contentVisible ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="lg:w-4/5 w-full">
                <Trailer movieData={movieData} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="lg:w-4/5 w-full max-sm:mb-12">
                  <MovieInfo 
                    movieData={movieData} 
                    isAuthenticated={isAuthenticated}
                    handleFavoriteToggle={handleFavoriteToggle}
                    contentVisible={contentVisible}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

MovieDetail.animationType = 'fadeIn';
MovieDetail.noFilmBackground = true;

export default MovieDetail;