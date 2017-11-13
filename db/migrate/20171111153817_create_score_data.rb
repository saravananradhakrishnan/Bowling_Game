class CreateScoreData < ActiveRecord::Migration[5.1]
  def self.up
    create_table :score_data do |t|
      t.integer :user_id
      t.integer :game_id
      t.integer :frame_id
      t.string :try_score
      t.integer :score
      t.integer :subsequent_score

      t.timestamps
    end
  end
  def self.down
    drop_table :score_data
  end
end
