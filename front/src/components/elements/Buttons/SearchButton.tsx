import React from 'react';
import Button from './Button';

const SearchButton = () => (
  <Button href="/search" 
    className="bg-gradient-to-br from-purple-500 to-pink-50
  group-hover:from-purple-500 group-hover:to-pink-500 hover:text-gray-900
  dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200
  dark:focus:ring-purple-800 duration-500">
    <div className='md:px-10 md:py-3'>
      検索
    </div>
  </Button>
);

export default SearchButton;