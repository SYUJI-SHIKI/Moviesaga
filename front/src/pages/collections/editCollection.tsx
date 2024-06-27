import React, { useEffect, useState } from 'react';
import { fetchCollection, updateCollection } from 'lib/CollectionApi';
import CollectionForm from '@/components/elements/Collection/CollectionForm';

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
}

interface CollectionData {
  collection: {
    id: number;
    title: string;
    description: string;
  };
  movies: Movie[];
  addMovies: Movie[];
}

const CollectionEdit: React.FC<{ id: number }> = ({ id }) => {
  const [collectionData, setCollectionData] = useState<CollectionData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCollection(id);
        setCollectionData(data);
      } catch (error) {
        console.error('Error fetching collection data', error);
      }
    };

    getData();
  }, [id]);

  const handleSubmit = async (data: { title: string; description: string; movieIds: number[] }) => {
    try {
      await updateCollection(id, data);
    } catch (error) {
      console.error('Error submitting collection form', error);
    }
  };

  return (
    <div>
      {collectionData && (
        <CollectionForm
          movies={collectionData.movies}
          addMovies={collectionData.addMovies}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CollectionEdit;