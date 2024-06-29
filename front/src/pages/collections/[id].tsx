import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import api from 'lib/api';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface Collection {
  id: number;
  title: string;
  description: string;
  movies: Movie[];
}

const CollectionShow: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    if (id) {
      api.get(`/collections/${id}`)
        .then(response => {
          setCollection(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the collection!", error);
        });
    }
  }, [id]);

  const handleEdit = () => {
    router.push(`/collections/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('本当にこの特集を削除しますか？');
    if (confirmed) {
      try {
        await api.delete(`/collections/${id}`);
        router.push('/collections');
      } catch (error) {
        console.error('There was an error deleting the collection!', error);
      }
    }
  };

  if (!collection) return <p>Loading...</p>;

  return (
    <>
      {collection && (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{collection.title}</h1>
          <div>
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">編集</button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">削除</button>
          </div>
          <p className="text-gray-700 mb-6">{collection.description}</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {collection.movies.map(movie => (
              <div key={movie.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                <Image
                    src={movie.poster_path}
                    alt={movie.title}
                    className="collection-movie-image rounded"
                    height={80}
                    width={80}
                  />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionShow;