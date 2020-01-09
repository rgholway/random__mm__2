import React from 'react';
import { Router, browserHistory, Route, IndexRoute, Link } from 'react-router';
import Home from './Home'
import Vote from './Vote'
import ArtistShow from './ArtistShow'
import ShowPlaylist from './ShowPlaylist'
import FourthQuestion from './FourthQuestion'

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Home}/>
      <Route path="/vote" component={Vote}/>
      <Route path="/vote/:id" component={ShowPlaylist}/>
      <Route path="/:name" component={ArtistShow}/>
    </Router>
  )
}

export default App
