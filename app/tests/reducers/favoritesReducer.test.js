import favoritesReducer from '../../reducers/favoritesReducer';
import rootReducer from '../../reducers/index';

describe('favorites reducer', () => {

  it('should return initial state by default', () => {
    expect(favoritesReducer(undefined, {})).toEqual([])
  });

  it('should return an array of favorite movie objects when action is SHOW_FAVORITES', () => {
    const favorites = [{title: 'Ironman', year: 2014}, {title: 'Spiderman', year: 2010}];

    expect(favoritesReducer(undefined, {
      type: 'SHOW_FAVORITES',
      favorites
    })).toEqual(favorites);
  });

  it('should return to the default empty array when action is SIGN_OUT', () => {
    const movieState = rootReducer(undefined, {
      type: 'SIGN_OUT',
    });

    expect(movieState.favorites).toEqual([]);
  });
});