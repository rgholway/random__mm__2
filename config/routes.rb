Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  namespace :api do
    namespace :v1 do
      post 'songs/search', to: 'songs#search'
      resources :albums, only: [:index, :show]
      resources :songs, only: [:show, :update]
      resources :artists, only: [:index, :show]
      resources :tracks, only: [:show, :update]
      resources :votes, only: [:index, :update]
      resources :playlists, only: [:index, :show, :create, :new, :update]
    end
  end

  get '/', to: 'homes#index'
  get '/vote', to: 'homes#index'
  get '/fourth', to: 'homes#index'
  get '/vote/:id', to: 'homes#index'
  get '/mac', to: 'homes#index'
  get '/cudi', to: 'homes#index'
  get '/chance', to: 'homes#index'
  get '/travis', to: 'homes#index'
  post 'songs/search', to: 'songs#search'
end
