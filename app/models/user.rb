class User < ApplicationRecord
has_many :score_data
has_many :leaders
end
