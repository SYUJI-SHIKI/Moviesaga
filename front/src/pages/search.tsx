import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchForm from "@/components/elements/Search/searchForm";
import MovieIndex from "@/components/elements/Movie/MovieIndex";
import PaginationStyle from "@/components/elements/Pagination/PaginationStyle";
import api from "lib/api";

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
}

interface SearchState {
  query: string;
  category: string;
  movies: Movie[];
  page: number;
  totalPages: number;
}

const SearchPage: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('movie');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('searchState');
    if (savedState && !isInitialized) {
      const parsedState: SearchState = JSON.parse(savedState);
      setQuery(parsedState.query);
      setCategory(parsedState.category);
      setMovies(parsedState.movies);
      setPage(parsedState.page);
      setTotalPages(parsedState.totalPages);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const performSearch = async (searchQuery: string, searchCategory: string, searchPage: number) => {
    let itemsPerPage;
    if (window.innerWidth < 640) {
      itemsPerPage = 10;
    } else {
      itemsPerPage = 20;
    }

    const response = await api(`/search?query=${searchQuery}&category=${searchCategory}&page=${searchPage}&per=${itemsPerPage}`);
    const data = response.data;
    setMovies(data.movies);
    setTotalPages(data.total_pages);
    
    const queryString = `?query=${searchQuery}&category=${searchCategory}&page=${searchPage}`;
    router.push(`/search${queryString}`, undefined, { shallow: true });

    // 検索結果をローカルストレージに保存
    const searchState: SearchState = {
      query: searchQuery,
      category: searchCategory,
      movies: data.movies,
      page: searchPage,
      totalPages: data.total_pages
    };
    localStorage.setItem('searchState', JSON.stringify(searchState));
  };

  const handleSearch = () => {
    performSearch(query, category, 1);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    performSearch(query, category, newPage);
  };

  return (
    <>
      <SearchForm
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        onSearch={handleSearch}
      />
      <MovieIndex movies={movies} />
      <PaginationStyle
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default SearchPage;