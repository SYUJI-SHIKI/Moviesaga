module Api
  module V1
    class MoviesController < ApiController
      skip_before_action :authenticate_user!
      def index ;end

      def show
        movie_data = MovieFetcher.movie_data_detail(params[:id])
        Rails.logger.debug("kkkkkkkk#{movie_data}")
        @video_id = fetch_youtube_video(movie_data["original_title"])
        @keywords = get_keywords(movie_data["id"])
        Rails.logger.debug("dddddddd#{@video_id}")
        @movie = MovieSaverService.save_movie(movie_data, @video_id,@keywords)

        render json: {
          movie: {
            tmdb_id: @movie.tmdb_id,
            original_title: @movie.original_title,
            overview: @movie.overview,
            poster_path: @movie.poster_path,
            runtime: @movie.runtime,
            original_language: @movie.original_language,
            status: @movie.status,
            release_date: @movie.release_date,
            genres: @movie.genres.map { |genre| { id: genre["id"], name: genre["name"] } },
            youtube_trailer_id: @movie.youtube_trailer_id,
          },
        }
      end

      def random
        language = params[:language]
        selected_runtime = params[:selected_runtime]
        keyword = params[:keyword]
        genre = params[:genre]

        if keyword == "now_playing"
          @movie_id = NowPlayingMovie.random_playing_movie(language: language,selected_runtime: selected_runtime)
        elsif params.empty? || params.nil?
          @movie_id = MovieRandom.get_random_movie
        else
          Rails.logger.debug("ここを見てくれ！！！！！！#{selected_runtime}")
          @movie_id = SelectRandomMovie.select_random_movie(language, selected_runtime, keyword, genre)
        end

        Rails.logger.debug("ここを見てくれ！！！！！！#{@movie_id}")
        if @movie_id.present?
          render  json: { id: @movie_id }, status: :ok
        else
          render json: { error: '条件に合う映画が見つかりませんでした。' }, status: :unprocessable_entity
        end
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
  end
end