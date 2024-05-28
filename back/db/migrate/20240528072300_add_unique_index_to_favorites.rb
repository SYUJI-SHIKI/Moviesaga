class AddUniqueIndexToFavorites < ActiveRecord::Migration[7.1]
  def change
    add_index :favorites, [:user_id, :movie_id], unique: true
  end
end
