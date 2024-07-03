import React from "react";

interface SearchFormProps {
  query: string;
  category: string;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  category,
  onQueryChange,
  onCategoryChange,
  onSearch
}) => {
  return (
    <div className="flex justify-center m-4">
      <input
        type='text'
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search..."
        className="p-2 border rounded-md w-full max-w-xs"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
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