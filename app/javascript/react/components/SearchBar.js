import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: "",
      searchString: "Search"
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this)
  }

  handleChange(event) {
    const newSearchString = event.target.value
    this.setState({ searchString: newSearchString })
  }

  handleClear() {
    if (this.state.searchString == "Search") {
      this.setState({ searchString: "" })
    }
  }

    handleSubmit(event) {
      event.preventDefault()
      const body = JSON.stringify({
        search_string: this.state.searchString
      })
      fetch('/api/v1/songs/search', {
        method: 'POST',
        body: body,
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(body => {
        this.props.searchSong(body)
      })
    }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='searchString' className="search__bar--bar" onClick={this.handleClear} value={this.state.searchString} onChange={this.handleChange} />
        <input type='submit' value='Submit' className="submit__button__search" />
      </form>
    )
  }
}

export default SearchBar;
