require 'httparty'

class SearchesController < ApplicationController
  skip_before_action :authenticate_user!

  def search
    if params[:query].present?
      search = fetch_tmdb_search(params[:query])
      movie_ids = search["results"].map { |movie| { id: movie["id"], poster_path: movie["poster_path"] } }
      Rails.logger.debug("kokokokokokokok#{search["results"]}")
      @movies = Kaminari.paginate_array(movie_ids).page(params[:page]).per(20)
      Rails.logger.debug("Movies: #{@movies.inspect}")
    else
      @movies = Kaminari.paginate_array([]).page(params[:page]).per(20)  # 空の配列にもページネーションを追加
    end
  end

  private

  BASE_URL = "https://api.themoviedb.org/3"
  API_KEY = Rails.application.credentials.api_key[:tmdb]

  def fetch_tmdb_search(query)
    response = HTTParty.get("#{BASE_URL}/search/movie", query: {
      api_key: API_KEY,
      language: 'ja',
      query: query,
    })

    JSON.parse(response.body)
  end
end
