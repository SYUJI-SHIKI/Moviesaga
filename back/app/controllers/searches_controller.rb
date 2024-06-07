require 'httparty'

class SearchesController < ApplicationController
  skip_before_action :authenticate_user!

  def search
    if params[:query].present? && params[:category].present?
      search = fetch_tmdb_search(params[:query], params[:category])
      if params[:category] == "movie"
        movie_ids = search["results"].map { |movie| { id: movie["id"], poster_path: movie["poster_path"] } }
      elsif params[:category] == "person"
        person_ids = search["results"].map { |person| person["id"] }
        movie_ids = person_ids.flat_map do |person_id|
          credits = fetch_person_movie_credits(person_id)
          credits["cast"].map { |movie| { id: movie["id"], poster_path: movie["poster_path"] } }
        end
      end
      @movies = Kaminari.paginate_array(movie_ids).page(params[:page]).per(20)
      Rails.logger.debug("Movies: #{movie_ids}")
    else
      @movies = Kaminari.paginate_array([]).page(params[:page]).per(20)  # 空の配列にもページネーションを追加
    end
  end

  private

  BASE_URL = "https://api.themoviedb.org/3"
  API_KEY = Rails.application.credentials.api_key[:tmdb]

  def fetch_tmdb_search(query, category)
    endpoint = case category
    when "movie" then "search/movie"
    when "person" then "search/person"
    end

    response = HTTParty.get("#{BASE_URL}/#{endpoint}", query: {
      api_key: API_KEY,
      language: 'ja',
      query: query,
    })

    JSON.parse(response.body)
  end

  def fetch_person_movie_credits(person_id)
    response = HTTParty.get("#{BASE_URL}/person/#{person_id}/movie_credits", query: {
      api_key: API_KEY,
      language: 'ja'
    })

    JSON.parse(response.body)
  end
end
