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
        <div className="text-white hover:text-gray-300 mb-2">
          ホーム
        </div>
      </Link> 
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
      <Link href="/collections/createCollection">
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
        <div className="text-white hover:text-gray-300 mb-5">
          映画検索
        </div>
      </Link>
      <LogOutButton />
    </div>
  )
}

export default AfterLoginNav;