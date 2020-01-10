import React, { Component } from 'react';

class UserPlaylistTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        }
      this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.handleClick(this.props.id)
  }

  render() {
    return (
      <div className="user__playlists" onClick={this.handleClick}>Playlist: {this.props.id}</div>
    )
  }
}

export default UserPlaylistTile
