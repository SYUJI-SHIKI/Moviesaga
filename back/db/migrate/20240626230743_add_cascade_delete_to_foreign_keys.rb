class AddCascadeDeleteToForeignKeys < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :bookmarks, :users
    remove_foreign_key :collections, :users
    remove_foreign_key :favorites, :movies
    remove_foreign_key :favorites, :users

    add_foreign_key :bookmarks, :users, on_delete: :cascade
    add_foreign_key :collections, :users, on_delete: :cascade
    add_foreign_key :favorites, :movies, on_delete: :cascade
    add_foreign_key :favorites, :users, on_delete: :cascade
  end
end
