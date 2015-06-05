module Api
	class DefaultTripsController < ApplicationController

		def index
			default_trips = DefaultTrip.all
			render json: default_trips
		end

		def create
      default_trip = DefaultTrip.new(default_trip_params)
      default_trip.save
      render json: default_trip.to_json
    end

    def destroy
      default_trip = DefaultTrip.find()
      default_trip.destroy
      render json: default_trip.to_json
    end

    private
      def default_trip_params
        params.require(:default_trip).permit(:trip_id, :default_item_id)
      end

	end
end