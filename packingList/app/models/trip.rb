class Trip < ActiveRecord::Base
	has_many :default_items, :through => :default_trips
	has_many :custom_items, :through => :custom_trips
	belongs_to :user
end