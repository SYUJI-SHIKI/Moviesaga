import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import api from 'lib/api';
import CollectionCarousel from '@/components/elements/Collection/CollectionCarousel';

interface Movie {
  id: number;
  original_title: string;
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
        <div className="mx-auto p-4 mb-20 overflow-auto bg-black">
          <h1 className="text-3xl font-bold mb-4">{collection.title}</h1>
          <div>
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">編集</button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">削除</button>
          </div>
          <p className="text-gray-700 mb-6">{collection.description}</p>
          <CollectionCarousel movies={collection.movies} />
        </div>
      )}
    </>
  );
};

export default CollectionShow;