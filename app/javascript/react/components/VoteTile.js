import React, { Component } from 'react';

class VoteTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: ""
        }
        this.handleHover = this.handleHover.bind(this)
        this.handleLeave = this.handleLeave.bind(this)
        this.updatePlaylist = this.updatePlaylist.bind(this)
  }

  handleHover() {
    this.props.handleHover("", this.props.youtube)
  }

  handleLeave() {
    this.props.handleHover( "", "")
  }

  updatePlaylist() {
    let jsonStringInfo = JSON.stringify(this.props.category)
      fetch(`/api/v1/playlists/${this.props.playlistId}`, {
        method: 'PUT',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      this.props.playlistQuestions("--third")
      }

  render() {
    return (
      <div>
        <div className="music__vote" onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave} onClick={this.updatePlaylist}>
          {this.props.name}
          <img className="music__vote--art" src={this.props.art}/>
        </div>
      </div>
    )
  }
}

export default VoteTile
