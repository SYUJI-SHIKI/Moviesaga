import React from 'react';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

const RandomInfo: React.FC = () => {
  return (
    <div className="flex-1 mb-5 bg-gray-700 mx-2 lg:p-3 p-2 rounded-xl h-full">
      <div className="mb-2 h-full rounded-lg">
        <div className='flex items-center'>
          <GiPerspectiveDiceSixFacesRandom className="lg:h-16 lg:w-24 h-8 w-12" />
          <div>ランダム機能</div>
        </div>
        <div className="mt-2 ml-2">
          気分や時間・邦画か洋画か
          好みの条件に合わせてランダムで
          映画を提供します。
          忘れられない1本がここで見つかるかも!!
        </div>
      </div>
    </div>
  );
};

export default RandomInfo;