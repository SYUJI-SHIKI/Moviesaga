import React from "react";
import MovieIndex from "@/components/elements/Movie/MovieIndex";
import { userFavorites } from "@/hooks/userFavorites";


const FavoritesPage: React.FC = () => {
  const { favoriteMovies } = userFavorites();
  console.log(`kookokokokokoko, ${userFavorites()}`)

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