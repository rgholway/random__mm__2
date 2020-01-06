import React, { Component } from 'react';

class SongTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        youtube: ""
        }
        this.onClick = this.onClick.bind(this)
        this.nextSong = this.nextSong.bind(this)
  }

    onClick(e) {
      if (e.type == "click") {
        this.props.onClick(this.props.id)
        }
      if (e.nativeEvent.which == 3) {
        e.preventDefault()
        this.props.onNext(this.props.youtube, this.props.title, this.props.id, "--active")
      }
    }

      nextSong() {
        this.props.onNext(this.props.youtube, this.props.title, this.props.id, "--active")
      }

  render() {
    return (
      <div>
        <div className="tracks" onContextMenu={this.onClick} onClick={this.onClick}>{this.props.num}. {this.props.title}
        </div>
        <div className="song__next--mobile" onClick={this.nextSong}>ADD TO Q</div>
      </div>
    )
  }
}

export default SongTile
