class CreateMovies < ActiveRecord::Migration[7.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.text :overview
      t.string :postpath
      t.integer :runtime
      t.string :language
      t.string :status
      t.date :release_date
      t.json :genres

      t.timestamps
    end
  end
end
