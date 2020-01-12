import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import {Link} from 'react-router';
import ArtistTile from './ArtistTile'
import ArtistShow from './ArtistShow'
import circles from '../../../assets/images/circles.png'
import add from '../../../assets/images/add.png'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      artists: [],
      random: "",
      circle: "",
      info: "YOUR FAVORITE ARTIST'S MIXTAPES AND ALBUMS IN ONE PLACE",
      title: "",
      line: "",
      selectedArtist: "",
      active: "",
      homeAd: "--playlist",
      timer: 0,
      set: "set"
    }
    this.fetchArtists = this.fetchArtists.bind(this)
    this.firstClick = this.firstClick.bind(this)
    this.hover = this.hover.bind(this)
    this.animation = this.animation.bind(this)
    this.handleTimer = this.handleTimer.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
  }

  fetchArtists() {
      fetch(`/api/v1/artists`)
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(body => {
          this.setState({ artists: body[0], random: body[1]})
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    firstClick() {
      this.setState({circle: `${this.state.random}`, active: "--active"})
      let random = this.state.random
      this.animation()
      setTimeout(function(){ browserHistory.push(`/${random}`); }, 3500)
    }

    hover(info, title, line) {
      this.setState({ info: info, title: title, line: line })
    }

    animation() {
      if (this.state.random == 'mac') {
        this.setState({ selectedArtist: "MAC MILLER"})
      }
      if (this.state.random == 'cudi') {
        this.setState({ selectedArtist: "KID CUDI"})
      }
      if (this.state.random == 'travis') {
        this.setState({ selectedArtist: "TRAVIS SCOTT"})
      }
      if (this.state.random == 'chance') {
        this.setState({ selectedArtist: "CHANCE"})
      }
    }

    handleTimer() {
        this.timer = setInterval(this.timerStart.bind(this), 1000)
        }

    timerStart() {
      this.setState({ timer: this.state.timer + 1})
      if (this.state.timer > 6) {
        this.handleEnd()
        this.setState({ timer: 0})
      }
    }

  handleEnd() {
    if (this.state.homeAd == "--playlist" && this.state.set == "set") {
      this.setState({ homeAd: "--donation", set: ""})
    } else {
      this.setState({ homeAd: "--playlist", set: "set"})
    }
    this.setState({ timer: 0})
    clearInterval(this.timer)
    this.handleTimer()
    }

  componentWillMount() {
    this.fetchArtists()
    this.handleTimer()
  }

  render() {
    let artistsArray = this.state.artists.map(artist => {
      return(
        <ArtistTile
          key= {artist.id}
          name= {artist.name}
          short= {artist.short}
          random= {this.state.random}
          icon= {artist.icon}
          hover= {this.hover}
          description= {artist.description}
        />
      )
    })
    let artistsSecondArray = this.state.artists.map(artist => {
      return(
        <ArtistShow
          key= {artist.id}
          name= {artist.name}
          short= {artist.short}
        />
      )
    })
    return(
      <div>
      <div className={`title__main`}>RANDOMMAC</div>
        <div className="home__wheel">
        <div className={`home${this.state.circle}`} onClick={this.firstClick}></div>
          {artistsArray}
        </div>
        <div className={`artist__text${this.state.active}`}>{this.state.selectedArtist}</div>
        <div className= {`artist__text--first--mobile${this.state.active}`}>MAC MILLER</div>
        <div className= {`artist__text--second--mobile${this.state.active}`}>KID CUDI</div>
        <div className= {`artist__text--third--mobile${this.state.active}`}>TRAVIS SCOTT</div>
        <div className= {`artist__text--fourth--mobile${this.state.active}`}>CHANCE</div>
        <div className= {`home__box`}>
          <a href='/vote' className={`donation__home${this.state.homeAd}`}>
            <div className="playlist__home--title">Create a Playlist</div>
            <img className="playlist__home--swimming" src="http://www.getalternative.com/wp-content/uploads/2018/12/mac-miller-self-care-video-reveals-cover-art-tracklist-swimming-album.jpg" />
            <img className="playlist__home--circles" src={circles} />
            <img className="playlist__home--faces" src="https://media.pitchfork.com/photos/5929a7d7ea9e61561daa56a2/1:1/w_600/85c259af.jpg" />
            <img className="playlist__home--good" src="https://i2.wp.com/www.parlemag.com/wp-content/uploads/2015/08/Mac-Miller-GOOD-AM.jpg?fit=684%2C684&ssl=1" />
            <img className="playlist__home--kids" src="https://cdn.shopify.com/s/files/1/0807/4553/products/s-l1600-1_883370e4-02dc-4b8a-8986-22a9bcfe00fa_grande.jpg?v=1544759626" />
            <img className="playlist__home--macadelic" src="https://ssla.ulximg.com/image/750x750/cover/1332543471_fcbecdd3c7f506b3e7861654c8153f07.jpg/06a0fb870fc8d7c46f60cb31ddd8297e/1332543471_mac_miller_macadelic.jpg" />
            <img className="playlist__home--add" src={add} />
          </a>
          <a href="https://pittsburghfoundation.org/macmiller" className={`playlist__home${this.state.homeAd}`}>
            <img src={circles} className="playlist__donation--image"/>
            <div className="playlist__donation--donate">DONATE</div>
            <div className="playlist__donation--info">To the Mac Miller Fund</div>
          </a>
        </div>
      </div>
    )}
  }

  export default Home
