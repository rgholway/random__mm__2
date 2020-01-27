import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class ProgressTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        }
      this.handleHover = this.handleHover.bind(this)
      this.handleClick = this.handleClick.bind(this)
  }

  handleHover() {
  }

  handleClick() {
    this.props.handlePercent(this.props.percent)
  }

  render() {
    return (
      <div>
        <div className={`progress__bar--dynamic--${this.props.css}`} onClick={this.handleClick}></div>
      </div>
    )
  }
}

export default ProgressTile
