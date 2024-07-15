import React from "react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

const RandomInfo: React.FC = () => {
  return (
    <div className="flex-1 mb-5 bg-gray-700 mx-2 p-3 rounded-xl h-full text-sm md:text-xl">
      <div className="mb-2 mx- h-full rounded-lg flex flex-col">
        <div className="flex items-center">
          <GiPerspectiveDiceSixFacesRandom className="lg:h-16 lg:w-24 h-8 w-12" />
          <div>ランダム機能</div>
        </div>
        <div className="mt-2 ml-2">
          気分や時間・邦画か洋画か
          好みの条件に合わせてランダムで 映画を提供します。
          忘れられない1本がここで見つかるかも!!
        </div>
        <div className="md:text-base">
          <br />
          ＊使用上、映画内容と違う予告が流れてしまうことがあるのでご容赦ください。
          お問い合わせ頂ければ適宜その映画に合った予告に差し替えさせて頂きます。
        </div>
      </div>
    </div>
  );
};

export default RandomInfo;
