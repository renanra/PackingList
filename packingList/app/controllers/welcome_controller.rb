class WelcomeController < ApplicationController
	def 
		if current_user
  		redirect_to root_path
  	end
end
