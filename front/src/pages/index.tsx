import Image from "next/image";
import Link from "next/link";
import React from "react";

const RootPage: React.FC = () => {
  const isUserSignedIn = true;

  return (
    <>
      <div className="bg-gray-950 text-gray-300 flex flex-col justify-center items-center h-full sm:w-full p-0 m-0">
        <div className="mb-10 w-full flex flex-col items-center">
          <div className="m-7 lg:text-8xl sm:text-lg">MovieSaga</div>
          <Image
            src="/top.png"
            width={400}
            height={200}
            className="mt-5"
            alt="Top Image"
          />
          <div className="w-full flex flex-col items-center">
            <div className="m-5">機能の説明</div>
            <div className="flex flex-col items-center">
              <Image
                src="/top_info_1.png"
                width={400}
                height={200}
                className="mb-5"
                alt="Info 1"
              />
              <Image
                src="/top_info_2.png"
                width={400}
                height={200}
                className="m-4"
                alt="Info 2"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            {isUserSignedIn ? (
              <>
                <Link href="/collections">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden 
                                    text-sm font-medium rounded-lg group bg-gradient-to-br
                                    from-teal-100 to-lime-800 group-hover:from-teal-200 group-hover:to-lime-800 
                                    dark:text-white hover:text-gray-900 
                                    focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      特集
                    </span>
                  </button>
                </Link>
                <Link href="/movies/random">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden 
                                    text-sm font-medium rounded-lg group bg-gradient-to-br
                                    from-cyan-600 to-blue-300 group-hover:from-cyan-500 group-hover:to-blue-500
                                    hover:text-gray-900 dark:text-white
                                    focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      ランダム
                    </span>
                  </button>
                </Link>
                <Link href="/search">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden
                                    text-sm font-medium rounded-lg group bg-gradient-to-br
                                    from-purple-500 to-pink-50
                                    group-hover:from-purple-500 group-hover:to-pink-500 hover:text-gray-900 dark:text-white 
                                    focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      検索
                    </span>
                  </button>
                </Link>
              </>
            ) : (
              <Link href="/movies">
                <div className="mx-2" id="before-login-button">
                  ランダム機能を試してみる
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RootPage;
