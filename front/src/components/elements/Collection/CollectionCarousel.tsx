import * as React from 'react';
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from 'next/image';
import { useState } from 'react';
import styles from './Carousel.module.css';

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
  youtube_trailer_id: string;
}

interface CarouselProps {
  movies: Movie[];
}

const CollectionCarousel: React.FC<CarouselProps> = ({ movies }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black w-full h-full">
      <div className="w-full max-w-sm h-full overflow: visible">
        <Carousel className="w-full h-full">
          <CarouselContent className="-ml-1">
            {Array.from({ length: movies.length }).map((_, index) => (
              <CarouselItem 
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="m-10 lg:m-0">
                  <Card className="p-0 m-1 border-none">
                    <div className="relative">
                      <Image
                        src={movies[index].poster_path}
                        alt={movies[index].original_title}
                        height={200}
                        width={150}
                        className={`rounded-lg object-cover w-full h-full ${hoveredIndex === index ? styles.hoverEffect : ''}`}
                      />
                      <div className='relative'>
                        <Image
                          src={movies[index].poster_path}
                          alt={movies[index].original_title}
                          height={200}
                          width={150}
                          className={`rounded-lg object-cover w-full h-full rotate-180`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)] via-black to-black"></div>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-gray-700 hover:text-gray-900 transition-colors duration-300" />
          <CarouselNext className="text-gray-700 hover:text-gray-900 transition-colors duration-300" />
        </Carousel>
      </div>
    </div>
  );
};

export default CollectionCarousel;