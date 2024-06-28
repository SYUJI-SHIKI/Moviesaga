import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from "next/router";
import { DndContext, closestCenter, useDroppable, useDraggable } from '@dnd-kit/core';

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
}

interface CollectionFormProps {
  movies: Movie[];
  addMovies?: Movie[];
  onSubmit: (data: { title: string; description: string; movieIds: number[] }) => void;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ movies, addMovies, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [movieIds, setMovieIds] = useState<number[]>([]);
  const router = useRouter();

  const handleCheckboxChange = (movieId: number) => {
    setMovieIds(prevIds =>
      prevIds.includes(movieId) ? prevIds.filter(id => id !== movieId) : [...prevIds, movieId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ title, description, movieIds });
      router.push('/collections');
    } catch (error) {
      console.error('Error submitting', error);
    }
    
  };

  return (
    <>
      <div className="new-collection-container min-h-screen flex flex-col items-center pt-8 bg-black">
        <form onSubmit={handleSubmit} className='flex flex-col items-center w-full mb-20'>
          <div className="text-field mb-4 w-80">
            <input
              type="text"
              className="w-full mb-3 p-3 border border-gray-300 rounded"
              value={title}
              placeholder="タイトル名:15文字以内"
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="text-field mb-4 w-80">
            <textarea
              className="w-full mb-3 p-2 border border-gray-300 rounded"
              rows={5}
              value={description}
              placeholder="特集紹介:130文字以内"
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="field mb-4">
            <label className="block mb-2 font-semibold text-white">お気に入り映画</label>
            <div className="collection-movies-container flex whitespace-nowrap overflow-x-auto space-x-4 ">
              {movies.map(movie => (
                <div
                  className={`shrink-0 p-0.5 border border-gray-300 rounded ${movieIds.includes(movie.id) ? 'bg-blue-100' : ''}`}
                  key={movie.id}
                  onClick={() => handleCheckboxChange(movie.id)}
                >
                  <Image
                    src={movie.poster_path}
                    alt={movie.original_title}
                    className="collection-movie-image rounded"
                    height={80}
                    width={80}
                  />
                  <input
                    type="checkbox"
                    value={movie.id}
                    checked={movieIds.includes(movie.id)}
                    onChange={() => handleCheckboxChange(movie.id)}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
          </div>
          {addMovies && addMovies.length > 0 && (
            <div className="field mb-4">
              <label className="block mb-2 font-semibold">Add Movies</label>
              <div className="collection-movies-container flex overflow-x-auto space-x-4">
                {addMovies.map(movie => (
                  <div
                    className={`collection-movie-item p-2 border border-gray-300 rounded ${movieIds.includes(movie.id) ? 'bg-blue-100' : ''}`}
                    key={movie.id}
                    onClick={() => handleCheckboxChange(movie.id)}
                  >
                    <h3 className="text-xl font-semibold">{movie.poster_path}</h3>
                    <input
                      type="checkbox"
                      value={movie.id}
                      checked={movieIds.includes(movie.id)}
                      onChange={() => handleCheckboxChange(movie.id)}
                      className="hidden"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="actions mt-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">作成する</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CollectionForm;