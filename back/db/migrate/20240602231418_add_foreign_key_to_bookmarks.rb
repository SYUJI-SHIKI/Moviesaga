class AddForeignKeyToBookmarks < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :bookmarks, :collections if foreign_key_exists?(:bookmarks, :collections)
    add_foreign_key :bookmarks, :collections, on_delete: :cascade
  end
end
