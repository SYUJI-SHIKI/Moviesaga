class UpdateCollectionsAndUsers < ActiveRecord::Migration[7.1]
  def change
    change_column :collections, :title, :string, limit: 20, null: false

    change_column :collections, :description, :text, limit: 130

    add_index :users, :name, unique: true
  end
end
