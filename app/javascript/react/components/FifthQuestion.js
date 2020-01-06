import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class FifthQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ""
        }
      this.handleHover = this.handleHover.bind(this)
      this.setNew = this.setNew.bind(this)
      this.setOld = this.setOld.bind(this)
      this.notActive = this.notActive.bind(this)
      this.updateNew = this.updateNew.bind(this)
      this.updateOld = this.updateOld.bind(this)
  }

  handleHover() {
    this.props.handleHover("", "_O1qD95xnao")
  }

  setOld() {
    this.setState({ active: "--oldActive" })
    this.props.handleHover("", "QtTXIoy48XU")
  }

  setNew() {
    this.setState({ active: "--newActive" })
    this.props.handleHover("", "SsKT0s5J8ko")
  }

  notActive() {
    this.setState({ active: "" })
  }

  updateNew() {
    let jsonStringInfo = JSON.stringify("newer")
      fetch(`/api/v1/playlists/${this.props.playlistId}`, {
        method: 'PUT',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      browserHistory.push(`/vote/${this.props.playlistId}`)
      }

    updateOld() {
      let jsonStringInfo = JSON.stringify("older")
        fetch(`/api/v1/playlists/${this.props.playlistId}`, {
          method: 'PUT',
          body: jsonStringInfo,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' },
          credentials: 'same-origin'
        })
        .then(formPayload => formPayload.json())
        browserHistory.push(`/vote/${this.props.playlistId}`)
        }

  render() {
    return (
      <div className="white">
        <div className="timeline">
          <div className={`first__line${this.state.active}`}></div>
          <div className={`second__line${this.state.active}`}></div>
          <div className="first__year"></div>
          <div className="first__year--year">2010</div>
          <img className="first__year--album" src="https://cdn.shopify.com/s/files/1/0807/4553/products/s-l1600-1_883370e4-02dc-4b8a-8986-22a9bcfe00fa_grande.jpg?v=1544759626"/>
          <div className="second__year"></div>
          <div className="second__year--year">2011</div>
          <img className="second__year--album" src="https://cps-static.rovicorp.com/3/JPG_500/MI0004/067/MI0004067757.jpg?partner=allrovi.com"/>
          <div className="third__year"></div>
          <div className="third__year--year">2011</div>
          <img className="third__year--album" src="https://images.genius.com/ab260470b208b8984a74e2e42e7d1ff6.600x600x1.jpg"/>
          <div className="fourth__year"></div>
          <div className="fourth__year--year">2012</div>
          <img className="fourth__year--album" src="https://ssla.ulximg.com/image/750x750/cover/1332543471_fcbecdd3c7f506b3e7861654c8153f07.jpg/06a0fb870fc8d7c46f60cb31ddd8297e/1332543471_mac_miller_macadelic.jpg"/>
          <div className="fifth__year"></div>
          <div className="fifth__year--year">2013</div>
          <img className="fifth__year--album" src="https://images.genius.com/c2c579aaf2e5c37b2a5dd74193bb0cdd.600x600x1.jpg"/>
          <div className="sixth__year"></div>
          <div className="sixth__year--year">2014</div>
          <img className="sixth__year--album" src="https://media.pitchfork.com/photos/5929a7d7ea9e61561daa56a2/1:1/w_600/85c259af.jpg"/>
          <div className="seventh__year"></div>
          <div className="seventh__year--year">2015</div>
          <img className="seventh__year--album" src="https://i2.wp.com/www.parlemag.com/wp-content/uploads/2015/08/Mac-Miller-GOOD-AM.jpg?fit=684%2C684&ssl=1"/>
          <div className="eigth__year"></div>
          <div className="eigth__year--year">2016</div>
          <img className="eigth__year--album" src="https://media.pitchfork.com/photos/5929bcb3ea9e61561daa752c/1:1/w_600/178c182f.jpg"/>
          <div className="ninth__year"></div>
          <div className="ninth__year--year">2018</div>
          <img className="ninth__year--album" src="http://www.getalternative.com/wp-content/uploads/2018/12/mac-miller-self-care-video-reveals-cover-art-tracklist-swimming-album.jpg" onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave}/>
        </div>
        <div className="old__vote" onMouseEnter={this.setOld} onMouseLeave={this.notActive} onClick={this.updateOld}></div>
        <div className="new__vote" onMouseEnter={this.setNew} onMouseLeave={this.notActive} onClick={this.updateNew}></div>
        <div className= {`old__title${this.state.active}`}> Older Mac </div>
        <div className= {`new__title${this.state.active}`}> Newer Mac </div>
      </div>
    )
  }
}

export default FifthQuestion
