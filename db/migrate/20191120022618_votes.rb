class Votes < ActiveRecord::Migration[5.2]
  def change
  create_table :votes do |t|

    t.timestamps null: false
  end
end
end
