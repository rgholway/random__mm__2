import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class ProgressTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      youtube: ""
        }
      this.handleHover = this.handleHover.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.handleLeave = this.handleLeave.bind(this)
  }

  handleHover() {
    let yt = this.props.youtube
    this.props.handleLeft(this.props.left, this.props.percent, "--active", yt)
  }

  handleLeave() {
    this.props.handleLeft("0", "0", "", "")
  }

  handleClick() {
    this.props.handlePercent(this.props.percent)
  }

  render() {
    return (
      <div>
        <div className={`progress__bar--dynamic--${this.props.css}`} onClick={this.handleClick} onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave}></div>
      </div>
    )
  }
}

export default ProgressTile
