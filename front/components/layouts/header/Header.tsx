"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="relative z-50">
        <nav className="bg-gray-800 p-4 flex justyify-between items-center">
          <Link href="/">
            <div>
              <Image src="/logo.png" alt="Logo" width={100} height={30} /> {/* ロゴのサイズは適宜調整してね */}
            </div>
          </Link>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <FaTimes size={24}/> : <FaBars size={24} />}
            </button>
          </div>
          <div className={`hidden lg:flex items-center space-x-6 ${styles.dropdown}`}>
            <Link href="/movies/random"><div className="text-white hover:text-gray-300">ランダム</div></Link>
            <Link href="/collections"><div className="text-white hover:text-gray-300">特集</div></Link>
            <Link href="/search"><div className="text-white hover:text-gray-300">検索</div></Link>
            <Link href="/profile"><div className="text-white hover:text-gray-300">マイページ</div></Link>
          </div>
        </nav>
        {isOpen && (
          <div className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-40 ${styles.fullScreenMenu}`}>
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <Link href="/movies/random"><div className="text-white hover:text-gray-300">ランダム</div></Link>
              <Link href="/collections"><div className="text-white hover:text-gray-300">特集</div></Link>
              <Link href="/search"><div className="text-white hover:text-gray-300">検索</div></Link>
              <Link href="/profile"><div className="text-white hover:text-gray-300">マイページ</div></Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
export default Header;