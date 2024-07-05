import React from 'react';
import Button from './Button';

const CollectionButton = () => (
  <Button href="/collections" className="bg-gradient-to-br from-teal-100 to-lime-800 group-hover:from-teal-200 group-hover:to-lime-800 dark:text-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
    特集
  </Button>
);

export default CollectionButton;