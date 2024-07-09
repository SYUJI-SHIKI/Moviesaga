import React from "react";

interface SearchFormProps {
  query: string;
  setQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  setQuery,
  category,
  setCategory,
  onSearch
}) => {
  return (
    <div className="flex justify-center z-30 mt-20">
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="p-2 border rounded-md w-full max-w-xs"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="ml-2 p-2 border rounded-md"
      >
        <option value='movie'>タイトル名</option>
        <option value='person'>役者名</option>
      </select>
      <button onClick={onSearch} className="ml-2 p-2 bg-blue-500 text-white rounded-md">
        検索
      </button>
    </div>
  );
};

export default SearchForm;