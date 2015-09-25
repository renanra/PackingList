Rails.application.routes.draw do
  devise_for :users

  # get '/test_page' => 'test_page#index'
  # post '/trips/:id', to: 'trips#create_default_items_trip', as: :create_default_items_trip
  # get '/trips/:id/activity_items_trip', to: 'trips#activity_items_trip', as: :activity_items_trip

  resources :trips do
    member do
      get :choose_activities

      put :update_activities
      put :update_default_items
    end

  end

  resources :items
  resource :calendar, only: [:show]

  namespace :api do
    resources :default_items
    resources :custom_items
  end

  root 'trips#new'
end
