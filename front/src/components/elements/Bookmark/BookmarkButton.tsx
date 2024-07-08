import React, { useState, useEffect } from "react";
import api from "lib/api";

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
};

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isBookmarked, onToggle }) => {
  return (
    <div>
      <button onClick={onToggle} className="bookmark-button">
        {isBookmarked ? 'お気に入り解除' : 'お気に入り登録'}
      </button>
    </div>
  );
};

export default BookmarkButton;