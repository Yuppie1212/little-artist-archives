Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: "users/registrations"
  }

  resources :children do
    resources :artworks
  end

  root to: "children#index"

  get "up" => "rails/health#show", as: :rails_health_check
end
