class AddYoutubeTrailerIdToMovies < ActiveRecord::Migration[7.1]
  def change
    add_column :movies, :youtube_trailer_id, :string
  end
end
