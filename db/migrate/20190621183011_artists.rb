class Artists < ActiveRecord::Migration[5.2]
  def change
    create_table :artists do |t|
      t.string :name, null: false
      t.string :short
      t.string :icon
      t.string :description
      t.string :first_letter
      t.string :second_letter
      t.string :third_letter
      t.string :first_name
      t.string :second_name
      t.string :third_name
      t.string :fourth_name

      t.timestamps null: false
    end
  end
end
