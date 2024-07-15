import React, { useEffect, useState } from "react";
import Image from "next/image";
import FilmBackground from "@/components/layouts/HomePage/FilmBackground";

const Loading = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % "Loading...".length);
    }, 200);

    return () => clearInterval(interval);
  }, ["Loading...".length]);

  const getColor = (index: number) => {
    const distance = Math.min(
      Math.abs(index - activeIndex),
      Math.abs(index - activeIndex + "Loading...".length),
      Math.abs(index - activeIndex - "Loading...".length)
    );
    const opacity = Math.max(0, 1 - distance * 0.5);
    return `rgba(255, 255, 255, ${opacity})`;
  };

  return (
    <FilmBackground length={15}>
      <div className="w-full min-h-screen bg-black z-50 text-white flex flex-col justify-center items-center">
        <div className="mt-3 text-7xl font-Anton">
          {"Loading...".split("").map((char, index) => (
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

export default Loading;
