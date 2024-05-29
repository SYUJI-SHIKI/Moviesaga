class RenameOldColumnToNewColumnInMovies < ActiveRecord::Migration[7.1]
  def change
    rename_column :movies, :postpath, :poster_path
    rename_column :movies, :language, :original_language
    rename_column :movies, :title, :original_title
  end
end
