import React from 'react';
import YouTube from 'react-youtube';
import playbutton from '../../../assets/images/play.png'
import pausebutton from '../../../assets/images/pause.png'
import rightbutton from '../../../assets/images/right.png'
import leftbutton from '../../../assets/images/left.png'
import shufflebutton from '../../../assets/images/shuffle.png'

class VoteVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: "play__button--play--active",
      status: "",
      stop: "",
      play: "pause",
      timer: 0.0,
      vidoeTime: 0.00,
      totalTime: 0,
      timeBar: 0
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
  }

  handleRight() {
    if (this.state.status == "paused") {
      this.setState({ status: "" })
    }
    this.setState({ timer: 0 })
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
    debugger;
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
      this.setState({ timer: this.state.timer + 0.5, timeBar: (this.state.timer / this.state.totalTime * 100) })
      if (this.state.stop == "stop") {
        clearInterval(this.timer)
      }
    }

    stopTimer() {
      this.setState({ stop: "stop"})
      this.props.getTime(this.state.timer)
    }

  render() {
    const opts = {
      height: '100%',
      width: '100%',
      showInfo: 0,
      setSize: 0,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div>
          <YouTube
            videoId={this.props.youtube}
            opts={opts}
            className="video--vote"
            onReady={this._onReady}
            onPause={this._onPause}
            onPlay={this._onPlay}
            onEnd={this._onEnd}
            onStateChange={this._onStateChange}
            status={this.props.status}
          />
          <div className="song__playing--dark">{this.props.currentSong}
            <div className="progress__bar" onClick={this.handleProgress}></div>
            <div className="progress__cover" style={ { width: `${ this.state.timeBar }%` } }></div>
          </div>
          <div className={`black__screen--${this.props.mode}`}>
            <div className="left--arrow" onClick={this.handleLeft}></div>
            <img className={`end__button--${this.state.play}`} src={playbutton} onClick={this.handleEnd}/>
            <img className={`pause__button--${this.state.play}`} src={pausebutton} onClick={this.handleEnd}/>
            <img className="right--arrow" src={rightbutton} onClick={this.handleRight}/>
            <img className="left--arrow" src={leftbutton} onClick={this.handleLeft}/>
            <img className="shuffle__button" src={shufflebutton} onClick={this.handleShuffle}/>
          </div>
        </div>
    );
  }

  _onReady(event) {
    if(this.state.status != "paused") {
      event.target.playVideo()
    }
  }

  _onPause(event) {
    this.stopTimer()
  }

  _onStateChange(event) {
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
  }

  _onEnd(event) {
    this.setState({ timer: 0 })
    this.props.handleRight()
  }


}

export default VoteVideo
