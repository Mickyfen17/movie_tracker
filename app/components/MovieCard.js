import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ title, movie_id, poster_path, release_date, vote_average, userID, overview, favorites, fetchFavorites, history }) => {

  const addFavorite = () => {
    if(!userID) { history.push('/login') }
    if(isInFavorites()) {
      return removeFavorite(movie_id)
    }

    fetch('http://localhost:3000/api/users/favorites/new', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ movie_id, user_id: userID, title, poster_path, release_date, vote_average, overview })
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      fetchFavorites('movieFavorite', userID)
    })
  }

  const isInFavorites = () => {
    return favorites.find(movie => {
      return movie.movie_id === movie_id
    })
  }

  const removeFavorite = (movie_id) => {
    fetch(`http://localhost:3000/api/users/${userID}/favorites/${movie_id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ user_id: userID, movie_id })
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      fetchFavorites(null, userID)
    })
  }

  return (
    <article className="movie-display">
      <Link to={`/movie/${movie_id}`}>
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w150${poster_path}`}
          alt={`movie poster of ${title}`}
        />
      </Link>
      <button className="btn red rounded" onClick={ () => addFavorite() }>
        FAVORITE
        </button>
    </article>
  )
}

export default MovieCard;

