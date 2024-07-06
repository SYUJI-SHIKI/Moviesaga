import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FilmBackground from "@/components/layouts/HomePage/FilmBackground";
import ProjectorGif from "@/components/layouts/HomePage/ProjectorGif";
import CollectionButton from "@/components/elements/Buttons/Collection";
import RandomButton from "@/components/elements/Buttons/RandomButton";
import SearchButton from "@/components/elements/Buttons/SearchButton";
import { BsCollectionPlay } from "react-icons/bs";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { TbDeviceIpadHorizontalSearch } from "react-icons/tb";
import styles from "@/components/layouts/HomePage/HomePage.module.css";


const RootPage: React.FC = () => {
  const [isUserSignedIn, setIsUserSignedIn ]= useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    console.log('Access Token:', token);
    setIsUserSignedIn(!!token);
  }, [router]);

  return (
    <>
      <FilmBackground >
        <div className="text-amber-50 flex flex-col w-full">
          {/* <div className="bg-black h-10"></div> */}
          <div className=" w-full md:h-2/5 h-1/4  flex flex-col sepia">
            <div className="mt-5 w-full flex justify-end relative">
              <div className="flex absolute top-[30px] md:top-[-50px] right-[-60px]">
                <ProjectorGif />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="bg-black h-14 md:h-20 text-white flex items-center justify-center top-0 mt-60">
              <div className="flex flex-col items-center justify-center font-bold text-2xl z-20">
                MovieSagaでできること
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-8 md:mx-3">
            <div className="w-2/3 md:w-3/4 lg:w-full h-[400px] md:h-[400px] rounded-xl shadow-lg ">
              <div className="flex flex-col md:flex-row h-full">
                <div className="flex-1 mb-5 bg-gray-700 mx-2 p-3 rounded-xl h-full">
                  <div className="mb-2 mx-5 h-full rounded-lg">
                    <TbDeviceIpadHorizontalSearch className="h-16 w-24" />
                  </div>
                </div>
                <div className="flex-1 mb-5 bg-gray-700 mx-2 p-3 rounded-xl h-full">
                  <div className="mb-2 mx-5 h-full rounded-lg">
                    <GiPerspectiveDiceSixFacesRandom className="h-16 w-24" />
                  </div>
                </div>
                <div className="flex-1 mb-5 bg-gray-700 mx-2 p-3 rounded-xl h-full">
                  <div className="mb-2 mx-5 h-full rounded-lg">
                  <BsCollectionPlay className="h-16 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>
              <div className="bg-black h-14 z-10 md:h-20 w-full mt-6 text-white font-bold text-2xl flex justify-center items-center">
                  MovieSagaを使う
              </div>
          <div className={`flex-grow h-52 flex flex-col justify-start ${styles["bg-homepage-end"]}`}>
            <div className="flex flex-row justify-center mt-14 flex-nowrap z-30">
              {isUserSignedIn ? (
                <>
                  <div className="mt-5 mx-1 md:mx-7  flex-shrink-0"><SearchButton /></div>
                  <div className="mt-5 mx-1 md:mx-7  flex-shrink-0"><RandomButton/></div>
                  <div className="mt-5 mx-1 md:mx-7  flex-shrink-0"><CollectionButton /></div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="mt-5 mx-1 md:mx-7  flex-shrink-0"><RandomButton/></div>
                  <div className="mt-2" id="before-login-button">
                    ランダム機能を試してみる
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </FilmBackground>
      <div className="flex text-white bg-gray-950 md:min-h-36 min-h-52 px-4 justify-center text-center">
        <div className="mt-10">
        "This [website, program, service, application, product] uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB."
        </div>
      </div>
    </>
  );
};

export default RootPage;
