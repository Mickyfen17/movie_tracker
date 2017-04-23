import React from 'react';

const MovieDetails = ({ title, poster_path, overview, vote_average, vote_count, history }) => {
  return (
    <article className="movie-card card">
      <h2>{ title }</h2>
      <div className="movie-info">
        <img
          src={`//image.tmdb.org/t/p/w150${poster_path}`}
          alt={`movie poster of ${title}`}
        />
        <h3>Overview</h3>
          <p>{ overview }</p>
        <h3>Voting Average</h3>
          <p>{ vote_average }</p>
        <h3>Vote Count</h3>
          <p>{ vote_count }</p>
      </div>
      <button
        className='submit-btn'
        onClick={ () => history.push('/') }>
        Back
      </button>
    </article>
  )
}

export default MovieDetails;
