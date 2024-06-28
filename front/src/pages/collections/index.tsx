import React, { useEffect, useState } from 'react';
import api from 'lib/api';
import CollectionCard from '@/components/elements/Collection/CollectionCard';

interface Collection {
  id: number;
  title: string;
  description: string;
  Image: string;
}

const CollectionsIndex: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    api.get('/collections')
      .then(response => {
        setCollections(response.data as Collection[]);
      })
      .catch(error => {
        console.error("There was an error fetching the collections!", error);
      });
  }, []);

  return (
    <>
      {collections.length > 0 && (
        <div className="container bg-gray-950 mx-auto p-4 mb-10">
          <div className="flex items-center justify-center">
            <div className="text-3xl text-white font-bold mb-4 mt-4">Collections</div>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {collections.map(collection => (
              <CollectionCard
                id = {collection.id}
                key={collection.id}
                title={collection.title}
                description={collection.description}
                imageUrl={`${collection.Image}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionsIndex;