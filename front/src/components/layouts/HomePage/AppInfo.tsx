import React from "react";
import { BsPatchQuestion } from "react-icons/bs";

const AppInfo: React.FC = () => {
  return (
    <div className="flex-1 mb-5 bg-gray-700 mx-2 p-3 rounded-xl h-full text-sm md:text-xl">
      <div className="mb-2 mx- h-full rounded-lg flex flex-col">
        <div className='flex items-center'>
          <BsPatchQuestion className="lg:h-16 lg:w-24 h-8 w-9" />
          <div className="ml-2">映画を観るときに。。。</div>
        </div>
        <div className="mt-2 ml-2">
          何か映画を観たい気分！でも何を観るか悩む
          観る映画の幅を広げたい！けど
          いつもの映画に落ち着いてしまう
          MovieSagaはそんな悩みを解決する手助けをします
        </div>
      </div>
    </div>
  );
};

export default AppInfo;