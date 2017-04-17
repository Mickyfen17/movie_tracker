import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './Home';
import MovieDetails from './MovieDetails';
import Favorites from './Favorites';
import NavBar from './NavBar';
import LoginContainer from '../containers/LoginContainer';
import CreateUser from './CreateUser';

export default class App extends Component {
  constructor() {
    super();
    this.fetchFavorites = this.fetchFavorites.bind(this);
  }

  componentWillMount() {
    this.props.fetchMovies()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.user.signedIn !== nextProps.user.signedIn) {
      this.fetchFavorites(null, nextProps.user.id)
    }
  }

  fetchFavorites(button, userID) {
    if(!userID) {
      this.props.history.push('/login')
    }
    else {
      fetch(`http://localhost:3001/api/users/${userID}/favorites`)
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.props.showFavorites(json.data)
        button === 'navFavorites' && this.props.history.push('/favorites')
      })
    }
  }

  render() {
    const { movies, user, signOut, favorites, history, fetchMovies, addFavorite, removeFavorite } = this.props
    return (
      <div>
        <header>
          <Link to={`/`}>
            <h1><span className="mov-title">M</span>
            <img className="film-reel" src="images/film-reel.svg"></img>
            <span className="mov-title">vie</span> Watcher</h1>
          </Link>

          <NavBar
            signedIn={ user.signedIn }
            signOut={ signOut }
            fetchFavorites={ this.fetchFavorites }
            userID={ user.id }
            history={ history }
            fetchMovies={ fetchMovies }
            favorites={ favorites }
          />
        </header>

        { user.signedIn && <h2>Welcome back, {user.name}</h2> }

        <Route exact path="/" render={({match}) =>
          <Home
            movies={ movies }
            signedIn={ user.signedIn }
            userID={ user.id }
            favorites={ favorites }
            fetchFavorites={ this.fetchFavorites }
            addFavorite={ addFavorite }
            removeFavorite={ removeFavorite }
            history={ history }
          />
        } />

        <Route
          path='/login'
          component={ LoginContainer }
        />

        <Route
          path='/create-user'
          component={ CreateUser }
        />

        <Route exact path='/movie/:id' render={({match}) => {
            const movie = movies.find(movie => movie.id === parseInt(match.params.id))
            return <MovieDetails { ...movie } history={ history } />
          }
        } />
        <Route exact path='/favorites' render={({match}) =>
            <Favorites
              userID={ user.id }
              favorites={ favorites }
              removeFavorite={ removeFavorite }
              fetchFavorites={ this.fetchFavorites }
              history={ history }
            />
        } />
      </div>
    )
  }
}
