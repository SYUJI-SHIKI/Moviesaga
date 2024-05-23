require 'httparty'

class TmdbService
  BASE_URL = "https://api.themoviedb.org/3"
  API_KEY = ENV['TMDB_API']

  def self.get_popular_movies(limit = 250)
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

  def self.get_random_movie_title
    popular_movie_ids = get_popular_movies
    return nil if popular_movie_ids.nil? || popular_movie_ids.empty?

    random_movie_id = popular_movie_ids.sample
    response = HTTParty.get("#{BASE_URL}/movie/#{random_movie_id}", query: {
      api_key: API_KEY,
      language: "ja",
    })

    if response.success?
      movie = JSON.parse(response.body)
      {
        title: movie['title'],
        overview: movie['overview'],
        postpath: movie['poster_path'],
      }
    else
      Rails.logger.error("Failed to fetch TMDB data: #{response.message}")
      nil
    end
  end
end