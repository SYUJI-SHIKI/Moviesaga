import React from 'react';

interface FavoriteButtonProps {
  isFavorited: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorited, onToggle }) => {
  return (
    <button onClick={onToggle} className="favorite-button">
      {isFavorited ? 'いいね解除' : 'いいね登録'}
    </button>
  );
};

export default FavoriteButton;