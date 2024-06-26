import { useState } from 'react';

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
}

interface CollectionFormProps {
  movies: Movie[];
  addMovies?: Movie[];
  onSubmit: (data: { title: string; description: string; movieIds: number[] }) => void;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ movies, addMovies, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [movieIds, setMovieIds] = useState<number[]>([]);

  const handleCheckboxChange = (movieId: number) => {
    setMovieIds(prevIds =>
      prevIds.includes(movieId) ? prevIds.filter(id => id !== movieId) : [...prevIds, movieId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, movieIds });
  };

  return (
    <div className="new-collection-container">
      <form onSubmit={handleSubmit}>
        <div className="text-field">
          <input
            type="text"
            placeholder="タイトル名:15文字以内"
            className="form-control mb-3"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="text-field">
          <textarea
            placeholder="特集紹介:130文字以内"
            className="form-control mb-3"
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="actions">
          <button type="submit">作成する</button>
        </div>

        <div className="field">
          <label>Movies</label>
          <div className="collection-movies-container">
            {movies.map(movie => (
              <div className="collection-movie-item" key={movie.id}>
                <img
                  src={movie.poster_path}
                  alt={movie.original_title}
                  className="collection-movie-image"
                />
                <input
                  type="checkbox"
                  value={movie.id}
                  checked={movieIds.includes(movie.id)}
                  onChange={() => handleCheckboxChange(movie.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {addMovies && addMovies.length > 0 && (
          <div className="field">
            <label>Add Movies</label>
            <div className="collection-movies-container">
              {addMovies.map(movie => (
                <div className="collection-movie-item" key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.original_title}
                    className="collection-movie-image"
                  />
                  <input
                    type="checkbox"
                    value={movie.id}
                    checked={movieIds.includes(movie.id)}
                    onChange={() => handleCheckboxChange(movie.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CollectionForm;