import React, { Component } from 'react';
import MovieIndex from '../MovieIndex/MovieIndex'

export default class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=f61c7abf8110a0ea5bac29dd36a2acab&language=en-US&sort_by=popularity.desc&certification_country=US&include_adult=false&include_video=false&page=1&primary_release_date.gte=2016-09-01&primary_release_date.lte=2017-04-01&vote_count.gte=100&vote_average.gte=6')
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json);
      })
  }

  render() {
    return (
      <div>
        <h1>Movie Watcher</h1>
        {this.props.children}
        <MovieIndex />
      </div>
    )
  }
}