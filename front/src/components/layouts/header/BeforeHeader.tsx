"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";
import { GiFilmProjector } from "react-icons/gi";
import styles from "./Header.module.css";

const BeforeHeader: React.FC = () => {
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
    <header className="fixed top-0 left-0 z-40 p-0 m-0 bg-transparent">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <div>
            <Image src="/logo.png" alt="Logo" width={100} height={30} />{" "}
          </div>
        </Link>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <GiFilmProjector size={24} />}
          </button>
        </div>
        <button
          onClick={toggleNav}
          className="hidden lg:block fixed right-4 text-white focus:outline-none z-50"
        >
          {isNavOpen ? <FaTimes size={24} /> : <GiFilmProjector size={24} />}
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
              <Link href="/auth/login/LogInPage">
                <div className="text-white hover:text-gray-300 mb-2">
                  ログイン
                </div>
              </Link>
              <Link href="/auth/signup/SignUpPage">
                <div className="text-white hover:text-gray-300 mb-2">
                  サインアップ
                </div>
              </Link>
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
            <Link href="/auth/login/LogInPage">
              <div className="text-white hover:text-gray-300 mb-2">
                ログイン
              </div>
            </Link>
            <Link href="/auth/signup/SignUpPage">
              <div className="text-white hover:text-gray-300 mb-2">
                サインアップ
              </div>
            </Link>
          </div>
        </>
      )}
    </header>
  )
}

export default BeforeHeader;