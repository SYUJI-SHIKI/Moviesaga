"use client";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiFilmProjector } from "react-icons/gi";
import styles from "./Header.module.css";
import logOut from "@/auth/logOut";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(`access-token`);
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsLoggedIn(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <header className="relative z-40 p-0 m-0">
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <Link href="/">
            <div>
              <Image src="/logo.png" alt="Logo" width={100} height={30} />{" "}
              {/* ロゴのサイズは適宜調整してね */}
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
          <div
            className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-40 ${styles.fullScreenMenu}`}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <button
                onClick={toggleMenu}
                className="text-white absolute top-4 right-4 focus:outline-none"
              >
                <FaTimes size={24} />
              </button>
              {isLoggedIn ? (
                <>
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
                  <Link href="/search/searchPage">
                    <div className="text-white hover:text-gray-300 mb-2">
                      映画検索
                    </div>
                  </Link>
                  <Link href="/">
                    <div
                      className="text-red-400 hover:text-gray-300 mb-2 "
                      onClick={handleLogout}
                    >
                      ログアウト
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/movies/random">
                    <div className="text-white hover:text-gray-300 mb-2">
                      ランダム機能
                    </div>
                  </Link>
                  <Link href="/auth/LogInPage">
                    <div className="text-white hover:text-gray-300 mb-2">
                      ログイン
                    </div>
                  </Link>
                  <Link href="/auth/SignUp">
                    <div className="text-white hover:text-gray-300 mb-2">
                      サインアップ
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
        {isNavOpen && (
          <div className="fixed top-0 right-0 h-full w-40 bg-gray-500 z-40 flex flex-col items-center justify-center">
            {isLoggedIn ? (
              <>
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
                <Link href="/search/searchPage">
                  <div className="text-white hover:text-gray-300 mb-2">
                    映画検索
                  </div>
                </Link>
                <Link href="/profile">
                  <div className="text-white hover:text-gray-300 mb-2">
                    マイページ
                  </div>
                </Link>
                <Link href="/">
                  <div
                    className="text-red-400 hover:text-gray-300 mb-2"
                    onClick={handleLogout}
                  >
                    ログアウト
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link href="/movies/random">
                  <div className="text-white hover:text-gray-300 mb-2">
                    ランダム機能
                  </div>
                </Link>
                <Link href="/auth/LogInPage">
                  <div className="text-white hover:text-gray-300 mb-2">
                    ログイン
                  </div>
                </Link>
                <Link href="/auth/SignUp">
                  <div className="text-white hover:text-gray-300 mb-2">
                    サインアップ
                  </div>
                </Link>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
