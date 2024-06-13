module Api
  module V1
    class FavoritesController < ApiController
      def create
        @movie = Movie.find_by(id: params[:movie_id])
        if @movie
          current_user.favorite(@movie)
          render json: { success: true }
        else
          render json: { error: 'Movie not found' }, status: :not_found
      end

      def destroy
        favorite = current_user.favorites.find_by(id: params[:id])
        if favorite
          @movie = favorite.movie
          current_user.unfavorite(@movie)
          render json: { success: true }
        else
          render json: { error: 'Movie not found' }, status: :not_found
        end
      end
    end
  end
end
