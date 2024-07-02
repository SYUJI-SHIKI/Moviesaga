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
        user = User.find_by(uuid: params[:user_id].to_s)
        user_id = user.id

        movie = Movie.find_by(tmdb_id: params[:movie_id].to_s)
        movie_id = movie.id

        favorite = Favorite.new(movie_id: movie_id, user_id: user_id)
        
        if favorite.save
          puts "Favorite saved successfully"
        else
          puts "Failed to save favorite: #{favorite.errors.full_messages.join(", ")}"
        end
      end

      def destroy
        user = User.find_by(uuid: params[:user_id].to_s)
        user_id = user.id

        movie = Movie.find_by(tmdb_id: params[:movie_id].to_s)
        movie_id = movie.id

        favorite = Favorite.find_by(movie_id: movie_id, user_id: user_id)
        if favorite.destroy
          render json: { success: true }
        else
          render json: { error: 'Movie not found' }, status: :not_found
        end
      end
    end
  end
end
