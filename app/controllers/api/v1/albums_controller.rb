class Api::V1::AlbumsController < ApplicationController

  def index
    artist = Artist.find(1)
    albums = artist.albums.reverse
    render json: albums
  end

  def show
    album = Album.find(params["id"])
    songs = album.songs
    selected_song = songs.sample
    render json: selected_song
  end

end
