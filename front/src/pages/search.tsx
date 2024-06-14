import { useState } from 'react';
import Link from 'next/link';
import React from 'react';

interface Movie {
  id: number;
  poster_path: string;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('movie');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleSearch = async () => {
    const response = await fetch(`/api/search?query=${query}&category=${category}&page=${page}`);
    const data = await response.json();
    setMovies(data.movies);
    setTotalPages(data.total_pages);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    handleSearch();
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="movie">Movie</option>
        <option value="person">Person</option>
      </select>
      <button onClick={handleSearch}>Search</button>
      <div className="grid grid-cols-5 gap-4 p-4">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`} passHref>
          <div className="block group">
            <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 group-hover:scale-105">
              <img
                src={movie.poster_path}
                className="w-full h-auto object-cover max-w-xs"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;