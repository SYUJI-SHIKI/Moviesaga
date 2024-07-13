import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SimpleMovie } from '@/types/movie';
import MovieList from './MovieList';
import { ErrorMessage } from '../Alert/Alert';
import PaginationStyle from '../Pagination/PaginationStyle';

interface CollectionFormProps {
  title?: string;
  description?: string;
  availableMovies: SimpleMovie[];
  selectedMovies: SimpleMovie[];
  onMovieSelection: (movie: SimpleMovie, isSelected: boolean) => void;
  onSubmit: (data: { title: string; description: string; movieIds: number[] }) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const CollectionForm: React.FC<CollectionFormProps> = ({
  title = '',
  description = '',
  availableMovies,
  selectedMovies,
  onMovieSelection,
  onSubmit,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);
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

    if (formTitle.trim() === "") {
      setError("タイトル名を入れてください");
      return;
    }

    if (formTitle.length > 15) {
      setError("タイトル名は15文字以下でお願いします");
      return;
    }
    if (formDescription.length > 130) {
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
        title: formTitle,
        description: formDescription,
        movieIds: selectedMovies.map(movie => movie.id),
      });
      alert("特集が作成されました");
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
      <form onSubmit={handleSubmit} className="p-6 bg-black rounded-lg shadow-md h-full mb-16 text-gray-100 min-w-full">
        {error && <ErrorMessage message={error} />}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-100">タイトル</label>
          <input
            type="text"
            id="title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-100">説明</label>
          <textarea
            id="description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className='flex flex-col'>
              <h3 className="text-xl font-semibold mb-4">利用可能な映画</h3>
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
          <div className="w-full md:w-1/2 flex flex-col items-center top-0">
            <h3 className="text-xl font-semibold mb-4 space-y-3">
              <p>選択された映画</p>
              <p>(９タイトルまで)</p>
            </h3>
            <SortableContext items={selectedMovies.map(m => m.id)} strategy={verticalListSortingStrategy}>
              <MovieList movies={selectedMovies} />
            </SortableContext>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <button type="submit" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            作成する
          </button>
        </div>
      </form>
    </DndContext>
  );
};

export default CollectionForm;