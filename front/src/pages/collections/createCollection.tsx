import React, { useEffect, useState, useCallback } from "react";
import api from "lib/api";
import { createCollection } from "@/features/api/CollectionApi";
import CollectionForm from "@/components/elements/Collection/CollectionForm";
import Loading from "@/components/elements/Loading/Loading";
import { SimpleMovie } from "@/types/movie";
import { CustomNextPage } from "@/types/next-page";
// import { ErrorMessage } from '@/components/Alert/Alert';

const CollectionCreate: CustomNextPage = () => {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [movieCache, setMovieCache] = useState<{ [page: number]: SimpleMovie[] }>({});
  const [selectedMovies, setSelectedMovies] = useState<SimpleMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = useCallback(async (page: number, isLoading = false) => {
    if (isLoading) {
      setLoading(true);
    }
    if (movieCache[page]) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get(`/collections/new?page=${page}`);
      if (response.data && response.data.addMovies) {
        setMovieCache(prev => ({ ...prev, [page]: response.data.addMovies }));
        setTotalPages(response.data.total_pages);
        setCurrentPage(response.data.current_page);
      } else {
        setError("映画データが期待された形式ではありません。");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`エラーが発生しました: ${error.message}`);
      } else {
        setError("未知のエラーが発生しました。");
      }
    } finally {
      setLoading(false);
    }
  }, [movieCache]);

  useEffect(() => {
    getData(currentPage, loading);
  }, [currentPage, loading, getData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSubmit = async (data: {
    title: string;
    description: string;
    movieIds: number[];
  }) => {
    try {
      await createCollection(data);
      alert("特集が作成されました");
    } catch (error) {
      console.error("特集の作成中にエラーが発生しました", error);
      setError("特集の作成に失敗しました。もう一度お試しください。");
    }
  };

  const handleMovieSelection = (movie: SimpleMovie, isSelected: boolean) => {
    if (isSelected) {
      setSelectedMovies(prev => [...prev, movie]);
    } else {
      setSelectedMovies(prev => prev.filter(m => m.id !== movie.id));
    }
  };

  if (loading) return <Loading />;

  // if (error) {
  //   return <ErrorMessage message={error} />;
  // }

  const availableMovies = (movieCache[currentPage] || []).filter(
    movie => !selectedMovies.some(selected => selected.id === movie.id)
  );

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="bg-black py-6">
        <h1 className="text-3xl text-white font-bold text-center">
          特集作成
        </h1>
      </div>
      {availableMovies.length > 0 || selectedMovies.length > 0 ? (
        <CollectionForm
          title={formTitle}
          description={formDescription}
          onTitleChange={(newTitle) => setFormTitle(newTitle)}
          onDescriptionChange={(newDescription) => setFormDescription(newDescription)}
          availableMovies={availableMovies}
          selectedMovies={selectedMovies}
          onMovieSelection={handleMovieSelection}
          onSubmit={handleSubmit}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : (
        <div className="text-center text-xl text-gray-600">
          いいねした映画がありません。
        </div>
      )}
    </div>
  );
};

CollectionCreate.noFilmBackground = true;

export default CollectionCreate;