import React from 'react';
import PausedYouTube from 'react-youtube';

class PauseVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "paused"
        }
      this._onPausedReady = this._onPausedReady.bind(this)
      this.__onPausedPlay = this.__onPausedPlay.bind(this)
  }

  render() {
    const opts = {
      height: '120',
      width: '180',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        playsinline: 1,
        controls: 0,
        modestbranding: 1,
        fs: 1,
        start: this.props.seconds
      }
    };

    return (
      <PausedYouTube
        videoId={this.props.youtube}
        opts={opts}
        onReady={this._onPausedReady}
        onEnd={this.props.songEnd}
        onPlay={this.__onPausedPlay}
      />
    );
  }

  _onPausedReady(event) {
    event.target.mute()
    event.target.pauseVideo()
  }

  __onPausedPlay(event) {
    event.target.pauseVideo();
  }

  _onEnd(event) {

  }


}

export default PauseVideo
