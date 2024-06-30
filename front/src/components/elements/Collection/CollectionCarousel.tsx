import * as React from 'react';
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from 'next/image';
import styles from './Carousel.module.css'; // 反射効果用のCSSクラスを追加するためにCSSファイルをインポート

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
}

interface CarouselProps {
  movies: Movie[];
}

const CollectionCarousel: React.FC<CarouselProps> = ({ movies }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-sm">
        <Carousel className="w-full max-w-sm">
          <CarouselContent className="-ml-1">
            {Array.from({ length: movies.length }).map((_, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/2">
                <div className="">
                  <Card className="p-0 m-0 border-none"> {/* 余分なパディングやマージンを削除 */}
                    <div className={styles.imageContainer}> {/* 反射効果用のスタイルを適用 */}
                      <Image
                        src={movies[index].poster_path}
                        alt={movies[index].original_title}
                        height={200}
                        width={150}
                        className="rounded-lg object-cover w-full h-full"
                      />
                      <div className={styles.imageReflection}></div> {/* 反射効果を追加 */}
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