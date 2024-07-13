import React from "react";
import { SimpleMovie } from "@/types/movie";
import SortableMovie from "./SortableMovie";

interface MovieListProps {
  movies: SimpleMovie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className="grid grid-cols-3">
      {movies.map((movie) => (
        <SortableMovie key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;