import React from 'react';
import MovieCard from './MovieCard';

const Favorites = ({ userID, favorites, fetchFavorites, history }) => {

  const displayUserFavorites = () => {
    return favorites.map(movie =>
      <MovieCard
        key={ movie.id }
        movie_id={ movie.movie_id }
        { ...movie }
        userID={ userID }
        favorites={ favorites }
        fetchFavorites={ fetchFavorites }
        history={ history }
      />
    )
  }

  return (
    <section>
      <h1>Favorites</h1>
      <div className="favorites-disp">
        { displayUserFavorites() }
      </div>
    </section>
  )
}

export default Favorites;