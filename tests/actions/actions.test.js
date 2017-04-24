import React from 'react';
import { browserHistory } from 'react-router';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';

import configureMockStore from 'redux-mock-store';
import { signIn, signOut, showFavorites, receivedMovies, fetchMovies } from '../../app/actions/actions';

const store = configureMockStore()();

const mockData = {
  user: {
    id: 1,
    name: 'Inigo Montoya',
    password: 'youkillmyfather',
    email: 'prepare@todie.com'
  },
  movies:[{
    id: 1,
    movie_id: 263115,
    user_id: 2,
    title: "Logan",
    poster_path: "/45Y1G5FEgttPAwjTYic6czC9xCn.jpg",
    release_date: "2017-02-28",
    vote_average: "7.6",
    overview: "In the near future, a weary Logan cares for an ailing Professor X in a hide out on the Mexican border. But Logan's attempts to hide from the world and his legacy are up-ended when a young mutant arrives, being pursued by dark forces."
  },
  {
    id: 2,
    movie_id: 335797,
    user_id: 2,
    title: "Sing",
    poster_path: "/s9ye87pvq2IaDvjv9x4IOXVjvA7.jpg",
    release_date: "2016-11-23",
    vote_average: "6.7",
    overview: "A koala named Buster recruits his best friend to help him drum up business for his theater by hosting a singing competition."
  }]
}

describe('actions', () => {
  afterEach(() => {
    store.clearActions();
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('creates SIGN_IN when initiating signIn action', () => {
    let expectedAction = { type: 'SIGN_IN', user: mockData.user };
    store.dispatch(signIn(mockData.user));

    let createdActions = store.getActions();

    expect(createdActions[0]).toEqual(expectedAction);
    expect(createdActions.length).toEqual(1);
  });

  it('creates SIGN_OUT when initiating signOut action', () => {
    let expectedAction = { type: 'SIGN_OUT' };
    store.dispatch(signOut());

    let createdActions = store.getActions();

    expect(createdActions[0]).toEqual(expectedAction);
    expect(createdActions.length).toEqual(1);
  });

  it('creates SHOW_FAVORITES when initiating showFavorites action', () => {
    let expectedAction = { type: 'SHOW_FAVORITES', favorites: mockData.movies };
    store.dispatch(showFavorites(mockData.movies));

    let createdActions = store.getActions();

    expect(createdActions[0]).toEqual(expectedAction);
    expect(createdActions.length).toEqual(1);
  });

  it.skip('creates RECEIVED_MOVIES when initiating receivedMovies action', () => {
    let expectedAction = { type: 'RECEIVED_MOVIES', movies: mockData.movies };
    store.dispatch(receivedMovies(mockData.movies));

    let createdActions = store.getActions();

    expect(createdActions[0]).toEqual(expectedAction);
    expect(createdActions.length).toEqual(1);
  });

  it.skip('should ', async (done) => {
    fetchMock.post('https://api.themoviedb.org/3/discover/movie?api_key=f61c7abf8110a0ea5bac29dd36a2acab&language=en-US&sort_by=popularity.desc&certification_country=US&include_adult=false&include_video=false&page=1&primary_release_date.gte=2016-09-01&primary_release_date.lte=2017-04-01&vote_count.gte=100&vote_average.gte=6', {
      status: 200,
      ok: true,
      body: mockData.movies
    });

    done();
    expect(receivedMovies()).toHaveBeenCalled();
  });

});