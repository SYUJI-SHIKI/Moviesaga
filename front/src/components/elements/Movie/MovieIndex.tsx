import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from '@/features/search/search.module.css';

interface Movie {
  id: number;
  tmdb_id?: number;
  poster_path: string;
  original_title: string;
}

interface MovieIndexProps {
  movies: Movie[];
}

const MovieIndex: React.FC<MovieIndexProps> = ({movies}) => {

  
  return (
    <>
      <div className="p-4 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-4 max-sm:gap-1 rounded-3xl bg-opacity-30 backdrop-blur-sm">
        {movies.map((movie) => (
          <div key={movie.id} className="relative m-2 ">
            <Link href={`/movies/${movie.tmdb_id ? movie.tmdb_id : movie.id}`} passHref>
              <div className="">
                <div className="block group cursor-pointer">
                  <div className={`relative overflow-hidden rounded-lg shadow-2xl transform transition duration-300 group-hover:scale-105 ${styles['animate-slide-in']}`}>
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