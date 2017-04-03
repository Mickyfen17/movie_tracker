const movies = (state=[], action) => {
  switch (action.type) {
    case 'RECEIVED_MOVIES':
      return [...state, ...action.movies.results];
      break;

    default:
      return state;
  }
}

export default movies;