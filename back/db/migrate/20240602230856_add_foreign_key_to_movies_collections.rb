class AddForeignKeyToMoviesCollections < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :movies_collections, :collections if foreign_key_exists?(:movies_collections, :collections)
    add_foreign_key :movies_collections, :collections, on_delete: :cascade

    remove_foreign_key :movies_collections, :movies if foreign_key_exists?(:movies_collections, :movies)
    add_foreign_key :movies_collections, :movies, on_delete: :cascade
  end
end
