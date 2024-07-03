import React from "react";
import MovieIndex from "@/components/elements/Movie/MovieIndex";
import { useFavorites } from "@/hooks/useFavorites";


const FavoritesPage: React.FC = () => {
  const { favoriteMovies } = useFavorites();
  console.log(`kookokokokokoko, ${useFavorites()}`)

  return (
    <div className='min-h-screen bg-black flex flex-col justify-center'>
      <div className='container mx-auto p-4 bg-black'>
        <h1 className="text-2xl text-white mb-4">My Favorite Movies</h1>
        <MovieIndex
          movies={favoriteMovies} 
        />
      </div>
    </div>
  );
}

export default FavoritesPage;