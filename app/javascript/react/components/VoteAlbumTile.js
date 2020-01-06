import React, { Component } from 'react';

class VoteAlbumTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistId: ""
        }
      this.handleHover = this.handleHover.bind(this)
      this.handleLeave = this.handleLeave.bind(this)
      this.createPlaylist = this.createPlaylist.bind(this)
  }

  handleHover() {
    this.props.handleHover("", this.props.sneak)
  }

  handleLeave() {
    this.props.handleHover("", "")
  }

  createPlaylist() {
    let jsonStringInfo = JSON.stringify(this.props.name)
      fetch(`/api/v1/playlists`, {
        method: 'POST',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      .then(body => {
        this.props.playlistId(body)
      })
      this.props.playlistQuestions("--second")
      }

  render() {
    return (
      <div>
        <div className="album__vote" onClick={this.createPlaylist} onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave}>
          <img src={this.props.art}/>
        </div>
      </div>
    )
  }
}

export default VoteAlbumTile
