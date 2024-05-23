require 'httparty'

class MoviesController < ApplicationController
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
    movie_data = TmdbService.get_random_movie_title
    @movie_title = movie_data[:title]
    @movie_overview = movie_data[:overview]
    @movie_poster = movie_data[:postpath]
    youtube_search_query = "#{@movie_title} 予告"
    @video_id = YoutubeService.search_videos(youtube_search_query)
    Rails.logger.debug(@movie_title)
  end
  
  private

  def fetch_movies(endpoint, params = {})
    api_key = '3fcb672a51132297c0a824fb0fd41232'
    language = "ja"
    base_url = "https://api.themoviedb.org/3"
    
    query_params = params.merge({ api_key: api_key, language: language })
    query_string = query_params.to_query
    url = "#{base_url}#{endpoint}?#{query_string}"

    response = HTTParty.get(url)
    JSON.parse(response.body)
  end
  
  def fetch_movie_details(movie_id)
    api_key = '3fcb672a51132297c0a824fb0fd41232'
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
    api_key = '3fcb672a51132297c0a824fb0fd41232'
    url = "https://api.themoviedb.org/3/movie/#{movie_id}/videos?api_key=#{api_key}"
    response = HTTParty.get(url)
    trailers = JSON.parse(response.body)['results']
  end
end
