import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import {Link} from 'react-router';
import VoteTile from './VoteTile'
import VoteAlbumTile from './VoteAlbumTile'
import VoteVideo from './VoteVideo'
import ThirdQuestion from './ThirdQuestion'
import FourthQuestion from './FourthQuestion'
import FifthQuestion from './FifthQuestion'

class Vote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: [],
      youtube: "",
      active: "",
      status: "--first",
      albums: [],
      playlistId: ""
    }

    this.fetchSongs = this.fetchSongs.bind(this)
    this.fetchAlbums = this.fetchAlbums.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.playlistQuestions = this.playlistQuestions.bind(this)
    this.playlistId = this.playlistId.bind(this)

  }

    fetchSongs() {
      fetch(`/api/v1/votes`)
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
          this.setState({ songs: body })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    fetchAlbums() {
      fetch(`/api/v1/albums`)
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
          this.setState({ albums: body })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    handleHover(active, youtube) {
      this.setState({ active: active, youtube: youtube})
    }

    playlistQuestions(question) {
      this.setState({ status: question })
    }

    playlistId(id) {
      this.setState({ playlistId: id })
    }

    componentWillMount() {
      this.fetchSongs()
      this.fetchAlbums()
    }

  render() {
    let songArray = this.state.songs.map(song => {
      return(
        <VoteTile
          key= {song.id}
          id= {song.id}
          name= {song.name}
          youtube= {song.youtube}
          category= {song.first_characteristic}
          handleHover= {this.handleHover}
          art= {song.art}
          playlistQuestions= {this.playlistQuestions}
          playlistId= {this.state.playlistId}
        />
      )
    })

    let albumArray = this.state.albums.map(album => {
      return(
        <VoteAlbumTile
          key= {album.id}
          id= {album.id}
          name= {album.title}
          art= {album.art}
          sneak= {album.sneak_peek}
          handleHover= {this.handleHover}
          playlistQuestions= {this.playlistQuestions}
          playlistId= {this.playlistId}
        />
      )
    })

    return(
      <div className="white">
        <div className={`vote__albums--title${this.state.status}`}>Choose Your Favorite Album</div>
        <div className={`vote__albums--info${this.state.status}`}>Hover over Album to Hear a Sneak Peek</div>
          <div className={`vote__albums${this.state.status}`}>
            {albumArray}
          </div>
          <div className={`vote__songs--title${this.state.status}`}>Choose Your Favorite Song</div>
          <div className={`vote__songs--info${this.state.status}`}>Hover over Song to Listen</div>
          <div className={`vote__songs${this.state.status}`}>
            {songArray}
          </div>
          <div className={`vote__thirdQuestion--title${this.state.status}`}>Do You Prefer Faster Songs or Slower Songs?</div>
          <div className={`vote__thirdQuestion--info${this.state.status}`}>Hover for Sneak Peek</div>
          <div className={`vote__thirdQuestion${this.state.status}`}>
            <ThirdQuestion
              playlistQuestions= {this.playlistQuestions}
              handleHover= {this.handleHover}
              playlistId= {this.state.playlistId}
            />
          </div>
          <div className={`vote__fourthQuestion--title${this.state.status}`}>Do You Prefer Funkier or Trippier Songs?</div>
          <div className={`vote__fourthQuestion--info${this.state.status}`}>Hover for Sneak Peek</div>
          <div className={`vote__fourthQuestion${this.state.status}`}>
            <FourthQuestion
              playlistQuestions= {this.playlistQuestions}
              handleHover= {this.handleHover}
              playlistId= {this.state.playlistId}
            />
          </div>
          <div className={`vote__fifthQuestion--title${this.state.status}`}>Do You Prefer Older or Newer Mac?</div>
          <div className={`vote__fifthQuestion${this.state.status}`}>
            <FifthQuestion
              playlistQuestions= {this.playlistQuestions}
              handleHover= {this.handleHover}
              playlistId= {this.state.playlistId}
            />
          </div>
          <div className={`vote--video--${this.state.active}`}>
            <VoteVideo
              youtube= {this.state.youtube}
              onClick= {this.handleHover}
              playlistId= {this.state.playlistId}
            />
          </div>
      </div>
    )}
  }

  export default Vote
