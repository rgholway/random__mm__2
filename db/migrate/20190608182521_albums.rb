class Albums < ActiveRecord::Migration[5.2]
  def change
    create_table :albums do |t|
      t.string :title, null: false
      t.string :art
      t.string :short
      t.string :css
      t.string :color
      t.string :text
      t.string :font_size
      t.string :sneak_peek

      t.belongs_to :artist

      t.timestamps null: false
    end
  end
end
