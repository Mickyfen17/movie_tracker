import React, { Component } from 'react';
import { browserHistory, MemoryRouter, StaticRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import App from '../../components/App';
import Home from '../../components/Home';
import NavBar from '../../components/NavBar';
import CreateUser from '../../components/CreateUser';

describe('App', () => {

  const user = {
    id: 1,
    name: 'marissa',
    email: 'reinke.marissa@gmail.com',
    signedIn: true
  }

  it('should display Login button if no user is signed in', () => {
    const wrapper = shallow(
      <App
        user={ {} }
        fetchMovies={ () => {} }
      />
    );

    const buttonText = wrapper.find(NavBar)
                              .dive()
                              .find('button')
                              .first()
                              .text()

    expect(buttonText).toEqual('Login');
  });

  it('displays users name and Logout button when user is signedIn', () => {
    const wrapper = shallow(
      <App
        user={ user }
        fetchMovies={ () => {} }
      />
    );
    const buttonText = wrapper.find(NavBar)
                              .dive()
                              .find('button')
                              .first()
                              .text()

    expect(buttonText).toEqual('Logout');
    expect(wrapper.find('h2').text()).toEqual('Welcome back, marissa');
  });

});
