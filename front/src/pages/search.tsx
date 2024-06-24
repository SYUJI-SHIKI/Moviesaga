"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import styles from  '@/features/search/search.module.css';
import { useRouter } from 'next/router';

interface Movie {
  id: number;
  poster_path: string;
}
interface Styles {
  readonly [key: string]: string;
}

const cssModuleStyles: Styles = styles;
const SearchPage: React.FC = () => {
const router = useRouter();
const [query, setQuery] = useState<string>('');
const [category, setCategory] = useState<string>('movie');
const [movies, setMovies] = useState<Movie[]>([]);
const [page, setPage] = useState<number>(1);
const [totalPages, setTotalPages] = useState<number>(1);
const imagesRef = useRef<HTMLDivElement[]>([]);
const handleSearch = async () => {
const response = await fetch(`/api/v1/search?query=${query}&category=${category}&page=${page}`);
const data = await response.json();

setMovies(data.movies);
setTotalPages(data.total_pages);

const queryString = `?query=${query}&category=${category}&page=${page}`;
router.push(`/search/search${queryString}`, undefined, { shallow: true });
};

const handlePageChange = (newPage: number) => {
  setPage(newPage);
  handleSearch();
};

useEffect(() => {
const { query: queryParam, category: categoryParam, page: pageParam } = router.query;
  if (!queryParam && !categoryParam && !pageParam) return;

  if (queryParam) setQuery(queryParam as string);
  if (categoryParam) setCategory(categoryParam as string);
  if (pageParam) setPage(Number(pageParam));
  handleSearch();
}, [router.query]);

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
      entry.target.classList.add(styles['animation-slide-in']);
      observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  imagesRef.current.forEach((image) => {
  observer.observe(image);
  });
  return () => {
    imagesRef.current.forEach((image) => {
    observer.unobserve(image);
    });
  };
}, []);

  return (
    <>
      <div className='min-h-screen bg-black flex flex-col justify-center'>
        <div className='container mx-auto p-4 bg-black'>
          <div className='flex justify-center m-4'>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className='p-2 border rounded-md w-full max-w-xs'
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className='ml-2 p-2 border rounded-md'>
              <option value="movie">Movie</option>
              <option value="person">Person</option>
            </select>
            <button onClick={handleSearch} className='ml-2 p-2 bg-blue-500 text-white rounded-md'>Search</button>
          </div>

          <div className="flex flex-wrap justify-center p-4 ">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`} passHref className=' border-2 border-gray-600/50 '>
                <div className="block group cursor-pointer m-5">
                  <div className={`relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 group-hover:scale-105 ${cssModuleStyles['animate-slide-in']}`}>
                    <Image
                      src={movie.poster_path}
                      className="w-full h-auto object-cover "
                      width={100}
                      height={150}
                      alt={'movie.id'}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className='flex justify-center mt-4'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;