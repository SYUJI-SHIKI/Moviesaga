import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from 'lib/api';
import BookmarkButton from '@/components/elements/Bookmark/BookmarkButton';
import CollectionCarousel from '@/components/elements/Collection/CollectionCarousel';

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
  youtube_trailer_id: string;
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
        <div className="flex flex-col items-center min-h-screen bg-black">
          <div className="flex flex-row my-20 lg:my-10 items-center justify-center w-full max-w-4xl mx-auto text-white">
            <div className='text-3xl lg:text-5xl font-bold'>{collection.title}</div>
            <div className="flex flex-row space-x-2 ml-2">
              <BookmarkButton collectionId={Number(id)} />
              <button onClick={handleEdit} className="bg-blue-500 text-white px-2 py-1 text-sm mt-7 rounded shadow-md hover:bg-blue-600 transition duration-300">編集</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 text-sm mt-7 rounded shadow-md hover:bg-red-600 transition duration-300">削除</button>
            </div>
          </div>
          <p className="text-gray-400 mb-6 max-w-4xl mx-auto text-xl">{collection.description}</p>
          <div className="w-full h-full">
            <CollectionCarousel movies={collection.movies} />
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionShow;