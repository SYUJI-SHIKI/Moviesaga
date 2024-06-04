require 'httparty'

class SearchesController < ApplicationController
  skip_before_action :authenticate_user!

  def search
    if params[:query].present?
      search = fetch_tmdb_search(params[:query])
      @movies = search["results"]
    else
      @movies = []
    end
  end

  private

  BASE_URL = "https://api.themoviedb.org/3"
  API_KEY =  Rails.application.credentials.api_key[:tmdb]

  def fetch_tmdb_search(query)
    language = "ja"
    base_url = "https://api.themoviedb.org/3"
    response = HTTParty.get("#{BASE_URL}/search/movie", query: {
      api_key: API_KEY,
      language: 'ja',
      query: query,
    })

    JSON.parse(response.body)
  end
end
