import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchForm from "@/components/elements/Search/searchForm";
import MovieIndex from "@/components/elements/Movie/MovieIndex";
import Pagination from "@/components/elements/Pagination/Pagination";
import api from "lib/api";

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
}

const SearchPage: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('movie');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleSearch = useCallback(async () => {
    const response = await api(`/search?query=${query}&category=${category}&page=${page}`)
    const data = await response.data;
    setMovies(data.movies);
    setTotalPages(data.total_pages);
    const queryString = `?query=${query}&category=${category}&page=${page}`;
    router.push(`/search${queryString}`, undefined, { shallow: true });
  }, [query, category, page]);

  useEffect(() => {
    const { query: queryParam, category: categoryParam, page: pageParam } = router.query;
    if (queryParam) setQuery(queryParam as string);
    if (categoryParam) setCategory(categoryParam as string);
    if (pageParam) setPage(Number(pageParam));
    if (queryParam || categoryParam || pageParam) handleSearch();
  }, []);

  // useEffect(() => {
  //   if (query || category || page) {
  //     handleSearch();
  //   }
  // }, [query, category, page, handleSearch]);

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center">
      <div className="container mx-auto p-4 bg-black">
        <SearchForm
          query={query}
          category={category}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
          onSearch={handleSearch}
        />
        <MovieIndex movies={movies} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage);

          }}
        />
      </div>
    </div>
  );
};

export default SearchPage;