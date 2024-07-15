import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FilmBackground from '@/components/layouts/HomePage/FilmBackground';

const LoadingGif = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const text = "Loading...";

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, 200);

    return () => clearInterval(interval);
  }, [text.length]);

  const getColor = (index: number) => {
    const distance = Math.min(
      Math.abs(index - activeIndex),
      Math.abs(index - activeIndex + text.length),
      Math.abs(index - activeIndex - text.length)
    );
    const opacity = Math.max(0, 1 - distance * 0.5);
    return `rgba(255, 255, 255, ${opacity})`;
  };

  return (
    <FilmBackground length={15}>
      <div className="w-full min-h-screen bg-black z-50 text-white flex flex-col justify-center items-center">
        <Image 
          src="/loadingGif.gif"
          alt="Loading"
          width={300}
          height={400}
          className="w-1/15  pb-16"
        />
        <div className='mt-3 text-7xl font-Anton'>
          {text.split('').map((char, index) => (
            <span 
              key={index} 
              className="transition-colors duration-220"
              style={{ color: getColor(index) }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </FilmBackground>
  );
};

export default LoadingGif;