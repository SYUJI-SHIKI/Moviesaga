import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SimpleMovie } from '@/types/movie';
import MovieList from './MovieList';
import { ErrorMessage } from '../Alert/Alert';
import PaginationStyle from '../Pagination/PaginationStyle';

interface CollectionFormProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (title: string) => void;
  availableMovies: SimpleMovie[];
  selectedMovies: SimpleMovie[];
  onMovieSelection: (movie: SimpleMovie, isSelected: boolean) => void;
  onSubmit: (data: { title: string; description: string; movieIds: number[] }) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const CollectionForm: React.FC<CollectionFormProps> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  availableMovies,
  selectedMovies,
  onMovieSelection,
  onSubmit,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // const reorderSelectedMovies = (oldIndex: number, newIndex: number) => {
  //   setSelectedMovies((prev) => arrayMove(prev, oldIndex, newIndex));
  // };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeMovie = availableMovies.find(movie => movie.id === active.id);
    const overMovie = selectedMovies.find(movie => movie.id === over.id);

    if (activeMovie) {
      onMovieSelection(activeMovie, true);
    } else if (overMovie) {
      onMovieSelection(overMovie, false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("タイトル名を入れてください");
      return;
    }

    if (title.length > 15) {
      setError("タイトル名は15文字以下でお願いします");
      return;
    }
    if (description.length > 130) {
      setError("投稿内容は130文字以内にしてください");
      return;
    }
    if (selectedMovies.length === 0) {
      setError("映画が選択されていません");
      return;
    }

    if (selectedMovies.length > 9) {
      setError("特集を組めるのは最大9タイトルです");
      return;
    }

    try {
      await onSubmit({
        title,
        description,
        movieIds: selectedMovies.map(movie => movie.id),
      });
      router.push('/collections');
    } catch (error) {
      console.error('Error submitting', error);
      setError('エラーが発生しました');
    }
  };

  // useEffect(() => {
  //   setAvailableMovies(addMovies);
  // }, [addMovies]);

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <form onSubmit={handleSubmit} className=" md:p-6 bg-black rounded-lg shadow-md h-full mb-16 font-bold text-2xl text-gray-100 min-w-full">
        <div className='flex flex-col lg:flex-row'>
          <div className='w-full mb-4'>
            <div className="mb-4 lg:ml-2 w-full lg:w-4/5">
              <label htmlFor="title" className="block text-lg font-medium text-gray-100">タイトル(15文字以内)</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                className="block w-full h-16 mt-1 p-2 rounded-md border-gray-300 text-xl font-bold text-gray-800  focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="mb-4 lg:ml-2 w-full lg:w-11/12">
              <label htmlFor="description" className="block text-lg font-medium text-gray-100">特集の説明(130文字以内)</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                className="block w-full h-32 mt-1 p-2 rounded-md border-gray-300 text-xl font-bold text-gray-800  focus:ring focus:ring-indigo-200 "
              />
            </div>
          </div>
          <div className='w-full lg:w-11/12 p-3 lg:relative mb-5 max-sm:text-lg'>
            <div className='lg:absolute lg:bottom-0 tracking-wider'>
              <p className='my-2'>いいねした映画から特集を作って</p>
              <p className='my-2 mb-4'>あなたの好きな映画をみんなに広げよう！</p>
              <p className='my-2'>利用可能な映画をタッチすると</p>
              <p className='my-2'>特集に組む映画を選択できます。</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:mx-2 p-2 flex flex-col items-center rounded-3xl border-4 max-sm:h-[75vh] h-[80vh] lg:h-[90vh]">
            <div className='flex flex-col mb-4'>
              <h3 className="font-bold my-4">利用可能な映画</h3>
              <PaginationStyle
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
            <SortableContext items={availableMovies.map(m => m.id)} strategy={verticalListSortingStrategy}>
              <MovieList movies={availableMovies} />
            </SortableContext>
          </div>
          <div className="w-full lg:w-1/2 lg:mx-2 p-2 flex flex-col items-center rounded-3xl border-4 max-sm:h-[75vh] h-[80vh] lg:h-[90vh] max-md:mt-5">
            <h3 className="font-bold mt-4 mb-7 space-y-3">
              <p>選択された映画</p>
              <p>(９タイトルまで)</p>
            </h3>
            <div className='overflow-y-auto'>
              <SortableContext items={selectedMovies.map(m => m.id)} strategy={verticalListSortingStrategy}>
                <MovieList movies={selectedMovies} />
              </SortableContext>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center mt-3'>
          {error && <ErrorMessage message={error} />}
          <button type="submit" className=" px-4 py-2 mt-4 lg:mt-6 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            作成する
          </button>
        </div>
      </form>
    </DndContext>
  );
};

export default CollectionForm;