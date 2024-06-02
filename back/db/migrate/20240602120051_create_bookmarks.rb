class CreateBookmarks < ActiveRecord::Migration[7.1]
  def change
    create_table :bookmarks do |t|
      t.references :user, foreign_key: true
      t.references :collection, foreign_key: true

      t.timestamps
    end

    add_index :bookmarks, [:user_id, :collection_id], unique: true
  end
end
