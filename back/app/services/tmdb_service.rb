require 'httparty'

class TmdbService
  BASE_URL = "https://api.themoviedb.org/3"
  API_KEY = ENV['TMDB_API']

  def self.get_popular_movies(limit = 500)
    movie_ids = []
    page = 1

    while movie_ids.size < limit
      response = HTTParty.get("#{BASE_URL}/movie/popular", query: {
        api_key: API_KEY,
        language: 'ja',
        page: page,
      })

      if response.success?
        movies = response.parsed_response['results']
        movie_ids.concat(movies.map { |movie| movie['id'] })
        page += 1
      else
        Rails.logger.error("Failed to fetch TMDB data: #{response.message}")
        break
      end
    end
    movie_ids.take(limit)
  end

  def self.fetch_movie_data(movie_id)
    movie_data = fetch_movie_language_change(movie_id, "ja")

    if movie_data[:overview].nil? || movie_data[:overview].empty?
      movie_data = fetch_movie_language_change(movie_id, "en")
    end

    movie_data
  end

  def self.fetch_movie_language_change(movie_id, language)
    response = HTTParty.get("#{BASE_URL}/movie/#{movie_id}", query: {
      api_key: API_KEY,
      language: language,
    })

    if response.success?
      movie = JSON.parse(response.body)
      movie_data = {
        id: movie['id'],
        original_title: movie['original_title'],
        overview: movie['overview'],
        poster_path: movie['poster_path'],
        runtime: movie['runtime'],
        original_language: movie['original_language'],
        status: movie['status'],
        release_date: movie['release_date'],
        genres: movie['genres'],
      } 
    else
      Rails.logger.error("Failed to fetch TMDB data: #{response.message}")
      nil
    end
  end

  def self.get_random_movie
    popular_movie_ids = get_popular_movies
    return nil if popular_movie_ids.nil? || popular_movie_ids.empty?

    random_movie_id = popular_movie_ids.sample
    fetch_movie_data(random_movie_id)
  end
end