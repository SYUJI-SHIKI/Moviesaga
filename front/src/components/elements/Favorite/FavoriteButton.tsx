import React, { useState, useEffect } from 'react';
import api from 'lib/api';

interface FavoriteButtonProps {
  movieId: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ロルストレージから userId を取得
  const userId = localStorage.getItem('uid');

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await api.get(`favorites?movie_id=${movieId}&user_id=${userId}`);
        setIsFavorite(response.data.isFavorite);
      } catch (error) {
        setError('Error fetching favorite status');
        console.error('Error fetching favorite status:', error);
      }
    };

    if (userId) {
      fetchFavoriteStatus();
    } else {
      setError('User ID not found');
    }
  }, [movieId, userId]);

  const handleFavoriteToggle = async () => {
    const optimisticFavoriteStatus = !isFavorite;
    setIsFavorite(optimisticFavoriteStatus);

    try {
      if (optimisticFavoriteStatus) {
        await api.post('favorites', { movie_id: movieId, user_id: userId });
      } else {
        await api.delete(`favorites?movie_id=${movieId}&user_id=${userId}`);
      }
    } catch (error) {
      setIsFavorite(!optimisticFavoriteStatus);
      setError('Error toggling favorite');
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFavoriteToggle} className="favorite-button">
        {isFavorite ? 'いいね解除' : 'いいね登録'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default FavoriteButton;