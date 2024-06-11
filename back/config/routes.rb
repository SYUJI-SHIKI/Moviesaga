Rails.application.routes.draw do
  root "static_pages#top"
  devise_for :users, controllers: { registrations: 'users/registrations' }
  resource :profile, only: %i[show edit update]
  # resolve('Profile') { [:profile] }
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

  get "up" => "rails/health#show", as: :rails_health_check

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  namespace :api, format: 'json' do
    namespace :v1 do
      devise_for :users, controllers: { registrations: 'users/registrations' }
      resource :profile, only: %i[show edit update]
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
    
      get "up" => "rails/health#show", as: :rails_health_check
    
      if Rails.env.development?
        mount LetterOpenerWeb::Engine, at: "/letter_opener"
      end
    end
  end
end
