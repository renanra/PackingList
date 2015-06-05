class DefaultItem < ActiveRecord::Base
	has_many :default_trips
	has_many :trips, through: :default_trips
end