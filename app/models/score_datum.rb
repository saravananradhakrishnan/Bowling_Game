class ScoreDatum < ApplicationRecord
  serialize :try_score, Array
  serialize :spare_score, Array
  belongs_to :user


  after_save do |s|
  	l = Leader.where(:game_id => s.game_id,:user_id => s.user_id).first
  	if l.present?
  		l.update_columns({:frame_count => s.frame_id,:score => s.subsequent_score})
  	else
  		Leader.create(:frame_count => s.frame_id,:score => s.subsequent_score,:user_id => s.user_id,:game_id => s.game_id)
  	end
  end
end
