import React from 'react';
import { shallow, mount } from 'enzyme';
import { browserHistory } from 'react-router';
import MovieDetails from '../../components/MovieDetails';

describe('testing MovieDetails', () => {
  const mockMovie = {
    title: 'Split',
    poster_path: 'www.path',
    overview: 'overview of movie',
    vote_average: 7.8,
    vote_count: 1000
  }

  it('should be able to accept props', () => {
    const wrapper = mount( <MovieDetails { ...mockMovie }/> )

    expect(wrapper.props()).toEqual(mockMovie)
  })

  it('should be able to display data to DOM', () => {
    const wrapper = mount( <MovieDetails { ...mockMovie }/> )

    expect(wrapper.find(MovieDetails)).toHaveLength(1)
    expect(wrapper.text()).toEqual('SplitOverviewoverview of movieVoting Average7.8Vote Count1000Back')
  })

  it('should redirect back home on press of back button', () => {
    spyOn(browserHistory, 'push');
    const wrapper = shallow(
      <MovieDetails
        history={ browserHistory }
      />
    )
    const backBtn = wrapper.find('button');
    backBtn.simulate('click');

    expect(browserHistory.push).toHaveBeenCalledWith('/');
  });
});