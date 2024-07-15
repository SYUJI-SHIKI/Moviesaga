import React from "react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import LogOutButton from "@/features/auth/LogOutButton";

const AfterLoginNav: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="space-y-6 mt-14 text-2xl ">
      <button
        onClick={onClose}
        className="text-white absolute top-4 right-4 focus:outline-none">
        <FaTimes size={24} />
      </button>
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
      <Link href="/collections">
        <div className="text-gray-200 hover:text-opacity-100 text-opacity-80 mb-5">
          特集一覧
        </div>
      </Link>
      <Link href="/collections/createCollection">
        <div className="text-gray-200 hover:text-opacity-100 text-opacity-80 mb-5">
          特集作成
        </div>
      </Link>
      <Link href="/profile">
        <div className="text-gray-200 hover:text-opacity-100 text-opacity-80 mb-5">
          マイページ
        </div>
      </Link>
      <Link href="/search">
        <div className="text-gray-200 hover:text-opacity-100 text-opacity-80 mb-5">
          映画検索
        </div>
      </Link>
      <LogOutButton />
    </div>
  )
}

export default AfterLoginNav;