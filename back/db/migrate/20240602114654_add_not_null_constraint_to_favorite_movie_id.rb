class AddNotNullConstraintToFavoriteMovieId < ActiveRecord::Migration[7.1]
  def change
    change_column :favorites, :movie_id, :integer, null: false
  end
end
