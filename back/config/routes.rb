Rails.application.routes.draw do
  root "static_pages#top"
  devise_for :users, controllers: { registrations: 'users/registrations' }
  resource :profile, only: %i[show edit update]
  resolve('Profile') { [:profile] }
  resources :movies, only: %i[index show] do
    collection do
      get 'random'
      get 'favorite'
    end
  end
  resources :collections do
    collection do
      get 'my_lists'
      get 'bookmark'
    end
  end
  get 'search', to: 'searches#search'
  resources :favorites, only: %i[create destroy]
  resources :bookmarks, only: %i[create destroy]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
