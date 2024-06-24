"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiFilmProjector } from "react-icons/gi";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import LogOutButton from "@/features/auth/LogOutButton";

const AfterHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
      setIsNavOpen(false);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
    }, [router.events]
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-40 p-0 m-0 bg-transparent">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <div className="m-5">
              <Image src="/logo.png" alt="Logo" width={120} height={50} />{" "}
              {/* ロゴのサイズは適宜調整してね */}
            </div>
          </Link>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className=" fixed right-4 top-5 text-white focus:outline-none z-50">
              {isOpen ? <FaTimes size={35} /> : <GiFilmProjector size={35} />}
            </button>
          </div>
          <button
            onClick={toggleNav}
            className="hidden lg:block fixed right-4 top-5 text-white focus:outline-none z-50">
            {isNavOpen ? <FaTimes size={24} /> : <GiFilmProjector size={40} />}
          </button>
        </nav>
        {isOpen && (
          <>
            <div className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-40 ${styles.fullScreenMenu}`}>
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                <button
                  onClick={toggleMenu}
                  className="text-white absolute top-4 right-4 focus:outline-none">
                  <FaTimes size={24} />
                </button>
                <Link href="/movies/random">
                <div className="text-white hover:text-gray-300 mb-2">
                  ランダム機能
                </div>
                </Link>
                <Link href="/collections">
                  <div className="text-white hover:text-gray-300 mb-2">
                    特集一覧
                  </div>
                </Link>
                <Link href="/collections/create">
                  <div className="text-white hover:text-gray-300 mb-2">
                    特集作成
                  </div>
                </Link>
                <Link href="/profile">
                  <div className="text-white hover:text-gray-300 mb-2">
                    マイページ
                  </div>
                </Link>
                <Link href="/search">
                  <div className="text-white hover:text-gray-300 mb-2">
                    映画検索
                  </div>
                </Link>
                <LogOutButton />
              </div>
            </div>
          </>
        )}
        {isNavOpen && (
          <>
            <div className="fixed top-0 right-0 h-full w-40 bg-gray-500 z-40 flex flex-col items-center justify-center">
              <Link href="/movies/random">
                <div className="text-white hover:text-gray-300 mb-2">
                  ランダム機能
                </div>
              </Link>
              <Link href="/collections">
                <div className="text-white hover:text-gray-300 mb-2">
                  特集一覧
                </div>
              </Link>
              <Link href="/collections/create">
                <div className="text-white hover:text-gray-300 mb-2">
                  特集作成
                </div>
              </Link>
              <Link href="/profile">
                <div className="text-white hover:text-gray-300 mb-2">
                  マイページ
                </div>
              </Link>
              <Link href="/search">
                <div className="text-white hover:text-gray-300 mb-2">
                  映画検索
                </div>
              </Link>
              <LogOutButton />
            </div>
          </>      
        )}
      </header>
    </>
  )
}

export default AfterHeader;