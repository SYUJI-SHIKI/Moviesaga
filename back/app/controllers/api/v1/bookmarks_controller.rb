module Api
  module V1
    class BookmarksController < ApiController
      def create
        @collection = Collection.find_by(id: params[:collection_id])
        if @collection
          current_user.bookmark(@collection)
          render json: { success: true }
        else
          render json: { error: 'Movie not found' }, status: :not_found
        end
      end
    
      def destroy
        bookmark = current_user.bookmarks.find_by(id: params[:id])
        if @bookmark
          @collection = bookmark.collection
          current_user.unbookmark(@collection)
          render json: {success: true}
        else
          render json: { error: 'Movie not found' }, status: :not_found
        end
      end
    end
  end
end