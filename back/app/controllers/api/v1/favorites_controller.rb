module Api
  module V1
    class FavoritesController < ApiController
      include FavoritableMethods

      def index
        @movies = current_user.favorite_movies
        Rails.logger.debug(@movies)
  
        if @movies
          render json: { movies: @movies }, status: :ok
        else
          render json: { message: 'Favorite not found' }, status: :not_found
        end
      end

      def create
        @movie = Movie.find(params[:movie_id])
        @favorite = current_user.favorites.build(movie: @movie)
        if @favorite.save
          render json: { message: 'Favorited successfully' }, status: :created
        else
          render json: { errors: @favorite.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      def destroy
        @favorite = current_user.favorites.find_by(movie_id: params[:id])
        if @favorite&.destroy
          render json: { message: 'Unfavorited successfully' }, status: :ok
        else
          render json: { error: 'Favorite not found' }, status: :not_found
        end
      end    
    end
  end
end
