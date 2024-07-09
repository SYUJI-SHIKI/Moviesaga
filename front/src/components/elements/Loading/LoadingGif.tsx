import React from 'react';
import Image from 'next/image';

const LoadingGif = () => {
  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center">
      <Image src="/loadingGif.gif" alt="Loading" className="w-1/15" />
    </div>
  );
};

export default LoadingGif;