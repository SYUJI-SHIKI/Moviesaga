require 'httparty'

class MoviesController < ApplicationController
  # before_action :set_movie, only: %i[show]
  def index ;
    # if params[:looking_for]
    #   @movies = fetch_movies("/search/movie", query: params[:looking_for])

    # else
    #   @movies = fetch_movies("/movie/popular")
    # end
    # Rails.logger.debug(@movies.inspect)
    # render 'index'
  end

  def show
    movie_data = MovieFetcher.movie_data_detail(params[:id])
    Rails.logger.debug("kkkkkkkk#{movie_data}")
    @video_id = fetch_youtube_video(movie_data["original_title"])
    @keywords = get_keywords(movie_data["id"])

    @movie = MovieSaverService.save_movie(movie_data, @video_id,@keywords)
    Rails.logger.debug("dddddddd#{@movie}")
  end

  def search
    if params[:query].present?
      search = fetch_tmdb_search(params[:query])
      @movies = search["results"]
    else
      movie = []
    end
  end

  def random
    @movie_data = MovieRandom.get_random_movie
    @video_id = fetch_youtube_video(@movie_data["original_title"])
    @keywords = get_keywords(@movie_data["id"])

    Rails.logger.debug("ここを見てくれ！#{@movie_data}")
    if @video_id.nil?
      @movie = Movie.all.sample
      @video_id = @movie.youtube_trailer_id
      Rails.logger.debug("ここを見てくれ！#{@movie}")
    else
      @movie = MovieSaverService.save_movie(@movie_data, @video_id, @keywords)
      Rails.logger.debug("ここを見てくれ！#{@movie}")
    end
  end

  private

  def fetch_movies(endpoint, params = {})
    api_key =  Rails.application.credentials.api_key[:tmdb]
    language = "ja"
    base_url = "https://api.themoviedb.org/3"
    
    query_params = params.merge({ api_key: api_key, language: language })
    query_string = query_params.to_query
    url = "#{base_url}#{endpoint}?#{query_string}"

    response = HTTParty.get(url)
    JSON.parse(response.body)
  end

  def get_keywords(movie_id)
    api_key =  Rails.application.credentials.api_key[:tmdb]
    url = "https://api.themoviedb.org/3/movie/#{movie_id}/keywords?api_key=#{api_key}"
    response = HTTParty.get(url)
    keywords = JSON.parse(response.body)['keywords']
    keywords
  end

  def fetch_youtube_video(title)
    Rails.logger.debug(title)
    youtube_search_query = "#{title} 映画 予告"
    YoutubeService.search_videos(youtube_search_query)
  end

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
