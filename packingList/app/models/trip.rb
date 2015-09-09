class Trip < ActiveRecord::Base
	# serialize :default_item_ids
	validates_presence_of :destination, :start_date, :end_date
	# has_many :default_trips
	# has_many :custom_trips
	# has_and_belongs_to_many :default_items
	has_many :trip_default_items
	has_many :default_items, through: :trip_default_items
	# has_many :default_items
	# has_many :default_items, through: :default_trips
	# has_many :custom_items, through: :custom_trips
	belongs_to :user
	after_create :populate_default_items

	def populate_default_items
		DefaultItem.ids.each do |id|
			trip_default_items.create!(default_item_id: id)
		end
	end
	accepts_nested_attributes_for :trip_default_items
end