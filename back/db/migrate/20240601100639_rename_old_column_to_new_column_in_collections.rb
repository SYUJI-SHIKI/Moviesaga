class RenameOldColumnToNewColumnInCollections < ActiveRecord::Migration[7.1]
  def change
    rename_column :collections, :name, :title
  end
end
