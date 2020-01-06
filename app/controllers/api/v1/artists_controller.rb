class Api::V1::ArtistsController < ApplicationController

  def index
    artists = Artist.all
    random = artists.sample.short
    render json: [artists, random]
  end

  def show
    artist = Artist.find_by(short: params["id"])
    albums = artist.albums
    artist_name = artist.name.upcase
    render json: [albums, artist, artist_name]
  end

end
