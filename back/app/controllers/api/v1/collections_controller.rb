module Api
  module V1
    class CollectionsController < ApiController
      def index
        items_per_page = params[:per] || 8
        @collections = Collection.includes(:movies).order(created_at: :desc).page(params[:page]).per(items_per_page)
        Rails.logger.debug(@collections.total_pages)

        collection_card = @collections.map do |collection|
          collection.as_json(include: :movies).merge(Image: collection.movies.first&.poster_path)
        end
        render json: { collections: collection_card, total_pages: @collections.total_pages }
      end

      def new
        @collection = Collection.new
        Rails.logger.debug("current_user: #{current_user.inspect}")
        if current_user.present?
          @movies = current_user.favorite_movies.page(params[:page]).per(9)
          Rails.logger.debug(@movies.count)
          render json: {
            collection: @collection,
            addMovies: @movies,
            total_pages: @movies.total_pages,
            current_page: @movies.current_page,
          }
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
        bookmarked = current_user.bookmark_collections.exists?(@collection.id)
        is_creator = @collection.user_id == current_user.id
        render json: {
          collection: @collection.as_json(include: :movies),
          bookmarked: bookmarked,
          is_creator: is_creator,
        }
      end

      def edit
        @collection = current_user.collections.find(params[:id])
        @selected_movies = @collection.movies
        @all_available_movies = current_user.favorite_movies.page(params[:page]).per(9)
        
        render json: {
          title: @collection.title,
          description: @collection.description,
          selectedMovies: @selected_movies,
          allAvailableMovies: @all_available_movies,
          selectedMovieIds: @selected_movies.pluck(:id),
          total_pages: @all_available_movies.total_pages,
          current_page: @all_available_movies.current_page,
        }
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
        items_per_page = params[:per] || 8

        @collections = current_user.collections.includes(:user).order(created_at: :desc).page(params[:page]).per(items_per_page)
        collection_card = @collections.map do |collection|
          collection.as_json(include: :movies).merge(Image: collection.movies.first&.poster_path)
        end
        render json: { collections: collection_card, total_pages: @collections.total_pages }
      end

      def bookmark
        items_per_page = params[:per] || 8

        @collections = current_user.bookmark_collections.includes(:user).order(created_at: :desc).page(params[:page]).per(items_per_page)
        collection_card = @collections.map do |collection|
          collection.as_json(include: :movies).merge(Image: collection.movies.first&.poster_path)
        end
        render json: { collections: collection_card, total_pages: @collections.total_pages }
      end

      private

      def collection_params
        params.require(:collection).permit(:title, :description, movie_ids: [])
      end
    end
  end
end