import React, { Component } from 'react';

class SearchTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        }
        this.handleAdd = this.handleAdd.bind(this)
  }

    handleAdd() {
      this.props.onClick(this.props.id, this.props.name, this.props.youtube)
    }

  render() {
    return (
      <div className={`searched__songs${this.props.active}`} onClick={this.handleAdd}>
        <div className="songs__in--search">{this.props.name}</div>
      </div>
    )
  }
}

export default SearchTile
