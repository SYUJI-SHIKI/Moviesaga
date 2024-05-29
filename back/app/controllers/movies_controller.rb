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
    movie_data = MovieFetcher.fetch_movie_details(params[:id])
    Rails.logger.debug(movie_data)
    @video_id = fetch_youtube_video(movie_data['title'])
    @keywords = get_keywords(movie_data['id'])
    
    unless @video_id.nil?
      @movie = MovieSaverService.save_movie(movie_data, @video_id,@keywords)
    else
      @movie = movie_data
    end
  end

  def search
    if params[:query].present?
      @movies = Tmdb::Search.movie(params[:query]).results
    else
      movie = []
    end
  end

  def random
    @movie_data = TmdbService.get_random_movie
    @video_id = fetch_youtube_video(@movie_data[:title])
    @keywords = get_keywords(@movie_data[:id])

    Rails.logger.debug("ここを見てくれ！#{@video_id}")
    if @video_id.nil?
      @movie = Movie.all.sample
      @video_id = @movie.youtube_trailer_id
    else
      @movie = MovieSaverService.save_movie(@movie_data, @video_id, @keywords)
    end
  end

  private

  def fetch_movies(endpoint, params = {})
    api_key = ENV['TMDB_API']
    language = "ja"
    base_url = "https://api.themoviedb.org/3"
    
    query_params = params.merge({ api_key: api_key, language: language })
    query_string = query_params.to_query
    url = "#{base_url}#{endpoint}?#{query_string}"

    response = HTTParty.get(url)
    JSON.parse(response.body)
  end

  def get_keywords(movie_id)
    api_key = ENV['TMDB_API']
    url = "https://api.themoviedb.org/3/movie/#{movie_id}/keywords?api_key=#{api_key}"
    response = HTTParty.get(url)
    keywords = JSON.parse(response.body)['keywords']
    keywords
  end

  def fetch_youtube_video(title)
    youtube_search_query = "#{title} 映画 予告"
    YoutubeService.search_videos(youtube_search_query)
  end
end
