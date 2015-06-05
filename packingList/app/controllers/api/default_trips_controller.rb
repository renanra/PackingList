module Api
	class DefaultTripsController < ApplicationController

		def index
			default_trips = DefaultTrip.all
			render json: default_trips
		end


    def new 
    default_trip = DefaultTrip.new
    end

		def create
      default_trip = DefaultTrip.new(default_trip_params)
      #default_trip = DefaultTrip.new(params[:trip_id, :default_item_id])
      
      # @trip.start_date = params[:start_date]
      # @trip.end_date = params[:end_date]
      # @trip.id = params[:id]
      default_trip.save
      # render json: {default_items: default_items}
      render json: default_trip.to_json
    end

    def destroy
      default_trip = DefaultTrip.find(params[:id])
      default_trip.destroy
      render json: default_trip.to_json
    end

    private
      def default_trip_params
        params.permit(:trip_id, :default_item_id)
        # params.require(:default_trip).permit(:trip_id, :default_item_id)
      end

	end
end