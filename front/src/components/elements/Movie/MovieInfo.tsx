import Image from "next/image";
import { motion } from "framer-motion";
import FavoriteButton from "@/components/elements/Favorite/FavoriteButton";
import { MovieResponse } from "@/types/movie";
import MovieOverview from "@/components/elements/Movie/MovieOverview";

interface MovieInfoProps {
  movieData: MovieResponse;
  isAuthenticated: boolean;
  handleFavoriteToggle: () => Promise<void>;
  contentVisible: boolean;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movieData, isAuthenticated, handleFavoriteToggle, contentVisible }) => (
  <div className="flex md:flex-row flex-col items-center justify-center">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gray-900 bg-opacity-30 p-6 rounded-lg shadow-xl flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold mb-4">{movieData.movie.original_title}</h1>
      {isAuthenticated && (
        <FavoriteButton 
          isFavorited={movieData.favorited}
          onToggle={handleFavoriteToggle}
        />
      )}
      <p className="text-xl mb-2">
        上映時間: {movieData.movie.runtime ? `${movieData.movie.runtime}分` : "情報なし"}
      </p>
      <p className="text-xl mb-4">
        上映日: {movieData.movie.release_date || "情報なし"}
      </p>
      <div className="mt-4 flex flex-col lg:flex-row items-center justify-center">
        <Image
          src={movieData.movie.poster_path || "/poster_placeholder.png"}
          alt={`${movieData.movie.original_title} poster`}
          width={400}
          height={750}
          className="rounded-lg shadow-md md:m-16"
        />
        <div className="w-full lg:w-1/3">
          <MovieOverview movieData={movieData} contentVisible={contentVisible} />
        </div>
      </div>
    </motion.div>
  </div>
);
export default MovieInfo;