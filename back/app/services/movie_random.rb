require 'httparty'

class MovieRandom
  include TranslateTextMethods
  include FetchMovieDataMethods

  BASE_URL = "https://api.themoviedb.org/3"
  API_KEY = Rails.application.credentials.api_key[:tmdb]

  def self.get_random_movie
    popular_movie_ids = get_popular_movies
    return nil if popular_movie_ids.nil? || popular_movie_ids.empty?

    movie_id = popular_movie_ids.sample
    movie_data = fetch_movie_data(movie_id, "ja")
    Rails.logger.debug("ttttttttttttttttttt#{movie_data}")
    if movie_data["overview"].nil? || movie_data["overview"].empty?
      movie_id = movie_data["id"]
      movie_data = fetch_movie_data(movie_id, "en")
      translated_overview = translate_text(movie_data["overview"], "ja")
      movie_data["overview"] = "#{translated_overview}(＊英文を翻訳した内容なので表現に誤りがある場合があります)"
    end
    movie_data
  end

  def self.get_popular_movies(limit = 1000)
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
end