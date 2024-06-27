import React, { useEffect, useState } from 'react';
import api from 'lib/api';
import { createCollection } from 'lib/CollectionApi'
import CollectionForm from '@/components/elements/Collection/CollectionForm';

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
}

const CollectionCreate: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [addMovies, setAddMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get('/collections/new');
        setMovies(response.data.movies);
        setAddMovies(response.data.addMovies);
      } catch (error) {
        console.error('Error fetching movies data', error);
      }
    };

    getData();
  }, []);

  const handleSubmit = async (data: { title: string; description: string; movieIds: number[] }) => {
    try {
      await createCollection(data);
    } catch (error) {
      console.error('Error submitting collection form', error);
    }
  };

  return (
    <div>
      {movies.length > 0 && (
        <CollectionForm
          movies={movies}
          addMovies={addMovies}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CollectionCreate;