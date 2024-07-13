import React, { useEffect, useState, useCallback } from "react";
import api from "lib/api";
import { updateCollection, fetchCollection } from "@/features/api/CollectionApi";
import CollectionForm from "@/components/elements/Collection/CollectionForm";
import { SimpleMovie } from "@/types/movie";
import { CustomNextPage } from "@/types/next-page";
import { useRouter } from "next/router";

const CollectionEdit: CustomNextPage = () => {
  const [movieCache, setMovieCache] = useState<{ [page: number]: SimpleMovie[] }>({});
  const [selectedMovies, setSelectedMovies] = useState<SimpleMovie[]>([]);
  const [collectionData, setCollectionData] = useState<{ title: string; description: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  const getData = useCallback(async (page: number, isLoading = false) => {
    if (isLoading) {
      setLoading(true);
    }
    if (movieCache[page]) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get(`/collections/${id}/edit?page=${page}`);
      if (response.data) {
        setMovieCache(prev => ({ ...prev, [page]: response.data.allAvailableMovies }));
        setTotalPages(response.data.total_pages);
        setCurrentPage(response.data.current_page);
        if (page === 1) {
          setCollectionData({
            title: response.data.title,
            description: response.data.description,
          });
          setSelectedMovies(response.data.selectedMovies);
        }
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
  }, [movieCache, id]);

  useEffect(() => {
    if (id) {
      getData(currentPage, loading);
    }
  }, [id, currentPage, loading, getData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSubmit = async (data: {
    title: string;
    description: string;
    movieIds: number[];
  }) => {
    try {
      await updateCollection(Number(id), data);
      alert("特集が更新されました");
      router.push('/collections');
    } catch (error) {
      console.error("特集の更新中にエラーが発生しました", error);
      setError("特集の更新に失敗しました。もう一度お試しください。");
    }
  };

  const handleMovieSelection = (movie: SimpleMovie, isSelected: boolean) => {
    if (isSelected) {
      setSelectedMovies(prev => [...prev, movie]);
    } else {
      setSelectedMovies(prev => prev.filter(m => m.id !== movie.id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const availableMovies = (movieCache[currentPage] || []).filter(
    movie => !selectedMovies.some(selected => selected.id === movie.id)
  );

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="bg-black py-6 mb-8">
        <h1 className="text-3xl text-white font-bold text-center">
          特集編集
        </h1>
      </div>
      {collectionData && (availableMovies.length > 0 || selectedMovies.length > 0) ? (
        <CollectionForm
          title={collectionData.title}
          description={collectionData.description}
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
          編集可能な映画がありません。
        </div>
      )}
    </div>
  );
};

CollectionEdit.noFilmBackground = true;

export default CollectionEdit;