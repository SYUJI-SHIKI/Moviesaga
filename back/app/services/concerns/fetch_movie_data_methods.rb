require 'httparty'

module FetchMovieDataMethods
  extend ActiveSupport::Concern

  included do
    BASE_URL = "https://api.themoviedb.org/3"
    TMDB_API = Rails.application.credentials.api_key[:tmdb]
  end

  class_methods do
    def fetch_movie_data(movie_id, language)
      Rails.logger.error("Fetching movie data for ID: #{movie_id} with language: #{language}")
      response = HTTParty.get("#{BASE_URL}/movie/#{movie_id}", query: {
        api_key: TMDB_API,
        language: language,
      })

      Rails.logger.error("HTTP response code: #{response.code}")
      Rails.logger.error("HTTP response message: #{response.message}")

      if response.success?
        movie_data = JSON.parse(response.body)
        Rails.logger.error("kokomomiru: #{movie_data}")
      else
        Rails.logger.error("Failed to fetch TMDB data: #{response.message}")
        nil
      end
      movie_data
    end
  end
end