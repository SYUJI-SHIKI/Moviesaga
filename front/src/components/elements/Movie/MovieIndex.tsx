import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from '@/features/search/search.module.css';

interface Movie {
  id: number;
  poster_path: string;
  original_title: string;
}

interface MovieIndexProps {
  movies: Movie[];
}

const MovieIndex: React.FC<MovieIndexProps> = ({movies}) => {
  // const cleanedMovies = movies.map(({ id, poster_path, original_title }) => ({
  //   id,
  //   poster_path,
  //   original_title
  // }));
  console.log(`kssssssookokokokokoko, ${JSON.stringify(movies, null, 2)}`)
  console.log(`kssssssookokokokokoko, ${movies}`)
  return (
    <>
      <div className="flex flex-wrap justify-center p-4">
        {movies.map((movie) => (
          <div key={movie.id} className="relative m-2">
            <Link href={`/movies/${movie.id}`} passHref>
              <div className="border-2 border-gray-600/50">
                <div className="block group cursor-pointer">
                  <div className={`relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 group-hover:scale-105 ${styles['animate-slide-in']}`}>
                    <Image
                      src={movie.poster_path}
                      className="w-full h-auto object-cover"
                      width={100}
                      height={150}
                      alt={movie.original_title || `Movie ${movie.id}`}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default MovieIndex;