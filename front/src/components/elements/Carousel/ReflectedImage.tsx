import React from "react";
import Image from "next/image";

interface ReflectedImageProp {
  src: string,
  alt: string,
  width: number,
  height: number,
}

const ReflectedImage: React.FC<ReflectedImageProp> = ({ src, alt, width, height }) => {
  return (
    <div className="relative">
      <Image 
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="rounded-lg object-cover"
      />
      <div className="relative mt-1">
        <Image 
          src={src}
          alt={`Reflection of ${alt}`}
          width={width / 2}
          height={height}
          loading="lazy"
          className="rounded-lg object-cover w-full scale-y-[-1] opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      </div>
    </div>
  );
};

export default ReflectedImage;