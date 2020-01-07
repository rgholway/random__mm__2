import React, { Component } from 'react';

class ThirdQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        faster: 0,
        slower: 0,
        color: ""
        }
      this.handleUpper = this.handleUpper.bind(this)
      this.handleDowner = this.handleDowner.bind(this)
      this.handleLeave = this.handleLeave.bind(this)
      this.updatePlaylistFaster = this.updatePlaylistFaster.bind(this)
      this.updatePlaylistSlower = this.updatePlaylistSlower.bind(this)
      this.handleInRome = this.handleInRome.bind(this)
      this.handleLeaveSong = this.handleLeaveSong.bind(this)
      this.handleApparition = this.handleApparition.bind(this)
      this.handleDiablo = this.handleDiablo.bind(this)
      this.handlePerfectCircle = this.handlePerfectCircle.bind(this)
      this.handleDunno = this.handleDunno.bind(this)
      this.handleJetFuel = this.handleJetFuel.bind(this)
  }

  handleUpper() {
      this.timer = setInterval(this.timerStart.bind(this), 50)
      this.setState({ color: "green"})
      }

  timerStart() {
      this.setState({ faster: this.state.faster + 1})
      if (this.state.faster > 100) {
        this.setState({ faster: 0 })
      }
  }

  timerDownerStart() {
      this.setState({ faster: this.state.faster + 1})
      if (this.state.faster > 100) {
        this.setState({ faster: 0 })
      }
  }

  handleInRome() {
      this.props.handleHover("", "hGizbKWt7_g")
    }

  handleDiablo() {
    this.props.handleHover("", "KlQESTshOPw")
    }

  handleDunno() {
    this.props.handleHover("", "61Lmk2k542k")
    }

  handlePerfectCircle() {
    this.props.handleHover("", "2UkrJ0YjjUY")
    }

  handleApparition() {
    this.props.handleHover("", "J7iMyLl987w")
    }

  handleLeaveSong() {
    this.props.handleHover("", "")
    }

  handleJetFuel() {
    this.props.handleHover("", "OnG7oL9Gg4o")
  }

  handleDowner() {
    this.setState({ color: "orange"})
    this.timer = setInterval(this.timerDownerStart.bind(this), 200)
    }

  handleLeave() {
    this.setState({ faster: 0})
    clearInterval(this.timer)
    }

  updatePlaylistFaster() {
    let jsonStringInfo = JSON.stringify("upbeat")
      fetch(`/api/v1/playlists/${this.props.playlistId}`, {
        method: 'PUT',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      this.props.playlistQuestions("--fourth")
      }

  updatePlaylistSlower() {
    let jsonStringInfo = JSON.stringify("downer")
      fetch(`/api/v1/playlists/${this.props.playlistId}`, {
        method: 'PUT',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      this.props.playlistQuestions("--fourth")
      }

  render() {
    console.log(this.state.slower);
    return (
      <div className="vote__thirdQuestion--third">
        <div className="faster__line"></div>
        <div className="slower__cover" style={{ width: `${this.state.faster}%`, background: `${this.state.color}` } }></div>
        <div className="upper__vote" onMouseEnter={this.handleUpper} onMouseLeave={this.handleLeave} onClick={this.updatePlaylistFaster}>
          <img className="upper__first--album" onMouseEnter= {this.handleInRome} onMouseLeave={this.handleLeaveSong} src="https://i2.wp.com/www.parlemag.com/wp-content/uploads/2015/08/Mac-Miller-GOOD-AM.jpg?fit=684%2C684&ssl=1"/>
          <img className="upper__second--album" onMouseEnter= {this.handleDiablo} onMouseLeave={this.handleLeaveSong} src="https://media.pitchfork.com/photos/5929a7d7ea9e61561daa56a2/1:1/w_600/85c259af.jpg"/>
          <img className="upper__third--album" onMouseEnter= {this.handleJetFuel} onMouseLeave={this.handleLeaveSong} src="http://www.getalternative.com/wp-content/uploads/2018/12/mac-miller-self-care-video-reveals-cover-art-tracklist-swimming-album.jpg"/>
          <div className="upper__title">Faster</div>
        </div>
        <div className="downer__vote" onMouseEnter={this.handleDowner} onMouseLeave={this.handleLeave} onClick={this.updatePlaylistSlower}>
          <img className="downer__first--album" onMouseEnter= {this.handlePerfectCircle} onMouseLeave={this.handleLeaveSong} src="https://i2.wp.com/www.parlemag.com/wp-content/uploads/2015/08/Mac-Miller-GOOD-AM.jpg?fit=684%2C684&ssl=1"/>
          <img className="downer__second--album" onMouseEnter= {this.handleApparition} onMouseLeave={this.handleLeaveSong} src="https://media.pitchfork.com/photos/5929a7d7ea9e61561daa56a2/1:1/w_600/85c259af.jpg"/>
          <img className="downer__third--album" onMouseEnter= {this.handleDunno} onMouseLeave={this.handleLeaveSong} src="http://www.getalternative.com/wp-content/uploads/2018/12/mac-miller-self-care-video-reveals-cover-art-tracklist-swimming-album.jpg"/>
          <div className="downer__title">Slower</div>
        </div>

      </div>
    )
  }
}

export default ThirdQuestion
