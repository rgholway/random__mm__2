class Songs < ActiveRecord::Migration[5.2]
  def change
  create_table :songs do |t|
    t.string :name, null: false
    t.string :youtube, null: false
    t.string :vote
    t.string :first_characteristic
    t.string :second_characteristic
    t.string :art

    t.belongs_to :album

    t.timestamps null: false
  end
end
end
