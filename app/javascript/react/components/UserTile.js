import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import UserPlaylistTile from './UserPlaylistTile';

class UserTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
        }
      this.fetchUser = this.fetchUser.bind(this)
      this.handleClick = this.handleClick.bind(this)
  }

  fetchUser() {
    fetch(`/api/v1/users/1`)
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
      this.setState({ playlists: body })
    })
  }

  handleClick(id) {
    browserHistory.push(`/vote/${id}`)
    location.reload()
  }

  componentWillMount() {
    this.fetchUser()
  }

  render() {
    let i = 0
    let playlistsArray = this.state.playlists.map( playlist => {
      i += 1
      return(
        <UserPlaylistTile
          key= {i}
          id= {playlist}
          handleClick= {this.handleClick}
        />
      )
    })
    return (
      <div>
        {playlistsArray}
      </div>
    )
  }
}

export default UserTile
