import React, { useState, useEffect } from "react";
import api from "lib/api";

interface BookmarkButtonProps {
  collectionId: number;
};

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ collectionId }) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ロルストレージから userId を取得
  const userId = localStorage.getItem('uuid');

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const response = await api.get(`bookmarks?collection_id=${collectionId}&user_id=${userId}`);
        setIsBookmark(response.data.isBookmark);
      } catch (error) {
        setError('Error fetching Bookmark status');
        console.error('Error fetching Bookmark status:', error);
      }
    };

    if (userId) {
      fetchBookmarkStatus();
    } else {
      setError('User ID not found');
    }
  }, [collectionId, userId]);

  const handleBookmarkToggle = async () => {
    const optimisticBookmarkStatus = !isBookmark;
    setIsBookmark(optimisticBookmarkStatus);

    try {
      if (optimisticBookmarkStatus) {
        await api.post('bookmarks', { collection_id: collectionId, user_id: userId });
      } else {
        await api.delete(`bookmarks?collection_id=${collectionId}&user_id=${userId}`);
      }
    } catch (error) {
      setIsBookmark(!optimisticBookmarkStatus);
      setError('Error toggling Bookmark');
      console.error('Error toggling Bookmark:', error);
    }
  };

  return (
    <div>
      <button onClick={handleBookmarkToggle} className="bookmark-button">
        {isBookmark ? 'お気に入り解除' : 'お気に入り登録'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default BookmarkButton;