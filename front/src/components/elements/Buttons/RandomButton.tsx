import React from 'react';
import Button from './Button';

const RandomButton = () => (
  <Button href="/movies/random"
    className="bg-gradient-to-br from-cyan-600 to-blue-300 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-gray-900 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
      <div className='md:px-10 md:py-3 '>
        ランダム
      </div>
  </Button>
);

export default RandomButton;