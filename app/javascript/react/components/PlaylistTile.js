import React, { Component } from 'react';

class PlaylistTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        }
      this.handleClick = this.handleClick.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.id, this.props.youtube, this.props.place)
  }

  handleDelete() {
    this.props.delete(this.props.id)
  }

  render() {
    return (
      <div>
        <div className={`songs__in__playlist--${this.props.dark}`}>
          <div className="songs__in__in__playlist" onClick={this.handleClick}>{this.props.name}</div>
          <div className="songs__x" onClick={this.handleDelete}>X</div>
        </div>
      </div>
    )
  }
}

export default PlaylistTile
