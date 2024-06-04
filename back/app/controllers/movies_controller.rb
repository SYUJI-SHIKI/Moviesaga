require 'httparty'

class MoviesController < ApplicationController
  skip_before_action :authenticate_user!

  def index ;end

  def show
    movie_data = MovieFetcher.movie_data_detail(params[:id])
    Rails.logger.debug("kkkkkkkk#{movie_data}")
    @video_id = fetch_youtube_video(movie_data["original_title"])
    @keywords = get_keywords(movie_data["id"])
    Rails.logger.debug("dddddddd#{@video_id}")
    @movie = MovieSaverService.save_movie(movie_data, @video_id,@keywords)
  end

  def random
    language = params[:language]
    selected_runtime = params[:selected_runtime]

    if params[:now_playing].present?
      @movie_data = NowPlayingMovie.random_playing_movie(language: language,selected_runtime: selected_runtime)
    elsif params[:language].present? || params[:selected_runtime].present?
      Rails.logger.debug("ここを見てくれ！！！！！！#{selected_runtime}")
      @movie_data = SelectRandomMovie.select_random_movie(language, selected_runtime)
    else
      @movie_data = MovieRandom.get_random_movie
    end

    if @movie_data.present?
      @video_id = fetch_youtube_video(@movie_data["original_title"])
      @keywords = get_keywords(@movie_data["id"])
    else
      flash[:notice] = "見つかりませんでした"
      redirect_to movies_path and return
    end

    @movie = MovieSaverService.save_movie(@movie_data, @video_id, @keywords)
    Rails.logger.debug("ここを見てくれ！#{@movie}")
  end

  private

  def get_keywords(movie_id)
    api_key = Rails.application.credentials.api_key[:tmdb]
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
end
