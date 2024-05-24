require 'httparty'

class MoviesController < ApplicationController
  before_action :set_movie, only: %i[show]
  def index
    if params[:looking_for]
      @movies = fetch_movies("/search/movie", query: params[:looking_for])

    else
      @movies = fetch_movies("/movie/popular")
    end
    Rails.logger.debug(@movies.inspect)
    render 'index'
  end

  def show
    @video_id = fetch_youtube_video(@movie.title)

    save_movie(@movie)
  end

  def random
    @movie_data = TmdbService.get_random_movie
    @video_id = fetch_youtube_video(@movie_data[:title])
    Rails.logger.debug(@movie_data)

    MovieSaverService.save_movie(@movie_data, @video_id)
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
  
  def fetch_movie_details(movie_id)
    api_key = ENV['TMDB_API']
    language = "ja"
    base_url = "https://api.themoviedb.org/3"
  
    url = "#{base_url}/movie/#{movie_id}?api_key=#{api_key}&language=#{language}"
  
    begin
      response = HTTParty.get(url)
      if response.success?
        JSON.parse(response.body)
      else
        Rails.logger.error("Failed to fetch movie details: #{response.message}")
        nil
      end
    rescue StandardError => e
      Rails.logger.error("Error fetching movie details: #{e.message}")
      nil
    end
  end
  
  def get_movie_trailers(movie_id)
    api_key = ENV['TMDB_API']
    url = "https://api.themoviedb.org/3/movie/#{movie_id}/videos?api_key=#{api_key}"
    response = HTTParty.get(url)
    trailers = JSON.parse(response.body)['results']
  end

  def fetch_youtube_video(title)
    youtube_search_query = "#{title} 映画 予告"
    YoutubeService.search_videos(youtube_search_query)
    
  end
end
