import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PlaylistTile from './PlaylistTile';
import VoteVideo from './VoteVideo';
import SearchBar from './SearchBar';
import SearchTile from './SearchTile';

class PlaylistShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      youtube: "",
      id: "",
      setting: "--play--active",
      play: "",
      status: "played",
      name: "video--vote--active",
      mode: "dark",
      side: "left",
      songs: [],
      activeSearch: "inactive",
      active: "",
      index: "",
      seconds: 0,
      stop: "",
      timer: 0,
      currentSong: ""
        }
      this.fetchPlaylist = this.fetchPlaylist.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.handleRight = this.handleRight.bind(this)
      this.handleLeft = this.handleLeft.bind(this)
      this.handleShuffle = this.handleShuffle.bind(this)
      this.handleMode = this.handleMode.bind(this)
      this.searchSong = this.searchSong.bind(this)
      this.handleAdd = this.handleAdd.bind(this)
      this.handleEnd = this.handleEnd.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      this.getTime = this.getTime.bind(this)
      this.startTimer = this.startTimer.bind(this)
      this.stopTimer = this.stopTimer.bind(this)
  }

  fetchPlaylist() {
    fetch(`/api/v1/playlists/${this.props.params.id}`)
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
      this.setState({ playlist: body, youtube: body[0][2], index: 0, currentSong: body[0][1] });
    })
  }

  getTime(time) {
    this.setState({ seconds: time })
  }

  handleClick(id, youtube, place) {
    this.setState({ id: id, youtube: youtube, name: "video--vote--active", index: place, currentSong: this.state.playlist[place][1]})
  }

  handleAdd(id) {
    let jsonStringInfo = JSON.stringify(id)
      fetch(`/api/v1/tracks/${this.props.params.id}`, {
        method: 'PUT',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      .then(body => {
        this.setState({ playlist: body, active: "" });
      })
  }

  handleRight() {
    let index = this.state.index + 1
    this.setState( { youtube: this.state.playlist[index][2], index: index, currentSong: this.state.playlist[index][1]})
  }

  handleLeft() {
    let index = this.state.index - 1
    this.setState( { youtube: this.state.playlist[index][2], index: index, currentSong: this.state.playlist[index][1]})
  }

  handleShuffle() {
      fetch(`/api/v1/songs/${this.props.params.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      .then(body => {
        this.setState({ playlist: body });
      })
  }

  handleMode() {
    if (this.state.mode == "dark") {
      this.setState({ mode: "light", side: "left" })
    }
    else {
      this.setState({ mode: "dark", side: "right" })
    }
  }

  handleDelete(id) {
    let jsonStringInfo = JSON.stringify(id)
      fetch(`/api/v1/votes/${this.props.params.id}`, {
        method: 'PUT',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      .then(body => {
        this.setState({ playlist: body });
      })
  }

  handleEnd() {
    if (this.state.youtube != "") {
      this.setState({ youtube: "stop", status: "paused"})
    }
    if (this.state.youtube == "stop") {
      this.setState({ youtube: this.state.playlist[this.state.index][2], status: "played"})
    }
  }

  searchSong(song) {
    this.setState({ songs: song, active: "--active"})
  }

  startTimer() {
    this.setState({ stop: "" })
    if (this.state.youtube != "stop") {
      this.timer = setInterval(this.timerStart.bind(this), 1000)
    }
    }

    timerStart() {
      this.setState({ timer: this.state.timer + 1 })
      if (this.state.stop == "stop") {
        clearInterval(this.timer)
        return
      }
    }

    stopTimer() {
      this.setState({ stop: "stop"})
    }


  componentWillMount() {
    this.fetchPlaylist()
  }

  render() {
    let songsArray = this.state.songs.map( song => {
      return(
        <SearchTile
          key= {song.id}
          id= {song.id}
          name= {song.name}
          youtube= {song.youtube}
          onClick= {this.handleAdd}
          active= {this.state.active}
        />
      )
    })
    let i = -1
    let playlistArray = this.state.playlist.map( playlist => {
      i += 1
      return(
        <PlaylistTile
          key= {playlist[0]}
          id= {playlist[0]}
          place= {i}
          name= {playlist[1]}
          youtube= {playlist[2]}
          onClick= {this.handleClick}
          delete= {this.handleDelete}
          dark= {this.state.mode}
        />
      )
    })
    return (
      <div className={this.state.mode}>
        <div className="playlist__search">
          <SearchBar
            searchSong= {this.searchSong}
          />
        </div>
        <div className={`song__playlist--${this.state.mode}`}>
          {playlistArray}
        </div>
        <div className={`mode--${this.state.mode}`} onClick={this.handleMode}>
          <div className={`mode--button--${this.state.mode}`}></div>
          <div className={`words--${this.state.mode}`}></div>
        </div>
          <VoteVideo
            key= {this.state.id}
            youtube= {this.state.youtube}
            status= {this.state.status}
            className= {this.state.name}
            handleRight= {this.handleRight}
            handleLeft= {this.handleLeft}
            handleShuffle= {this.handleShuffle}
            mode= {this.state.mode}
            handleEnd= {this.handleEnd}
            seconds= {this.state.timer}
            getTime= {this.getTime}
            startTimer= {this.startTimer}
            stopTimer= {this.stopTimer}
            currentSong= {this.state.currentSong}
            index= {this.state.index}
          />
          <div className={`songs__search${this.state.active}`}> {songsArray} </div>
      </div>
    )
  }
}

export default PlaylistShow
