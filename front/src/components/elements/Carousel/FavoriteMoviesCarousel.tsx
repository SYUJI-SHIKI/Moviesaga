import React, { useEffect, useRef, useState } from 'react';
import ReflectedImage from './ReflectedImage';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  tmdb_id: number,
  original_title: string;
  poster_path: string;
}

interface FavoriteMoviesCarouselProps {
  movies: Movie[];
}

const FavoriteMoviesCarousel: React.FC<FavoriteMoviesCarouselProps> = ({ movies }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [displayMovies, setDisplayMovies] = useState<Movie[]>([]);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });

  useEffect(() => {
    setDisplayMovies([...movies, ...movies]);
  }, [movies]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || displayMovies.length === 0) return;

    const scrollStep = 1;
    const scrollInterval = 30;

    const scroll = () => {
      carousel.scrollLeft += scrollStep;
      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollLeft = 0;
      }
      updateVisibleRange();
    };

    const updateVisibleRange = () => {
      if (!carousel) return;
      const start = Math.floor(carousel.scrollLeft / 300);
      const end = start + Math.ceil(carousel.clientWidth / 200) + 1;
      setVisibleRange({ start, end });
    };

    const intervalId = setInterval(scroll, scrollInterval);
    updateVisibleRange();

    return () => clearInterval(intervalId);
  }, [displayMovies]);

  return (
    <div ref={carouselRef} className="overflow-hidden whitespace-nowrap">
      {displayMovies.map((movie, index) => (
        <div key={`${movie.id}-${index}`} className="inline-block mx-3">
          {index >= visibleRange.start && index <= visibleRange.end ? (
            <Link href={`/movies/${movie.tmdb_id}`}>
              <ReflectedImage
                src={movie.poster_path}
                alt={movie.original_title}
                width={200}
                height={250}
              />
            </Link>
          ) : (
            <div style={{ width: 200, height: 300 }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FavoriteMoviesCarousel;