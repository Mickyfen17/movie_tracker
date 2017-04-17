import { connect } from 'react-redux';

import App from '../components/App';
import { fetchMovies, signOut, showFavorites, addFavorite, removeFavorite } from '../actions/actions';

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovies: () => dispatch(fetchMovies()),
    signOut: () => dispatch(signOut()),
    showFavorites: (favorites) => dispatch(showFavorites(favorites)),
    addFavorite: (movie_id, userID, title, poster_path, release_date, vote_average, overview) => {
      dispatch(addFavorite(movie_id, userID, title, poster_path, release_date, vote_average, overview))
    },
    removeFavorite: (movie_id, userID) => dispatch(removeFavorite(movie_id, userID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

