import React, { Component } from 'react';

class FourthQuestion extends Component {
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
      this.handleDang = this.handleDang.bind(this)
      this.handleLeaveSong = this.handleLeaveSong.bind(this)
      this.handleWhatsTheUse = this.handleWhatsTheUse.bind(this)
      this.handleAngelDust = this.handleAngelDust.bind(this)
      this.handleOG = this.handleOG.bind(this)
      this.handleSuplexes = this.handleSuplexes.bind(this)
      this.handleSpins = this.handleSpins.bind(this)
  }

  handleUpper() {
      this.timer = setInterval(this.timerStart.bind(this), 75)
      this.setState({ color: "linear-gradient(#D3384C, #541743)" })
      }

  timerStart() {
      this.setState({ faster: this.state.faster + 1 })
      if (this.state.faster > 100) {
        this.setState({ faster: 0 })
      }
  }

  timerDownerStart() {
      this.setState({ faster: this.state.faster + 1})
      if (this.state.slower > 100) {
        this.setState({ slower: 0 })
      }
  }

  handleDang() {
      this.props.handleHover("", "LR3GQfryp9M")
    }

  handleWhatsTheUse() {
    this.props.handleHover("", "qI-t1I_ppL8")
    }

  handleSpins() {
    this.props.handleHover("", "mkGT1c98soU")
    }

  handleSuplexes() {
    this.props.handleHover("", "fJo-Cjq0yjg")
    }

  handleAngelDust() {
    this.props.handleHover("", "rIQqzTNRmoc")
    }

  handleOG() {
    this.props.handleHover("", "PfRi1xPMflI")
    }

  handleLeaveSong() {
    this.props.handleHover("", "")
    }


  handleDowner() {
    this.timer = setInterval(this.timerDownerStart.bind(this), 100)
    this.setState({ color: "#DAC2BC"})
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
      this.props.playlistQuestions("--fifth")
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
      this.props.playlistQuestions("--fifth")
      }

  render() {
    console.log(this.state.color);
    return (
      <div className="vote__fourthQuestion--fourth">
        <div className="fourth__line"></div>
        <div className="fourth__cover" style={{ width: `${this.state.faster}%`, background: `${this.state.color}` }  }></div>
        <div className="upper__vote" onMouseEnter={this.handleDowner} onMouseLeave={this.handleLeave} onClick={this.updatePlaylistFaster}>
          <img className="upper__first--album" onMouseEnter= {this.handleDang} onMouseLeave={this.handleLeaveSong} src="https://media.pitchfork.com/photos/5929bcb3ea9e61561daa752c/1:1/w_600/178c182f.jpg"/>
          <img className="upper__third--album" onMouseEnter= {this.handleWhatsTheUse} onMouseLeave={this.handleLeaveSong} src="http://www.getalternative.com/wp-content/uploads/2018/12/mac-miller-self-care-video-reveals-cover-art-tracklist-swimming-album.jpg"/>
          <img className="upper__second--album" onMouseEnter= {this.handleSpins} onMouseLeave={this.handleLeaveSong} src="https://cdn.shopify.com/s/files/1/0807/4553/products/s-l1600-1_883370e4-02dc-4b8a-8986-22a9bcfe00fa_grande.jpg?v=1544759626"/>
          <div className="upper__title">Funky</div>
        </div>
        <div className="downer__vote" onMouseEnter={this.handleUpper} onMouseLeave={this.handleLeave} onClick={this.updatePlaylistSlower}>
          <img className="downer__first--album" onMouseEnter= {this.handleAngelDust} onMouseLeave={this.handleLeaveSong} src="https://media.pitchfork.com/photos/5929a7d7ea9e61561daa56a2/1:1/w_600/85c259af.jpg"/>
          <img className="downer__second--album" onMouseEnter= {this.handleOG} onMouseLeave={this.handleLeaveSong} src="https://i1.sndcdn.com/artworks-000181828390-z9qe4a-t500x500.jpg"/>
          <img className="downer__third--album" onMouseEnter= {this.handleSuplexes} onMouseLeave={this.handleLeaveSong} src="https://images.genius.com/c2c579aaf2e5c37b2a5dd74193bb0cdd.600x600x1.jpg"/>
          <div className="downer__title">Trippy</div>
        </div>

      </div>
    )
  }
}

export default FourthQuestion
