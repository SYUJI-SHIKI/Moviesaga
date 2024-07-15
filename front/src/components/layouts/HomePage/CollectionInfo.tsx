import React from 'react';
import { BsCollectionPlay } from "react-icons/bs";

const CollectionInfo: React.FC  = () => {
  return (
    <div className="flex-1 mb-5 bg-gray-700 mx-2 p-3 rounded-xl h-full text-sm md:text-xl">
      <div className="mb-2 mx- h-full rounded-lg flex flex-col">
        <div className='flex items-center'>
          <BsCollectionPlay className="lg:h-14 lg:w-22 h-8 w-7" />
          <div className='ml-2'>特集機能</div>
        </div>
        <div className="mt-2">
          あなたの好みを多くの人に知ってもらおう！
          いいね！した映画の中から自分オリジナルの特集を組めます！
          あなたの好きな映画が誰かの好きな映画になるかも。。
        </div>
        <div　className='md:text-base'>
          <br />
          ＊詳細ページに行くと音が流れる仕様になっているので
          注意してお使いください
        </div>
      </div>
    </div>
  );
};

export default CollectionInfo;