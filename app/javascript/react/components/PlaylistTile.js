import React, { Component } from 'react';
import trash from '../../../assets/images/trash.png'

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
          <img className="songs__x" src={trash} onClick={this.handleDelete}/>
        </div>
      </div>
    )
  }
}

export default PlaylistTile
