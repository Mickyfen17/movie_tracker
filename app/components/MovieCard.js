import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ title, movie_id, poster_path, release_date, vote_average, userID, overview, favorites, fetchFavorites, history, addFavorite, removeFavorite }) => {

  const addMovieToFavorites = () => {
    if(!userID) { return history.push('/login') }
    if(isInFavorites()) {
      return removeFromFavorites(movie_id, userID)
    }
    addFavorite(movie_id, userID, title, poster_path, release_date, vote_average, overview)
    fetchFavorites('movieFavorite', userID)
  }

  const isInFavorites = () => {
    return favorites.find(movie => {
      return movie.movie_id === movie_id
    })
  }

  const removeFromFavorites = (movie_id, userID) => {
    removeFavorite(movie_id, userID)
    fetchFavorites(null, userID)
  }

  return (
    <article className="movie-display">
      <Link to={`/movie/${movie_id}`}>
        <img
          className="movie-poster"
          src={`//image.tmdb.org/t/p/w150${poster_path}`}
          alt={`movie poster of ${title}`}
        />
      </Link>
      <button
        className="btn red rounded"
        onClick={ () => addMovieToFavorites() }
      >
      </button>
    </article>
  )
}

export default MovieCard;