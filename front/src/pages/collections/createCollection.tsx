import React, { useEffect, useState } from "react";
import api from "lib/api";
import { createCollection } from "@/features/api/CollectionApi";
import CollectionForm from "@/components/elements/Collection/CollectionForm";
import { SimpleMovie } from "@/types/movie";
import { CustomNextPage } from "@/types/next-page";
// import { ErrorMessage } from '@/components/Alert/Alert';

const CollectionCreate: CustomNextPage = () => {
  const [availableMovies, setAvailableMovies] = useState<SimpleMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/collections/new");
        console.log("API response:", response.data);
        if (response.data && response.data.addMovies) {
          setAvailableMovies(response.data.addMovies);
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
    };

    getData();
  }, []);

  const handleSubmit = async (data: {
    title: string;
    description: string;
    movieIds: number[];
  }) => {
    try {
      await createCollection(data);
      // 成功時の処理（例：成功メッセージの表示やリダイレクト）
    } catch (error) {
      console.error("特集の作成中にエラーが発生しました", error);
      setError("特集の作成に失敗しました。もう一度お試しください。");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // if (error) {
  //   return <ErrorMessage message={error} />;
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      {availableMovies.length > 0 ? (
        <>
          <div className="bg-black py-6 mb-8">
            <h1 className="text-3xl text-white font-bold text-center">
              特集作成
            </h1>
          </div>
          <CollectionForm
            addMovies={availableMovies}
            onSubmit={handleSubmit}
          />
        </>
      ) : (
        <div className="text-center text-xl text-gray-600">
          追加可能な映画がありません。
        </div>
      )}
    </div>
  );
};

CollectionCreate.noFilmBackground = true;

export default CollectionCreate;