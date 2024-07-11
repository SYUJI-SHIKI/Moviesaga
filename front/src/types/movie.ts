export interface Movie {
  id: number;
  tmdb_id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  runtime: number;
  original_language: string;
  status: string;
  release_date: string;
  genres: { id: number; name: string }[];
  youtube_trailer_id: string;
}

export interface SimpleMovie {
  id: number;
  tmdb_id: number;
  original_title: string;
  poster_path: string;
}

export interface MovieResponse {
  movie: Movie;
  favorited: boolean;
}