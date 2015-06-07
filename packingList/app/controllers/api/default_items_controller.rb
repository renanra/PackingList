module Api
	class DefaultItemsController < ApplicationController
		def index
			default_items = DefaultItem.where(:id => 1..20)
			render json: default_items
		end
	end
end