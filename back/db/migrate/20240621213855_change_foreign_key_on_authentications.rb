class ChangeForeignKeyOnAuthentications < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :authentications, :users
    add_foreign_key :authentications, :users, on_delete: :cascade
  end
end
