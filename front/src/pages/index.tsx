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
import styles from "./Hompage.module.css"

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
        <div className="text-gray-800 flex flex-col h-screen w-full">
          {/* <div className="bg-black h-10"></div> */}
          <div className=" w-full h-2/5  flex flex-col sepia">
            <div className="mt-5 w-full flex justify-end relative">
              <div className="flex absolute top-[150px] lg:top-[-50px] right-[-60px]">
                <ProjectorGif />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="bg-black h-20 text-white flex items-center justify-center">
              <div className="flex flex-col items-center justify-center font-bold text-2xl">MovieSagaでできること</div>
            </div>
            
            {isUserSignedIn ? (
                <>
                <CollectionButton />
                <RandomButton/>
                <SearchButton />
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
        <div className="w-full h-screen bg-yellow-150 sepia flex flex-col">
          <div>aaa
          </div>
        </div>
      </FilmBackground>
    </>
  );
};

export default RootPage;
