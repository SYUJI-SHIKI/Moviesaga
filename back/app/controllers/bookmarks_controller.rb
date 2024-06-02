class BookmarksController < ApplicationController
  def create
    @collection = Collection.find(params[:collection_id])
    current_user.bookmark(@collection)
  end

  def destroy
    @collection = current_user.bookmarks.find(params[:id]).collection
    current_user.unbookmark(@collection)
  end
end
