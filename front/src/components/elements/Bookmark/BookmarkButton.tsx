import React, { useState, useEffect } from "react";
import api from "lib/api";

interface BookmarkButtonProps {
  itemId: number;
};

const BookmarkButton: React.FC<BookmarkButtonProps> = ({itemId}) => {
  const [isBookmark, setIsBookmark] = useState(false);

  const handleBookmarkToggle = async () => {
    try {
      const response = await api.post(`/bookmarks`, { collection_id: itemId });
      setIsBookmark(response.data.success)
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  return (
    <button onClick={handleBookmarkToggle} className="bookmark-button">
      {isBookmark ? 'ブックマーク解除' : 'ブックマーク登録'}
    </button>
  );
};

export default BookmarkButton;