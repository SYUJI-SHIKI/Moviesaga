module Api
  module V1
    class BookmarksController < ApiController
      include BookmarkableMethods

      def index
        bookmark = Bookmark.find_by(collection_id: params[:collection_id], user_id: params[:user_id])
        render json: { isbookmark: bookmark.present? }
      end

      def create
        @collection = Collection.find(params[:collection_id])
        @bookmark = current_user.bookmarks.build(collection: @collection)
        if @bookmark.save
          render json: { message: 'bookmarkd successfully' }, status: :created
        else
          render json: { errors: @bookmark.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      def destroy
        @bookmark = current_user.bookmarks.find_by(collection_id: params[:id])
        if @bookmark&.destroy
          render json: { message: 'Unbookmarkd successfully' }, status: :ok
        else
          render json: { error: 'bookmark not found' }, status: :not_found
        end
      end  
    end
  end
end