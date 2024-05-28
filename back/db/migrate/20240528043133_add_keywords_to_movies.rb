class AddKeywordsToMovies < ActiveRecord::Migration[7.1]
  def change
    add_column :movies, :keywords, :string
  end
end
