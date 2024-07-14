import Image from "next/image";
import { Movie } from "@/types/movie";
import React, { useState } from "react";
import { motion } from "framer-motion";
import YouTube from 'react-youtube';

interface TrailerProps {
  movieData: {
    movie: Movie;
  };
}

const Trailer: React.FC<TrailerProps> = ({ movieData }) => {
  const [isReady, setIsReady] = useState(false);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      rel: 0,
      modestbranding: 1,
      showinfo: 0,
      playlist: movieData.movie.youtube_trailer_id,
    },
  };

  const onReady = (event: string) => {
    setIsReady(true);
    // 必要に応じて追加の初期化を行うことができます
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full aspect-video relative rounded-lg overflow-hidden shadow-2xl"
    >
      {movieData.movie.youtube_trailer_id ? (
        <YouTube
          videoId={movieData.movie.youtube_trailer_id}
          opts={opts}
          onReady={onReady}
          className={`absolute top-0 left-0 w-full h-full ${isReady ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : (
        <div className="flex flex-col mt-20 items-center">
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
};

export default Trailer;