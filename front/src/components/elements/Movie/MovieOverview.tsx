import { motion } from "framer-motion";
import { Movie } from "@/types/movie";

interface MovieOverviewProps {
  movieData: {
    movie: Movie;
  };
  contentVisible: boolean;
}

const MovieOverview: React.FC<MovieOverviewProps> = ({ movieData, contentVisible }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="mt-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-6 rounded-lg shadow-xl"
  > 
    <h2 className="text-2xl font-semibold mb-4">概要</h2>
    <p className="text-lg leading-relaxed">{movieData.movie.overview}</p>
  </motion.div>
);

export default MovieOverview;