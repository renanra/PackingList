module Api
	class DefaultItemsController < ApplicationController
		def index
			default_items = DefaultItem.all
			render json: default_items
		end
	end
end