class RemoveUniqueConstraintFromCollectionsTitle < ActiveRecord::Migration[7.0]
  def up
    # 既存のユニークインデックスを削除
    remove_index :collections, name: "index_collections_on_title"
    
    # 新しい非ユニークインデックスを追加
    add_index :collections, :title
  end

  def down
    # 非ユニークインデックスを削除
    remove_index :collections, :title
    
    # ユニークインデックスを再追加
    add_index :collections, :title, unique: true
  end
end