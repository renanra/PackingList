Rails.application.routes.draw do
  devise_for :users
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
   root 'welcome#index'
   get '/test_page' => 'test_page#index'
   get '/trips/:id/saved_items_trip' => "trips#saved_items_trip", as: :saved_items_trip
   resources :trips
   resources :items
   resources :calendar
    get '/calendar' => 'calendar#index'
  
  # Example of regular route:
    # get '/trips', to: 'trips#new', as: :trip
    #post '/trips/:id', to: 'default_trips#create', as: :create
   post '/trips/:id', to: 'trips#create_default_items_trip', as: :create_default_items_trip
  namespace :api do
      #get '/trips/:trip_id' => 'default_trips#joinMethod'
      #get '/api/default_trips' => 'default_trips#joinMethod'
      # resources :trips, except: [:new, :edit] do
      # resources :default_trips, except: [:new, :edit, :show]
      resources :trips do
      # post '/:id', to: 'trips#create'
      resources :default_trips
    end

      resources :trips do
      # post '/:id', to: 'trips#create'
end
      resources :default_items
      resources :custom_items
      resources :default_trips
      resources :custom_trips
  end

  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
