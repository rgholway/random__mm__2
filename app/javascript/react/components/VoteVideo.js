import React from 'react';
import YouTube from 'react-youtube';
import playbutton from '../../../assets/images/play.png'
import pausebutton from '../../../assets/images/pause.png'
import rightbutton from '../../../assets/images/right.png'
import leftbutton from '../../../assets/images/left.png'
import shufflebutton from '../../../assets/images/shuffle.png'
import save__save from '../../../assets/images/save__save.png'
import ProgressTile from './ProgressTile';
import PauseVideo from './PauseVideo';
let progressBar = [["0.0", "0", "first"], ["0.01", "1", "second"], ["0.02", "2", "third"], ["0.03", "3", "fourth"], ["0.04", "4", "fifth"], ["0.05", "5", "sixth"], ["0.06", "6", "seventh"], ["0.07", "7", "eight"], ["0.08", "8", "ninth"], ["0.09", "9", "tenth"], ["0.10", "10", "eleventh"], ["0.11", "11", "twelfth"], ["0.12", "12", "thirteenth"], ["0.13", "13", "fourteenth"], ["0.14", "14", "fifteenth"], ["0.15", "15", "sixteenth"], ["0.16", "16", "seventeenth"], ["0.17", "17", "eighteenth"], ["0.18", "18", "nineteenth"], ["0.19", "19", "twentieth"], ["0.20", "20", "twentyfirst"], ["0.21", "21", "twentysecond"], ["0.22", "22", "23"], ["0.23", "23", "24"], ["0.24", "24", "25"], ["0.25", "25", "26"], ["0.26", "26", "27"], ["0.27", "27", "28"], ["0.28", "28", "29"], ["0.29", "29", "30"], ["0.30", "30", "31"], ["0.31", "31", "32"], ["0.32", "32", "33"], ["0.33", "33", "34"], ["0.34", "34", "35"], ["0.35", "35", "36"], ["0.36", "36", "37"], ["0.37", "37", "38"], ["0.38", "38", "39"], ["0.39", "39", "40"], ["0.40", "40", "41"], ["0.41", "41", "42"], ["0.42", "42", "43"], ["0.43", "43", "44"], ["0.44", "44", "45"], ["0.45", "45", "46"], ["0.46", "46", "47"], ["0.47", "47", "48"], ["0.48", "48", "49"], ["0.49", "49", "50"], ["0.50", "50", "51"], ["0.51", "51", "52"], ["0.52", "52", "53"], ["0.53", "53", "54"], ["0.54", "54", "55"], ["0.55", "55", "56"], ["0.56", "56", "57"], ["0.57", "57", "58"], ["0.58", "58", "59"], ["0.59", "59", "60"], ["0.60", "60", "61"], ["0.61", "61", "62"], ["0.62", "62", "63"], ["0.63", "63", "64"], ["0.64", "64", "65"], ["0.65", "65", "66"], ["0.66", "66", "67"], ["0.67", "67", "68"], ["0.68", "68", "69"], ["0.69", "69", "70"], ["0.70", "70", "71"], ["0.71", "71", "72"], ["0.72", "72", "73"], ["0.73", "73", "74"], ["0.74", "74", "75"], ["0.75", "75", "76"], ["0.76", "76", "77"], ["0.77", "77", "78"], ["0.78", "78", "79"], ["0.79", "79", "80"], ["0.80", "80", "81"], ["0.81", "81", "82"], ["0.82", "82", "83"], ["0.83", "83", "84"], ["0.84", "84", "85"], ["0.85", "85", "86"], ["0.86", "86", "87"], ["0.87", "87", "88"], ["0.88", "88", "89"], ["0.89", "89", "90"], ["0.90", "90", "91"], ["0.91", "91", "92"], ["0.92", "92", "93"], ["0.93", "93", "94"], ["0.94", "94", "95"], ["0.95", "95", "96"], ["0.96", "96", "97"], ["0.97", "97", "98"], ["0.98", "98", "99"], ["0.99", "99.9", "100"]  ]

class VoteVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: "play__button--play--active",
      status: "",
      stop: "",
      play: "pause",
      timer: 0.0,
      videoTime: 0.00,
      totalTime: 0,
      timeBar: 0,
      save: "",
      helper: 0,
      progressTime: "",
      left: "",
      percent: 0,
      hoverTime: 0,
      hoverActive: "",
      pausedSeconds: 0,
      pausedYoutube: ""
        }
      this.handleRight = this.handleRight.bind(this)
      this.handleLeft = this.handleLeft.bind(this)
      this.handleShuffle = this.handleShuffle.bind(this)
      this.handleEnd = this.handleEnd.bind(this)
      this._onReady = this._onReady.bind(this)
      this._onEnd = this._onEnd.bind(this)
      this._onPause = this._onPause.bind(this)
      this._onStateChange = this._onStateChange.bind(this)
      this.startTimer = this.startTimer.bind(this)
      this._onPlay = this._onPlay.bind(this)
      this.handlePause = this.handlePause.bind(this)
      this.handleProgress = this.handleProgress.bind(this)
      this.handleSave = this.handleSave.bind(this)
      this.handleHover = this.handleHover.bind(this)
      this.handleLeave = this.handleLeave.bind(this)
      this.handleFirstClick = this.handleFirstClick.bind(this)
      this.handleHoverLeft = this.handleHoverLeft.bind(this)
  }

  handleRight() {
    this.setState({ timer: 0 })
    if (this.state.status == "paused") {
      this.setState({ status: "" })
    }
    this.props.handleRight()
    }

  handleLeft() {
    if (this.state.status == "paused") {
      this.setState({ status: "" })
    }
    this.setState({ timer: 0 })
    this.props.handleLeft()
    }

  handleShuffle() {
    this.props.handleShuffle()
  }

  handleProgress() {
  }

  handleEnd() {
    if (this.state.play == "play") {
      this.setState({ play: "pause" })
    } else {
      this.setState({ play: "play" })
    }
    if (this.state.status == "") {
      this.setState({ status: "paused" })
    }
    this.props.handleEnd()
  }

  handlePause() {
    this.setState({ status: "paused" })
  }

  startTimer() {
    this.setState({ stop: "" })
    if (this.props.youtube != "") {
      this.timer = setInterval(this.timerStart.bind(this), 100)
    }
    }

    timerStart() {
      this.setState({ timer: this.state.timer + 0.1, timeBar: (this.state.timer / this.state.totalTime * 100), helper: this.state.helper + 0.1 })
      if (this.state.stop == "stop") {
        clearInterval(this.timer)
      }
    }

    stopTimer() {
      this.setState({ stop: "stop"})
      this.props.getTime(this.state.timer)
    }

    handleSave() {
      fetch(`/api/v1/users/${this.props.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(formPayload => formPayload.json())
      .then(body => {
        this.props.currentUser(body[0])
      })
    }

  handleHover() {
    this.setState({ save: "--hover" })
  }

  handleLeave() {
    this.setState({ save: "" })
  }

  handleFirstClick(percent) {
    this.setState({progressTime: "selected" })
    this.props.handleBreak(percent)
  }

  handleHoverLeft(left, percent, active, yt) {
    let timeHover = this.state.totalTime * percent
    let correctTime = Math.floor(timeHover / 60);
    let minutes = (timeHover - correctTime * 60) / 100
    this.setState({ left: left, percent: percent, hoverTime: (correctTime + minutes).toFixed(2), hoverActive: active, pausedSeconds: timeHover, pausedYoutube: yt  })
  }

  render() {
    let i = 0
    let progressArray = progressBar.map( progress => {
      i += 1
      return(
        <ProgressTile
          key= {i}
          percent= {progress[0]}
          left= {progress[1]}
          css= {progress[2]}
          handlePercent= {this.handleFirstClick}
          youtube= {this.props.youtube}
          handleLeft= {this.handleHoverLeft}
        />
      )
    })
    const opts = {
      height: '00px',
      width: '00px',
      showInfo: 0,
      setSize: 0,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        playsinline: 1
      }
    };

    return (
      <div>
          <YouTube
            videoId={this.props.youtube}
            opts={opts}
            className="video--vote--mobile"
            onReady={this._onReady}
            onPause={this._onPause}
            onPlay={this._onPlay}
            onEnd={this._onEnd}
            onError={this._onError}
            onStateChange={this._onStateChange}
            status={this.props.status}
            onPlaybackQualityChange={this._onPlaybackQualityChange}
          />
          <div className="song__playing--dark">
            <div className="song__playing--dark--words">{this.props.currentSong}</div>
            <img className="song__save" src={save__save} onClick={this.handleSave} onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave}/>
            <div className={`save__playlist${this.state.save}`}>Save Playlist</div>
            <div className="progress__bar">
              <div className="progress__bar--dynamic">{progressArray}</div>
              <div className="bar--hover" style={ { width: `${ this.state.left }%` } }></div>
            </div>
            <div className={`bar--hover--time${this.state.hoverActive}`} style={ { left: `${ this.state.left - 5 }%` } }>{this.state.hoverTime}</div>
            <div className={`bar--hover--video${this.state.hoverActive}`} style={ { left: `${ this.state.left - 20 }%` } }>
              <PauseVideo
                seconds= {this.state.pausedSeconds}
                youtube= {this.state.pausedYoutube}
              />
            </div>
            <div className="progress__cover" style={ { width: `${ this.state.timeBar }%` } }></div>
            <img className="shuffle__button" src={shufflebutton} onClick={this.handleShuffle}/>
          </div>
          <div className={`black__screen--${this.props.mode}`}>
            <div className="left--arrow" onClick={this.handleLeft}></div>
            <img className={`end__button--${this.state.play}`} src={playbutton} onClick={this.handleEnd}/>
            <img className={`pause__button--${this.state.play}`} src={pausebutton} onClick={this.handleEnd}/>
            <img className="right--arrow" src={rightbutton} onClick={this.handleRight}/>
            <img className="left--arrow" src={leftbutton} onClick={this.handleLeft}/>
          </div>
        </div>
    );
  }

  _onReady(event) {
    if(this.state.status != "paused") {
      event.target.playVideo()
    }

    if(this.state.progressTime == "selected") {
    }

  }

  _onPause(event) {
    this.stopTimer()
  }

  _onPlay(event) {
    let videoTime = event.target.getDuration()
    let correctTime = Math.floor(videoTime / 60);
    let minutes = (videoTime - correctTime * 60) / 100
    this.setState({ play: "pause", videoTime: (correctTime + minutes).toFixed(2), totalTime: videoTime})
    if (this.state.status == "") {
      this.startTimer()
    }
    if (this.props.status == "played" && this.state.status == "paused") {
      event.target.seekTo(this.state.timer)
      this.setState({ status: "" })
      return
    }
    if (this.state.progressTime == "selected") {
      this.stopTimer()
      let seek = videoTime * this.props.seconds
      this.setState({ timer: seek })
      event.target.seekTo(seek)
      this.setState({ progressTime: "hi" })
    }

    if(this.state.progressTime == "hi" && this.state.status ==  "paused") {
      this.setState({ progressTime: ""})
      this.startTimer()
      return
    }
  }

  _onEnd(event) {
    this.setState({ timer: 0, timeBar: 0 })
    this.stopTimer()
    this.props.handleRight()
  }

  _onError(event) {
  }

  _onStateChange(event) {
  }

  _onPlaybackQualityChange(event) {

  }


}

export default VoteVideo
