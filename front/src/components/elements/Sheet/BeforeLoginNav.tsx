import Link from "next/link";
import React from "react";
import { FaTimes } from "react-icons/fa";

const BeforeLoginNav: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="z-40 text-2xl">
      <button
        onClick={onClose}
        className="text-white absolute top-4 right-4 focus:outline-none">
        <FaTimes size={24} />
      </button>
      <div className="lg:mt-10 ml-3 font-extrabold">
        <Link href="/">
          <div className="text-gray-200 hover:text-opacity-100 text-opacity-80 mb-5">
            ホーム
          </div>
        </Link> 
        <Link href="/movies/random">
          <div className="text-gray-200 hover:text-opacity-100 text-opacity-80 mb-5">
            ランダム機能
          </div>
        </Link>
        <Link href="/auth/login">
          <div className="text-gray-200 hover:text-opacity-100 text-opacity-80 mb-5">
            ログイン
          </div>
        </Link>
        <Link href="/auth/signup">
          <div className="text-gray-200 hover:text-opacity-100 text-opacity-80 mb-2">
            サインアップ
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BeforeLoginNav;