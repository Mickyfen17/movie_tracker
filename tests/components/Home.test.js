import React from 'react';
import { shallow, mount } from 'enzyme';
import { browserHistory } from 'react-router';

import Home from '../../app/components/Home';

describe('testing Home', () => {

  it('should be able to accept default props', () => {
    const wrapper = mount(
      <Home
        movies={ [] }
        favorites={ [] }
        signedIn={ false }
        userID={ null }
        fetchFavorites={ () => {} }
      />
    )

    expect(wrapper.props().movies).toEqual([])
    expect(wrapper.props().favorites).toEqual([])
    expect(wrapper.props().signedIn).toEqual(false)
    expect(wrapper.props().userID).toEqual(null)
  })

  it('should be able to accept movie props', () => {
    const movieArray = [{ title: 'TopGun', poster_path: 'www.url.com', id: 123 }]
    const wrapper = shallow(
      <Home
        movies={ movieArray }
        favorites={ [] }
        signedIn={ true }
        userID={ 456 }
        fetchFavorites={ () => {} }
      />
    )

    expect(wrapper.unrendered.props.movies).toEqual(movieArray)
    expect(wrapper.unrendered.props.favorites).toEqual([])
    expect(wrapper.unrendered.props.signedIn).toEqual(true)
    expect(wrapper.unrendered.props.userID).toEqual(456)
  })

})