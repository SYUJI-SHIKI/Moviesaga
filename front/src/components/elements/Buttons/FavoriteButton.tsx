import React from 'react';
import { IoHeartCircle, IoHeartCircleOutline } from "react-icons/io5";

interface FavoriteButtonProps {
  isFavorited: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorited, onToggle }) => {
  return (
    <button onClick={onToggle} className="favorite-button rounded-xl bg-indigo-800 py-1 px-3 max-sm:w-52">
      {isFavorited ? (
        <div className='relative flex items-center active:animate-spin-slow'>
          <IoHeartCircleOutline className='relative size-10 text-red-800' />
          <div className='ml-2 w-28'>「いいね」を外す</div>
        </div>
      ) : (
        <div className='relative flex items-center active:animate-spin-slow'>
          <IoHeartCircle className='relative size-10 text-red-800' />
          <div className='ml-2 w-28'>「いいね」する</div>
        </div>
      )}
    </button>
  );
};

export default FavoriteButton;