class CreateMoviesCollections < ActiveRecord::Migration[7.1]
  def change
    create_table :movies_collections do |t|
      t.references :collection, null: false, foreign_key: true
      t.references :movie, null: false, foreign_key: true

      t.timestamps
    end

    add_index :movies_collections, [:collection_id, :movie_id], unique: true
  end
end
