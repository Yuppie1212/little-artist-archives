Rails.application.routes.draw do
  # ── Web UI（Devise + ERB ビュー） ──────────────────────────
  devise_for :users, controllers: {
    sessions:      "users/sessions",
    registrations: "users/registrations"
  }

  resources :children do
    resources :artworks
  end

  root to: "children#index"

  # ── JSON API ───────────────────────────────────────────────
  namespace :api, defaults: { format: :json } do
    namespace :auth do
      post   "login",  to: "sessions#create"
      delete "logout", to: "sessions#destroy"
      post   "signup", to: "registrations#create"
      get    "me",     to: "sessions#me"
    end

    resources :children do
      resources :artworks
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
