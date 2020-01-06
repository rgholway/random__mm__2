import React from 'react';
import YouTube from 'react-youtube';

class Example extends React.Component {
  render() {
    const opts = {
      height: '300',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <YouTube
        videoId={this.props.youtube}
        opts={opts}
        onReady={this._onReady}
        onEnd={this.props.songEnd}
      />
    );
  }

  _onReady(event) {
    event.target.playVideo();
  }

  _onEnd(event) {

  }


}

export default Example
