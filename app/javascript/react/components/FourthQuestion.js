import React, { Component } from 'react';

class FourthQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        }
      this.handleFunky = this.handleFunky.bind(this)
      this.handleTrippy = this.handleTrippy.bind(this)
      this.handleLeave = this.handleLeave.bind(this)
      this.updatePlaylistTrippy = this.updatePlaylistTrippy.bind(this)
      this.updatePlaylistFunky = this.updatePlaylistFunky.bind(this)
  }

  handleFunky() {
    this.props.handleHover( "", "LR3GQfryp9M" )
  }

  handleTrippy() {
    this.props.handleHover("", "rIQqzTNRmoc")
  }

  handleLeave() {
    this.props.handleHover("", "")
  }

  updatePlaylistFunky() {
    let jsonStringInfo = JSON.stringify("funky")
      fetch(`/api/v1/playlists/${this.props.playlistId}`, {
        method: 'PUT',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      this.props.playlistQuestions("--fifth")
      }

  updatePlaylistTrippy() {
    let jsonStringInfo = JSON.stringify("trippy")
      fetch(`/api/v1/playlists/${this.props.playlistId}`, {
        method: 'PUT',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      this.props.playlistQuestions("--fifth")
      }

  render() {
    return (
      <div>
        <div className="funky__vote" onMouseEnter={this.handleFunky} onMouseLeave={this.handleLeave} onClick={this.updatePlaylistFunky}>Funky</div>
        <div className="trippy__vote" onMouseEnter={this.handleTrippy} onMouseLeave={this.handleLeave} onClick={this.updatePlaylistTrippy}>Trippy</div>
      </div>
    )
  }
}

export default FourthQuestion
