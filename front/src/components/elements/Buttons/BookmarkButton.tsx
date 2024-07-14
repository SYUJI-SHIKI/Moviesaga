import React, { useState, useEffect } from "react";
import { TbStar, TbStarFilled  } from "react-icons/tb";

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
};

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isBookmarked, onToggle }) => {
  return (
    <button onClick={onToggle} className="bookmark-button">
    {isBookmarked ? (
      <div className='relative flex items-end active:animate-spin-slow'>
        <TbStarFilled  className='relative size-10 text-yellow-400' />
        <div className=' mt-2'>お気に入り登録を外す</div>
      </div>
    ) : (
      <div className='relative flex items-center active:animate-spin-slow'>
        <TbStar  className='relative size-10 text-yellow-400' />
        <div className=' mt-4'>特集をお気に入り登録する</div>
      </div>
    )}
  </button>
  );
};

export default BookmarkButton;