import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from 'next/image';

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
  youtube_trailer_id: string;
}

interface CarouselProps {
  movies: Movie[];
  currentIndex: number;
  onSelectMovie: (index: number) => void;
}

const CollectionCarousel: React.FC<CarouselProps> = ({ movies, currentIndex, onSelectMovie }) => {
  return (
    <Carousel className="w-11/12">
      <CarouselContent>
        {movies.map((movie, index) => (
          <CarouselItem key={movie.id} className="basis-1/4 max-sm:basis-1/3">
            <div
              className={`cursor-pointer transition-all duration-300 ${
                index === currentIndex ? 'scale-110' : 'opacity-50 hover:opacity-100'
              }`}
              onClick={() => onSelectMovie(index)}
            >
              <Image
                src={movie.poster_path}
                alt={movie.original_title}
                width={200}
                height={200}
                className="rounded-2xl object-cover p-2"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CollectionCarousel;