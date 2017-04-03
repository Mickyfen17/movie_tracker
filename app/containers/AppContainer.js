import { connect } from 'react-redux';

import App from '../components/App';
import { fetchMovies, signOut, showFavorites } from '../actions/actions';

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovies: () => dispatch(fetchMovies()),
    signOut: () => dispatch(signOut()),
    showFavorites: (favorites) => dispatch(showFavorites(favorites))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

