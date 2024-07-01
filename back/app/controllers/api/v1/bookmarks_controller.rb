module Api
  module V1
    class BookmarksController < ApiController
      include BookmarkableMethods

      def index
        bookmark = Bookmark.find_by(collection_id: params[:collection_id], user_id: params[:user_id])
        render json: { isbookmark: bookmark.present? }
      end

      def create
        user = User.find_by(uuid: params[:user_id].to_s)
        collection = Collection.find_by(id: params[:collection_id].to_s)

        if user && collection
          bookmark = Bookmark.new(collection_id: collection.id, user_id: user.id)

          if bookmark.save
            render json: { success: true }
          else
            render json: { error: 'Failed to save bookmark', messages: bookmark.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: 'User or Collection not found' }, status: :not_found
        end
      end

      def destroy
        user = User.find_by(uuid: params[:user_id].to_s)
        collection = Collection.find_by(id: params[:collection_id].to_s)

        if user && collection
          bookmark = Bookmark.find_by(collection_id: collection.id, user_id: user.id)

          if bookmark && bookmark.destroy
            render json: { success: true }
          else
            render json: { error: 'Bookmark not found or failed to destroy' }, status: :not_found
          end
        else
          render json: { error: 'User or Collection not found' }, status: :not_found
        end
      end
    end
  end
end