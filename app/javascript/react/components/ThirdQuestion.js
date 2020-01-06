import React, { Component } from 'react';

class ThirdQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        }
      this.handleUpper = this.handleUpper.bind(this)
      this.handleDowner = this.handleDowner.bind(this)
      this.handleLeave = this.handleLeave.bind(this)
      this.updatePlaylistFaster = this.updatePlaylistFaster.bind(this)
      this.updatePlaylistSlower = this.updatePlaylistSlower.bind(this)
  }

  handleUpper() {
    this.props.handleHover( "", "Wvm5GuDfAas" )
  }

  handleDowner() {
    this.props.handleHover("", "u7MrdaSYvo0")
  }

  handleLeave() {
    this.props.handleHover("", "")
  }

  updatePlaylistFaster() {
    let jsonStringInfo = JSON.stringify("upbeat")
      fetch(`/api/v1/playlists/${this.props.playlistId}`, {
        method: 'PUT',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      this.props.playlistQuestions("--fourth")
      }

  updatePlaylistSlower() {
    let jsonStringInfo = JSON.stringify("downer")
      fetch(`/api/v1/playlists/${this.props.playlistId}`, {
        method: 'PUT',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      this.props.playlistQuestions("--fourth")
      }

  render() {
    return (
      <div>
        <div className="upper__vote" onMouseEnter={this.handleUpper} onMouseLeave={this.handleLeave} onClick={this.updatePlaylistFaster}>Faster</div>
        <div className="downer__vote" onMouseEnter={this.handleDowner} onMouseLeave={this.handleLeave} onClick={this.updatePlaylistSlower}>Slower</div>
      </div>
    )
  }
}

export default ThirdQuestion
