import React from "react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProjectorGif from "@/components/layouts/HomePage/ProjectorGif";
import CollectionButton from "@/components/elements/Buttons/CollectionButton";
import RandomButton from "@/components/elements/Buttons/RandomButton";
import SearchButton from "@/components/elements/Buttons/SearchButton";
import AppInfo from "@/components/layouts/HomePage/AppInfo";
import CollectionInfo from "@/components/layouts/HomePage/CollectionInfo";
import RandomInfo from "@/components/layouts/HomePage/RandomInfo";
import styles from "@/components/layouts/HomePage/HomePage.module.css";
import { CustomNextPage } from "@/types/next-page";
import FilmBackground from "@/components/layouts/HomePage/FilmBackground";


const RootPage: CustomNextPage= () => {
  const [isUserSignedIn, setIsUserSignedIn ]= useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    console.log('Access Token:', token);
    setIsUserSignedIn(!!token);
  }, [router]);

  return (
    <FilmBackground length={33}>
      <div className="text-amber-50 flex flex-col w-full max-sm:bg-black max-sm:items-center">
        <div className=" w-full md:h-2/5 h-1/4  flex flex-col sepia md:items-center">
          <div className="lg:backdrop-blur-3xl md:px-10 py-7 opacity-80 bg-black rounded-3xl z-30 mt-20 flex flex-col items-center justify-center">
            <div className="lg:m-7 m-2  lg:17 opacity-90  md:text-9xl text-5xl font-Anton">MovieSaga</div>
            <div className="lg:text-4xl">人生の１本の映画をさがす旅へ</div>
          </div>
          <div className="mt-5 w-full flex justify-end relative max-sm:hidden">
            <div className="flex absolute top-[30px] md:top-[-50px] right-[-60px]">
              <ProjectorGif />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="bg-black h-14 md:h-20 text-white flex items-center justify-center top-0 max-sm:mt-20 mt-60">
            <div className="flex flex-col items-center justify-center font-bold text-2xl z-20">
              MovieSagaでできること
            </div>
          </div>
        </div>
        <div className="flex flex-col md:justify-center md:items-center max-sm:mb-52 mt-8 md:mx-3">
          <div className="w-full  md:w-3/4 lg:w-full h-[400px] md:h-[400px] rounded-xl shadow-lg ">
            <div className="flex flex-col md:flex-row h-full">
              <AppInfo />
              <RandomInfo />
              <CollectionInfo />
            </div>
          </div>
        </div>
          <div className="bg-black h-14 z-10 md:h-20 w-full lg:mt-6 mt-48 text-white font-bold text-2xl flex justify-center items-center">
              MovieSagaを使う
          </div>
        <div className={` md:h-52 h-36 flex flex-col justify-start ${styles["bg-homepage-end"]}`}>
          <div className="flex flex-row justify-center mt-14 flex-nowrap z-30">
            {isUserSignedIn ? (
              <>
                <div className="mt-5 mx-1 md:mx-7  flex-shrink-0"><SearchButton /></div>
                <div className="mt-5 mx-1 md:mx-7  flex-shrink-0"><RandomButton/></div>
                <div className="mt-5 mx-1 md:mx-7  flex-shrink-0"><CollectionButton /></div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <div className="md:mt-2 mx-1 md:mx-7  flex-shrink-0"><RandomButton/></div>
                <div className="mt-2" id="before-login-button">
                  ランダム機能を試してみる
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex text-white w-full bg-gray-950 md:min-h-36 min-h-52 max-sm:mb-10 px-4 justify-center text-center">
        <div className="mt-10">
        This [website, program, service, application, product] uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
        </div>
      </div>
    </FilmBackground>
  );
};

RootPage.noFilmBackground = true;

export default RootPage;
