class Playlist < ActiveRecord::Migration[5.2]
  def change
    create_table :playlists do |t|
      t.string :title, null: false
      t.string :password
      t.string :favorite__song
      t.string :favorite__category
      t.string :second__category
      t.string :third__category
      t.string :image
      t.string :songs, array: true

      t.timestamps null: false
    end
  end
end
