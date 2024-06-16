class AddColumnsToUsers < ActiveRecord::Migration[7.1]
  def change
    # Add columns individually to users table
    add_column :users, :provider, :string, null: false, default: "email"
    add_column :users, :uid, :string, null: false, default: ""
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmed_at, :datetime
    add_column :users, :confirmation_sent_at, :datetime
    add_column :users, :unconfirmed_email, :string
    add_column :users, :nickname, :string
    add_column :users, :image, :string
    add_column :users, :tokens, :json, default: {}
    add_column :users, :allow_password_change, :boolean, default: false

    # Populate uid with unique values for existing records
    reversible do |dir|
      dir.up do
        User.find_each do |user|
          user.update_columns(uid: SecureRandom.uuid) if user.uid.blank?
        end
      end
    end

    # Add the final unique indexes
    add_index :users, [:uid, :provider], unique: true
    add_index :users, :confirmation_token, unique: true
  end
end
