import React from 'react';
import YouTube from 'react-youtube';
import playbutton from '../../../assets/images/play.png'
import pausebutton from '../../../assets/images/pause.png'
import rightbutton from '../../../assets/images/right.png'
import leftbutton from '../../../assets/images/left.png'
import shufflebutton from '../../../assets/images/shuffle.png'
import save__save from '../../../assets/images/save__save.png'
import ProgressTile from './ProgressTile';
let progressBar = [["0.10", "0%", "first"], ["0.20", "10%", "second"], ["0.30", "20%", "third"], ["0.40", "30%", "fourth"], ["0.50", "40%", "fifth"], ["0.60", "50%", "sixth"], ["0.70", "60%", "seventh"], ["0.80", "70%", "eigth"], ["0.90", "80%", "ninth"], ["1", "90%", "tenth"]  ]

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
      progressTime: ""
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
      this.timer = setInterval(this.timerStart.bind(this), 500)
    }
    }

    timerStart() {
      this.setState({ timer: this.state.timer + 0.5, timeBar: (this.state.timer / this.state.totalTime * 100), helper: this.state.helper + 0.5 })
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
    if(this.state.status != "paused" || this.state.progressTime != "selected") {
      event.target.playVideo()
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
      debugger;
      this.stopTimer()
      let seek = videoTime * this.props.seconds
      debugger;
      this.setState({ timer: seek })
      event.target.seekTo(seek)
      this.setState({ progressTime: "" })
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
