module Bookmarkable
  extend ActiveSupport::Concern

  def bookmark(collection)
    bookmark_collections << collection
  end

  def unbookmark(collection)
    bookmark_collections.destroy(collection)
  end

  def bookmark?(collection)
    collection.bookmarks.pluck(:user_id).include?(id)
  end
end