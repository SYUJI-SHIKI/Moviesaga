module Api
  module V1
    class CollectionsController < ApiController
      def index
        @collections = Collection.includes(:movies).order(created_at: :desc)
        collection_card = @collections.map do |collection|
          collection.as_json(include: :movies).merge(Image: collection.movies.first&.poster_path)
        end
        render json: collection_card
      end

      def new
        @collection = Collection.new
        Rails.logger.debug("current_user: #{current_user.inspect}")
        if current_user.present?
          Rails.logger.debug('いるよ')
          @movies = current_user.favorite_movies
          render json: { collection: @collection, addMovies: @movies }
        else
          Rails.logger.debug('current_userがいません')
          render json: { error: 'User not authenticated' }, status: :unauthorized
        end
      end

      def create
        @collection = current_user.collections.build(collection_params)
        if @collection.save
          render json: @collection, status: :created
        else
          @movies = current_user.favorite_movies
          render json: { errors: @collection.errors.full_messages, movies: @movies }, status: :unprocessable_entity
        end
      end

      def show
        @collection = Collection.find(params[:id])
        render json: @collection, include: :movies
      end

      def edit
        @collection = current_user.collections.find(params[:id])
        @movies = @collection.movies
        @add_movies = current_user.favorite_movies.where.not(id: @movies.pluck(:id))
        render json: { title: @collection.title, description: @collection.description, movies: @movies, addMovies: @add_movies }
      end

      def update
        @collection = current_user.collections.find(params[:id])
        if @collection.update(collection_params)
          render json: @collection
        else
          render json: { errors: @collection.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        collection = current_user.collections.find(params[:id])
        collection.destroy!
        head :no_content
      end

      def my_lists
        @collections = current_user.collections.includes(:user).order(created_at: :desc)
        render json: @collections, include: :user
      end

      def bookmark
        @collections = current_user.bookmark_collections.includes(:user).order(created_at: :desc)
        render json: @collections, include: :user
      end

      private

      def collection_params
        params.require(:collection).permit(:title, :description, movie_ids: [])
      end
    end
  end
end