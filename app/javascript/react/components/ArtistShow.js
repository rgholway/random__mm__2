import React, { Component } from 'react'
import Example from './Example'
import AlbumTile from './AlbumTile'
import Animation from './Animation'
import Links from './Links'
import QueueTile from './QueueTile'
import { browserHistory } from 'react-router';
import {Link} from 'react-router';

class ArtistShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      song: [],
      album: "",
      active: "",
      artist: [],
      selected: "",
      what: "",
      artistName: "",
      artists: [],
      newSong: [],
      albums: [],
      youtube: "",
      queue: [],
      title: [],
      end: "",
      flash: "",
      flashActive: ""
    }
    this.playSong = this.playSong.bind(this)
    this.clickSong = this.clickSong.bind(this)
    this.link = this.link.bind(this)
    this.fetchArtist = this.fetchArtist.bind(this)
    this.nextSong = this.nextSong.bind(this)
    this.setSong = this.setSong.bind(this)
    this.removeName = this.removeName.bind(this)
  }

playSong() {
  let size = this.state.albums.length
  let num = (Math.floor(Math.random() * size))
  let album = this.state.albums[num].id
  let css = this.state.albums[num].css
    this.setState({album: `album${css}`, active: "active"})
      fetch(`/api/v1/albums/${album}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        let queue = this.state.queue
        queue.unshift(body.youtube)
        this.setState({ youtube: queue, active: "active" })
        this.setSong()
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  fetchArtist() {
      fetch(`/api/v1/artists/${this.props.params.name}`)
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(body => {
          this.setState({ albums: body[0], artist: body[1], artistName: body[2] })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    fetchArtists() {
        fetch(`/api/v1/artists`)
          .then(response => {
            if (response.ok) {
              return response;
            } else {
              let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
              throw(error);
            }
          })
          .then(response => response.json())
          .then(body => {
            this.setState({ artists: body[0] })
          })
          .catch(error => console.error(`Error in fetch: ${error.message}`));
      }

  clickSong(id) {
    fetch(`/api/v1/tracks/${id}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let queue = this.state.queue
      queue.unshift(body.youtube)
      this.setState({ youtube: queue, active: "active" })
      this.setSong()
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  nextSong(yt, title, id, active) {
    let queue = this.state.queue
    queue.push(yt)
    let name = this.state.title
    name.push([title, id])
    this.setState({ queue: queue, title: name, flash: `${title} added to queue!`, flashActive: `${active}`})
    setTimeout(() => {
      this.setState({ flash: "", flashActive: "" })
    }, 3000 )
    if(this.state.active == "") {
      this.setSong()
    }
  }

  setSong() {
    if(typeof this.state.queue[0] == "string") {
      let song = this.state.queue.shift()
      this.setState({ youtube: song, active: "active"})
    } else {
      this.playSong()
    }
  }

  removeName() {
    if(typeof this.state.title[0] == "object") {
      let name = this.state.title
      name.shift()
      this.setState({title: name})
      this.setSong()
    } else {
      this.setSong()
    }

  }

  link() {
    browserHistory.push(`/${this.props.short}`)
  }

  componentWillMount() {
    this.fetchArtist()
    this.fetchArtists()
  }

  render() {
    console.log(this.state.flash);
    let num = 0
    let albumArray = this.state.albums.map(album => {
      return(
        <AlbumTile
          key= {album.id}
          id= {album.id}
          name= {album.title}
          art= {album.art}
          css= {album.css}
          color= {album.color}
          text= {album.text}
          size= {album.font_size}
          clickSong= {this.clickSong}
          nextSong= {this.nextSong}
        />
      )
    })
    let queueArray = this.state.title.map(song => {
      num += 1
      return(
        <QueueTile
          key= {num}
          name= {song[0]}
          id= {song[1]}
          clickSong= {this.clickSong}
        />
      )
    })
    let artistsArray = this.state.artists.map(artist => {
      return(
        <Links
          key= {artist.id}
          name= {artist.name}
          short= {artist.short}
        />
      )
    })
    return(
      <div className="white">
        <div className="artists"><a className="home__link" href="/">|   Home</a>{artistsArray}</div>
        <div className={`youtube--${this.state.active}`}>
          <Example
            youtube= {this.state.youtube}
            songEnd= {this.removeName}
            randomSong = {this.playSong}
            nextSong= {this.state.queue[0]}
          />
        </div>
        <div className={`random__${this.state.artist.short}`}>
          <div className={`mac__face--${this.state.album}`}></div>
          <div className={`title--${this.state.artist.short}`} onClick={this.playSong}>{this.state.artistName}</div>
          {albumArray}
          <div className="play__song" onClick={this.playSong}>Click for Random Song</div>
          <div className="click__song" onClick={this.playSong}>Click Album to Select Song</div>
          <div className="queued__song--mobile" onClick={this.playSong}>Click Add To Q To Add Song</div>
          <div className="queued__song--desktop" onClick={this.playSong}>Right Click to Add Song to Queue</div>
          <div className={`circle--${this.state.album}`} onClick={this.playSong}></div>
        </div>
        <div className={`animation__box--${this.state.active}`}>
          <Animation
            name= {this.state.artist.short}
            firstLetter= {this.state.artist.first_letter}
            secondLetter= {this.state.artist.second_letter}
            thirdLetter= {this.state.artist.third_letter}
            firstName= {this.state.artist.first_name}
            secondName= {this.state.artist.second_name}
            thirdName= {this.state.artist.third_name}
            fourthName= {this.state.artist.fourth_name}
          />
        </div>
        <div className={`songs__queue--${this.state.active}`}>
          <div className="queue__title">Songs Queued</div>
          <div className="queued__tracks">{queueArray}</div>
        </div>
        <div className="cover"></div>
        <div className={`flash${this.state.flashActive}`}>{this.state.flash}</div>
      </div>
    )}
  }

  export default ArtistShow
