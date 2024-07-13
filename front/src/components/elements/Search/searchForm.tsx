import React, { FormEvent } from "react";
import { IoSearchCircleSharp, IoRadioButtonOff } from "react-icons/io5";
import { GiFilmSpool } from "react-icons/gi";

interface SearchFormProps {
  query: string;
  setQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  onSearch: () => void;
}

const categoryOptions = [
  { value: 'movie', label: 'タイトル名' },
  { value: 'person', label: '役者名' },
];

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  setQuery,
  category,
  setCategory,
  onSearch
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  }
  return (
    <form onSubmit={handleSubmit} className="bg-black flex justify-canter items-center">
      <div className="w-full lg:px-4">
        <div className="flex flex-col md:flex-row items-center justify-center w-full z-30 mt-20 rounded-3xl pb-3 lg:p-4">
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索"
            className="p-2 border rounded-md w-full max-w-xs text-black"
          />
          <div className="flex m-2">
            {categoryOptions.map((option) => (
              <label key={option.value} className="flex items-center text-xl mx-2 cursor-pointer">
                <input
                  type="radio"
                  value={option.value}
                  checked={category === option.value}
                  onChange={() => setCategory(option.value)}
                  className="hidden"
                />
                <span className="">
                  {category === option.value ? (
                    <GiFilmSpool className="size-5" />
                  ) : (
                    <IoRadioButtonOff />
                  )}
                </span>
                <span>{option.label}</span>
              </label>
            ))}
            <button
              type="submit"
              className="ml-2  max-sm:bg-black text-white rounded-md flex justify-center items-center mr-2 w-20"
            >
              <IoSearchCircleSharp className="size-8" /><span>検索</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;