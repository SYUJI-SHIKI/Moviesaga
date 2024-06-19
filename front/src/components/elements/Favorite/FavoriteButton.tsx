import React, { useState } from 'react';
import api from 'lib/api';

interface FavoriteButtonProps {
  itemId: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ itemId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = async () => {
    try {
      const response = await api.post(`favorites`, { movie_id: itemId });
      setIsFavorite(response.data.success);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <button onClick={handleFavoriteToggle} className="favorite-button">
      {isFavorite ? 'いいね解除' : 'いいね登録'}
    </button>
  );
};

export default FavoriteButton;