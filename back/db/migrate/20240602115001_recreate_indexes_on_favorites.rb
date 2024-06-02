class RecreateIndexesOnFavorites < ActiveRecord::Migration[7.1]
  def change
    add_index :favorites, :movie_id, name: "index_favorites_on_movie_id"
    add_index :favorites, [:user_id, :movie_id], name: "index_favorites_on_user_id_and_movie_id", unique: true
  end
end
