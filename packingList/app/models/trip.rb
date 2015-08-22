class Trip < ActiveRecord::Base
	# serialize :default_item_ids
	validates_presence_of :destination, :start_date, :end_date
	# has_many :default_trips
	# has_many :custom_trips
	has_and_belongs_to_many :default_items
	# has_many :default_items
	# has_many :default_items, through: :default_trips
	# has_many :custom_items, through: :custom_trips
	belongs_to :user
end