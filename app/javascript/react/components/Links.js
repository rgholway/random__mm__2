  import React, { Component } from 'react';
  import { browserHistory } from 'react-router';

  class Links extends Component {
    constructor(props) {
      super(props);
      this.state = {
          }
          this.link = this.link.bind(this)
    }

    link() {
      browserHistory.push(`/${this.props.short}`)
      location.reload()
    }

    render() {
      return (
        <div className="links" onClick={this.link}>{this.props.name}</div>
      )
    }
  }

  export default Links
