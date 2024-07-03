module Api
  module V1
    class ProfilesController < ApiController
      def show
        @movies = current_user.favorite_movies
        @collections = current_user.bookmark_collections

        Rails.logger.debug(current_user)
  
        render json: { user: current_user, movies: @movies, collections: @collections }
      end
  
      def edit
        @user = User.find(current_user.id)
        render json: { user: @user }
      end
  
      def update
        @user = User.find(current_user.id)
        if @user.update(user_params)
          render json: @user
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      private
  
      def user_params
        params.require(:profile).permit(:name, :email, :avatar)
      end
    end
  end
end
