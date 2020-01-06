import React, { Component } from 'react';
import SongTile from './SongTile'
import { browserHistory } from 'react-router';

class ArtistTile extends Component {
  constructor(props) {
    super(props);
    this.state = {album: "",
      circle: "",
      random: ""
        }
        this.click = this.click.bind(this)
        this.firstClick = this.firstClick.bind(this)
        this.hover = this.hover.bind(this)
        this.leave = this.leave.bind(this)
  }

  click() {
    browserHistory.push(`/${this.props.short}`)
  }

  firstClick() {
    this.setState({circle: `${this.props.random}`})
    let random = this.props.random
    setTimeout(function(){ browserHistory.push(`/${random}`); }, 3500)
  }

  hover() {
    this.props.hover(this.props.description, this.props.name, "--active")
  }

  leave() {
    this.props.hover("YOUR FAVORITE ARTIST'S MIXTAPES AND ALBUMS IN ONE PLACE", "", "")
  }

  render() {
    return (
      <div>
      <div className="title__home" onClick={this.firstClick}>RANDOM ARTIST</div>
        <div className={`${this.props.short}`} onClick={this.click} onMouseEnter={this.hover} onMouseLeave={this.leave}>
          <h6 className={`artist__name--${this.props.short}`}>{this.props.name}</h6>
          <img className="home__icon" src={this.props.icon}/>
        </div>
      </div>
    )
  }
}

export default ArtistTile
