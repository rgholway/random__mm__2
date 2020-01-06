import React, { Component } from 'react';
import SongTile from './SongTile'

class AlbumTile extends Component {
  constructor(props) {
    super(props);
    this.state = {album: "",
      hover: "",
      songs: [],
      song: "",
      youtube: ""
        }
        this.handleHover = this.handleHover.bind(this)
        this.handleLeave = this.handleLeave.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
        this.clickSong = this.clickSong.bind(this)
        this.playNext = this.playNext.bind(this)
  }

  handleHover() {
    this.setState({album: `${this.props.css}`, hover: "hover"})
    fetch(`/api/v1/songs/${this.props.id}`)
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

  handleLeave() {
    this.setState({album: "", hover: ""})
  }

  handleEnter() {
    this.setState({hover: "hover"})
  }

  clickSong(id) {
    this.props.clickSong(id)
  }

  playNext(yt, title, id, active) {
    this.props.nextSong(yt, title, id, active)
  }

  render() {
    let num = 0
    let songsArray = this.state.songs.map(song => {
      num += 1
      return(
        <SongTile
          key= {song.id}
          id= {song.id}
          title= {song.name}
          youtube= {song.youtube}
          onClick= {this.clickSong}
          num= {num}
          onNext= {this.playNext}
        />
    )
    })
    return (
      <div>
        <div>
          <img className={this.props.css} src={this.props.art} onMouseEnter={this.handleHover}/>
        </div>
        <div className={`hover--${this.state.album}`} onMouseEnter={this.handleEnter} onClick={this.handleEnter} onMouseLeave={this.handleLeave}>
          <div style={{background: this.props.color, color: this.props.text, fontSize: this.props.size}} className={`title__${this.state.hover}`}>{this.props.name}</div>
          <div className={`songs__${this.state.hover}`}>{songsArray}</div>
        </div>
      </div>
    )
  }
}

export default AlbumTile
