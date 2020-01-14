class Api::V1::UsersController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }

  def update
    if current_user == nil
      render json: ["none"]
    end
    if current_user
      if current_user.playlists == nil
        current_user.update(playlists: [])
      end
      playlists = current_user.playlists
      selected_playlist = Playlist.find(user_params[:id])
      playlists.push(selected_playlist.id)
      current_user.update(playlists: playlists)
    end
  end

  def show
    playlists = current_user.playlists
    render json: playlists
  end

  def user_params
    params.permit(:id)
  end

end
