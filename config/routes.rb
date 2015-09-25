Rails.application.routes.draw do
  devise_for :users

  get '/calendar' => 'calendar#index'
  get '/test_page' => 'test_page#index'
  get '/trips/:id/activity_items_trip', to: 'trips#activity_items_trip', as: :activity_items_trip
  get '/trips/:id/saved_items_trip' => "trips#saved_items_trip", as: :saved_items_trip

  post '/trips/:id', to: 'trips#create_default_items_trip', as: :create_default_items_trip

  delete '/trips', to: 'trips#destroy', as: :delete

  resources :trips do
    put :update_default_items, on: :member
  end

  resources :items
  resources :calendar

  namespace :api do
    resources :default_items
    resources :custom_items
  end

  root 'trips#new'
end
