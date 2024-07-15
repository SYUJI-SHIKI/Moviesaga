import React, { useState } from "react";
import MovieIndex from "@/components/elements/Movie/MovieIndex";
import { useFavorites } from "@/hooks/useFavorites";
import PaginationStyle from "@/components/elements/Pagination/PaginationStyle";

const FavoritesPage: React.FC = () => {
  const { favoriteMovies, page, setPage, totalPages } = useFavorites();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="text-white w-full">
      <div className="text-3xl bg-black text-white flex items-center justify-center h-32">いいねした映画</div>
      {favoriteMovies && favoriteMovies.length > 0 ? (
        <div className="mt-2">
          <MovieIndex
            movies={favoriteMovies} 
          />
          <div className="max-sm:mb-14 mb-12 mt-2 md:mt-4 md:mb-16">  
            <PaginationStyle
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-5 p-4 h-24 rounded-2xl bg-black">
          <div className=" w-1/2 rounded-2xl">
            「いいね」した映画がありません
          </div>
      </div>
      )}
    </div>
  );
}

export default FavoritesPage;