import Image from "next/image";
import { Movie } from "@/types/movie";
import React from "react";
import { motion } from "framer-motion";

interface TrailerProps {
  movieData: {
    movie: Movie;
  };
}

const Trailer: React.FC<TrailerProps> = ({ movieData }) => (
  <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="w-full aspect-video relative rounded-lg overflow-hidden shadow-2xl"
  >
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
          height={400}
          width={300}
          className="md:size-2/3"
        />
      </div>
    )}
  </motion.div>
);

export default Trailer;