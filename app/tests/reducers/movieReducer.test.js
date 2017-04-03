import movieReducer from '../../reducers/movieReducer';
import rootReducer from '../../reducers/index';

describe('movie reducer', () => {

  it('should return initial state by default', () => {
    expect(movieReducer(undefined, {})).toEqual([])
  });

  it('should return an array of movie objects when action is RECEIVED_MOVIES', () => {
    const movies = { results: [{title: 'Ironman', year: 2014}, {title: 'Spiderman', year: 2010}] };
    const movieState = movieReducer(undefined, {
      type: 'RECEIVED_MOVIES',
      movies
    });
    const reducedMovies = [{"title": "Ironman", "year": 2014}, {"title": "Spiderman", "year": 2010}];

    expect(movieState).toEqual(reducedMovies);
  });

  it('should return to the default empty array when action is SIGN_OUT', () => {
    const movieState = rootReducer(undefined, {
      type: 'SIGN_OUT',
    });

    expect(movieState.movies).toEqual([]);
  });
});