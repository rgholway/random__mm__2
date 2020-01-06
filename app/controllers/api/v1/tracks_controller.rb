class Api::V1::TracksController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }

  def show
    song = Song.find(params[:id])
    render json: song
  end

  def update
    playlist = Playlist.find(playlist_params[:id])
    songs = playlist.songs
    selected_song = Song.find(playlist_params[:_json])
    selected = [selected_song.id.to_s, selected_song.name, selected_song.youtube]
    songs.push(selected)
    playlist.update(songs: songs)
    render json: songs
  end

  def playlist_params
    params.permit(:_json, :id)
  end

end
