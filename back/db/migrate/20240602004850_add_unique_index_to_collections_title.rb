class AddUniqueIndexToCollectionsTitle < ActiveRecord::Migration[7.1]
  def change
    add_index :collections, :title, unique: true
  end
end
