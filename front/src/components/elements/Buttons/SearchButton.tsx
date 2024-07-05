import React from 'react';
import Button from './Button';

const SearchButton = () => (
  <Button href="/search" className="bg-gradient-to-br from-purple-500 to-pink-50 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-gray-900 dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
    検索
  </Button>
);

export default SearchButton;