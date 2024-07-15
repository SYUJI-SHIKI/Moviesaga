import React from 'react';
import Button from './Button';

const CollectionButton = () => (
  <Button href="/collections" 
    className="bg-gradient-to-br from-teal-100 to-lime-800 group-hover:from-teal-200 
    group-hover:to-lime-800 dark:text-white hover:text-gray-900
    focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800
    duration-500">
    <div className='md:px-10 md:py-3'> 
      特集
    </div>  
  </Button>
);

export default CollectionButton;