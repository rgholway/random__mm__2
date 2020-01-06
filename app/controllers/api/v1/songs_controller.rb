class Api::V1::SongsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Song.find(params[:id])
  end

  def show
    album = Album.find(params[:id])
    songs = album.songs.reverse
    render json: songs
  end

  def update
    playlist = Playlist.find(playlist_params[:id])
    songs = playlist.songs
    shuffled_songs = songs.shuffle
    shuffled_songs_second = shuffled_songs.shuffle
    playlist.update(songs: shuffled_songs_second)
    render json: shuffled_songs_second
  end

  def search
    @songs = Song.where("name ILIKE ?", "%#{params['search_string']}%")
    render json: @songs
  end

  def playlist_params
    params.permit(:_json, :id)
  end

end
