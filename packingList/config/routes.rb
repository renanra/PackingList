Rails.application.routes.draw do
  devise_for :users

   root 'welcome#index'
   get '/test_page' => 'test_page#index' do
  
   end

   get '/trips/:id/saved_items_trip' => "trips#saved_items_trip", as: :saved_items_trip
   resources :trips do
    put :update_default_items, on: :member
   end
   resources :items
   resources :calendar
    get '/calendar' => 'calendar#index'
  
  # Example of regular route:
    # get '/trips', to: 'trips#new', as: :trip
    #post '/trips/:id', to: 'default_trips#create', as: :create
   post '/trips/:id', to: 'trips#create_default_items_trip', as: :create_default_items_trip
   delete '/trips', to: 'trips#destroy', as: :delete
  namespace :api do
      #get '/trips/:trip_id' => 'default_trips#joinMethod'
      #get '/api/default_trips' => 'default_trips#joinMethod'
      # resources :trips, except: [:new, :edit] do
      # resources :default_trips, except: [:new, :edit, :show]
    #   resources :trips do
    #   # post '/:id', to: 'trips#create'
    #   # resources :default_trips
    # end
      # post '/:id', to: 'trips#create'
      resources :default_items
      resources :custom_items
      # resources :default_trips
      # resources :custom_trips
  end

end
