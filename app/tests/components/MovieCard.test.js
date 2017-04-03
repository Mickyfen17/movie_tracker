import React from 'react';
import { shallow, mount } from 'enzyme';
import { browserHistory } from 'react-router';
import MovieCard from '../../components/MovieCard';

describe('testing MovieCard', () => {
  const mockMovie = {
    title: 'Split',
    userID: 2,
    movie_id: 123,
    poster_path: 'www.path',
    release_date: 2017,
    overview: 'overview of movie',
    vote_average: 7.8,
    vote_count: 1000
  }

  it('should be able to accept props', () => {
    const wrapper = shallow( <MovieCard { ...mockMovie } /> )

    expect(wrapper.unrendered.props.title).toEqual('Split')
    expect(wrapper.unrendered.props.userID).toEqual(2)
    expect(wrapper.unrendered.props.movie_id).toEqual(123)
    expect(wrapper.unrendered.props.release_date).toEqual(2017)
  })

  it('should be able to display data to DOM', () => {
    const wrapper = shallow( <MovieCard { ...mockMovie }/> )

    expect(wrapper.find('.movie-display')).toHaveLength(1)
  })

  it.skip('should redirect to login if user is not signed in', () => {
    spyOn(browserHistory, 'push');
    const wrapper = mount(
      <MovieCard
        history={ browserHistory }
        favorites={ [] }
      />
    )
    const favoriteBtn = wrapper.find('button');

    favoriteBtn.simulate('click');

    expect(browserHistory.push).toHaveBeenCalledWith('/login');
  });
});