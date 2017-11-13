class CreateLeaders < ActiveRecord::Migration[5.1]
  def change
    create_table :leaders do |t|
      t.integer :frame_count
      t.integer :score
      t.integer :user_id
      t.integer :game_id

      t.timestamps
    end
  end
end
