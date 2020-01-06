import React, { Component } from 'react';
import SongTile from './SongTile'

class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {status: ""
        }
      this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({status: "--active"})
  }

  render() {
    return (
      <div className="animation__box">
        <div className={`first__${this.props.name}${this.state.status}`} onClick={this.handleClick}>{this.props.firstLetter}</div>
        <div className={`second__${this.props.name}${this.state.status}`} onClick={this.handleClick}>{this.props.secondLetter}</div>
        <div className={`third__${this.props.name}${this.state.status}`} onClick={this.handleClick}>{this.props.thirdLetter}</div>
        <div className={`${this.props.firstName}${this.state.status}`}>{this.props.firstName}</div>
        <div className={`${this.props.secondName}${this.state.status}`}>{this.props.secondName}</div>
        <div className={`${this.props.thirdName}${this.state.status}`}>{this.props.thirdName}</div>
        <div className={`${this.props.fourthName}${this.state.status}`}>{this.props.fourthName}</div>
      </div>
    )
  }
}

export default Animation
